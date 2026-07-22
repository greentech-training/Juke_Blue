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
      {/* Preload background textures early so they are cache-hot when CSS applies them.
          This is the primary fix for the loading banding — images arrive before the
          CSS background-image rule fires, so there is no visible intermediate state. */}
      <head>
        <link
          rel="preload"
          href="/images/sand-background.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/vector-background.png"
          as="image"
        />
      </head>
      <body className="h-full min-h-screen bg-blush relative">

        <WelcomeGate />

        {/* Grain texture — fades in smoothly from opacity 0 over 1.8 s */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-grain bg-repeat bg-[length:55px_55px] opacity-30 mix-blend-multiply animate-grain-fade" />

        {/* Vector background — fades in with a 0.4 s delay so grain settles first */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-backgroundImage bg-repeat bg-contain bg-[position:0%_0%] opacity-15 animate-vector-fade" />

        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
