import type { Metadata } from "next";
import Image from "next/image";
import {
  amapSearchUrl,
  conference,
  googleMapsUrl,
  schedule,
  speakers,
  stats,
  travel,
} from "./data";
import { MathCanvas } from "./MathCanvas";
import { SpeakerList } from "./SpeakerList";

export const metadata: Metadata = {
  title: "大连数论与算术几何研讨会",
  description:
    "Dalian Number Theory and Arithmetic Geometry Conference, Aug 16-21, 2026.",
};

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">AG</span>
          <span>Dalian NT &amp; AG 2026</span>
        </a>
        <nav className="nav" aria-label="页面导航">
          <a href="#program">日程</a>
          <a href="#speakers">报告人</a>
          <a href="#venue">地点</a>
          <a href="#materials">手册</a>
        </nav>
      </header>
      <div className="scroll-atmosphere" aria-hidden="true" />

      <div className="hero-chapter" id="top">
      <section className="hero hero-sticky">
        <MathCanvas variant="hero" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-notation" aria-hidden="true">
          <span>ζ(s)</span>
          <span>Spec Z</span>
          <span>H¹(X, Q<sub>p</sub>)</span>
          <span>y² = x³ + ax + b</span>
        </div>
        <div className="hero-content">
          <p className="eyebrow">Number Theory / Arithmetic Geometry</p>
          <h1>{conference.name}</h1>
          <p className="hero-subtitle">{conference.englishName}</p>
          <div className="hero-actions">
            <a className="button primary" href={conference.handbookPreviewUrl}>
              预览会议手册
            </a>
            <a
              className="button glow"
              href={amapSearchUrl()}
              aria-label="在高德地图中打开会议地点"
              target="_blank"
              rel="noopener noreferrer"
            >
              高德地图
            </a>
          </div>
        </div>
        <div className="hero-index" aria-label="会议信息">
          <span className="hero-index-date">{conference.dates}</span>
          <span>{conference.venueName}</span>
          {stats.map(([value, label]) => (
            <span className="stat-item" key={value}>
              <strong>{value}</strong>
              <small>{label}</small>
            </span>
          ))}
        </div>
        <div className="hero-horizon" aria-hidden="true">
          <span />
          <i />
        </div>
      </section>
      </div>

      <section className="section overview-section reveal-section">
        <MathCanvas variant="prime" />
        <div className="section-intro">
          <p className="section-kicker">Conference</p>
          <h2>面向数论与算术几何的集中研讨</h2>
        </div>
        <div className="overview-grid">
          <div>
            <p>
              会议将于 2026 年 8 月 16 日至 21 日在大连理工大学举行，
              围绕数论与算术几何相关方向展开报告、讨论与交流。
            </p>
          </div>
          <div className="overview-list">
            <div>
              <span>报到与入住</span>
              <strong>{conference.registration}</strong>
              <p>{conference.registrationVenue}</p>
            </div>
            <div>
              <span>会议地点</span>
              <strong>{conference.venueName}</strong>
              <p>{conference.campus}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flow-transition flow-to-paper" aria-hidden="true">
        <MathCanvas variant="lattice" />
        <span className="transition-orbit" />
        <i />
        <b />
      </div>

      <section className="section program-section reveal-section" id="program">
        <MathCanvas variant="program" />
        <div className="section-intro">
          <p className="section-kicker">Program</p>
          <h2>会议日程</h2>
        </div>
        <div className="program-river">
          {schedule.map((day) => (
            <article className="program-day" key={day.day}>
              <div className="day-heading">
                <strong>{day.day}</strong>
                <span>{day.label}</span>
              </div>
              <ol>
                {day.events.map(([time, title]) => (
                  <li key={`${day.day}-${time}-${title}`}>
                    <time>{time}</time>
                    <span>{title}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <div className="flow-transition flow-to-dark" aria-hidden="true">
        <MathCanvas variant="orbit" />
        <span className="transition-orbit" />
        <i />
        <b />
      </div>

      <section className="section speakers-section reveal-section" id="speakers">
        <MathCanvas variant="speakers" />
        <div className="section-intro">
          <p className="section-kicker">Speakers</p>
          <h2>报告人</h2>
          <p>16 位报告人，按会议日期与场次排列。</p>
        </div>
        <SpeakerList initialSpeakers={speakers} />
      </section>

      <div className="flow-transition flow-to-light" aria-hidden="true">
        <MathCanvas variant="fold" />
        <span className="transition-orbit" />
        <i />
        <b />
      </div>

      <section className="section venue-section reveal-section" id="venue">
        <MathCanvas variant="venue" />
        <div className="section-intro">
          <p className="section-kicker">Venue</p>
          <h2>地点与交通</h2>
        </div>
        <div className="venue-layout">
          <div className="venue-copy">
            <h3>{conference.venueName}</h3>
            <p>{conference.address}</p>
            <div className="route-actions">
              <a
                className="button primary"
                href={amapSearchUrl()}
                aria-label="在高德地图中打开会议地点"
                target="_blank"
                rel="noopener noreferrer"
              >
                打开高德地图
              </a>
              <a
                className="button muted"
                href={googleMapsUrl()}
                aria-label="在 Google Maps 中打开会议地点"
              >
                Google Maps
              </a>
            </div>
          </div>
          <a className="map-preview" href={conference.campusMapUrl}>
            <Image
              src={conference.campusMapUrl}
              alt="大连理工大学校园地图"
              width={637}
              height={900}
              sizes="(max-width: 820px) 100vw, 58vw"
            />
          </a>
        </div>
        <div className="travel-stream">
          {travel.map((item) => (
            <article className="travel-item" key={item.title}>
              <span>{item.distance}</span>
              <h3>{item.title}</h3>
              <p>{item.taxi}</p>
              <small>{item.transit}</small>
            </article>
          ))}
        </div>
      </section>

      <div className="flow-transition flow-to-paper" aria-hidden="true">
        <MathCanvas variant="lattice" />
        <span className="transition-orbit" />
        <i />
        <b />
      </div>

      <section className="section materials-section reveal-section" id="materials">
        <MathCanvas variant="materials" />
        <div className="materials-layout">
          <div className="section-intro">
            <p className="section-kicker">Handbook</p>
            <h2>会议手册与资料</h2>
            <p>
              手册已加入网站，可在线预览封面、日程、交通和地图，也可下载
              PPTX 原文件。
            </p>
            <div className="hero-actions">
              <a className="button primary" href={conference.handbookPreviewUrl}>
                在线预览
              </a>
              <a className="button muted" href={conference.handbookUrl}>
                下载 PPTX
              </a>
            </div>
          </div>
          <a className="handbook-cover" href={conference.handbookPreviewUrl}>
            <Image
              src={conference.posterUrl}
              alt="会议手册封面"
              width={637}
              height={900}
              sizes="(max-width: 820px) 76vw, 34vw"
            />
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>{conference.englishName}</span>
        <a href="#top">返回顶部</a>
      </footer>
    </main>
  );
}
