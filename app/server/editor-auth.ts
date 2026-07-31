import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const EDITOR_COOKIE = "nt_ag_editor";
export const EDITOR_SESSION_SECONDS = 60 * 60 * 8;

function editorPassword() {
  return process.env.CONFERENCE_EDITOR_PASSWORD ?? "";
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function editorIsConfigured() {
  return editorPassword().length > 0;
}

export function authenticateEditor(password: string) {
  const expected = editorPassword();
  return expected.length > 0 && safeEqual(password, expected);
}

export function createEditorSession() {
  return createHmac("sha256", editorPassword())
    .update("dalian-nt-ag-editor-session-v1")
    .digest("hex");
}

export function requestHasEditorSession(request: NextRequest) {
  if (!editorIsConfigured()) {
    return false;
  }

  const actual = request.cookies.get(EDITOR_COOKIE)?.value ?? "";
  return safeEqual(actual, createEditorSession());
}
