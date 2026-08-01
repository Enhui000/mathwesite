export type ConferencePanel = "program" | "speakers" | "venue" | "materials";

export type ConferencePanelDetail = {
  panel: ConferencePanel;
  speakerId?: string;
};

export const CONFERENCE_PANEL_EVENT = "conference:open-panel";

export function openConferencePanel(detail: ConferencePanelDetail) {
  window.dispatchEvent(
    new CustomEvent<ConferencePanelDetail>(CONFERENCE_PANEL_EVENT, { detail }),
  );
}
