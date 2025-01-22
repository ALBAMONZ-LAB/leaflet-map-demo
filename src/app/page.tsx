"use client";
import { CustomArrayMarkersType } from "@/types/map";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/Map"), { ssr: false });
const KakaoTileMap = dynamic(() => import("./components/KakaoTileMap"), { ssr: false });
const NaverTileMap = dynamic(() => import("./components/NaverTileMap"), { ssr: false });

const customMarkers: CustomArrayMarkersType[] = [
  {
    position: {
      lat: 37.51800537109375,
      lng: 127.06338500976562,
    },
    popupText: "서비스점검 회사명 5602 # 서비스점검 회사명 5602외 4건",
  },
  {
    position: { lat: 37.49315643310547, lng: 127.01465606689453 },
    popupText: "버거킹 신당역점",
  },
  {
    position: { lat: 37.49665069580078, lng: 127.02692413330078 },
    popupText: "근무회사명이에요",
  },
];

export default function Home() {
  return (
    <div>
      <main>
        <Map currentIconOption={{ iconUrl: "/special_albamonz.svg", iconSize: [32, 32] }} markers={customMarkers} />
        <KakaoTileMap currentIconOption={{ iconUrl: "/special_albamonz.svg", iconSize: [32, 32] }} markers={customMarkers} />
        {/*<NaverTileMap />*/}
      </main>
    </div>
  );
}
