This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

내가 이걸 왜 손댔을까..
지금이라도 포기할까

## 목적
- albamon 에 도입할 수 있는 map app을 만들어보자
- OSM, 구글지도, 네이버지도, 다음지도, 브이월드 등 다양한 배경지도를 leaflet에서 표시해보자
- 카카오, 네이버와 같은 지도맵을 Leaflet을 활용해서 쓸 수 있을까?

## 목표
- OMS (Open Street Map) 적용
- Google Map 적용
- Naver Map 적용
- Kakao Map 적용

## 필요한 사전지식
    1. 배경지도 TMS: Tiled Map Service
    2. Leaflet (https://leafletjs.com/examples/quick-start/)
    3. 약간의 GIS 지식 (Geographic Informaiton System)
        좌표체계에 대한 이해는 상용지도마다 사용하는 좌표체계가 차이가 있기 때문에, 경/위도 값이 약간씩 다르기 때문이다.
        - 한국 주요 좌표계 EPSG 코드 및 proj4 정보 (https://www.osgeo.kr/17)
        - EPSG:3857[900913] : OSM, 구글지도, 브이월드
        - EPSG:5181[중부원점(GRS80)] : 다음지도
        - EPSG:5179[UTM-K(GRS80)] 네이버지도, 올레지도, 바로e맵(국토지리정보원 국토정보맵)EPSG:3857[900913] : OSM, 구글지도, 브이월드
    4. 타일맵 디자인
        - 타일맵은 256x256 픽셀의 이미지 파일로, 각 타일은 고유한 x, y, z 값으로 식별된다.
        - x, y 값은 타일의 위치를 나타내고, z 값은 타일의 확대 수준을 나타낸다.
        - 타일맵은 일반적으로 0부터 시작하는 z 값으로 시작하며, z 값이 증가할수록 확대 수준이 증가한다.
        - 타일맵은 일반적으로 0부터 시작하는 x, y 값으로 시작하며, x, y 값은 z 값에 따라 0부터 2^z-1까지의 값으로 변화한다.
        - 타일맵은 일반적으로 256x256 픽셀의 이미지 파일로 제공되며, 각 타일은 고유한 x, y, z 값으로 식별된다.
        - 타일맵은 일반적으로 0부터 시작하는 z 값으로 시작하며, z 값이 증가할수록 확대 수준이 증가한다.
        - 타일맵은 일반적으로 0부터 시작하는 x, y 값으로 시작하며, x, y 값은 z 값에 따라 0부터 2^z-1까지의 값으로 변화한다.
        - 타일맵은 일반적으로 256x256 픽셀의 이미지 파일로 제공되며, 각 타일은 고유한 x, y, z 값으로 식별된다.
        - 타일맵은 일반적으로 0부터 시작하는 z 값으로 시작하며, z 값이 증가할수록 확대 수준이 증가한다.
        - 타일맵은 일반적으로 0부터 시작하는 x, y 값으로 시작

ㅎ ㅏ.. 벌써 빡세 .... 망할 Leaflet type 도 적용 안돼? ㅠㅠ

현재 작업된 버전은 Google, kakao 의 tile map을 가져와서 leaflet에 적용했다.

## node_modules 설치

```bash
pnpm install
```

## 서버 실행하기
- 되도록 pnpm 을 사용하자
- First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
