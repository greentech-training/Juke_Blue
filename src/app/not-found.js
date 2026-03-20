// src/app/not-found.js
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
      {/* Mermaid Illustration */}
      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/images/DoubleBlue.jpeg"
          alt="Our Double Blue Spirit"
          fill
          className="object-contain"
        />
      </div>

      {/* Message */}
      <div className="max-w-2xl">
        <h1 className="font-title text-5xl md:text-7xl text-nautical mb-6">
          404: Lost at Sea
        </h1>
        <p className="text-2xl md:text-3xl text-antique mb-8 leading-relaxed">
          Seems you have drifted into some uncharted waters.
          Why not have a drink?
        </p>
        
        {/* Shop Link */}
        <Link
          href="/shop"
          className="inline-block px-8 py-4 bg-blush text-nautical rounded-full 
                     font-title text-xl tracking-wider shadow-lg hover:scale-105 
                     hover:bg-[rgba(198,140,175,0.7)] transition-all duration-300 border-2 border-nautical/30"
        >
          Visit the Rum Cove →
        </Link>
        
        {/* Navigation Options */}
        {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            ['Home', '/'],
            ['Cocktails', '/cocktails'],
            ['Map', '/map']
          ].map(([title, url]) => (
            <Link
              key={url}
              href={url}
              className="px-4 py-3 bg-nautical/20 text-antique rounded-lg 
                         hover:bg-blush/30 transition-colors border border-nautical/30"
            >
              {title}
            </Link>
          ))}    
        </div> */}

          {/* ----------------- */}
      </div>
    </div>
  );
}