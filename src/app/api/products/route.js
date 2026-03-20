// src/app/api/products/route.js
import { NextResponse } from 'next/server';

/**
 * Handles GET requests to the /api/products route.
 * This route acts as a proxy to the WooCommerce REST API,
 * securing the consumer key and secret by keeping them server-side.
 * It specifically searches for the product named "Double Blue".
 */
export async function GET(request) {
  // Retrieve WooCommerce store URL and API credentials from environment variables.
  // NEXT_PUBLIC_WOOCOMMERCE_STORE_URL is accessible on both client and server,
  // while WOOCOMMERCE_CONSUMER_KEY and WOOCOMMERCE_CONSUMER_SECRET are server-only.
  const storeUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  // Validate that all necessary environment variables are set.
  // If any are missing, return a 500 Server Error.
  if (!storeUrl || !consumerKey || !consumerSecret) {
    console.error('Server configuration missing: WooCommerce API credentials or store URL.');
    return NextResponse.json(
      { error: 'Server configuration error: WooCommerce API credentials or store URL are not set.' },
      { status: 500 }
    );
  }

  try {
    // Encode the consumer key and secret into a Base64 string for Basic Authentication.
    const auth = btoa(`${consumerKey}:${consumerSecret}`);

    // Define the product name to search for.
    // This is hardcoded as "Double Blue" as per the user's request.
    const productName = "Double Blue";

    // Construct the WooCommerce REST API URL.
    // It includes:
    // - The base store URL.
    // - The standard WooCommerce REST API path (/wp-json/wc/v3/products).
    // - A 'search' parameter to filter products by name. `encodeURIComponent` is used
    //   to properly encode the product name for a URL.
    // - A 'per_page=1' parameter to limit the results to only one product.
    const wooCommerceApiUrl = `${storeUrl}/wp-json/wc/v3/products?search=${encodeURIComponent(productName)}&per_page=1`;

    // Make the fetch request to the WooCommerce API.
    // The Authorization header is crucial for authenticating the request.
    const response = await fetch(wooCommerceApiUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
        // Optionally, you might add other headers like 'Content-Type': 'application/json'
        // if you were sending data, but for GET, it's often not strictly necessary.
      },
      // You can add Next.js specific fetch options here for caching strategies,
      // e.g., `next: { revalidate: 3600 }` to revalidate data every hour.
      // For this example, we'll keep it simple.
    });

    // Check if the response from WooCommerce was successful (status code 2xx).
    // If not, parse the error data from the response and throw a detailed error.
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error as JSON
      console.error('WooCommerce API Error:', errorData); // Log the detailed error on the server
      throw new Error(`Failed to fetch products from WooCommerce: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown API error'}`);
    }

    // Parse the successful response body as JSON.
    // This is the step that currently fails if the WooCommerce server returns HTML.
    const data = await response.json();

    // Return the fetched data as a JSON response to the client-side component.
    // The data will be an array of products (even if only one product is found due to per_page=1).
    return NextResponse.json(data);
  } catch (error) {
    // Catch any errors that occur during the fetch operation or JSON parsing.
    // Log the error on the server and return a generic 500 Server Error to the client.
    console.error('Error in API route /api/products:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while fetching products.', details: error.message },
      { status: 500 }
    );
  }
}