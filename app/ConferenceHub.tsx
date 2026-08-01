"use client";

import {
  BookOpen,
  CalendarDays,
  ExternalLink,
  MapPinned,
  Pencil,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AmapLink } from "./AmapLink";
import { CampusRouteViewer } from "./CampusRouteViewer";
import {
  CONFERENCE_PANEL_EVENT,
  type ConferencePanel,
  type ConferencePanelDetail,
} from "./conference-panel";
import {
  amapSearchUrl,
  amapWebUrl,
  campusWalkingRoute,
  conference,
  googleMapsUrl,
  schedule,
  speakerInitials,
  speakers,
  travel,
  type Speaker,
} from "./data";

const panelLabels: Record<ConferencePanel, string> = {
  program: "会议日程",
  speakers: "报告人",
  venue: "地点与交通",
  materials: "会议手册",
};

const panelTabs: Array<{
  id: ConferencePanel;
  label: string;
  icon: typeof CalendarDays;
}> = [
  { id: "program", label: "日程", icon: CalendarDays },
  { id: "speakers", label: "报告人", icon: Users },
  { id: "venue", label: "地点", icon: MapPinned },
  { id: "materials", label: "手册", icon: BookOpen },
];

const handbookPages = Array.from({ length: 11 }, (_, index) => index + 1);

export function ConferenceHub() {
  const [panel, setPanel] = useState<ConferencePanel | null>(null);
  const [liveSpeakers, setLiveSpeakers] = useState<Speaker[]>(speakers);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(speakers[0].id);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedSpeaker = useMemo(
    () =>
      liveSpeakers.find((speaker) => speaker.id === selectedSpeakerId) ??
      liveSpeakers[0],
    [liveSpeakers, selectedSpeakerId],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/speakers", { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { speakers?: Speaker[] } | null) => {
        if (data?.speakers) setLiveSpeakers(data.speakers);
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") {
          console.error("Unable to refresh speaker data", error);
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const openPanel = (event: Event) => {
      const detail = (event as CustomEvent<ConferencePanelDetail>).detail;
      if (!detail?.panel) return;
      setPanel(detail.panel);
      if (detail.speakerId) setSelectedSpeakerId(detail.speakerId);
    };

    window.addEventListener(CONFERENCE_PANEL_EVENT, openPanel);
    return () => window.removeEventListener(CONFERENCE_PANEL_EVENT, openPanel);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      contentRef.current?.scrollTo({ top: 0 });
      closeButtonRef.current?.focus();
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [panel]);

  const openPanel = (nextPanel: ConferencePanel) => {
    setPanel(nextPanel);
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">AG</span>
          <span>Dalian NT &amp; AG 2026</span>
        </a>
        <nav className="nav" aria-label="会议信息导航">
          {panelTabs.map((tab) => (
            <button type="button" key={tab.id} onClick={() => openPanel(tab.id)}>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {panel ? (
        <div
          className="conference-hub-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPanel(null);
          }}
        >
          <section
            className="conference-hub-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="conference-hub-title"
          >
            <header className="conference-hub-header">
              <div className="conference-hub-heading">
                <small>{conference.englishName}</small>
                <h2 id="conference-hub-title">{panelLabels[panel]}</h2>
              </div>
              <div className="conference-hub-tabs" role="tablist">
                {panelTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      type="button"
                      key={tab.id}
                      role="tab"
                      aria-selected={panel === tab.id}
                      onClick={() => openPanel(tab.id)}
                    >
                      <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <button
                className="conference-hub-close"
                type="button"
                ref={closeButtonRef}
                onClick={() => setPanel(null)}
                aria-label="关闭会议信息浮层"
                title="关闭"
              >
                <X aria-hidden="true" size={21} />
              </button>
            </header>

            <div className="conference-hub-content" ref={contentRef}>
              {panel === "program" ? (
                <div className="hub-program-panel">
                  <div className="hub-program-summary">
                    <p>报到与入住</p>
                    <strong>{conference.registration}</strong>
                    <span>{conference.registrationVenue}</span>
                    <p>会议地点</p>
                    <strong>{conference.venueName}</strong>
                  </div>
                  <div className="hub-program-grid">
                    {schedule.map((day) => (
                      <article className="hub-program-day" key={day.day}>
                        <header>
                          <small>{day.label}</small>
                          <strong>{day.day}</strong>
                        </header>
                        <ol>
                          {day.events.map(([time, title]) => (
                            <li
                              className={
                                title.includes("茶歇") || title.includes("午餐")
                                  ? "hub-program-break"
                                  : title.includes("开幕式")
                                    ? "hub-program-highlight"
                                    : ""
                              }
                              key={`${day.day}-${time}-${title}`}
                            >
                              <time>{time}</time>
                              <span>{title}</span>
                            </li>
                          ))}
                        </ol>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {panel === "speakers" ? (
                <div className="hub-speakers-panel">
                  <div className="hub-speaker-directory" aria-label="报告人列表">
                    {liveSpeakers.map((speaker, index) => (
                      <button
                        type="button"
                        key={speaker.id}
                        aria-pressed={selectedSpeaker?.id === speaker.id}
                        onClick={() => setSelectedSpeakerId(speaker.id)}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{speaker.name}</strong>
                        <small>{speaker.affiliation}</small>
                        <time>{speaker.session}</time>
                      </button>
                    ))}
                  </div>
                  {selectedSpeaker ? (
                    <article className="hub-speaker-detail">
                      <div className="hub-speaker-detail-header">
                        <div className="hub-speaker-avatar">
                          {selectedSpeaker.photo ? (
                            <Image
                              src={selectedSpeaker.photo}
                              alt={`${selectedSpeaker.name} 照片`}
                              fill
                              sizes="96px"
                            />
                          ) : (
                            <span>{speakerInitials(selectedSpeaker.name)}</span>
                          )}
                        </div>
                        <div>
                          <small>
                            {selectedSpeaker.session} · {selectedSpeaker.talkNo}
                          </small>
                          <h3>{selectedSpeaker.name}</h3>
                          <p>{selectedSpeaker.affiliation}</p>
                        </div>
                      </div>
                      <section>
                        <span>报告题目</span>
                        <h4>{selectedSpeaker.talkTitle}</h4>
                      </section>
                      <section>
                        <span>报告摘要</span>
                        <p>{selectedSpeaker.abstract}</p>
                      </section>
                      <section>
                        <span>个人简介</span>
                        <p>{selectedSpeaker.bio}</p>
                      </section>
                      <a
                        className="hub-edit-link"
                        href={`/speakers/${selectedSpeaker.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Pencil aria-hidden="true" size={15} />
                        编辑报告资料
                        <ExternalLink aria-hidden="true" size={14} />
                      </a>
                    </article>
                  ) : null}
                </div>
              ) : null}

              {panel === "venue" ? (
                <div className="hub-venue-panel">
                  <div className="hub-venue-heading">
                    <div>
                      <small>会议地点</small>
                      <h3>{conference.venueName}</h3>
                      <p>{conference.address}</p>
                    </div>
                    <div className="route-actions">
                      <AmapLink
                        className="button primary"
                        href={amapSearchUrl()}
                        wechatHref={amapWebUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        高德地点查询
                      </AmapLink>
                      <a
                        className="button muted"
                        href={googleMapsUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Maps
                      </a>
                    </div>
                  </div>
                  <CampusRouteViewer
                    amapHref={amapSearchUrl()}
                    wechatHref={amapWebUrl()}
                    startName={campusWalkingRoute.startName}
                    endName={campusWalkingRoute.endName}
                    distance={campusWalkingRoute.distance}
                    duration={campusWalkingRoute.duration}
                    roads={campusWalkingRoute.roads}
                  />
                  <div className="hub-travel-list">
                    {travel.map((item) => (
                      <article key={item.title}>
                        <span>{item.distance}</span>
                        <h4>{item.title}</h4>
                        <p>{item.taxi}</p>
                        <small>{item.transit}</small>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {panel === "materials" ? (
                <div className="hub-materials-panel">
                  <div className="hub-materials-toolbar">
                    <div>
                      <small>Conference handbook · V11</small>
                      <h3>会议手册完整预览</h3>
                    </div>
                    <a
                      className="button primary"
                      href={conference.handbookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      打开 PDF
                      <ExternalLink aria-hidden="true" size={15} />
                    </a>
                  </div>
                  <div className="hub-handbook-pages">
                    {handbookPages.map((page) => (
                      <figure key={page}>
                        <Image
                          src={`/handbook-final/page-${String(page).padStart(2, "0")}.png`}
                          alt={`会议手册第${page}页`}
                          width={637}
                          height={900}
                          sizes="(max-width: 700px) 88vw, 360px"
                        />
                        <figcaption>{String(page).padStart(2, "0")} / 11</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
