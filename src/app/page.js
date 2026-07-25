// src/app/page.js
import HeroSection from './components/HeroSection'
import NavGrid from './components/NavGrid'

export default function Home() {
  return (
    /* make sure this wrapper is above backgrounds */
    <div className="relative z-10">
      <HeroSection
        previewClip="/videos/On a mission from God Preview.mp4"
        fullVideo="https://iframe.mediadelivery.net/embed/712893/d0b939b6-7a8b-4117-b7d2-4736c2021d08?autoplay=true&loop=false&muted=false&preload=true&primaryColor=c68caf"
        title=""
        description="Juke Blue's Double Blue instills the holy essence of nature into every blessed drop.
          Its secret was revealed as he stood destitute on the shores of the Aegean Sea."
        buttonText="See how he got there →"
      />

      <section id="nav-grid" className="scroll-mt-20">
        <NavGrid />
      </section>
    </div>
  )
}
