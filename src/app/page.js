// src/app/page.js
import HeroSection from './components/HeroSection'
import NavGrid from './components/NavGrid'

export default function Home() {
  return (
    /* make sure this wrapper is above backgrounds */
    <div className="relative z-10">
      <HeroSection
        previewClip="https://www.youtube.com/embed/Ccnw7chc56Q"
        fullVideo="https://www.youtube.com/embed/wH1c22sLtx0"
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
