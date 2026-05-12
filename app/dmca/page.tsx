export const metadata = {
  title: "DMCA Policy — HoltzDigitalUI",
};

export default function DmcaPage() {
  const lastUpdated = "May 11, 2026";

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">DMCA Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-7">

        <div>
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p>
            HoltzDigital respects intellectual property rights and complies with the Digital Millennium Copyright
            Act (DMCA), 17 U.S.C. § 512. If you believe that content available on HoltzDigitalUI infringes your
            copyright, you may submit a takedown notice as described below.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">1. Filing a DMCA Takedown Notice</h2>
          <p>
            To be valid, your written notice must include all of the following (required by 17 U.S.C. § 512(c)(3)):
          </p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>
              A physical or electronic signature of the copyright owner or a person authorized to act on their
              behalf.
            </li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>
              Identification of the material on HoltzDigitalUI that you claim is infringing, with enough detail for us
              to locate it (e.g., the URL of the product page).
            </li>
            <li>Your name, address, telephone number, and email address.</li>
            <li>
              A statement that you have a good-faith belief that the disputed use is not authorized by the
              copyright owner, its agent, or the law.
            </li>
            <li>
              A statement, made under penalty of perjury, that the information in your notice is accurate and
              that you are the copyright owner or authorized to act on the copyright owner&apos;s behalf.
            </li>
          </ol>
          <p className="mt-3">
            Send your notice to:{" "}
            <a href="mailto:dmca@holtzdigitalui.com" className="underline">dmca@holtzdigitalui.com</a>
          </p>
          <p className="mt-1 text-muted-foreground">
            (You may also use <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a>{" "}
            and include &quot;DMCA Takedown&quot; in the subject line.)
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">2. What Happens After You File</h2>
          <p>
            Upon receipt of a valid and complete takedown notice, we will:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Promptly remove or disable access to the allegedly infringing content.</li>
            <li>Notify the seller who uploaded the content.</li>
            <li>Forward the notice to the seller so they may file a counter-notice if appropriate.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">3. Counter-Notice</h2>
          <p>
            If you are a seller whose content was removed and you believe it was removed by mistake or
            misidentification, you may submit a counter-notice to{" "}
            <a href="mailto:dmca@holtzdigitalui.com" className="underline">dmca@holtzdigitalui.com</a> containing:
          </p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Your physical or electronic signature.</li>
            <li>Identification of the material that was removed and its prior location on HoltzDigitalUI.</li>
            <li>
              A statement under penalty of perjury that you have a good-faith belief the material was removed as a
              result of mistake or misidentification.
            </li>
            <li>
              Your name, address, and phone number, and a statement that you consent to the jurisdiction of the
              Federal District Court for the judicial district in which your address is located (or New York
              Niagara County, New York if outside the U.S.).
            </li>
          </ol>
          <p className="mt-2">
            If we receive a valid counter-notice, we may restore the content after 10–14 business days unless the
            original complainant files a court action.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">4. Repeat Infringers</h2>
          <p>
            In accordance with the DMCA, HoltzDigital will terminate accounts of users who are determined to be
            repeat infringers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">5. Misrepresentation</h2>
          <p>
            Under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material is
            infringing, or that material was removed by mistake, may be liable for damages including attorneys&apos;
            fees.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">6. Contact</h2>
          <p>
            DMCA notices:{" "}
            <a href="mailto:dmca@holtzdigitalui.com" className="underline">dmca@holtzdigitalui.com</a>
            <br />
            General support:{" "}
            <a href="mailto:support@holtzdigitalui.com" className="underline">support@holtzdigitalui.com</a>
          </p>
        </div>

      </section>
    </main>
  );
}
