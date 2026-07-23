// /src/app/taverns/page.jsx
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

const LeafletMap = dynamic(
  () => import("../components/LeafletMap").then((mod) => mod.default),
  { ssr: false }
);

// Static data outside component — never recreated on re-render
const bars = [
  {
    id: 1,
    name: "Schnapphahn",
    address: "Dresdener Strasse 14, 10999 Berlin",
    coordinates: [52.500873, 13.417224],
    type: "Stockist",
    description: "Enjoy a glass or buy a bottle of Juke here.",
    image: "/images/schnapphahn-bar.jpeg",
  },
  {
    id: 2,
    name: "Piris",
    address: "Boddinstraße 61, 12053 Berlin-Bezirk Neukölln",
    coordinates: [52.480710, 13.433229],
    type: "Stockist",
    description: "Take a shot of the Juke at Piri's bar.",
    image: "/images/piris-bar.jpeg",
  },
  {
    id: 3,
    name: "Cake bar",
    address: "Mariannenstraße 27, 10999 Berlin-Bezirk Friedrichshain-Kreuzberg",
    coordinates: [52.5000, 13.4210],
    type: "Signature cocktail",
    description: "Taste the Morning Sun here.",
    image: "/images/cake_bar.webp",
  },
  {
    id: 4,
    name: "Nuovo Paladin",
    address: "Fischerhüttenstraße 67, Berlin - Zehlendorf, 14163",
    coordinates: [52.44093, 13.24327],
    type: "Stockist",
    description: "Enjoy the Juke as a digestif here.",
    image: "/images/nuovo_paladin.webp",
  },
  {
    id: 5,
    name: "Edeka (Zahl)",
    address: "Fischerhüttenstraße 68, 14163 Berlin",
    coordinates: [52.44105, 13.24315],
    type: "Stockist",
    description: "Buy a bottle of the Juke here.",
    image: "/images/edeka_zahl.webp",
  },
  {
    id: 6,
    name: "La Brezza",
    address: "Weserstr. 16, 12047 Berlin",
    coordinates: [52.4828, 13.4357],
    type: "Signature cocktail",
    description: "Get yourself on the Silent Freeways here.",
    image: "/images/la_brezza.webp",
  },
  {
    id: 7,
    name: "Kek Bar",
    address: "Oranienstraße 31, 10999 Berlin",
    coordinates: [52.5015144, 13.4189389],
    type: "Signature cocktail",
    description: "Take a little Borrowed Time here.",
    image: "/images/kek_bar.webp",
  },
  {
    id: 8,
    name: "Silent Jazz Bar",
    address: "Naumannstraße 3, 10829 Berlin",
    coordinates: [52.482, 13.352],
    type: "Stockist",
    description: "Listen to live tunes on headphones with the Juke here.",
    image: "/images/silent_jazz_bar.webp",
  },
  {
    id: 9,
    name: "Mokka Mitte Bar",
    address: "Stadtbahnbogen 159 & 160, 10178 Berlin-Mitte",
    coordinates: [52.5209, 13.3985],
    type: "Stockist",
    description: "Enjoy a shot by the shoreline here.",
    image: "/images/mokka_mitte_bar.webp",
  },
];

const initialCenter = [52.500873, 13.417223];

function getZoomForWidth(width) {
  if (width < 640) return 15;
  if (width < 1024) return 16;
  return 17;
}

export default function MapPage() {
  const [initialZoom, setInitialZoom] = useState(17);
  const [activeBarId, setActiveBarId] = useState(null);

  // Responsive zoom — updates on window resize and device rotation
  useEffect(() => {
    const update = () => setInitialZoom(getZoomForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Derive the map center from the active bar ID — no float comparison needed
  const activeBarCenter = useMemo(() => {
    if (!activeBarId) return initialCenter;
    const bar = bars.find((b) => b.id === activeBarId);
    return bar ? bar.coordinates : initialCenter;
  }, [activeBarId]);

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 relative">
      {/* Local grain overlay — intentionally inactive. Original code had a typo (bg-grainz) so it never rendered.
          The site-wide grain in layout.js already covers this page. Uncomment and fix to 'bg-grain' if a
          stronger local grain effect is ever needed here. */}
      {/* <div className="absolute inset-0 bg-grain bg-cover bg-center opacity-20 z-0" /> */}

      {/* Decorative frame container */}
      <div className="relative w-full max-w-[1050px] mx-auto mb-8 sm:mb-14 lg:mb-20 mt-16 sm:mt-20 lg:mt-24 aspect-[1.6/1] lg:aspect-[1.9/1]">
        <Image
          src="/images/frame-map.jpeg"
          alt="Decorative frame for title"
          fill
          className="object-contain object-center z-0"
        />
        <h1 className="font-title text-xl sm:text-3xl md:text-4xl lg:text-[37px] text-nautical text-center leading-tight absolute inset-0 flex items-center justify-center px-[50px] py-[30px] sm:px-[120px] sm:py-[60px] lg:px-[350px] lg:py-[100px] sm:text-shadow-default z-10">
          Find the Juke
        </h1>
      </div>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 bg-nautical p-6 rounded-3xl shadow-xl border-4 border-antique h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px] flex flex-col">
          <h2 className="font-title text-3xl text-antique text-center mb-6 text-shadow-default">
            Locations
          </h2>
          <ul className="flex-grow overflow-y-auto pr-1 select-none custom-scrollbar">
            {bars.map((bar) => (
              <li
                key={bar.id}
                className={`p-4 rounded-lg mb-4 cursor-pointer transition-all duration-300 border-l-4 border ${
                  activeBarId === bar.id
                    ? 'bg-blush/50 border-l-nautical border-nautical'
                    : 'bg-antique border-l-transparent border-nautical hover:bg-[rgba(198,140,175,0.4)]'
                }`}
                onClick={() => setActiveBarId(bar.id)}
              >
                <h3 className="font-title text-xl text-nautical font-bold">
                  {bar.name}
                </h3>
                <p className="font-sans text-base text-nautical">{bar.address}</p>
                <p className="font-sans text-sm italic text-blush mt-2">
                  <span className="font-bold">{bar.type}</span>
                </p>
                {bar.description && (
                  <p className="font-sans text-sm text-nautical/80 mt-1">
                    {bar.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hint — no hover on touch, so tell users the list is interactive */}
        <p className="lg:hidden text-center text-xs text-nautical/60 italic -mt-2">
          Tap a location above to move the map ↑
        </p>

        {/* Map */}
        <div className="w-full lg:w-2/3 h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl border-4 border-nautical flex-grow">
          <LeafletMap
            bars={bars}
            center={activeBarCenter}
            zoom={initialZoom}
            activeBarId={activeBarId}
          />
        </div>
      </div>

      <div className="text-center mt-12 sm:mt-16 mb-8 relative z-10">
        <Link
          href="/cocktails"
          className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 text-lg bg-antique text-nautical border-2 border-nautical rounded-lg font-title shadow-md hover:bg-blush transition-all duration-200"
        >
          <span>Check the Cocktails</span>
        </Link>
      </div>
    </div>
  );
}