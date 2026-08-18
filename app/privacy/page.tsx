import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — CreatorOS",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-canvas px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: August 2026</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-ink">
          <section>
            <p>
              CreatorOS (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides a platform for creators and
              brands to manage collaborations, contracts, payments, and analytics. This Privacy Policy
              explains what information we collect, how we use it, and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <div className="mt-3 space-y-3">
              <p>
                <strong className="text-foreground">Account information:</strong> name, email address, password
                (stored as a one-way hash, never in plain text), role (creator, brand, or agency), and profile
                photo, if you choose to upload one.
              </p>
              <p>
                <strong className="text-foreground">Business content:</strong> deal proposals, contract text,
                messages, invoices, and other content you create or send through the platform. Contract text,
                signed values, and signer information are encrypted at the application level before being
                stored.
              </p>
              <p>
                <strong className="text-foreground">Signature data:</strong> if you electronically sign a
                contract, we record your typed name, a drawn signature image, your IP address, browser
                information, and the exact time of signing, as part of the document&apos;s audit trail. This
                data is encrypted and access is restricted to the parties on that contract.
              </p>
              <p>
                <strong className="text-foreground">Connected accounts:</strong> if you connect a YouTube (or
                other supported platform) account for analytics, we access the data you authorize (e.g.,
                subscriber count, views, video performance) through that platform&apos;s official API. We do
                not receive your social media password.
              </p>
              <p>
                <strong className="text-foreground">Usage data:</strong> log data such as IP address, browser
                type, and pages visited, collected automatically to help us operate and secure the service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>To provide and operate the core features of CreatorOS</li>
              <li>To send transactional emails (e.g., email verification, deal or contract notifications)</li>
              <li>To generate the analytics you request from your connected accounts</li>
              <li>To maintain the security and integrity of the platform</li>
              <li>To respond to support requests</li>
            </ul>
            <p className="mt-3">We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Data Storage &amp; Security</h2>
            <p className="mt-3">
              Data is stored on MongoDB Atlas, which encrypts data at rest. In addition, contract text,
              contract values, and signer names/IP addresses are encrypted at the application level using
              AES-256-GCM before being written to the database. Uploaded files (avatars, media, signed
              documents) are stored on Cloudinary; signed contracts and signature images require an
              authenticated, time-limited link to access — they are not publicly accessible.
            </p>
            <p className="mt-3">
              No method of transmission or storage is 100% secure. While we take reasonable measures to
              protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Third-Party Services</h2>
            <p className="mt-3">We rely on the following third parties to operate CreatorOS:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>MongoDB Atlas — database hosting</li>
              <li>Cloudinary — file and image storage</li>
              <li>Google (YouTube Data API) — analytics for connected accounts</li>
              <li>Render and Vercel — application hosting</li>
              <li>Google Gemini — AI-generated content suggestions in AI Studio</li>
            </ul>
            <p className="mt-3">
              Each of these providers has its own privacy practices governing the data they process on our
              behalf.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Data Sharing</h2>
            <p className="mt-3">
              Information you share within a deal or contract (e.g., your name, brand name, terms) is visible
              to the other party in that transaction. We do not share your data with unrelated third parties
              except as required by law or to protect our legal rights.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p className="mt-3">
              Depending on where you live, you may have the right to access, correct, export, or delete your
              personal data. To exercise these rights, contact us using the details below. We will respond
              within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Cookies</h2>
            <p className="mt-3">
              We use a small number of essential cookies, primarily a secure, HTTP-only cookie used to keep
              you signed in. We do not use third-party advertising or tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Children&apos;s Privacy</h2>
            <p className="mt-3">
              CreatorOS is not intended for individuals under the age of 16. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. We will notify you of material changes by
              updating the &quot;Last updated&quot; date above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">10. Contact Us</h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:creatoros.rs@gmail.com" className="text-brand hover:text-brand-hover">
                creatoros.rs@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}