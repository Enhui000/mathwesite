"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { openConferencePanel } from "./conference-panel";
import { speakerInitials, type Speaker } from "./data";

type SpeakerListProps = {
  initialSpeakers: Speaker[];
};

export function SpeakerList({ initialSpeakers }: SpeakerListProps) {
  const [liveSpeakers, setLiveSpeakers] = useState(initialSpeakers);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/speakers", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { speakers?: Speaker[] } | null) => {
        if (data?.speakers) {
          setLiveSpeakers(data.speakers);
        }
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") {
          console.error("Unable to refresh speaker list", error);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="speaker-list">
      {liveSpeakers.map((speaker, index) => (
        <Link
          className="speaker-row"
          href={`/speakers/${speaker.id}`}
          key={speaker.id}
          onClick={(event) => {
            event.preventDefault();
            openConferencePanel({ panel: "speakers", speakerId: speaker.id });
          }}
        >
          <span className="speaker-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="speaker-photo">
            {speaker.photo ? (
              <Image
                src={speaker.photo}
                alt={`${speaker.name} 照片`}
                fill
                sizes="72px"
              />
            ) : (
              <span>{speakerInitials(speaker.name)}</span>
            )}
          </span>
          <span className="speaker-identity">
            <strong>{speaker.name}</strong>
            <small>{speaker.affiliation}</small>
          </span>
          <span className="speaker-talk">
            <small>
              {speaker.session} · {speaker.talkNo}
            </small>
            <strong>{speaker.talkTitle}</strong>
          </span>
          <span className="speaker-link">详情</span>
        </Link>
      ))}
    </div>
  );
}
