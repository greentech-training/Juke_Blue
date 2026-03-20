// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function HeroSection({
//   previewClip,   // teaser video
//   fullVideo,     // full video with sound
//   title,         // heading
//   description,   // paragraph text
//   buttonText     // CTA button
// }) {
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [readyToPlay, setReadyToPlay] = useState(false);
//   const clipRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     clipRef.current?.play();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = showPlayer ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [showPlayer]);

//   const handleShowPlayer = () => {
//     setShowPlayer(true);
//     setReadyToPlay(true);
//   };

//   const handlePlay = () => {
//     if (playerRef.current) {
//       playerRef.current.muted = false;
//       playerRef.current.play();
//     }
//   };

//   return (
//     <section className="relative min-h-screen overflow-hidden">
//       <video
//         ref={clipRef}
//         autoPlay
//         muted
//         loop
//         className="absolute inset-0 -z-30 w-full h-full object-cover brightness-75"
//       >
//         <source src={previewClip} type="video/mp4" />
//       </video>

//       <div className="relative z-10 px-4 max-w-4xl mx-auto py-16 flex flex-col justify-center items-center min-h-screen text-center">
//         <p className="font-title text-xl md:text-3xl text-antique mb-6 leading-relaxed">
//           {description}
//         </p>
//         <button
//           onClick={handleShowPlayer}
//           className="mt-6 px-8 py-3 text-lg bg-antique text-nautical border-2 border-nautical rounded-lg font-title shadow-md hover:bg-blush transition-all duration-200"
//         >
//           {buttonText}
//         </button>
//       </div>

//       <AnimatePresence>
//         {showPlayer && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.video
//               ref={playerRef}
//               controls
//               className="absolute inset-0 w-full h-full object-cover"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//               onCanPlay={() => readyToPlay && handlePlay()}
//             >
//               <source src={fullVideo} type="video/mp4" />
//             </motion.video>

//             {!readyToPlay && (
//               <button
//                 onClick={handlePlay}
//                 className="absolute z-50 text-white text-6xl"
//                 aria-label="Play video with sound"
//               >
//                 ▶
//               </button>
//             )}

//             <button
//               onClick={() => setShowPlayer(false)}
//               className="absolute top-20 right-4 text-white text-3xl hover:text-blush"
//               aria-label="Close"
//             >
//               ×
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Optional gold underline */}
//       <div
//         className="absolute bottom-0 left-0 w-full h-[2px] z-30 pointer-events-none"
//         style={{
//           backgroundImage: 'linear-gradient(to right, #f5e7c4, #d6b97b, #f5e7c4)',
//           boxShadow: '0 0 4px 2px rgba(245, 231, 196, 0.3)',
//           opacity: 0.8,
//         }}
//       />
//     </section>
//   );
// }


// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// // import Image from 'next/image'; // Only uncomment if you decide to use a static image for the background

// export default function HeroSection({
//   previewClip,   // This will now be your Vimeo embed URL for the preview
//   fullVideo,     // This will now be your Vimeo embed URL for the full player
//   title,
//   description,
//   buttonText
// }) {
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [readyToPlay, setReadyToPlay] = useState(false);

//   const clipRef = useRef(null); // Ref for the preview video container
//   const playerRef = useRef(null); // Ref for the full video player container

//   // For Vimeo preview, autoplay is handled by the iframe src parameters
//   // No need for a separate useEffect to call .play() on Vimeo iframes

//   // Effect to control body scroll when player is shown
//   useEffect(() => {
//     document.body.style.overflow = showPlayer ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [showPlayer]);

//   const handleShowPlayer = () => {
//     setShowPlayer(true);
//     setReadyToPlay(true); // For Vimeo, we assume it's ready once the iframe loads
//   };

//   // No separate handlePlay needed for Vimeo as autoplay is in the URL

//   return (
//     // Set to h-screen for full viewport height
//     <section className="relative h-screen overflow-hidden">
//       {/* PREVIEW BACKGROUND VIDEO (Vimeo iframe) */}
//       <div
//         ref={clipRef}
//         className="absolute inset-0 -z-30 w-full h-full brightness-75 overflow-hidden"
//         // Applying a slight transform to emulate object-cover behavior for iframe
//         // You might still need to fine-tune this for perfect alignment with the gold line
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           width: '100%',
//           height: '100%',
//           transform: 'translate(-50%, -50%) scale(1.1)' // Adjust scale as needed
//         }}
//       >
//         <iframe
//           src={`${previewClip}?autoplay=1&loop=1&muted=1&background=1&playsinline=1`}
//           frameBorder="0"
//           allow="autoplay; fullscreen; picture-in-picture"
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             minWidth: '100%',
//             minHeight: '100%',
//             width: 'auto',
//             height: 'auto',
//             transform: 'translate(-50%, -50%)',
//             pointerEvents: 'none', // Prevent interaction with background video
//           }}
//           title="Vimeo Preview Background"
//           loading="eager" // Load this quickly as it's the background
//         ></iframe>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 px-4 max-w-4xl mx-auto py-16 flex flex-col justify-center items-center min-h-screen text-center">
//         <p className="font-title text-xl md:text-3xl text-antique mb-6 leading-relaxed">
//           {description}
//         </p>
//         <button
//           onClick={handleShowPlayer}
//           className="mt-6 px-8 py-3 text-lg bg-antique text-nautical border-2 border-nautical rounded-lg font-title shadow-md hover:bg-blush transition-all duration-200"
//         >
//           {buttonText}
//         </button>
//       </div>

//       {/* Full Screen Video Player Overlay (Vimeo iframe) */}
//       <AnimatePresence>
//         {showPlayer && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               ref={playerRef} // Ref on the container div for Vimeo
//               className="w-full h-full relative flex items-center justify-center"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//             >
//               {/* Aspect ratio box for responsive Vimeo iframe */}
//               <div className="relative w-full h-full" style={{paddingBottom: '56.25%', height: 'auto', overflow: 'hidden'}}>
//                 <iframe
//                   src={`${fullVideo}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479&muted=0`}
//                   frameBorder="0"
//                   allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
//                   style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}
//                   title="Vimeo Video Player"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             </motion.div>

//             {/* No separate play button needed for Vimeo if autoplay is in URL */}

//             {/* Close button */}
//             <button
//               onClick={() => setShowPlayer(false)}
//               className="absolute top-20 right-20 right-4 text-white text-3xl hover:text-blush z-50"
//               aria-label="Close"
//             >
//               ×
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Optional gold underline */}
//       <div
//         className="absolute bottom-0 left-0 w-full h-[2px] z-30 pointer-events-none"
//         style={{
//           backgroundImage: 'linear-gradient(to right, #f5e7c4, #d6b97b, #f5e7c4)',
//           boxShadow: '0 0 4px 2px rgba(245, 231, 196, 0.3)',
//           opacity: 0.8,
//           // ✨ IMPORTANT: You will likely need to adjust 'bottom' for pixel-perfect alignment
//           // with a Vimeo background, as it's harder to control precisely.
//           // Start with something like -3px or -5px and tweak it.
//           bottom: '-3px', // Example adjustment
//         }}
//       />
//     </section>
//   );
// }

'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function getVideoId(url) {
  // Extract the video ID from https://www.youtube.com/embed/VIDEO_ID
  const parts = url.split('/');
  return parts[parts.length - 1];
}

export default function HeroSection({
  previewClip,
  fullVideo,
  title,
  description,
  buttonText
}) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [iframeStyles, setIframeStyles] = useState({});
  const clipRef = useRef(null);
  const playerRef = useRef(null);

  const videoId = getVideoId(fullVideo);

  // Load YouTube Iframe API on mount
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // On showPlayer: use the YouTube Player API to play with sound
  useEffect(() => {
    if (showPlayer && playerRef.current) {
      const iframe = playerRef.current.querySelector('iframe');
      if (!iframe) return;

      const onPlayerReady = () => {
        const player = new window.YT.Player(iframe, {
          events: {
            onReady: (event) => {
              event.target.playVideo();
            }
          }
        });
      };

      if (window.YT && window.YT.Player) {
        onPlayerReady();
      } else {
        window.onYouTubeIframeAPIReady = onPlayerReady;
      }
    }
  }, [showPlayer]);

  // For background preview: apply cover sizing
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
      });
    }
  }, []);

  useEffect(() => {
    applyCoverStyles();
    window.addEventListener('resize', applyCoverStyles);
    return () => window.removeEventListener('resize', applyCoverStyles);
  }, [applyCoverStyles]);

  // Handle background iframe restart after closing full player
  useEffect(() => {
    document.body.style.overflow = showPlayer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPlayer]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Preview Video */}
      <div
        ref={clipRef}
        className="absolute inset-0 -z-30 w-full h-full brightness-75 overflow-hidden"
      >
        <iframe
          src={`https://www.youtube.com/embed/${getVideoId(previewClip)}?autoplay=1&mute=1&loop=1&controls=0&playlist=${getVideoId(previewClip)}&modestbranding=1&rel=0&showinfo=0&playsinline=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={iframeStyles}
          title="YouTube Preview Background"
          loading="eager"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto py-16 flex flex-col justify-center items-center min-h-screen text-center">
        <p className="font-title text-xl md:text-3xl text-antique mb-6 leading-relaxed">
          {description}
        </p>
        <button
          onClick={() => setShowPlayer(true)}
          className="mt-6 px-8 py-3 text-lg bg-antique text-nautical border-2 border-nautical rounded-lg font-title shadow-md hover:bg-blush transition-all duration-200"
        >
          {buttonText}
        </button>
      </div>

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={playerRef}
              className="w-full h-full relative flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative w-full h-full" style={{ paddingBottom: '56.25%', height: 'auto', overflow: 'hidden' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0&controls=1&autoplay=1`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="YouTube Video Player"
                  allowFullScreen
                />
              </div>
            </motion.div>

            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-44 sm:top-20 right-6 sm:right-10 text-white text-5xl hover:text-blush z-50"

              aria-label="Close"
            >
              ×
            </button>
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
          //bottom: '-3px',
        }}
      />
    </section>
  );
}
