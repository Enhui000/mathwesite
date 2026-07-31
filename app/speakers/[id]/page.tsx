import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { conference, speakerInitials, speakers } from "../../data";
import { MathCanvas } from "../../MathCanvas";

type SpeakerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return speakers.map((speaker) => ({
    id: speaker.id,
  }));
}

export async function generateMetadata({
  params,
}: SpeakerPageProps): Promise<Metadata> {
  const { id } = await params;
  const speaker = speakers.find((item) => item.id === id);

  if (!speaker) {
    return {
      title: "报告人",
    };
  }

  return {
    title: `${speaker.name} · ${conference.name}`,
    description: `${speaker.name}，${speaker.affiliation}，${speaker.talkTitle}`,
  };
}

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const { id } = await params;
  const speaker = speakers.find((item) => item.id === id);

  if (!speaker) {
    notFound();
  }

  return (
    <main className="speaker-detail-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="返回会议首页">
          <span className="brand-mark">AG</span>
          <span>Dalian NT &amp; AG 2026</span>
        </Link>
        <nav className="nav" aria-label="页面导航">
          <Link href="/#speakers">报告人</Link>
          <Link href="/#program">日程</Link>
          <Link href="/#venue">地点</Link>
        </nav>
      </header>

      <section className="speaker-hero">
        <MathCanvas />
        <div className="hero-noise" aria-hidden="true" />
        <div className="speaker-hero-content">
          <Link className="back-link" href="/#speakers">
            返回报告人列表
          </Link>
          <div className="detail-portrait">
            {speaker.photo ? (
              <Image
                src={speaker.photo}
                alt={`${speaker.name} 照片`}
                fill
                sizes="(max-width: 600px) 180px, 340px"
              />
            ) : (
              <span>{speakerInitials(speaker.name)}</span>
            )}
          </div>
          <div>
            <p className="eyebrow">
              {speaker.session} · {speaker.talkNo}
            </p>
            <h1>{speaker.name}</h1>
            <p className="hero-subtitle">{speaker.affiliation}</p>
            <div className="keyword-row">
              {speaker.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section detail-section">
        <div className="detail-grid">
          <aside className="detail-aside">
            <span>Talk</span>
            <strong>{speaker.talkTitle}</strong>
            <p>{conference.shortDates}</p>
          </aside>
          <div className="detail-copy">
            <section>
              <p className="section-kicker">Biography</p>
              <h2>个人简介</h2>
              <p>{speaker.bio}</p>
            </section>
            <section>
              <p className="section-kicker">Abstract</p>
              <h2>报告摘要</h2>
              <p>{speaker.abstract}</p>
            </section>
            <section>
              <p className="section-kicker">How to update</p>
              <h2>后续修改位置</h2>
              <p>
                每位报告人的照片、简介、报告题目和摘要都集中在
                <code> app/data.ts </code>
                中。把照片放到 <code> public/speakers/ </code>
                后，把对应 speaker 的 photo 改成图片路径即可。
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
