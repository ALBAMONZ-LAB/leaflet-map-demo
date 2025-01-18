'use client';
import { useState } from 'react';
import { MapContainer, LayersControl, TileLayer, Marker, Popup } from 'react-leaflet';
import 'proj4';
import 'proj4leaflet';
import L, { CRS, bounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function KakaoTileMap() {
    const EPSG5181 = new L.Proj.CRS(
        'EPSG:5181',
        '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        {
            resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
            origin: [-30000, -60000],
            bounds: L.bounds([-30000-Math.pow(2,19)*4, -60000], [-30000+Math.pow(2,19)*5, -60000+Math.pow(2,19)*5])
        }
    );
    const [map, setMap] = useState(null);
    const [mapStat, setMapStat] = useState({
        center: { lat: 37.564214, lng: 127.001699 },
        zoom: 8,
        crs: EPSG5181,
        minZoom: 0,
        maxZoom: 13,
        zoomReverse: true,
        zoomOffset: 1,
        subdomains: '0123',
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
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url='https://map{s}.daumcdn.net/map_2d/1807hsm/L{z}/{y}/{x}.png'
        url='https://mts.daumcdn.net/api/v1/tile/PNG02/v05_5ho1k/latest/{z}/{y}/{x}.png'
      />
      <Marker position={[37.564214, 127.001699]}>
        <Popup>
          카카오 Tile Map
        </Popup>
      </Marker>
    </MapContainer>
  );
}
