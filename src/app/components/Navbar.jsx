"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navigation bar */}
      <nav className="bg-nautical/80 backdrop-blur-sm p-4 fixed w-full z-50 border-b border-antique"> {/* Added border-b and border-antique */}
        {/* Faint gold pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-5"
             style={{
               backgroundImage: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 1px, transparent 1px)', // Faint gold dots/grain
               backgroundSize: '8px 8px', // Adjust size for desired density
               pointerEvents: 'none', // Ensures clicks pass through
             }}
        />

        <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10"> {/* Added relative z-10 */}
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src="/images/Juke_Blue_Beige.jpeg" alt="Logo" className="w-10 h-13" />
            <img src="/images/logoname.jpeg" alt="Juke Blue Text" className="h-8 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            <a href="/shop" className="text-antique hover:text-blush">SHOP</a>
            <a href="/cocktails" className="text-antique hover:text-blush">COCKTAILS</a>
            {/* <a href="/songbook" className="text-antique hover:text-blush">SONGBOOK</a> */}
            <a href="/tunes" className="text-antique hover:text-blush">TUNES</a>
            {/* <a href="/map" className="text-antique hover:text-blush">MAP</a> */}
            <a href="/taverns" className="text-antique hover:text-blush">TAVERNS</a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-antique focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay behind menu */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-40`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-16 left-0 right-0 z-50 md:hidden
          bg-nautical/95 backdrop-blur-sm
          transition-all duration-500 ease-in-out
          transform px-6 py-6 space-y-4
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"}
        `}
      >
        <a href="/shop" className="block text-antique hover:text-blush" onClick={() => setIsOpen(false)}>
          SHOP
        </a>
        <a href="/cocktails" className="block text-antique hover:text-blush" onClick={() => setIsOpen(false)}>
          COCKTAILS
        </a>
        <a href="/tunes" className="block text-antique hover:text-blush" onClick={() => setIsOpen(false)}>
          TUNES
        </a>
        <a href="/taverns" className="block text-antique hover:text-blush" onClick={() => setIsOpen(false)}>
          TAVERNS
        </a>
      </div>
    </>
  );
}

