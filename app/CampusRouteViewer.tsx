"use client";

import type { Map as LeafletMap } from "leaflet";
import {
  ArrowLeftRight,
  Footprints,
  LocateFixed,
  Minus,
  Navigation,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

const imageHeight = 1191;
const imageWidth = 1326;
const imageBounds = [
  [0, 0],
  [imageHeight, imageWidth],
] as [[number, number], [number, number]];

function mapPoint(x: number, y: number): [number, number] {
  return [imageHeight - y, x];
}

const campusPoints = [
  {
    id: "hotel",
    name: "大连理工国际会议中心",
    detail: "报到、住宿与校内路线起点",
    position: mapPoint(929, 957),
    markerClass: "route-marker-start",
  },
  {
    id: "venue",
    name: "大连理工大学综合教学1号楼",
    detail: "会议地点",
    position: mapPoint(653, 552),
    markerClass: "route-marker-end",
  },
  {
    id: "math",
    name: "大连理工大学数学科学学院",
    detail: "凌水主校区校内地点",
    position: mapPoint(473, 369),
    markerClass: "route-marker-poi",
  },
] as const;

const handbookRoute = [
  mapPoint(929, 957),
  mapPoint(872, 962),
  mapPoint(846, 958),
  mapPoint(821, 947),
  mapPoint(781, 921),
  mapPoint(772, 910),
  mapPoint(768, 896),
  mapPoint(770, 829),
  mapPoint(767, 813),
  mapPoint(690, 810),
  mapPoint(666, 794),
  mapPoint(657, 755),
  mapPoint(657, 656),
  mapPoint(647, 652),
  mapPoint(612, 653),
  mapPoint(605, 647),
  mapPoint(603, 639),
  mapPoint(606, 618),
  mapPoint(616, 602),
  mapPoint(647, 600),
  mapPoint(652, 596),
  mapPoint(655, 588),
  mapPoint(653, 552),
];

export function CampusRouteViewer({
  amapHref,
  wechatHref,
  startName,
  endName,
  distance,
  duration,
  roads,
}: CampusRouteViewerProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return campusPoints.filter((point) =>
      `${point.name}${point.detail}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    let disposed = false;

    void import("leaflet").then((L) => {
      if (disposed || !mapElementRef.current || mapRef.current) return;

      const map = L.map(mapElementRef.current, {
        attributionControl: false,
        center: [imageHeight / 2, imageWidth / 2],
        crs: L.CRS.Simple,
        maxBounds: L.latLngBounds([-110, -110], [imageHeight + 110, imageWidth + 110]),
        maxBoundsViscosity: 0.88,
        maxZoom: 1.8,
        minZoom: -0.8,
        scrollWheelZoom: true,
        zoom: -0.25,
        zoomControl: false,
        zoomSnap: 0.1,
      });

      const bounds = L.latLngBounds(imageBounds);
      L.imageOverlay("/campus-map-clean-v12.jpg", bounds, {
        alt: "V21会议手册中的大连理工大学凌水主校区地图",
      }).addTo(map);

      L.polyline(handbookRoute, {
        className: "handbook-route-line",
        color: "#ef3f2f",
        opacity: 0.95,
        weight: 7,
      }).addTo(map);

      campusPoints.forEach((point) => {
        const icon = L.divIcon({
          className: `campus-route-marker ${point.markerClass}`,
          html: "<span></span>",
          iconAnchor: [12, 12],
          iconSize: [24, 24],
          popupAnchor: [0, -13],
        });
        L.marker(point.position, { icon })
          .bindPopup(`<strong>${point.name}</strong><small>${point.detail}</small>`)
          .addTo(map);
      });

      map.fitBounds(bounds, { padding: [8, 8] });
      mapRef.current = map;
      setMapReady(true);
    });

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const fitRoute = () => {
    mapRef.current?.fitBounds(imageBounds, { padding: [8, 8] });
  };

  const focusPoint = (position: [number, number]) => {
    mapRef.current?.flyTo(position, 0.7, { duration: 0.7 });
    setQuery("");
  };

  const routeStart = reverse ? endName : startName;
  const routeEnd = reverse ? startName : endName;

  return (
    <div className="campus-route-viewer">
      <div className="route-view-tabs" aria-label="校内路线方向">
        <button
          type="button"
          aria-pressed={!reverse}
          onClick={() => setReverse(false)}
        >
          <Footprints aria-hidden="true" size={16} strokeWidth={1.8} />
          去会场 · 约17分钟
        </button>
        <button
          type="button"
          aria-pressed={reverse}
          onClick={() => setReverse(true)}
        >
          <ArrowLeftRight aria-hidden="true" size={16} strokeWidth={1.8} />
          返回酒店 · 约17分钟
        </button>
      </div>

      <div
        className={`interactive-campus-map${reverse ? " route-is-reversed" : ""}`}
      >
        <div className="campus-map-search">
          <Search aria-hidden="true" size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索校内地点"
            aria-label="搜索校内地点"
          />
          {query ? (
            <div className="campus-map-results">
              {searchResults.length > 0 ? (
                searchResults.map((point) => (
                  <button
                    type="button"
                    key={point.id}
                    onClick={() => focusPoint([...point.position])}
                  >
                    <strong>{point.name}</strong>
                    <small>{point.detail}</small>
                  </button>
                ))
              ) : (
                <p>校内图中暂无该地点，可使用下方高德地图继续查询。</p>
              )}
            </div>
          ) : null}
        </div>
        <div
          className="campus-leaflet-map"
          ref={mapElementRef}
          aria-label="可拖动和缩放的会议校内步行路线图"
        />
        <div className="campus-map-controls" aria-label="地图缩放控制">
          <button
            type="button"
            onClick={() => mapRef.current?.zoomIn(0.4)}
            disabled={!mapReady}
            aria-label="放大地图"
            title="放大"
          >
            <Plus aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            onClick={() => mapRef.current?.zoomOut(0.4)}
            disabled={!mapReady}
            aria-label="缩小地图"
            title="缩小"
          >
            <Minus aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            onClick={fitRoute}
            disabled={!mapReady}
            aria-label="显示完整路线"
            title="显示完整路线"
          >
            <RotateCcw aria-hidden="true" size={17} />
          </button>
        </div>
        <span className="route-map-source">
          <LocateFixed aria-hidden="true" size={13} /> V21 手册路线
        </span>
      </div>

      <div className="route-summary">
        <div className="route-summary-heading">
          <Footprints aria-hidden="true" size={20} strokeWidth={1.8} />
          <div>
            <small>V21 手册推荐 · 校内步行</small>
            <strong>
              {distance} · {duration}
            </strong>
          </div>
        </div>
        <dl className="route-endpoints">
          <div>
            <dt>起点</dt>
            <dd>{routeStart}</dd>
          </div>
          <div>
            <dt>终点</dt>
            <dd>{routeEnd}</dd>
          </div>
        </dl>
        <p>{roads}</p>
        <AmapLink
          className="button primary route-open-button"
          href={amapHref}
          wechatHref={wechatHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在新窗口打开高德地图继续查询地点和路线"
        >
          <Navigation aria-hidden="true" size={17} strokeWidth={1.8} />
          在高德继续查询地点与路线
        </AmapLink>
      </div>
    </div>
  );
}
