export const metadata = {
  title: "Terms of Service — HoltzDigitalUI",
};

export default function TermsPage() {
  const lastUpdated = "May 11, 2026";

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-7">

        <div>
          <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using HoltzDigitalUI (operated by HoltzDigital), you agree to be bound by these Terms of
            Service. If you do not agree, do not use the platform. These terms apply to all users, including
            buyers, sellers, and visitors.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">2. The Platform</h2>
          <p>
            HoltzDigitalUI is a marketplace that allows sellers to list and sell digital products (Tailwind CSS
            templates, UI kits, icons, and related assets) and allows buyers to purchase and download those
            products. HoltzDigital acts as the platform operator and is not the seller of record for third-party
            products.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. Accounts</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must be at least 18 years old to create an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You must provide accurate and complete registration information.</li>
            <li>
              We reserve the right to suspend or terminate accounts that violate these terms or are used for
              fraudulent or abusive purposes.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. Seller Terms</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              You must own or have the full right to sell any product you list. By listing a product, you
              represent that you hold all necessary intellectual property rights.
            </li>
            <li>
              You may not sell products that infringe third-party copyrights, trademarks, or other IP rights.
            </li>
            <li>You may not list malicious, deceptive, or illegal content.</li>
            <li>
              HoltzDigital charges a platform fee on each sale. Fee details are displayed during the seller
              onboarding flow.
            </li>
            <li>
              Payouts are processed via Stripe Connect. You must complete Stripe&apos;s identity verification to
              receive payouts.
            </li>
            <li>
              HoltzDigital reserves the right to remove any listing at its discretion, including for quality,
              legal, or policy reasons.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">5. Buyer Terms</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              All sales of digital products are final unless otherwise required by applicable law. Please review
              our <a href="/refunds" className="underline">Refund Policy</a>.
            </li>
            <li>
              Purchased products are licensed for personal or commercial use as described on the individual product
              page. Redistribution or resale of purchased products is prohibited unless the product listing
              explicitly grants such rights.
            </li>
            <li>You may not share download links or credentials with others.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">6. Intellectual Property</h2>
          <p>
            All HoltzDigitalUI branding, design, and platform code is the property of HoltzDigital. Individual product
            assets are owned by their respective sellers. Nothing in these terms transfers ownership of any IP to
            you beyond the license granted at purchase.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">7. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Use the platform for any unlawful purpose.</li>
            <li>Attempt to circumvent payment, access controls, or download restrictions.</li>
            <li>Scrape, crawl, or mirror the platform without written permission.</li>
            <li>Introduce malware, viruses, or harmful code.</li>
            <li>Harass, impersonate, or defraud other users.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">8. Payments and Fees</h2>
          <p>
            Payments are processed by Stripe. By making a purchase you agree to Stripe&apos;s terms of service.
            HoltzDigital is not liable for payment processing errors, bank fees, or currency conversion charges.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">9. Disclaimer of Warranties</h2>
          <p>
            HoltzDigitalUI is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied.
            HoltzDigital does not warrant that the platform will be uninterrupted, error-free, or free of viruses.
            Products sold by third-party sellers are not reviewed or endorsed by HoltzDigital.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, HoltzDigital shall not be liable for any indirect, incidental,
            special, or consequential damages arising from your use of the platform or any product purchased
            through it. Our aggregate liability shall not exceed the amount you paid for the specific transaction
            giving rise to the claim.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">11. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of New York, United States, without regard to
            conflict of law principles. Any disputes shall be resolved in the courts of Niagara County, New York.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">12. Changes to These Terms</h2>
          <p>
            We may update these terms at any time. Continued use of HoltzDigitalUI after changes constitutes acceptance.
            Material changes will be communicated via email where possible.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">13. Contact</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a>.
          </p>
        </div>

      </section>
    </main>
  );
}
