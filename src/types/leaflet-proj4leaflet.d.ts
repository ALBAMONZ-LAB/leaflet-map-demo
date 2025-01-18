import * as L from 'leaflet';
import {Bounds, LatLng, LatLngExpression, LatLngLiteral, Point, PointExpression} from "leaflet";

declare module 'leaflet' {
    namespace Proj {
        class CRS extends L.CRS {
            constructor(code: string, proj4def: string, options?: any);
            latLngToPoint(latlng: L.LatLng, zoom: number): L.Point;
            pointToLatLng(point: L.Point, zoom: number): L.LatLng;
            project(latlng: L.LatLng): L.Point;
            unproject(point: L.Point): L.LatLng;
            scale(zoom: number): number;
            zoom(scale: number): number;
            getProjectedBounds(zoom: number): L.Bounds;
            distance(latlng1: L.LatLng, latlng2: L.LatLng): number;
            wrapLatLng(latlng: L.LatLng): L.LatLng;

            code?: string | undefined;
            wrapLng?: [number, number] | undefined;
            wrapLat?: [number, number] | undefined;
            infinite: boolean;
        }
    }
}
