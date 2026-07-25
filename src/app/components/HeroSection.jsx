'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection({
  previewClip,
  fullVideo,
  title,
  description,
  buttonText
}) {
  const [showPlayer, setShowPlayer] = useState(false);
  // Controls the black cover over the modal iframe — stays opaque until Bunny player finishes init
  const [coverVisible, setCoverVisible] = useState(true);
  const [useNativeVideo, setUseNativeVideo] = useState(true);
  const [iframeStyles, setIframeStyles] = useState({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    opacity: 0,
  });
  const clipRef = useRef(null);
  const coverTimerRef = useRef(null);

  const handleOpenPlayer = () => {
    setCoverVisible(true); // black cover on before iframe even mounts
    setShowPlayer(true);
    // Wait 1.5s — Bunny player fully initializes beneath the cover, then fade it away
    coverTimerRef.current = setTimeout(() => {
      setCoverVisible(false);
    }, 2000);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setCoverVisible(true);
    if (coverTimerRef.current) clearTimeout(coverTimerRef.current);
  };

  // Calculates iframe dimensions to fill container while maintaining 16:9 ratio
  const applyCoverStyles = useCallback(() => {
    if (clipRef.current) {
      const container = clipRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const videoAspectRatio = 16 / 9;

      let newIframeWidth, newIframeHeight;
      if (containerWidth / containerHeight > videoAspectRatio) {
        newIframeWidth = containerWidth;
        newIframeHeight = containerWidth / videoAspectRatio;
      } else {
        newIframeHeight = containerHeight;
        newIframeWidth = containerHeight * videoAspectRatio;
      }

      setIframeStyles({
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${newIframeWidth}px`,
        height: `${newIframeHeight}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        opacity: 1,
        transition: 'opacity 0.5s ease-in-out',
      });
    }
  }, []);

  useEffect(() => {
    applyCoverStyles();
    window.addEventListener('resize', applyCoverStyles);
    return () => window.removeEventListener('resize', applyCoverStyles);
  }, [applyCoverStyles]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showPlayer) handleClosePlayer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPlayer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => { if (coverTimerRef.current) clearTimeout(coverTimerRef.current); };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Preview Video */}
      <div
        ref={clipRef}
        className="absolute inset-0 -z-30 w-full h-full brightness-75 overflow-hidden pointer-events-none"
      >
        {useNativeVideo && (previewClip.includes('.mp4') || previewClip.includes('b-cdn.net')) ? (
          <video
            src={previewClip}
            poster="/images/video-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setUseNativeVideo(false)}
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <iframe
            tabIndex={-1}
            src={previewClip}
            frameBorder="0"
            allow="autoplay; fullscreen"
            style={{
              ...iframeStyles,
              pointerEvents: 'none',
            }}
            title="Bunny Stream Preview Background"
            loading="eager"
          />
        )}
        {/* Transparent overlay to block click/touch events on the iframe */}
        <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto py-16 flex flex-col justify-center items-center min-h-screen text-center">
        <p className="font-title text-xl md:text-3xl text-antique mb-6 leading-relaxed">
          {description}
        </p>
        <button
          onClick={handleOpenPlayer}
          className="mt-6 px-8 py-3 text-lg bg-antique text-nautical border-2 border-nautical rounded-lg font-title shadow-md hover:bg-blush transition-all duration-200"
        >
          {buttonText}
        </button>
      </div>

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex justify-center items-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePlayer}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClosePlayer();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-8 text-antique bg-nautical/80 border-2 border-antique hover:bg-blush hover:text-nautical w-12 h-12 rounded-full flex items-center justify-center text-3xl font-bold transition-all shadow-xl z-[110]"
              aria-label="Close video"
            >
              ×
            </button>

            <motion.div
              className="w-full max-w-5xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-antique/40 bg-black">
                <iframe
                  key="bunny-player-modal"
                  src={fullVideo}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="Bunny Stream Video Player"
                  allowFullScreen
                />
                {/* BLACK COVER — hides Bunny player UI during initialization, fades away after 2s */}
                <div
                  className="absolute inset-0 z-20 bg-black pointer-events-none transition-opacity duration-500 ease-in-out flex items-center justify-center"
                  style={{ opacity: coverVisible ? 1 : 0 }}
                >
                  <div className="w-10 h-10 border-4 border-antique/30 border-t-blush rounded-full animate-spin" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Line */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] z-30 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #f5e7c4, #d6b97b, #f5e7c4)',
          boxShadow: '0 0 4px 2px rgba(245, 231, 196, 0.3)',
          opacity: 0.8,
        }}
      />
    </section>
  );
}
