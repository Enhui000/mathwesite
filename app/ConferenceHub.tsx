"use client";

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
  dalianGuideSpots,
  googleMapsUrl,
  schedule,
  speakerInitials,
  speakers,
  travel,
  type Speaker,
} from "./data";

const panelTabs: Array<{ id: ConferencePanel; label: string; index: string }> = [
  { id: "program", label: "会议日程", index: "01" },
  { id: "speakers", label: "报告人", index: "02" },
  { id: "venue", label: "地点与交通", index: "03" },
  { id: "materials", label: "会议手册", index: "04" },
];

const handbookPages = Array.from({ length: 11 }, (_, index) => index + 1);
const programTimes = [
  "09:20",
  "09:30",
  "10:30",
  "11:00",
  "12:00",
  "14:30",
  "15:30",
  "16:00",
  "17:30",
];

export function ConferenceHub() {
  const [panel, setPanel] = useState<ConferencePanel>("program");
  const [liveSpeakers, setLiveSpeakers] = useState<Speaker[]>(speakers);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(speakers[0].id);
  const contentRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLElement>(null);

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
    const frame = window.requestAnimationFrame(() => {
      const requestedPanel = new URLSearchParams(window.location.search).get(
        "panel",
      );
      if (requestedPanel === "travel") {
        setPanel("travel");
        return;
      }
      const requestedTab = panelTabs.find((tab) => tab.id === requestedPanel);
      if (requestedTab) setPanel(requestedTab.id);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const openPanel = (event: Event) => {
      const detail = (event as CustomEvent<ConferencePanelDetail>).detail;
      if (!detail?.panel) return;
      setPanel(detail.panel);
      if (detail.speakerId) setSelectedSpeakerId(detail.speakerId);
      window.requestAnimationFrame(() => {
        workspaceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    };

    window.addEventListener(CONFERENCE_PANEL_EVENT, openPanel);
    return () => window.removeEventListener(CONFERENCE_PANEL_EVENT, openPanel);
  }, []);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0 });
  }, [panel]);

  return (
    <section
      className="conference-workspace"
      id="conference-information"
      ref={workspaceRef}
      aria-labelledby="conference-workspace-title"
    >
      <header className="workspace-intro">
        <div>
          <p>Conference information</p>
          <h2 id="conference-workspace-title">会议信息</h2>
          <button
            className="dalian-guide-trigger"
            type="button"
            aria-pressed={panel === "travel"}
            onClick={() => setPanel("travel")}
          >
            会后参考：大连景点与旅行攻略
          </button>
        </div>
        <dl>
          <div>
            <dt>日期</dt>
            <dd>{conference.dates}</dd>
          </div>
          <div>
            <dt>地点</dt>
            <dd>{conference.venueName}</dd>
          </div>
        </dl>
      </header>

      <div className="bookmark-tabs" role="tablist" aria-label="会议信息栏目">
        {panelTabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            role="tab"
            aria-selected={panel === tab.id}
            aria-controls={`conference-panel-${tab.id}`}
            onClick={() => setPanel(tab.id)}
          >
            <small>{tab.index}</small>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div
        className="workspace-content"
        id={`conference-panel-${panel}`}
        role={panel === "travel" ? "region" : "tabpanel"}
        aria-label={panel === "travel" ? "大连景点与旅行攻略" : undefined}
        ref={contentRef}
      >
        {panel === "program" ? (
          <div className="hub-program-panel">
            <div className="hub-program-summary">
              <p>报到与入住</p>
              <strong>{conference.registration}</strong>
              <span>{conference.registrationVenue}</span>
              <p>会议地点</p>
              <strong>{conference.venueName}</strong>
            </div>
            <div className="hub-program-grid" role="table" aria-label="会议日程">
              {schedule.map((day) => (
                <div
                  className="hub-program-day-header"
                  role="columnheader"
                  key={day.day}
                >
                  <small>{day.label}</small>
                  <strong>{day.day}</strong>
                </div>
              ))}
              {programTimes.flatMap((time) =>
                schedule.map((day) => {
                  const event = day.events.find(
                    ([eventTime]) => eventTime === time,
                  );
                  const title = event?.[1];
                  const stateClass = !title
                    ? " hub-program-empty"
                    : title.includes("茶歇") || title.includes("午餐")
                      ? " hub-program-break"
                      : title.includes("开幕式")
                        ? " hub-program-highlight"
                        : "";

                  return (
                    <div
                      className={`hub-program-event${stateClass}`}
                      role="cell"
                      key={`${day.day}-${time}`}
                      aria-label={title ? `${time} ${title}` : `${time} 无安排`}
                    >
                      {title ? (
                        <>
                          <time>{time}</time>
                          <span>{title}</span>
                        </>
                      ) : null}
                    </div>
                  );
                }),
              )}
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
                <a
                  className="hub-edit-link"
                  href={`/speakers/${selectedSpeaker.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  编辑报告资料
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
                <small>Conference handbook · V12</small>
                <h3>会议手册完整预览</h3>
              </div>
              <a
                className="button primary"
                href={conference.handbookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                打开 PDF
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

        {panel === "travel" ? (
          <div className="hub-dalian-guide">
            <header className="dalian-guide-heading">
              <div>
                <small>Dalian after hours</small>
                <h3>会后看一眼大连</h3>
              </div>
              <p>
                不占会议主流程，只提供晚间和半日空档的简明参考。景区开放、票务及活动时间请以当天公告为准。
              </p>
            </header>

            <div className="dalian-guide-grid">
              {dalianGuideSpots.map((spot) => (
                <article key={spot.title}>
                  <figure>
                    <Image
                      src={spot.image}
                      alt={spot.imageAlt}
                      fill
                      sizes="(max-width: 760px) 88vw, 30vw"
                    />
                    <figcaption>
                      <a
                        href={spot.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        图片：{spot.photoCredit}
                      </a>
                    </figcaption>
                  </figure>
                  <div className="dalian-guide-copy">
                    <small>{spot.timeframe}</small>
                    <h4>{spot.title}</h4>
                    <p>{spot.summary}</p>
                    <span>{spot.practical}</span>
                    <AmapLink
                      href={amapSearchUrl(spot.keyword)}
                      wechatHref={amapWebUrl(spot.keyword)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      在高德地图中查看
                    </AmapLink>
                  </div>
                </article>
              ))}
            </div>

            <section className="dalian-guide-notes">
              <div>
                <small>出行提示 · 综合整理</small>
                <p>
                  星海广场更适合傍晚；滨海路景色集中但全程很长，选一段即可；东港适合晚间散步；海边普遍风大。
                </p>
              </div>
              <nav aria-label="大连旅行外部参考">
                <a
                  href="https://whly.ln.gov.cn/whly/wlzt/sjly/ajjq/2026030215590914845/index.shtml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  辽宁文旅 · 棒棰岛
                </a>
                <a
                  href="https://whly.ln.gov.cn/whly/gsxw/2025071411411959915/index.shtml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  大连旅游服务手册
                </a>
                <a
                  href="https://www.ln.gov.cn/web/sqgk/whly/ajjq/dl/index.shtml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  辽宁政府 · 大连景区
                </a>
              </nav>
            </section>
          </div>
        ) : null}
      </div>
    </section>
  );
}
