import { list, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { speakers as defaultSpeakers, type Speaker } from "../data";

const SPEAKER_DATA_PATH = "conference-data/speakers.json";
const LOCAL_DATA_PATH = path.join(
  process.cwd(),
  "data",
  "speakers.local.json",
);
const MAX_PHOTO_SIZE = 4 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const PREVIOUS_SCHEDULE_SESSIONS: Record<string, string> = {
  "du-heng": "08.20 15:30-16:30",
  "hu-haoyu": "08.17 14:00-15:00",
  "hu-yongquan": "08.18 14:00-15:00",
  "min-yu": "08.20 14:00-15:00",
  "wang-shanwen": "08.18 15:30-16:30",
  "zhao-heer": "08.17 15:30-16:30",
};

export class SpeakerStoreError extends Error {}

function hasBlobStorage() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
}

function mergeWithDefaults(stored: Speaker[]) {
  const storedById = new Map(stored.map((speaker) => [speaker.id, speaker]));
  return defaultSpeakers.map((fallback) => {
    const saved = storedById.get(fallback.id);
    const merged = {
      ...fallback,
      ...saved,
      id: fallback.id,
    };

    // V11 moved three speakers. Only replace values that still match V10 so
    // any later edits made by a speaker remain intact.
    if (fallback.id === "liu-ruochuan" && saved?.session === "08.21 11:00-12:00") {
      merged.session = fallback.session;
      merged.talkNo = fallback.talkNo;
    }
    if (fallback.id === "ouyang-yi" && saved?.session === "08.21 09:30-10:30") {
      merged.session = fallback.session;
      merged.talkNo = fallback.talkNo;
    }
    if (fallback.id === "qin-hourong" && saved?.session === "08.17 09:30-10:30") {
      merged.session = fallback.session;
      merged.talkNo = fallback.talkNo;
      if (saved.talkTitle === "报告题目待更新") {
        merged.talkTitle = fallback.talkTitle;
        merged.keywords = fallback.keywords;
      }
      if (saved.abstract === "报告摘要待报告人补充。") {
        merged.abstract = fallback.abstract;
      }
    }

    // Keep editable profile text while migrating unchanged session fields to
    // the revised handbook schedule.
    if (saved?.session === PREVIOUS_SCHEDULE_SESSIONS[fallback.id]) {
      merged.session = fallback.session;
      merged.talkNo = fallback.talkNo;
    }

    return merged;
  });
}

function isSpeakerList(value: unknown): value is Speaker[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Speaker).id === "string" &&
        typeof (item as Speaker).name === "string",
    )
  );
}

async function readBlobSpeakers() {
  const result = await list({ prefix: SPEAKER_DATA_PATH, limit: 10 });
  const dataBlob = result.blobs.find(
    (blob) => blob.pathname === SPEAKER_DATA_PATH,
  );

  if (!dataBlob) {
    return null;
  }

  const response = await fetch(dataBlob.url, { cache: "no-store" });
  if (!response.ok) {
    throw new SpeakerStoreError("无法读取线上报告人资料。请稍后重试。");
  }

  return response.json() as Promise<unknown>;
}

async function readLocalSpeakers() {
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf8");
    return JSON.parse(raw) as unknown;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getSpeakers() {
  noStore();

  try {
    const stored = hasBlobStorage()
      ? await readBlobSpeakers()
      : await readLocalSpeakers();
    return isSpeakerList(stored)
      ? mergeWithDefaults(stored)
      : structuredClone(defaultSpeakers);
  } catch (error) {
    console.error("Speaker store read failed", error);
    return structuredClone(defaultSpeakers);
  }
}

export async function getSpeakerById(id: string) {
  const allSpeakers = await getSpeakers();
  return allSpeakers.find((speaker) => speaker.id === id);
}

function boundedText(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized.slice(0, maxLength) : fallback;
}

export function sanitizeSpeakerUpdate(value: unknown, existing: Speaker) {
  const input =
    value !== null && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};
  const keywordInput = Array.isArray(input.keywords) ? input.keywords : [];
  const keywords = keywordInput
    .filter((keyword): keyword is string => typeof keyword === "string")
    .map((keyword) => keyword.trim().slice(0, 48))
    .filter(Boolean)
    .slice(0, 8);

  return {
    ...existing,
    name: boundedText(input.name, existing.name, 80),
    affiliation: boundedText(input.affiliation, existing.affiliation, 160),
    session: boundedText(input.session, existing.session, 80),
    talkNo: boundedText(input.talkNo, existing.talkNo, 40),
    talkTitle: boundedText(input.talkTitle, existing.talkTitle, 240),
    keywords: keywords.length > 0 ? keywords : existing.keywords,
    bio: boundedText(input.bio, existing.bio, 5000),
    abstract: boundedText(input.abstract, existing.abstract, 8000),
  } satisfies Speaker;
}

async function writeSpeakers(nextSpeakers: Speaker[]) {
  const payload = JSON.stringify(nextSpeakers, null, 2);

  if (hasBlobStorage()) {
    await put(SPEAKER_DATA_PATH, payload, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      contentType: "application/json; charset=utf-8",
    });
    return;
  }

  if (process.env.VERCEL) {
    throw new SpeakerStoreError(
      "线上存储尚未启用。请在 Vercel 项目中连接 Blob Store。",
    );
  }

  await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await fs.writeFile(LOCAL_DATA_PATH, payload, "utf8");
}

export async function saveSpeaker(updated: Speaker) {
  const allSpeakers = await getSpeakers();
  const index = allSpeakers.findIndex((speaker) => speaker.id === updated.id);
  if (index < 0) {
    throw new SpeakerStoreError("未找到对应的报告人。");
  }

  allSpeakers[index] = updated;
  await writeSpeakers(allSpeakers);
  return updated;
}

export async function uploadSpeakerPhoto(id: string, photo: File) {
  const extension = IMAGE_EXTENSIONS[photo.type];
  if (!extension) {
    throw new SpeakerStoreError("头像仅支持 JPG、PNG 或 WebP 格式。");
  }
  if (photo.size > MAX_PHOTO_SIZE) {
    throw new SpeakerStoreError("头像文件不能超过 4 MB。");
  }

  const filename = `${id}-${Date.now()}.${extension}`;
  if (hasBlobStorage()) {
    const blob = await put(`conference-data/speakers/${filename}`, photo, {
      access: "public",
      addRandomSuffix: true,
      cacheControlMaxAge: 60 * 60 * 24 * 30,
      contentType: photo.type,
    });
    return blob.url;
  }

  if (process.env.VERCEL) {
    throw new SpeakerStoreError(
      "线上头像存储尚未启用。请在 Vercel 项目中连接 Blob Store。",
    );
  }

  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDirectory, { recursive: true });
  await fs.writeFile(
    path.join(uploadDirectory, filename),
    Buffer.from(await photo.arrayBuffer()),
  );
  return `/uploads/${filename}`;
}

export function speakerStorageMode() {
  if (hasBlobStorage()) return "vercel-blob";
  if (process.env.VERCEL) return "not-configured";
  return "local-file";
}
