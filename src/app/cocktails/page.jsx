// src/app/cocktails/page.jsx
import Image from 'next/image';
import Link from 'next/link';

export default function GrandCocktailsPage() {
  const cocktails = [
    {
      name: "Borrowed Time",
      tagline: "Enjoy it while it lasts.",
      image: {
        src: "/images/BorrowedTime.jpeg", // Remember to place your images here
        alt: "A vibrant blue cocktail with a lemon slice and a splash of pineapple juice, evoking a tropical lagoon."
      },
      ingredients: [
        "1 shot of Double Blue",
        "1 shot of Blue Lagoon syrup",
        "1 shot of freshly squeezed lemon juice",
        "½ shot of freshly squeezed lime juice",
        "Pineapple juice"
      ],
      instructions: [
        "Combine all ingredients (except pineapple juice) with ice in a shaker.",
        "Shake vigorously until well chilled.",
        "Strain into a tall glass filled with fresh ice.",
        "Top with a generous splash of pineapple juice and garnish with a citrus wheel."
      ]
    },
    {
      name: "The Pelican",
      tagline: "Do the Pelican. This is how it goes.",
      image: {
        src: "/images/ThePelican.jpeg", // Remember to place your images here
        alt: "A deep reddish-orange cocktail with visible muddled cherries at the bottom, garnished with an orange peel."
      },
      ingredients: [
        "1 shot of Amaretto",
        "1 shot of Double Blue", // Assumed 'Double Blue' replaces 'Korn' for consistency
        "10 fresh cherries",
        "1 shot of freshly squeezed lemon juice",
        "10ml simple syrup",
        "Orange juice"
      ],
      instructions: [
        "Gently muddle the fresh cherries in the bottom of your serving glass.",
        "Add Amaretto, Double Blue, lemon juice, and simple syrup to the glass.",
        "Stir well to combine the ingredients.",
        "Fill the glass with ice.",
        "Top generously with orange juice and stir once more. Garnish with an orange slice or cherry."
      ]
    },
    {
      name: "Rockabone Bay",
      tagline: "A delight for summer lovers.",
      image: {
        src: "/images/5AM.jpeg", // Remember to place your images here
        alt: "A clear, serene cocktail with fresh sprigs of rosemary, lavender, and sage, suggesting a morning mist."
      },
      ingredients: [
        "1 shot of Double Blue", // Assumed 'Double Blue' replaces 'Korn' for consistency
        "½ shot of elderflower syrup",
        "1 shot of freshly squeezed lemon juice",
        "Splash of soda water or tonic",
        "Fresh sprigs of rosemary, lavender, and sage"
      ],
      instructions: [
        "In a shaker, combine Double Blue, elderflower syrup, lemon juice, and the fresh herbs with ice.",
        "Shake gently to infuse the herbal notes.",
        "Double strain into a chilled coupe or highball glass over fresh ice.",
        "Top with soda water or tonic water for effervescence. Garnish with an additional herb sprig."
      ]
    }
  ];

  return (
    <div className=""> {/* Main page background - this can be full width */}

      {/* This div is EXCLUSIVELY for the large frame, allowing it to span wider */}
      <div className="relative w-full max-w-[1100px] mx-auto mt-36 aspect-[1.6/1] lg:aspect-[1.9/1]">{/* Frame container */}
        {/* The frame image as a background */}
        <Image
          src="/images/frame-cocktail.jpeg" // Verify this path!
          alt="Decorative frame for title"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          className="z-0"
        />

        {/* The title text, positioned absolutely over the frame */}
      <h1 className="font-title text-xl sm:text-3xl md:text-4xl lg:text-[40px] text-nautical text-center leading-tight absolute inset-0 flex items-center justify-center px-[50px] py-[30px] sm:px-[120px] sm:py-[60px] lg:px-[350px] lg:py-[100px] sm:text-shadow-default z-10">
          Discover Juke's <br></br> personal creations <br></br> for Double Blue
        </h1>
      </div>

      {/*
        This div now wraps ONLY the content that you want to keep
        constrained to `max-w-7xl` and centered,
        which includes your cocktail cards and the navigation button.
      */}
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"> {/* Added horizontal padding for smaller screens */}

        {/* Adjusted grid for smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"> {/* Changed gap and added md:grid-cols-2 */}
            
          {cocktails.map((cocktail, index) => (
            <div
              key={index}
              className="relative bg-antique rounded-3xl shadow-xl border-4 border-nautical p-6 sm:p-8 transform hover:scale-105 transition-all duration-500 ease-in-out group" // Adjusted padding here
            >
              {/* --- Sand texture overlay --- */}
              {/* <div className="absolute inset-0 bg-grain bg-[length:200px_200px] bg-center opacity-30 rounded-2xl pointer-events-none z-0"></div> */}
              <div className="absolute inset-0 bg-grain bg-[length:70px_70px] bg-center opacity-30 rounded-2xl pointer-events-none z-0"></div>

              {/* --- End Sand texture overlay --- */}

              {/* Main content container with higher z-index */}
              <div className="relative z-10">
                {/* Cocktail Name */}
                <h2 className="font-title text-3xl sm:text-4xl text-nautical text-center mb-3 sm:mb-4 text-shadow-default mt-4 sm:mt-6"> {/* Adjusted font size and margin */}
                  {cocktail.name}
                </h2>
                <p className="font-sans text-sm sm:text-base text-nautical text-center italic mb-6 sm:mb-8">
                  {cocktail.tagline}
                </p>

                {/* Cocktail Image - Porthole effect */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8 rounded-full border-4 border-nautical overflow-hidden shadow-lg group-hover:border-blush transition-colors duration-300 z-10"> {/* Adjusted image size */}
                  <div className="absolute inset-0 rounded-full border-2 border-antique z-20"></div>
                  <Image
                    src={cocktail.image.src}
                    alt={cocktail.image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-nautical/30 mix-blend-multiply opacity-80 z-10"></div>
                </div>

                {/* Ingredients */}
                <div className="mb-6 sm:mb-8 z-10"> {/* Adjusted margin */}
                  <h3 className="font-sans text-xl sm:text-2xl text-blush font-bold mb-2 sm:mb-3 text-shadow-subtle-glow">Ingredients:</h3> {/* Adjusted font size */}
                  <ul className="list-disc list-inside text-nautical text-base sm:text-lg space-y-1 sm:space-y-2 leading-relaxed"> {/* Adjusted font size and spacing */}
                    {cocktail.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="z-10">
                  <h3 className="font-sans text-xl sm:text-2xl text-blush font-bold mb-2 sm:mb-3 text-shadow-subtle-glow">Instructions:</h3> {/* Adjusted font size */}
                  <ol className="list-decimal list-inside text-nautical text-base sm:text-lg space-y-1 sm:space-y-2 leading-relaxed"> {/* Adjusted font size and spacing */}
                    {cocktail.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div> {/* End of main content container */}

              {/* Optional: Wax seal / decorative element */}
              <div className="absolute -bottom-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-blush rounded-full flex items-center justify-center text-antique font-title text-xl sm:text-2xl border-2 border-nautical shadow-md transform group-hover:rotate-12 transition-transform duration-300 z-20"> {/* Adjusted size and position */}
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Grand Navigation Button */}
        <div className="text-center mt-16 sm:mt-20"> {/* Adjusted margin */}
          <Link href="/taverns" className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 text-lg bg-antique text-nautical border-2 border-nautical rounded-lg font-title shadow-md hover:bg-blush transition-all duration-200"> {/* Adjusted padding and font size */}
            <span className="">Find the Juke</span>
          </Link>
        </div>

      </div> {/* End of the max-w-7xl container for cards and button */}

    </div>
  );
}


