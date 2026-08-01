"use client";

import { Footprints, Map, Navigation } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AmapLink } from "./AmapLink";

type CampusRouteViewerProps = {
  amapHref: string;
  wechatHref: string;
  startName: string;
  endName: string;
  distance: string;
  duration: string;
  roads: string;
};

const routeViews = {
  amap: {
    label: "高德路线",
    image: "/amap-optimal-walking-route.png",
    alt: "高德地图显示的大连理工国际会议中心至综合教学1号楼最优步行路线",
  },
  campus: {
    label: "校园路线图",
    image: "/campus-optimal-walking-route.png",
    alt: "校园地图风格的大连理工国际会议中心至综合教学1号楼步行路线",
  },
} as const;

type RouteView = keyof typeof routeViews;

export function CampusRouteViewer({
  amapHref,
  wechatHref,
  startName,
  endName,
  distance,
  duration,
  roads,
}: CampusRouteViewerProps) {
  const [view, setView] = useState<RouteView>("amap");
  const activeView = routeViews[view];

  return (
    <div className="campus-route-viewer">
      <div className="route-view-tabs" aria-label="路线图显示方式">
        <button
          type="button"
          aria-pressed={view === "amap"}
          onClick={() => setView("amap")}
        >
          <Navigation aria-hidden="true" size={16} strokeWidth={1.8} />
          高德路线
        </button>
        <button
          type="button"
          aria-pressed={view === "campus"}
          onClick={() => setView("campus")}
        >
          <Map aria-hidden="true" size={16} strokeWidth={1.8} />
          校园路线图
        </button>
      </div>

      <div className="route-map-frame">
        <Image
          key={activeView.image}
          src={activeView.image}
          alt={activeView.alt}
          fill
          priority={view === "amap"}
          sizes="(max-width: 820px) 100vw, 58vw"
        />
        <span className="route-map-source">{activeView.label}</span>
      </div>

      <div className="route-summary">
        <div className="route-summary-heading">
          <Footprints aria-hidden="true" size={20} strokeWidth={1.8} />
          <div>
            <small>高德步行最优路线</small>
            <strong>
              {distance} · {duration}
            </strong>
          </div>
        </div>
        <dl className="route-endpoints">
          <div>
            <dt>起点</dt>
            <dd>{startName}</dd>
          </div>
          <div>
            <dt>终点</dt>
            <dd>{endName}</dd>
          </div>
        </dl>
        <p>{roads}</p>
        <AmapLink
          className="button primary route-open-button"
          href={amapHref}
          wechatHref={wechatHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在高德地图中查看最优步行路线"
        >
          <Navigation aria-hidden="true" size={17} strokeWidth={1.8} />
          在高德查看路线
        </AmapLink>
      </div>
    </div>
  );
}
