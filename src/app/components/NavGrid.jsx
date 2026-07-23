import Link from "next/link";
import Image from "next/image";

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
    <div className="grid mt-16 grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className="group relative block w-full rounded-xl overflow-hidden bg-transparent border-none
                    transition-transform duration-300 hover:scale-105 flex flex-col"
        >
          <div className="relative w-full h-full flex-grow overflow-hidden rounded-xl">
            <Image
              src={link.image}
              alt={link.title}
              width={500}
              height={600}
              className="w-full h-full object-cover transition-transform duration-300 opacity-100"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}