export const metadata = {
  title: "Refund Policy — HoltzDigitalUI",
};

export default function RefundsPage() {
  const lastUpdated = "May 11, 2026";

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Refund Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-7">

        <div>
          <h2 className="text-lg font-semibold mb-2">1. Digital Products — No Refunds</h2>
          <p>
            All products sold on HoltzDigitalUI are digital downloads. Due to the nature of digital goods, all sales are
            final and non-refundable once a purchase is completed and the download link has been issued. This
            applies to templates, UI kits, icon sets, and any other digital assets.
          </p>
          <p className="mt-2">
            By completing a purchase you acknowledge that you have reviewed the product description, preview
            images, and any demo content, and that you understand what you are purchasing.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">2. Exceptions</h2>
          <p>We will issue a refund in the following limited circumstances:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Duplicate purchase:</strong> You were charged more than once for the same product due to a
              technical error. Please contact us within 7 days.
            </li>
            <li>
              <strong>Product materially different from description:</strong> The delivered product is fundamentally
              different from what was described on the product page (e.g., missing core files entirely). We will
              first attempt to resolve the issue with the seller; if it cannot be resolved, a refund will be
              issued.
            </li>
            <li>
              <strong>Download failure:</strong> You are unable to download the product and our support team
              cannot resolve the issue within 5 business days.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. How to Request a Refund</h2>
          <p>
            Email <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a> with:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Your account email address.</li>
            <li>The name of the product purchased.</li>
            <li>A description of the issue.</li>
          </ul>
          <p className="mt-2">
            We will respond within 3 business days. Approved refunds are processed back to the original payment
            method and may take 5–10 business days to appear depending on your bank.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. Chargebacks</h2>
          <p>
            If you initiate a chargeback with your bank or card issuer rather than contacting us first, we reserve
            the right to permanently suspend your account. We encourage you to reach out to us directly — we are
            happy to resolve legitimate issues.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">5. Contact</h2>
          <p>
            For any refund-related questions, email{" "}
            <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a>.
          </p>
        </div>

      </section>
    </main>
  );
}
