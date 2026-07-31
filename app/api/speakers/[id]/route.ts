import { NextRequest, NextResponse } from "next/server";
import { requestHasEditorSession } from "../../../server/editor-auth";
import {
  getSpeakerById,
  sanitizeSpeakerUpdate,
  saveSpeaker,
  SpeakerStoreError,
  speakerStorageMode,
  uploadSpeakerPhoto,
} from "../../../server/speaker-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!requestHasEditorSession(request)) {
    return NextResponse.json(
      { error: "编辑会话已失效，请重新输入密码。" },
      { status: 401 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "上传内容过大。" }, { status: 413 });
  }

  const { id } = await params;
  const existing = await getSpeakerById(id);
  if (!existing) {
    return NextResponse.json({ error: "未找到对应的报告人。" }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const rawSpeaker = formData.get("speaker");
    const parsedSpeaker =
      typeof rawSpeaker === "string" ? JSON.parse(rawSpeaker) : null;
    let updated = sanitizeSpeakerUpdate(parsedSpeaker, existing);
    const photo = formData.get("photo");

    if (photo instanceof File && photo.size > 0) {
      updated = {
        ...updated,
        photo: await uploadSpeakerPhoto(id, photo),
      };
    }

    const saved = await saveSpeaker(updated);
    return NextResponse.json({
      speaker: saved,
      storage: speakerStorageMode(),
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "提交的数据格式不正确。" }, { status: 400 });
    }
    const message =
      error instanceof SpeakerStoreError
        ? error.message
        : "保存失败，请稍后重试。";
    console.error("Speaker update failed", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
