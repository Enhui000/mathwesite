"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  openConferencePanel,
  type ConferencePanel,
} from "./conference-panel";

type ConferencePanelButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick"
> & {
  panel: ConferencePanel;
  speakerId?: string;
  children: ReactNode;
};

export function ConferencePanelButton({
  panel,
  speakerId,
  children,
  ...buttonProps
}: ConferencePanelButtonProps) {
  return (
    <button
      {...buttonProps}
      type="button"
      onClick={() => openConferencePanel({ panel, speakerId })}
    >
      {children}
    </button>
  );
}
