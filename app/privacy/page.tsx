export const metadata = {
  title: "Privacy Policy — HoltzDigitalUI",
};

export default function PrivacyPage() {
  const lastUpdated = "May 11, 2026";

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-7">

        <div>
          <h2 className="text-lg font-semibold mb-2">1. Who We Are</h2>
          <p>
            HoltzDigitalUI is a digital marketplace for Tailwind CSS templates, UI kits, and icons, operated by
            HoltzDigital. When this policy refers to &quot;HoltzDigitalUI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our,&quot; it means HoltzDigital and its
            HoltzDigitalUI platform. You can contact us at{" "}
            <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Account information:</strong> name and email address, provided when you register via Kinde Auth.
            </li>
            <li>
              <strong>Payment information:</strong> billing details are collected and processed by Stripe. We do not
              store full card numbers or bank account details on our servers.
            </li>
            <li>
              <strong>Uploaded content:</strong> files and product assets you upload as a seller are stored via
              UploadThing.
            </li>
            <li>
              <strong>Usage data:</strong> pages visited, actions taken, and device/browser information collected
              automatically through standard server logs.
            </li>
            <li>
              <strong>Communications:</strong> messages you send to our support email.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To operate the marketplace and process transactions.</li>
            <li>To deliver purchased digital products via email (Resend).</li>
            <li>To communicate about your account, purchases, or support requests.</li>
            <li>To comply with legal obligations (tax, fraud prevention).</li>
            <li>To improve the platform through aggregate, anonymized analytics.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. Third-Party Services</h2>
          <p>We share data with the following processors only as necessary to operate the service:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Kinde</strong> — authentication and user management.</li>
            <li><strong>Stripe</strong> — payment processing and seller payouts via Stripe Connect.</li>
            <li><strong>Supabase</strong> — database hosting.</li>
            <li><strong>UploadThing</strong> — file storage and delivery.</li>
            <li><strong>Resend</strong> — transactional email delivery.</li>
          </ul>
          <p className="mt-2">
            Each of these services has its own privacy policy. We do not sell your personal data to any third party.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">5. Cookies</h2>
          <p>
            We use cookies and similar technologies to maintain your session, remember preferences, and keep you
            logged in. No third-party advertising cookies are used. You can disable cookies in your browser
            settings, but doing so may prevent you from using authenticated features.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">6. Data Retention</h2>
          <p>
            We retain your account data for as long as your account is active. Purchase records are kept for at
            least 7 years for tax and legal compliance. You may request deletion of your account and personal data
            at any time (see Section 7).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">7. Your Rights</h2>
          <p>
            Depending on your jurisdiction (EU/EEA, UK, California, etc.) you may have the right to access,
            correct, export, or delete your personal data. To exercise any of these rights, email us at{" "}
            <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a>. We will respond
            within 30 days.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">8. Security</h2>
          <p>
            We use industry-standard security practices including encrypted connections (HTTPS), hashed download
            tokens, and access controls. However, no system is 100% secure. Please notify us immediately if you
            suspect unauthorized access to your account.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">9. Children</h2>
          <p>
            HoltzDigitalUI is not directed at children under 13. We do not knowingly collect personal data from children.
            If you believe a child has provided us with personal data, contact us and we will delete it promptly.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">10. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be communicated by updating the
            &quot;Last updated&quot; date above and, where appropriate, by email. Continued use of HoltzDigitalUI after changes
            constitutes acceptance of the revised policy.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">11. Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a>.
          </p>
        </div>

      </section>
    </main>
  );
}
