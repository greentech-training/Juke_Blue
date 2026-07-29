// src/app/page.js
import HeroSection from './components/HeroSection'
import NavGrid from './components/NavGrid'

export default function Home() {
  return (
    /* make sure this wrapper is above backgrounds */
    <div className="relative z-10">
      <HeroSection
        previewClip="/videos/On a mission from God Preview.mp4"
        fullVideo="https://www.youtube.com/embed/bHOr2O0oOA8?autoplay=1"
        title="Juke Blue | Spirits Forged by the Sea"
        description="Juke Blue's Double Blue instills the holy essence of Nature into every blessed drop.
          Its secret was revealed as he stood destitute on the shores of the Aegean Sea."
        buttonText="See how he got there →"
      />

      <section id="nav-grid" className="scroll-mt-20">
        <NavGrid />
      </section>
    </div>
  )
}
