import { NextRequest, NextResponse } from "next/server";
import {
  authenticateEditor,
  createEditorSession,
  EDITOR_COOKIE,
  EDITOR_SESSION_SECONDS,
  editorIsConfigured,
  requestHasEditorSession,
} from "../../../server/editor-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: requestHasEditorSession(request) });
}

export async function POST(request: NextRequest) {
  if (!editorIsConfigured()) {
    return NextResponse.json(
      { error: "服务器尚未设置编辑密码。" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    password?: unknown;
  } | null;
  const password = typeof body?.password === "string" ? body.password : "";
  if (!authenticateEditor(password)) {
    return NextResponse.json({ error: "密码不正确。" }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(EDITOR_COOKIE, createEditorSession(), {
    httpOnly: true,
    maxAge: EDITOR_SESSION_SECONDS,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(EDITOR_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
