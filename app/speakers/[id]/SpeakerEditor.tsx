"use client";

import {
  ImagePlus,
  LockKeyhole,
  LogOut,
  Pencil,
  Save,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { speakerInitials, type Speaker } from "../../data";

type DraftSpeaker = Omit<Speaker, "id" | "photo" | "keywords" | "bio"> & {
  keywords: string;
};

function createDraft(speaker: Speaker): DraftSpeaker {
  return {
    name: speaker.name,
    affiliation: speaker.affiliation,
    session: speaker.session,
    talkNo: speaker.talkNo,
    talkTitle: speaker.talkTitle,
    keywords: speaker.keywords.join(", "),
    abstract: speaker.abstract,
  };
}

export function SpeakerEditor({ speaker }: { speaker: Speaker }) {
  const router = useRouter();
  const [displaySpeaker, setDisplaySpeaker] = useState(speaker);
  const [draft, setDraft] = useState(() => createDraft(speaker));
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (photoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const openEditor = async () => {
    setOpen(true);
    setChecking(true);
    setMessage("");

    try {
      const response = await fetch("/api/editor/session", { cache: "no-store" });
      const data = (await response.json()) as { authenticated?: boolean };
      setAuthenticated(Boolean(data.authenticated));
    } catch {
      setAuthenticated(false);
      setMessage("无法连接编辑服务，请稍后重试。");
    } finally {
      setChecking(false);
    }
  };

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChecking(true);
    setMessage("");

    try {
      const response = await fetch("/api/editor/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as {
        authenticated?: boolean;
        error?: string;
      };
      if (!response.ok) {
        setMessage(data.error ?? "密码验证失败。");
        return;
      }
      setAuthenticated(Boolean(data.authenticated));
      setPassword("");
    } catch {
      setMessage("无法连接编辑服务，请稍后重试。");
    } finally {
      setChecking(false);
    }
  };

  const logout = async () => {
    await fetch("/api/editor/session", { method: "DELETE" });
    setAuthenticated(false);
    setMessage("");
  };

  const selectPhoto = (file: File | null) => {
    setPhoto(file);
    setMessage("");
    setPhotoPreview(file ? URL.createObjectURL(file) : "");
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = new FormData();
    formData.append(
      "speaker",
      JSON.stringify({
        ...draft,
        keywords: draft.keywords
          .split(/[,，]/)
          .map((keyword) => keyword.trim())
          .filter(Boolean),
      }),
    );
    if (photo) formData.append("photo", photo);

    try {
      const response = await fetch(`/api/speakers/${speaker.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = (await response.json()) as {
        speaker?: Speaker;
        error?: string;
      };

      if (response.status === 401) {
        setAuthenticated(false);
      }
      if (!response.ok || !data.speaker) {
        setMessage(data.error ?? "保存失败，请稍后重试。");
        return;
      }

      setDisplaySpeaker(data.speaker);
      setDraft(createDraft(data.speaker));
      setPhoto(null);
      setPhotoPreview("");
      setMessage("资料已保存并同步到会议网站。");
      router.refresh();
    } catch {
      setMessage("保存失败，请检查网络后重试。");
    } finally {
      setSaving(false);
    }
  };

  const portraitSource = photoPreview || displaySpeaker.photo;

  return (
    <>
      <button
        className="detail-portrait detail-portrait-button"
        type="button"
        onClick={openEditor}
        aria-label={`编辑 ${displaySpeaker.name} 的报告资料`}
      >
        {displaySpeaker.photo ? (
          <Image
            src={displaySpeaker.photo}
            alt={`${displaySpeaker.name} 照片`}
            fill
            sizes="(max-width: 600px) 180px, 340px"
          />
        ) : (
          <span>{speakerInitials(displaySpeaker.name)}</span>
        )}
        <span className="portrait-edit-badge">
          <Pencil size={14} aria-hidden="true" />
          编辑
        </span>
      </button>

      {open ? (
        <div
          className="editor-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            className="editor-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-title"
          >
            <header className="editor-header">
              <div>
                <span>Speaker profile</span>
                <h2 id="editor-title">编辑报告资料</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭编辑窗口"
              >
                <X aria-hidden="true" />
              </button>
            </header>

            {checking ? (
              <div className="editor-state">正在验证编辑权限...</div>
            ) : authenticated ? (
              <form className="speaker-editor-form" onSubmit={save}>
                <div className="editor-portrait-row">
                  <div className="editor-photo-preview">
                    {portraitSource ? (
                      <Image
                        src={portraitSource}
                        alt="头像预览"
                        fill
                        sizes="112px"
                        unoptimized
                      />
                    ) : (
                      <span>{speakerInitials(draft.name)}</span>
                    )}
                  </div>
                  <div>
                    <label className="upload-button" htmlFor="speaker-photo">
                      <ImagePlus size={17} aria-hidden="true" />
                      上传新头像
                    </label>
                    <input
                      id="speaker-photo"
                      className="visually-hidden"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) =>
                        selectPhoto(event.target.files?.[0] ?? null)
                      }
                    />
                    <small>JPG、PNG 或 WebP，最大 4 MB</small>
                  </div>
                </div>

                <div className="editor-fields two-columns">
                  <label>
                    <span>姓名</span>
                    <input
                      value={draft.name}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label>
                    <span>所在单位</span>
                    <input
                      value={draft.affiliation}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          affiliation: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label>
                    <span>报告时间</span>
                    <input
                      value={draft.session}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          session: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label>
                    <span>报告编号</span>
                    <input
                      value={draft.talkNo}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          talkNo: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                </div>

                <div className="editor-fields">
                  <label>
                    <span>报告题目</span>
                    <input
                      value={draft.talkTitle}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          talkTitle: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label>
                    <span>研究关键词</span>
                    <input
                      value={draft.keywords}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          keywords: event.target.value,
                        }))
                      }
                      placeholder="Number Theory, Arithmetic Geometry"
                    />
                  </label>
                  <label>
                    <span>报告摘要</span>
                    <textarea
                      value={draft.abstract}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          abstract: event.target.value,
                        }))
                      }
                      rows={9}
                      required
                    />
                  </label>
                </div>

                {message ? <p className="editor-message">{message}</p> : null}

                <footer className="editor-actions">
                  <button className="editor-logout" type="button" onClick={logout}>
                    <LogOut size={16} aria-hidden="true" />
                    退出编辑
                  </button>
                  <button className="editor-save" type="submit" disabled={saving}>
                    <Save size={17} aria-hidden="true" />
                    {saving ? "正在保存..." : "保存修改"}
                  </button>
                </footer>
              </form>
            ) : (
              <form className="editor-login" onSubmit={login}>
                <div className="login-mark" aria-hidden="true">
                  <LockKeyhole />
                </div>
                <p>请输入会议编辑密码。</p>
                <label>
                  <span>编辑密码</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    autoFocus
                    required
                  />
                </label>
                {message ? <p className="editor-message">{message}</p> : null}
                <button className="editor-save" type="submit" disabled={checking}>
                  <LockKeyhole size={17} aria-hidden="true" />
                  {checking ? "正在验证..." : "进入编辑"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
