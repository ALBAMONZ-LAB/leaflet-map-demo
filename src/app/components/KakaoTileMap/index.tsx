"use client";
import { MapComponentProps, PositionType } from "@/types/map";
import L, { TileLayerOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import "proj4";
import "proj4leaflet";
import { useState } from "react";
import { MapContainer, MapContainerProps, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

const defaultIconUrl = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
const defaultIconSize: [number, number] = [32, 32];
const defaultIconAnchor: [number, number] = [16, 32];

export default function KakaoTileMap(props: MapComponentProps) {
  const {
    position = { lat: 37.49315643310547, lng: 127.01465606689453 },
    zoom = 16,
    mapMoveOption = {
      isMarkerCenter: true,
      isZoomCenter: true,
      isClickMaker: true,
    },
    hasCurrentLocationMarker = true,
    markers = [],
    currentIconOption,
  } = props;
  const [currentLocation, setCurrentLocation] = useState<PositionType>(position);

  const defaultIcon = L.icon({
    iconUrl: currentIconOption?.iconUrl || defaultIconUrl,
    iconSize: currentIconOption?.iconSize || defaultIconSize,
    iconAnchor: currentIconOption?.iconAnchor || defaultIconAnchor,
  });

  const EPSG5181 = new L.Proj.CRS(
    "EPSG:5181",
    "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
    {
      resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
      origin: [-30000, -60000],
      bounds: L.bounds([-30000 - Math.pow(2, 19) * 4, -60000], [-30000 + Math.pow(2, 19) * 5, -60000 + Math.pow(2, 19) * 5]),
    }
  );

  const [mapStat, _setMapStat] = useState<MapContainerProps>({
    zoom: 10,
    crs: EPSG5181,
    scrollWheelZoom: true,
    style: { width: "100%", height: "100vh" },
    preferCanvas: true,
    worldCopyJump: false,
  });

  const [tileLayer, _setTileLayer] = useState<TileLayerOptions>({
    minZoom: 0,
    maxZoom: 13,
    zoomReverse: true,
    zoomOffset: 1,
    subdomains: "0123",
    tms: true,
  });

  const MarkerHandler = () => {
    useMapEvents({
      click: (e) => {
        if (!mapMoveOption?.isClickMaker) {
          return;
        }
        setCurrentLocation(e.latlng);
      },
      moveend: (e) => {
        if (!mapMoveOption?.isMarkerCenter) {
          return;
        }
        setCurrentLocation(e.target.getCenter());
      },
      zoomend: (e) => {
        if (!mapMoveOption?.isZoomCenter) {
          return;
        }
        setCurrentLocation(e.target.getCenter());
      },
    });

    return (
      <Marker position={currentLocation} icon={defaultIcon}>
        <Popup>카카오 Tile Map 현재위치</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={position} {...mapStat}>
      <TileLayer
        {...tileLayer}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url='https://map{s}.daumcdn.net/map_2d/1807hsm/L{z}/{y}/{x}.png'
        url="https://mts.daumcdn.net/api/v1/tile/PNG02/v05_5ho1k/latest/{z}/{y}/{x}.png"
      />
      {hasCurrentLocationMarker && <MarkerHandler />}
      {markers &&
        markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={marker.iconOptions ? L.icon({ ...defaultIcon, ...marker.iconOptions }) : defaultIcon}>
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
