// /src/components/LeafletMap.jsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";
import { useEffect, useRef } from "react";

const jukeBlueMarkerIcon = new L.Icon({
  iconUrl: "/images/Juke_Blue_Nautical.jpeg",
  iconSize: [50, 50],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Handles flying the map to a new center and opening the correct marker popup.
function MapRecenter({ center, activeBarId, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !center || !activeBarId) return;

    map.flyTo(center, map.getZoom(), {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    // Direct O(1) lookup via ref — no layer scanning needed
    const handleMoveEnd = () => {
      const marker = markerRefs.current[activeBarId];
      if (marker) marker.openPopup();
    };

    map.once("moveend", handleMoveEnd);

    // Clean up only the specific listener we added
    return () => map.off("moveend", handleMoveEnd);
  }, [center, activeBarId, map, markerRefs]);

  return null;
}

export default function LeafletMap({ bars, center, zoom, activeBarId }) {
  const markerRefs = useRef({});

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {bars.map((bar) => (
        <Marker
          key={bar.id}
          position={bar.coordinates}
          icon={jukeBlueMarkerIcon}
          ref={(el) => (markerRefs.current[bar.id] = el)}
        >
          <Popup
            className="custom-popup"
            autoPanPadding={[50, 50]}
            autoPan={true}
          >
            <div className="font-sans text-nautical p-2 max-w-full sm:max-w-none mx-auto">
              {bar.image && (
                <div className="w-full h-28 relative mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={bar.image}
                    alt={bar.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <h3 className="font-title text-xl text-blush mb-1">{bar.name}</h3>
              <p className="text-base mb-1">{bar.address}</p>
              <p className="text-sm font-semibold text-blush mb-2">{bar.type}</p>
              {bar.description && (
                <p className="text-sm italic border-t border-nautical/10 pt-2">
                  {bar.description}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <MapRecenter center={center} activeBarId={activeBarId} markerRefs={markerRefs} />
    </MapContainer>
  );
}