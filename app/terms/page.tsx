import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service — CreatorOS",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-canvas px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-foreground">Terms of Service</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: August 2026</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-ink">
          <section>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of CreatorOS. By
              creating an account or using the platform, you agree to these Terms. If you do not agree,
              do not use CreatorOS.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Eligibility</h2>
            <p className="mt-3">
              You must be at least 16 years old and legally able to enter into binding agreements to use
              CreatorOS. If you are using CreatorOS on behalf of a company or organization, you represent
              that you have the authority to bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Your Account</h2>
            <p className="mt-3">
              You are responsible for maintaining the confidentiality of your login credentials and for all
              activity that occurs under your account. Notify us immediately if you suspect unauthorized
              access. You are responsible for providing accurate information when you register.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Plans &amp; Billing</h2>
            <p className="mt-3">
              CreatorOS offers a Free plan with usage limits (e.g., a maximum number of active deals,
              contracts, and conversations) and a paid Pro plan with expanded limits. Fees for the Pro plan,
              where applicable, will be clearly disclosed before you are charged. You may downgrade or cancel
              at any time from your account settings; downgrading may result in the enforcement of Free plan
              limits going forward.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Deals, Contracts &amp; E-Signatures</h2>
            <div className="mt-3 space-y-3">
              <p>
                CreatorOS provides tools for creators and brands to propose deals, negotiate terms, and sign
                contracts electronically. When you draw or otherwise apply an electronic signature within
                the platform, you agree that this constitutes your legal signature on that document, to the
                extent permitted by applicable law in your jurisdiction.
              </p>
              <p>
                <strong className="text-foreground">CreatorOS is not a party to any deal or contract</strong>{" "}
                formed between users. We provide the tools to create, negotiate, and sign these documents,
                but we do not review, approve, or guarantee the legal validity, enforceability, or accuracy of
                any contract content. Users are solely responsible for the terms they agree to and are
                encouraged to consult a qualified lawyer before signing agreements with significant legal or
                financial consequences.
              </p>
              <p>
                We maintain a technical audit trail for each signature (name, IP address, timestamp, and
                consent confirmation) to support the integrity of the signing process, but this does not
                constitute a legal opinion on the validity of any signature or document.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Payments Between Users</h2>
            <p className="mt-3">
              CreatorOS helps track invoices and payment status between creators and brands, but does not
              process or hold funds. Any payment obligations are strictly between the creator and the brand
              involved in a given deal. CreatorOS is not responsible for a party&apos;s failure to pay or
              deliver on agreed terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Acceptable Use</h2>
            <p className="mt-3">You agree not to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Use CreatorOS for any unlawful purpose or in violation of any applicable law</li>
              <li>Upload content that is fraudulent, defamatory, or infringes on others&apos; rights</li>
              <li>Attempt to gain unauthorized access to other accounts or to our systems</li>
              <li>Interfere with or disrupt the platform&apos;s operation, including through automated abuse</li>
              <li>Misrepresent your identity or affiliation when creating deals or contracts</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Connected Third-Party Accounts</h2>
            <p className="mt-3">
              If you connect a third-party account (such as YouTube) for analytics, you authorize CreatorOS
              to access the data made available through that platform&apos;s official API, in accordance with
              that platform&apos;s own terms. You may disconnect a connected account at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">8. Intellectual Property</h2>
            <p className="mt-3">
              CreatorOS and its original content, features, and functionality are owned by us and protected
              by applicable intellectual property laws. You retain ownership of the content you upload (e.g.,
              media assets, deal descriptions), and grant us a limited license to store and display that
              content as necessary to operate the service for you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">9. Termination</h2>
            <p className="mt-3">
              You may stop using CreatorOS at any time. We may suspend or terminate your access if you
              violate these Terms or engage in behavior that we reasonably believe harms the platform or
              other users.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">10. Disclaimer of Warranties</h2>
            <p className="mt-3">
              CreatorOS is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any
              kind, express or implied. We do not warrant that the service will be uninterrupted, error-free,
              or completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">11. Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, CreatorOS and its team shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of the platform, including
              disputes between users over deals, contracts, or payments.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">12. Changes to These Terms</h2>
            <p className="mt-3">
              We may update these Terms from time to time. Continued use of CreatorOS after changes take
              effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">13. Contact Us</h2>
            <p className="mt-3">
              Questions about these Terms can be sent to{" "}
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