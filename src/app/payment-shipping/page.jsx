// src/app/payment-shipping/page.js
import Link from 'next/link'; // Assuming Next.js for Link component, though not used directly in this content, it's good practice for page components.

export default function PaymentShipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-title text-3xl sm:text-4xl text-nautical mb-6 sm:mb-8 mt-16 sm:mt-32 text-center sm:text-left">
        Payment & Shipping
      </h1>
      <div className="prose prose-lg text-antique break-words">
        <p>
          We usually deliver via UPS. Unless otherwise specified in individual cases, the average delivery time is 3–4 days.
        </p>
        <p>
          We ship in shipping boxes of the following sizes: 1-bottle, 3-bottle, 6-bottle, 12-bottle, or 18-bottle cartons. For economic and ecological reasons, we would greatly appreciate it if you could adjust your order quantities to these sizes. However, this is not a requirement.
        </p>

        <h2>Your Shipping Costs for Deliveries within Germany</h2>
        <p>
          For orders within Germany, your flat-rate shipping cost is €3.99.
        </p>
        <p>
          For orders with a total value over €56, delivery is free of shipping charges.
        </p>

        <h2>Your Shipping Costs for Deliveries Abroad</h2>
        <ul className="list-disc pl-5">
          <li><strong>Euro Zone 3</strong> (e.g., Denmark, Netherlands, Belgium, Luxembourg, Czech Republic): flat rate €15.35</li>
          <li><strong>Euro Zone 31</strong> (e.g., Poland, Slovakia, Slovenia): flat rate €16.90</li>
          <li><strong>Euro Zone 4</strong> (e.g., Austria, France, Italy, Finland): flat rate €16.90</li>
          <li><strong>Euro Zone 41</strong> (e.g., Hungary, Estonia): flat rate €17.90</li>
          <li><strong>Euro Zone 5</strong> (e.g., Ireland, Spain, Portugal): flat rate €19.90</li>
          <li><strong>Euro Zone 6</strong> (e.g., Liechtenstein, Andorra, etc.; NO SHIPPING to Switzerland!): flat rate €19.90</li>
        </ul>
        <p>
          Prices for deliveries to other countries depend additionally on freight and customs costs. These can be inquired via email at <a href="mailto:info@dwersteg.de">info@dwersteg.de</a>.
        </p>

        <h2>Prices, Shipping Costs, and Delivery Information</h2>
        <p>
          The prices listed on the product pages include the legally applicable VAT and other price components.
        </p>
        <p>
          In addition to the stated prices, we charge a flat shipping fee of €3.99 for deliveries within Germany. The shipping costs are clearly indicated again in the shopping cart system and on the order page.
        </p>
        <p>
          The flat shipping fee is €3.99 and includes VAT. Since VAT on the shipping fee is calculated based on the goods purchased, it may be reduced if items with lower VAT rates are ordered. This means that the final shipping fee can only be calculated during the order process. However, it cannot increase—only be reduced in your favor.
        </p>
        {/* <p className="mt-8">Last updated: {new Date().toLocaleDateString('en-US')}</p> */}
      </div>
    </div>
  );
}
