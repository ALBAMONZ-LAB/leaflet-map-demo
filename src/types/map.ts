import { IconOptions } from "leaflet";

export interface PositionType {
  lat: number;
  lng: number;
}

export interface CustomArrayMarkersType {
  position: PositionType;
  popupText?: string;
  iconOptions?: IconOptions;
}
export interface MapMoveOptionType {
  /** current location center marker */
  isMarkerCenter?: boolean;
  /** click marker */
  isClickMaker?: boolean;
  /** zoom center maker */
  isZoomCenter?: boolean;
}

export interface MapComponentProps {
  /** map latitude and longitude */
  position?: PositionType;
  /** custom styles */
  className?: string;
  /** zoom level */
  zoom?: number;
  /** current Location Marker */
  hasCurrentLocationMarker?: boolean;
  /** current icon option */
  currentIconOption?: IconOptions;
  /** markerOption */
  mapMoveOption?: MapMoveOptionType;
  /** array markers */
  markers?: CustomArrayMarkersType[];
}
