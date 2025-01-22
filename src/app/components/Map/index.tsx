"use client";
import { MapComponentProps, PositionType } from "@/types/map";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";

const defaultIconUrl = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
const defaultIconSize: [number, number] = [32, 32];
const defaultIconAnchor: [number, number] = [16, 32];

export default function Map(props: MapComponentProps) {
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
  const [subwayData, setSubwayData] = useState<any>();

  const defaultIcon = L.icon({
    iconUrl: currentIconOption?.iconUrl || defaultIconUrl,
    iconSize: currentIconOption?.iconSize || defaultIconSize,
    iconAnchor: currentIconOption?.iconAnchor || defaultIconAnchor,
  });

  const loadGeoJSON = async () => {
    const response = await fetch("/subway.geojson");
    const data = (await response.json()) as any;
    // LineString 타입 데이터 필터링
    const filteredSubwayLines = data.features
      .filter((item) => item.geometry.type === "LineString")
      .map((item) => ({
        coordinates: item.geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]), // 좌표 변환
        color: item.properties.colour,
      }));
    setSubwayData(filteredSubwayLines);
  };

  useEffect(() => {
    loadGeoJSON();
  }, []);

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
        <Popup>open street map Tile Map 현재위치</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom style={{ width: "100%", height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>'
        url="https://mt0.google.com/vt/lyrs=m&hl=ko&x={x}&y={y}&z={z}"
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasCurrentLocationMarker && <MarkerHandler />}
      {/* 노선 표시 */}
      {subwayData && subwayData.map((line, index) => <Polyline key={index} positions={line.coordinates} color={line.color} weight={3} />)}
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
