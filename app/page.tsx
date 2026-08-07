import type { Metadata } from "next";
import Image from "next/image";
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
      <header className="conference-header" id="top">
        <a className="conference-title" href="#top">
          <strong>{conference.name}</strong>
          <span>{conference.englishName}</span>
        </a>
        <nav aria-label="会议信息导航">
          <ConferencePanelButton panel="program">日程</ConferencePanelButton>
          <ConferencePanelButton panel="speakers">报告人</ConferencePanelButton>
          <ConferencePanelButton panel="venue">地点</ConferencePanelButton>
          <ConferencePanelButton panel="materials">手册</ConferencePanelButton>
        </nav>
      </header>

      <ConferenceHub />

      <footer className="conference-footer">
        <section className="footer-organizers" aria-labelledby="organizers-title">
          <p id="organizers-title">主办单位</p>
          <div>
            <Image
              src="/university-logos/dalian-university-of-technology.svg"
              alt="大连理工大学"
              width={282}
              height={75}
            />
            <Image
              className="fudan-footer-logo"
              src="/university-logos/fudan-university.png"
              alt="复旦大学"
              width={832}
              height={266}
            />
          </div>
        </section>
        <address className="footer-contacts">
          <span>联系人</span>
          <a href="mailto:wangyupeng@fudan.edu.cn">
            王宇鹏 · 复旦大学 · wangyupeng@fudan.edu.cn
          </a>
          <a href="mailto:lumingzhao@dlut.edu.cn">
            赵路明 · 大连理工大学 · lumingzhao@dlut.edu.cn
          </a>
        </address>
        <nav className="footer-links" aria-label="页尾导航">
          <ConferencePanelButton panel="travel">大连旅行参考</ConferencePanelButton>
          <a href="#top">返回顶部</a>
        </nav>
      </footer>
    </main>
  );
}
