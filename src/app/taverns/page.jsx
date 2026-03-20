// /src/app/taverns/page.jsx
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import Image from 'next/image';

// Dynamically import LeafletMap with no SSR:
const LeafletMap = dynamic(
  () => import("../components/LeafletMap").then((mod) => mod.default),
  { ssr: false }
);

export default function MapPage() {
  const bars = [
    {
      id: 1,
      name: "Schnapphahn",
      address: "Dresdener Strasse 14, 10999 Berlin",
      coordinates: [52.500873, 13.417224],
      ownerSignatureDrink: "Stockist",
      image: "/images/schnapphahn-bar.jpeg"
    },
    {
      id: 2,
      name: "Nachtvogel",
      address: "Oranienstrasse 39, 10999 Berlin",
      coordinates: [52.5019685, 13.417207],
      ownerSignatureDrink: "Aslan",
      image: "/images/nachtvogel-bar.jpeg"
    },
    {
      id: 3,
      name: "Piri’s Bar and Diner",
      address: "Boddinstraße 61, 12053 Berlin",
      coordinates: [52.480710, 13.433229],
      ownerSignatureDrink: "Jules",
      image: "/images/piris-bar.jpeg"
    }
    
    // ...add more bars if needed to test pagination
  ];

  const initialCenter = [52.500873, 13.417223]; // Berlin center
  const getInitialZoom = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 640) return 15; // mobile (tailwind 'sm' breakpoint)
    if (window.innerWidth < 1024) return 16; // tablet
  }
    return 17; // default for desktop
  };

  const [initialZoom, setInitialZoom] = useState(17);

  useEffect(() => {
    setInitialZoom(getInitialZoom());
  }, []);


  const [activeBarCenter, setActiveBarCenter] = useState(initialCenter);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of bars to display per page

  // Calculate bars for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBars = useMemo(() =>
    bars.slice(indexOfFirstItem, indexOfLastItem),
    [bars, indexOfFirstItem, indexOfLastItem]
  );

  const totalPages = Math.ceil(bars.length / itemsPerPage);

  const handleBarListItemClick = (coords) => {
    setActiveBarCenter(coords);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent going out of bounds
    setCurrentPage(pageNumber);
    // Optionally, reset map view or highlight first bar on new page
    // For now, it will just re-render the list. The map center will remain unless a bar is clicked.
  };

  // Generate page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 relative">
      <div className="absolute inset-0 bg-grainz bg-cover bg-center opacity-20 z-0" />
      {/* This div is EXCLUSIVELY for the large frame, allowing it to span wider */}
      <div className="relative w-full max-w-[1050px] mx-auto mb-20 mt-24 aspect-[1.6/1] lg:aspect-[1.9/1]">{/* Frame container */}
        {/* The frame image as a background */}
        <Image
          src="/images/frame-map.jpeg" // Verify this path!
          alt="Decorative frame for title"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          className="z-0"
        />

        {/* The title text, positioned absolutely over the frame */}
        <h1 className="font-title text-xl sm:text-3xl md:text-4xl lg:text-[37px] text-nautical text-center leading-tight absolute inset-0 flex items-center justify-center px-[50px] py-[30px] sm:px-[120px] sm:py-[60px] lg:px-[350px] lg:py-[100px] sm:text-shadow-default z-10">
          Find the Juke
        </h1>
      </div>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Sidebar with bar list */}
        <div className="w-full lg:w-1/3 bg-nautical p-6 rounded-3xl shadow-xl border-4 border-antique overflow-y-auto max-h-[400px] lg:max-h-[800px] mb-8 lg:mb-0 flex flex-col"> {/* Added flex-col */}
          <h2 className="font-title text-3xl text-antique text-center mb-6 text-shadow-default">
            Locations
          </h2>
          <ul className="flex-grow"> {/* Added flex-grow to ul */}
            {currentBars.map((bar) => ( // Use currentBars for pagination
              <li
                key={bar.id}
                className="bg-antique p-4 rounded-lg mb-4 cursor-pointer hover:bg-[rgba(198,140,175,0.7)] transition-all duration-300 border border-nautical"
                onClick={() => handleBarListItemClick(bar.coordinates)}
              >
                <h3 className="font-title text-xl text-nautical">
                  {bar.name}
                </h3>
                <p className="font-sans text-base text-nautical">
                  {bar.address}
                </p>
                <p className="font-sans text-sm italic text-blush mt-2">
                    {bar.ownerSignatureDrink === "Stockist" ? (
                      <span className="font-bold">
                        {bar.ownerSignatureDrink}
                      </span>
                    ) : (
                      <>
                        Signature drink by:{" "}
                        <span className="font-bold">
                          {bar.ownerSignatureDrink}
                        </span>
                      </>
                    )}

                </p>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && ( // Only show pagination if more than one page
            <nav className="mt-6 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-antique text-nautical rounded-lg hover:bg-blush disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 rounded-lg font-sans text-sm ${
                    currentPage === number
                      ? "bg-blush text-antique"
                      : "bg-antique text-nautical hover:bg-[rgba(198,140,175,0.7)]"
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-antique text-nautical rounded-lg hover:bg-blush disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
              >
                Next
              </button>
            </nav>
          )}
        </div>

        {/* Map area (dynamically loaded) */}
      <div className="w-full lg:w-2/3 h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl border-4 border-nautical flex-grow">
          {/* LeafletMap is client-only because of ssr: false */}
          <LeafletMap bars={bars} center={activeBarCenter} zoom={initialZoom} />
        </div>
      </div>

      <div className="text-center mt-12 sm:mt-16 relative z-10">
        <Link
          href="/cocktails"
          className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 text-lg bg-antique text-nautical border-2 border-nautical rounded-lg font-title shadow-md hover:bg-blush transition-all duration-200"
        >
          <span className="">Check the Cocktails</span>
        </Link>
      </div>
    </div>
  );
}