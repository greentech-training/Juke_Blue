const links = [
  {
    title: "SHOP",
    path: "/shop",
    image: "/images/shop.jpeg",
    
  },
  {
    title: "COCKTAILS",
    path: "/cocktails",
    image: "/images/cocktail.jpeg",
    
  },
  {
    title: "TUNES",
    path: "/tunes",
    image: "/images/tunes.jpeg",
    
  },
  {
    title: "TAVERNS",
    path: "/taverns",
    image: "/images/taverns.jpeg",
    
  }
];

export default function NavGrid() {
  return (
    <div className="grid mt-16 grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6 ">
      {links.map((link) => (
       <a
          key={link.path}
          href={link.path}
          className="group relative block w-full rounded-xl overflow-hidden bg-transparent border-none
                    transition-transform duration-300 hover:scale-105 flex flex-col"
        >
          <div className="relative w-full h-full flex-grow overflow-hidden">
            <img
              src={link.image}
              alt={link.title}
              className="w-full h-full object-cover transition-transform duration-300 opacity-100"
            />
          </div>
        </a>
      ))}
    </div>
  );
}



// const links = [
//   {
//     title: "SHOP",
//     path: "/shop",
//     image: "/images/shop.jpeg", // If this image has a frame, the shadow will surround it.

//   },
//   {
//     title: "COCKTAILS",
//     path: "/cocktails",
//     image: "/images/cocktail.jpeg", // Same here

//   },
//   {
//     title: "TUNES",
//     path: "/tunes",
//     image: "/images/tunes.jpeg", // Same here

//   },
//   {
//     title: "TAVERNS",
//     path: "/taverns",
//     image: "/images/taverns.jpeg", // Same here

//   }
// ];

// export default function NavGrid() {
//   return (
//     <div className="grid mt-16 grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6 ">
//       {links.map((link) => (
//        <a
//           key={link.path}
//           href={link.path}
//           className="group relative block w-full rounded-xl overflow-hidden bg-transparent border-none
//                     transition-transform duration-300 hover:scale-105 flex flex-col
//                     shadow-lg shadow-[rgba(0,0,0,0.4)]" // This shadow applies to the entire <a> element's boundary.
//         >
//           <div className="relative w-full h-full flex-grow overflow-hidden">
//             <img
//               src={link.image} // This image source likely contains the frame you don't want.
//               alt={link.title}
//               className="w-full h-full object-cover transition-transform duration-300 opacity-100"
//             />
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// }