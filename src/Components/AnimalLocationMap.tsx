import * as React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* 
  Leaflet does not configure marker icons by default when used inside react.
  See https://stackoverflow.com/a/51222271

*/
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: new L.Point(12, 41), // Center the icon at bottom center
});

L.Marker.prototype.options.icon = DefaultIcon;

interface IProps {
  lat: number;
  lng: number;
  className: string;
}

function AnimalLocationMap({ lat, lng, className }: IProps) {
  return (
    <Map center={{ lat, lng }} zoom={15} className={className}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={{ lat, lng }}
        onclick={() => {
          window.open(
            `http://maps.google.com/maps?q=loc:${lat},${lng}`
          );
        }}
      ></Marker>
    </Map>
  );
}

export default AnimalLocationMap;