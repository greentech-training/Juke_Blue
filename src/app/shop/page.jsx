"use client";
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- UPDATED PRODUCT DATA TO MATCH DISTILLERY ---
const MOCK_DOUBLE_BLUE_PRODUCT = {
  id: 1001,
  name: "Double Blue",
  price: "23.90",
  abv: "38%",
  vol: "500ml",
  short_description: "<p>Experience the deep and captivating essence of Double Blue Spirit, meticulously crafted for a smooth and memorable finish.</p><p>This premium spirit delivers a smooth and sophisticated taste, perfect for savoring on its own or as the foundation for exquisite cocktails. Crafted with dedication to quality.</p>",
  images: [{ src: '/images/DoubleBlue.jpeg' }],
  stock_status: "instock",
  stock_quantity: 99,
  // Add distillery product URL
  distillery_url: "https://dwersteg.de/collections/partner-editions/products/juke-blue-double-blue-doppelkorn-38"
};
// --- END PRODUCT DATA ---

export default function ShopPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => {
    if (product && product.price) {
      return parseFloat(product.price) * quantity;
    }
    return 0;
  }, [product, quantity]);

  useEffect(() => {
    try {
      setProduct(MOCK_DOUBLE_BLUE_PRODUCT);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleIncreaseQuantity = () => {
    if (product && quantity >= product.stock_quantity) return;
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleBuyNow = () => {
    if (!product || product.stock_status !== 'instock') {
      alert("This product is currently unavailable or out of stock.");
      return;
    }
    
    // Redirect to distillery product page with quantity parameter
    const distilleryUrl = new URL(product.distillery_url);
    distilleryUrl.searchParams.set('quantity', quantity);
    window.location.href = distilleryUrl.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-nautical animate-pulse">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-500 text-xl mb-4">Error: {error || 'Product not available'}</p>
      </div>
    );
  }

  const imageUrl = product.images?.[0]?.src || null;
  const imageAlt = product.name || 'Product Image';
  const isInStock = product.stock_status === 'instock';

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:pt-32">

      {/* Right Section (Image) */}
      <div className="flex-1 flex justify-center items-center p-4 mt-0 lg:mt-8 w-full hover:scale-105 transition-transform duration-300">
        {imageUrl ? (
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Layer 1 – Nautical */}
            <div className="rounded-3xl bg-nautical p-[6px] shadow-xl">
              {/* Layer 2 – Antique */}
              <div className="rounded-3xl bg-antique p-[6px]">
                {/* Layer 3 – Blush */}
                <div className="rounded-3xl bg-blush p-[6px]">
                  {/* Image container */}
                  <div className="relative h-[24rem] sm:h-[24rem] md:h-[28rem] lg:h-[40rem] xl:h-[48rem] rounded-2xl overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="transition-transform duration-300"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-60 h-80 flex items-center justify-center text-nautical/50 text-xl">
            No Image Available
          </div>
        )}
      </div>

      {/* Left Section (Text) */}
      <div className="flex-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-0 lg:p-4">
        <h1 className="font-title text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-nautical mb-2 leading-none whitespace-nowrap">
          JUKE BLUE
        </h1>
        <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl text-antique/80 mb-2 uppercase tracking-wider">
          {product.name}
        </h2>

        {/* ABV Line */}
        <p className="text-antique/80 text-sm sm:text-base mb-6 tracking-wide uppercase">
          {product.abv} vol | {product.vol} 
        </p>

        <div className="w-24 h-1 bg-nautical mb-8 rounded-full"></div>

        {/* Price + Includes VAT plus Shipping */}
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
          {new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
          }).format(totalPrice)}
          <span className="text-sm text-white/70 block sm:inline sm:ml-3 font-normal mt-1 sm:mt-0">
            Includes VAT plus{" "}
            <Link
              href="/payment-shipping"
              className="underline hover:text-blush transition-colors"
            >
              Shipping
            </Link>
          </span>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-3 mb-8 w-full max-w-md mx-auto lg:mx-0 text-center lg:text-left">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-white/70 font-medium">
            Buy direct from the distillery
          </span>

          <button
            onClick={handleBuyNow}
            disabled={!isInStock || quantity < 1}
            className={`px-10 py-3 rounded-lg transition-all duration-200 font-title text-base sm:text-lg lg:text-xl uppercase tracking-wider shadow-lg w-full sm:w-auto ${
              isInStock && quantity > 0
                ? 'bg-nautical text-antique hover:bg-blush hover:text-nautical hover:scale-[1.02]'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
          >
            {isInStock ? 'Buy Now' : 'Sold Out'}
          </button>
        </div>


        {!isInStock && (
          <p className="text-red-500 text-sm mt-2 text-left w-full sm:w-auto">Currently out of stock.</p>
        )}

        {/* <p className="text-nautical/70 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-4 text-left">
          After selecting your amount and clicking <br /> "BUY NOW," you'll be taken to our trusted partner distillery's store to complete your order.
        </p>
        <div className="w-full text-left max-w-md mx-auto lg:mx-0">
          <p className="text-nautical/70 text-sm sm:text-base leading-relaxed mb-4">
            Shipping typically takes 3-5 working days.
          </p>
        </div> */}

        <p className="text-nautical/70 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-4 text-left">
        Order Double Blue from the online shop at our partner distillery{" "}
          <a href="https://dwersteg.de/collections/partner-editions/products/juke-blue-double-blue-doppelkorn-38?quantity=1" className="text-antique underline hover:text-blush transition-colors">
            Dwersteg.
          </a>
        </p>
        <p className="text-nautical/70 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 text-left">
           We deliver anywhere in Europe and shipping typically takes 3-5 working days. Bulk trade and retail orders can be placed via{" "}
            <a href="mailto:info@dwersteg.de" className="text-antique underline hover:text-blush transition-colors">
               info@dwersteg.de.
          </a>
        </p>
      </div>
    </div>
  );
}