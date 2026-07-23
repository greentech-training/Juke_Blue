// src/app/layout.js
import { Rye } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomeGate from './components/WelcomeGate';

// Prevent SSR environments from accidentally exposing a non-browser localStorage
if (typeof window === 'undefined' && typeof globalThis.localStorage !== 'undefined') {
  try {
    globalThis.localStorage = undefined;
  } catch {}
}

const rye = Rye({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rye',
});

export const metadata = {
  title: "Juke Blue",
  description: "Experience the deep and captivating essence of Double Blue Spirit, meticulously crafted for a smooth and memorable finish.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rye.variable} h-full`}>
      {/* Preload the vector background — grain is now an inline SVG (zero network cost) */}
      <head>
        <link
          rel="preload"
          href="/images/sand-background.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/vector-background.jpeg"
          as="image"
        />
      </head>
      <body className="h-full min-h-screen bg-blush relative">

        <WelcomeGate />

        {/* Grain texture — inline SVG, loads instantly with CSS, no network request */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-grain bg-repeat bg-[length:55px_55px] opacity-30 sm:opacity-30 mix-blend-multiply" />

        {/* Vector background */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-backgroundImage bg-repeat bg-contain bg-[position:0%_0%] opacity-15 sm:opacity-15" />

        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
