'use client';
import { useState } from 'react';
import { MapContainer, LayersControl, TileLayer, Marker, Popup } from 'react-leaflet';
import 'proj4';
import 'proj4leaflet';
import L, { CRS, bounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function NaverTileMap() {
  const EPSG5179 = new L.Proj.CRS(
    'EPSG:5179',
    '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
      {
            resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
            origin: [90112, 1192896],
            bounds: L.bounds([90112, 1192896], [1990673, 2761664])
        }
    );
    const [map, setMap] = useState(null);
    const [mapStat, setMapStat] = useState({
        center: { lat: 37.564214, lng: 127.001699 },
        zoom: 8,
        crs: EPSG5179,
        minZoom: 0,
        maxZoom: 13,
        zoomReverse: true,
        zoomOffset: 1,
        subdomains: '1234',
        continuousWorld: true,
        tms: true,
    });
  return (
    <MapContainer
      center={[37.564214, 127.001699]}
      zoom={mapStat.zoom}
      scrollWheelZoom
      style={{ width: '100%', height: '100vh' }}
      crs={mapStat.crs}
      preferCanvas={true}
      worldCopyJump={false}
    >
      <TileLayer
        {...mapStat}
        attribution='Map data &copy; <a href="https://map.naver.com/"><strong>Naver Map</strong></a>'
        url='https://simg.pstatic.net/onetile/get/195/0/0/{z}/{x}/{y}/bl_vc_bg/ol_vc_an'
      />
      <Marker position={[37.564214, 127.001699]}>
        <Popup>
          네이버 Tile Map
        </Popup>
      </Marker>
    </MapContainer>
  );
}
