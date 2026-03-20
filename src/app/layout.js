// src/app/layout.js
import { Rye } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomeGate from './components/WelcomeGate';

// Ensure server-side environment does not expose a non-browser localStorage
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rye.variable} h-full`}>
      <head />
      <body className="h-full min-h-screen bg-blush relative">

        <WelcomeGate />

        {/* Finer grain texture with original higher opacity */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-grain bg-repeat bg-[length:55px_55px] opacity-30 sm:opacity-30 mix-blend-multiply" />

        {/* Background image with stronger visibility */}
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
