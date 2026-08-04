import type { Metadata } from "next";
import { ConferenceHub } from "./ConferenceHub";
import { ConferencePanelButton } from "./ConferencePanelButton";
import { conference } from "./data";

export const metadata: Metadata = {
  title: "2026年大连数论与算术几何研讨会",
  description:
    "2026 Dalian Number Theory and Arithmetic Geometry Conference, Aug 16-21, 2026.",
};

export default function Home() {
  return (
    <main className="single-page-site">
      <header className="conference-header">
        <a href="#top">2026 Dalian Number Theory and Arithmetic Geometry</a>
        <nav aria-label="会议信息导航">
          <ConferencePanelButton panel="program">日程</ConferencePanelButton>
          <ConferencePanelButton panel="speakers">报告人</ConferencePanelButton>
          <ConferencePanelButton panel="venue">地点</ConferencePanelButton>
          <ConferencePanelButton panel="materials">手册</ConferencePanelButton>
        </nav>
      </header>

      <section className="static-conference-hero" id="top">
        <div className="static-hero-content">
          <p className="static-hero-kicker">
            Number Theory · Arithmetic Geometry
          </p>
          <h1>{conference.name}</h1>
          <p className="static-hero-subtitle">{conference.englishName}</p>
          <dl className="static-hero-facts">
            <div>
              <dt>日期</dt>
              <dd>{conference.dates}</dd>
            </div>
            <div>
              <dt>地点</dt>
              <dd>{conference.venueName}</dd>
            </div>
          </dl>
          <div className="static-hero-actions">
            <ConferencePanelButton panel="program">
              查看会议日程
            </ConferencePanelButton>
            <ConferencePanelButton panel="materials">
              查看会议手册
            </ConferencePanelButton>
          </div>
        </div>
      </section>

      <ConferenceHub />

      <footer className="compact-footer">
        <span>{conference.englishName}</span>
        <a href="#top">返回顶部</a>
      </footer>
    </main>
  );
}
