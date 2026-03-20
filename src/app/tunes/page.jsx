'use client';
import React, { useState } from "react";
import HeroSection from "@/app/components/HeroSection";


const songBook = [
  {
    title: 'Rockabone Bay',
    description: 'During the darker days of Covid, Juke Blue received a divine message: travel to Greece. It wasn\'t his first heavenly directive. Years earlier, he had been instructed to create 12 songs from melodies that came to him in dreams. \'Rockabone Bay\' was the first.',
    iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=2208570031/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
    bandcampLink: 'https://jukeblue.bandcamp.com/track/rockabone-bay',
  },
  {
    title: 'Five in the Morning',
    description: 'Not being a singer, musician, or even particularly rhythmic, Juke had no idea how to turn his melodies into songs. So he sung them down the phone to producers who demanded large sums to shape them into fresh, professional, retro-sounding tracks.',
    iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=1653756306/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
    bandcampLink: 'https://jukeblue.bandcamp.com/track/five-in-the-morning',
  },
  {
    title: 'Borrowed Time',
    description: 'The production process dragged on, much to the anger of his loved ones. “My hands are tied,” Juke would explain, insisting he was only following heavenly orders. “Besides, someone in Cambodia seems to really enjoy ‘Borrowed Time.’”',
    iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=1724744053/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
    bandcampLink: 'https://jukeblue.bandcamp.com/track/borrowed-time-2',
  },
  {
    title: 'FUN-K',
    description: 'By 2021, a distinct \'Juke Blue\' sound had begun to emerge. He tagged the sound as #retrophonica on YouTube. An elderly Brazilian man commented he liked it. Two strangers sent him fan mail. That was all. Puzzled and broke, Juke started looking for a job.',
    iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=1701386430/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
    bandcampLink: 'https://jukeblue.bandcamp.com/track/fun-k',
  },
    {
    title: 'Bellissima',
    description: 'His holy work, however, was not yet finished. A new heavenly instruction arrived late one night: Go to Greece and create one final song. It would be the theme tune for a TV show celebrating Nature and life. It took some convincing, but Juke reluctantly agreed.',
    iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=334099159/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
    bandcampLink: 'https://jukeblue.bandcamp.com/track/bellissima',
  },
  {
    title: 'Atlantic City',
    description: '“More money invested from a dwindling pile. This is terrible folly,” Juke warned. “Can’t you find someone else for this?” The answer was no. And so the tune was recorded, and its singing filmed as a pilot. The cost was considerable, leaving Juke broke. Again.',
    iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=1250004783/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
    bandcampLink: 'https://jukeblue.bandcamp.com/track/atlantic-city',
  },
  {
  title: 'Dreams and Memories',
  description: 'Standing on the shores of the Aegean Sea after the final take, Juke reflected on his life: the people he’d known, the confusion in their eyes, the dust in his own pockets. He questioned his fate. At that moment, the secret revealed itself.',
  iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=2764549222/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
  bandcampLink: 'https://jukeblue.bandcamp.com/track/dreams-and-memories',
},
{
  title: 'Silent Freeways',
  description: 'It came to him in the gentle lapping of water on the shoreline. He realized there was a magic in the sea, the land, and in people everywhere. Magic that would open the next chapter of his life. He knew what he had to do. He would bottle the essence of Nature.',
  iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=2581956710/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
  bandcampLink: 'https://jukeblue.bandcamp.com/track/silent-freeways',
},
{
  title: 'Freedom',
  description: 'But how could one capture Nature when it was by nature free? The answer lay in alchemy. To take something from the land, the waters, and humanity, and distill it into a pure spirit. A creation that would galvanize and unite people across the globe.',
  iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=2337143692/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
  bandcampLink: 'https://jukeblue.bandcamp.com/track/freedom',
},
{
  title: 'Too Young',
  description: 'The foundation of Juke Blue’s \'Double Blue\' was forming. A high-quality natural elixir made from the essence of Nature. Like a fine spirit aging in oak, the idea matured slowly, waiting for the right secret ingredient that would ultimately temper the potion’s power.',
  iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=3205049219/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
  bandcampLink: 'https://jukeblue.bandcamp.com/track/too-young',
},
{
  title: 'Do the Pelican',
  description: 'By 2025 it was found. The result? A holy tincture that can now be enjoyed pure or as a cocktail, with friends in high places or companions in low ones. A finely crafted German Doppelkorn–smooth, elemental, and imbued with a blessing known only to its makers.',
  iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=2984575013/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
  bandcampLink: 'https://jukeblue.bandcamp.com/track/do-the-pelican',
},
{
  title: 'Shadowdance',
  description: 'This commitment to Nature is captured in every bottle, a spirit crafted in harmony with the Earth. So the next time you share a drink of Double Blue, raise a glass to the unseen forces that guide you. Say “Zum Wohl”. And listen. For therein does adventure begin.',
  iframeSrc: 'https://bandcamp.com/EmbeddedPlayer/track=1316116703/size=large/bgcol=333333/linkcol=fe7eaf/tracklist=false/transparent=true/',
  bandcampLink: 'https://jukeblue.bandcamp.com/track/shadowdance',
},
];

const TunesPage = () => {
  const [showFullVideo, setShowFullVideo] = useState(false);

  return (
    <>
     {/* Hero Section */}
      
      <HeroSection
        previewClip="https://www.youtube.com/embed/wDXdBQGRkcY"
        fullVideo="https://www.youtube.com/embed/bHOr2O0oOA8"
        title="Heavenly Melodies"
        description="Twelve heavenly melodies for you to enjoy."
        buttonText="See the Juke in Action"
      />


    
    <section className="pt-32 pb-20 text-nautical" id="songbook-page">      


      {/* 🎶 Bandcamp Song List */}
      <div className="max-w-5xl mx-auto px-6">
        {songBook.map((song, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between gap-10 mb-24 ${
                !isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Text Section */}
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl font-title uppercase text-nautical mb-4">
                  {song.title}
                </h2>
                <p className="text-antique text-lg mb-4">
                  {song.description}
                </p>
                <a
                  href={song.bandcampLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-nautical text-nautical px-6 py-2 uppercase text-sm font-semibold hover:bg-nautical hover:text-blush transition-all"
                >
                  Listen on Bandcamp
                </a>
              </div>

              {/* Bandcamp Embed */}
              <div className="md:w-1/2">
                <div className=" overflow-hidden">
                  <iframe
                    style={{ border: '0', width: '100%', height: '468px' }}
                    src={song.iframeSrc}
                    seamless
                    title={`bandcamp-${index}`}
                  ></iframe>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    </>
  );
};

export default TunesPage;


