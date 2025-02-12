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

export default function VworldTileMap(props: MapComponentProps) {
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

  const [mapStat, _setMapStat] = useState<MapContainerProps>({
    zoom: 15,
    crs: L.CRS.EPSG3857,
    scrollWheelZoom: true,
    style: { width: "100%", height: "100vh" },
    preferCanvas: true,
    worldCopyJump: false,
  });

  const [tileLayer, _setTileLayer] = useState<TileLayerOptions>({
    minZoom: 0,
    maxZoom: 20,
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
        <Popup>V-world Tile Map 현재위치</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={position} {...mapStat}>
      <TileLayer
        {...tileLayer}
        url="http://api.vworld.kr/req/wmts/1.0.0/7AD840FC-EA81-3277-BFCB-B3740AE78946/Base/{z}/{y}/{x}.png"
        attribution='&copy; <a href="http://www.vworld.kr/">V-World</a>'
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
