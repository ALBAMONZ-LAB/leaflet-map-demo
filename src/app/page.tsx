'use client';
import Image from "next/image";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('./components/Map'), { ssr: false });
const KakaoTileMap = dynamic(() => import('./components/KakaoTileMap'), { ssr: false });
const NaverTileMap = dynamic(() => import('./components/NaverTileMap'), { ssr: false });

export default function Home() {
  return (
    <div>
      <main>
        {/*<Map />*/}
        <KakaoTileMap />
        {/*<NaverTileMap />*/}
      </main>
    </div>
  );
}
