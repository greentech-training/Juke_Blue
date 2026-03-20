// /src/components/LeafletMap.jsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";
import { useEffect, useRef } from "react";

// Custom marker icon:
const jukeBlueMarkerIcon = new L.Icon({
  iconUrl: "/images/Juke_Blue_Nautical.jpeg", // Path to your Juke logo
  iconSize: [50, 50], // Adjust size if your logo is too big/small
  iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location (bottom-center)
  popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
});

function MapRecenter({ center, bars }) {
  const map = useMap();
  const popupOpenedRef = useRef(false); // To prevent multiple openings on the same flyTo

  useEffect(() => {
    if (map && center) {
      // Reset the ref when the center changes to allow a new popup opening
      popupOpenedRef.current = false;

      // Ensure the map pans/flies to the new center
      map.flyTo(center, map.getZoom());

      // Find the bar that matches the new center coordinates
      const targetBar = bars.find(
        (bar) =>
          bar.coordinates[0] === center[0] && bar.coordinates[1] === center[1]
      );

      if (targetBar) {
        // Wait for the map to finish moving before opening the popup
        // This gives Leaflet time to calculate proper auto-panning.
        const openPopupOnMoveEnd = () => {
          if (popupOpenedRef.current) return; // Prevent double opening

          map.eachLayer((layer) => {
            if (
              layer instanceof L.Marker &&
              layer.getLatLng().lat === targetBar.coordinates[0] &&
              layer.getLatLng().lng === targetBar.coordinates[1]
            ) {
              layer.openPopup();
              popupOpenedRef.current = true; // Mark as opened
            }
          });
          // Remove the event listener after it has fired once
          map.off('moveend', openPopupOnMoveEnd);
        };

        // Add the event listener. `once` means it will only fire one time.
        map.once('moveend', openPopupOnMoveEnd);
      }
    }
    // Cleanup: remove the event listener if the component unmounts or dependencies change
    return () => {
      map.off('moveend'); // Remove any lingering moveend listeners
    };
  }, [center, map, bars]);
  return null;
}

export default function LeafletMap({ bars, center, zoom }) {
  const markerRefs = useRef({});

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
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
            autoPanPadding={[50, 50]} // Increased padding slightly for more buffer if needed
            // autoPan: true is often the default, but explicitly setting it can't hurt.
            autoPan={true}
          >
            <div className="font-sans text-nautical p-2 max-w-full sm:max-w-none mx-auto">
                {bar.image && (
                  <div className="w-full h-24 max-[400px]:h-20 sm:h-40 md:h-48 relative mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={bar.image}
                      alt={bar.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
              )}
              <h3 className="font-title text-xl text-blush mb-1">
                {bar.name}
              </h3>
              <p className="text-base mb-2">{bar.address}</p>
              <p className="text-sm italic">
                Here you can find a special signature drink created by{" "}
                <span className="font-bold">{bar.ownerSignatureDrink}</span>.
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      <MapRecenter center={center} bars={bars} />
    </MapContainer>
  );
}