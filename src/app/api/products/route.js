// src/app/api/products/route.js
import { NextResponse } from 'next/server';

/**
 * GET /api/products
 * Server-side proxy to WooCommerce REST API.
 * Keeps consumer key/secret out of the client bundle.
 */
export async function GET(request) {
  // NEXT_PUBLIC_ prefix makes storeUrl available client-side too, but creds are server-only
  const storeUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  // Guard against missing env vars — fail fast with a clear message
  if (!storeUrl || !consumerKey || !consumerSecret) {
    console.error('Server configuration missing: WooCommerce API credentials or store URL.');
    return NextResponse.json(
      { error: 'Server configuration error: WooCommerce API credentials or store URL are not set.' },
      { status: 500 }
    );
  }

  try {
    // Basic auth requires base64-encoded "key:secret"
    const auth = btoa(`${consumerKey}:${consumerSecret}`);

    // Hardcoded to Double Blue — only product sold through this route
    const productName = "Double Blue";

    // per_page=1 since we only need the single matching product
    const wooCommerceApiUrl = `${storeUrl}/wp-json/wc/v3/products?search=${encodeURIComponent(productName)}&per_page=1`;

    const response = await fetch(wooCommerceApiUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
      // TODO: consider adding next: { revalidate: 3600 } if caching becomes an issue
    });

    // WooCommerce sometimes returns HTML on auth failures instead of JSON — check ok first
    if (!response.ok) {
      const errorData = await response.json();
      console.error('WooCommerce API Error:', errorData);
      throw new Error(`Failed to fetch products from WooCommerce: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown API error'}`);
    }

    const data = await response.json();

    // Returns an array even with per_page=1
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route /api/products:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while fetching products.', details: error.message },
      { status: 500 }
    );
  }
}