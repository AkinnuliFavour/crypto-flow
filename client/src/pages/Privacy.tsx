import React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/SEO";

export const Privacy: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy - CryptoFlow"
        description="Learn how CryptoFlow collects, uses, and protects your personal information. Read our comprehensive privacy policy."
        keywords={["privacy policy", "data protection", "privacy", "gdpr"]}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last Updated: November 7, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to CryptoFlow. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you about how we handle your personal data when you visit our
              website and tell you about your privacy rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              2.1 Information You Provide
            </h3>
            <p className="text-muted-foreground mb-4">
              CryptoFlow is designed with privacy in mind. We collect minimal
              personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Newsletter Subscriptions:</strong> If you subscribe to
                our newsletter, we collect your email address
              </li>
              <li>
                <strong>Portfolio Data:</strong> Portfolio and watchlist
                information you enter is stored locally in your browser only
              </li>
              <li>
                <strong>User Preferences:</strong> Display settings, currency
                preferences, and theme choices stored locally
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-muted-foreground mb-4">
              When you visit CryptoFlow, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent,
                navigation patterns
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, device type,
                operating system
              </li>
              <li>
                <strong>IP Address:</strong> For analytics and security purposes
              </li>
              <li>
                <strong>Cookies:</strong> Small data files stored on your device
                (see section 6)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Service Delivery:</strong> To provide and maintain our
                cryptocurrency news and portfolio tracking services
              </li>
              <li>
                <strong>Personalization:</strong> To remember your preferences
                and settings
              </li>
              <li>
                <strong>Communication:</strong> To send newsletters and updates
                (only if you subscribe)
              </li>
              <li>
                <strong>Analytics:</strong> To understand how users interact
                with our service and improve user experience
              </li>
              <li>
                <strong>Security:</strong> To detect, prevent, and address
                technical issues and fraudulent activity
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with legal
                obligations and protect our rights
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Local Storage and Data Protection
            </h2>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">
                Your Data Stays With You
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                CryptoFlow stores your portfolio and watchlist data exclusively
                in your browser's local storage. We do not transmit, store, or
                have access to your personal portfolio information on our
                servers.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              Important points about local storage:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Data is stored only on your device</li>
              <li>We cannot access or recover your portfolio data</li>
              <li>
                Clearing browser data will delete your portfolio and watchlist
              </li>
              <li>Use the export feature to backup your data</li>
              <li>
                Data is not synchronized across devices unless you manually
                import it
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-4">
              CryptoFlow integrates with the following third-party services:
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              5.1 CoinGecko API
            </h3>
            <p className="text-muted-foreground mb-4">
              We use CoinGecko to fetch cryptocurrency market data. When you use
              CryptoFlow, requests are made to CoinGecko's servers. Please
              review CoinGecko's privacy policy at{" "}
              <a
                href="https://www.coingecko.com/en/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.coingecko.com/en/privacy
              </a>
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 NewsAPI</h3>
            <p className="text-muted-foreground mb-4">
              We use NewsAPI to aggregate cryptocurrency news from various
              sources. News requests may be subject to NewsAPI's privacy policy.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              5.3 Analytics Services
            </h3>
            <p className="text-muted-foreground mb-4">
              We may use analytics services (such as Google Analytics) to
              understand how users interact with our website. These services may
              use cookies and collect data about your usage patterns.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-muted-foreground mb-4">
              CryptoFlow uses cookies and similar tracking technologies to
              improve your experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly (e.g., theme preferences)
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how you
                use the site
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                choices
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can control cookies through your browser settings. Note that
              disabling cookies may affect the functionality of CryptoFlow.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Data Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share information only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                services that help us operate our platform (e.g., hosting,
                analytics)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or legal process
              </li>
              <li>
                <strong>Protection of Rights:</strong> To protect our rights,
                privacy, safety, or property
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Your Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Right to Access:</strong> Request copies of your
                personal data
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate data
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your
                personal data
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Request
                limitation of how we use your data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Request transfer of
                your data
              </li>
              <li>
                <strong>Right to Object:</strong> Object to our processing of
                your data
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw consent at
                any time
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at
              privacy@cryptoflow.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain personal information only for as long as necessary to
              fulfill the purposes outlined in this privacy policy, unless a
              longer retention period is required or permitted by law.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Newsletter subscriptions: Until you unsubscribe</li>
              <li>
                Usage analytics: Typically aggregated and anonymized after 26
                months
              </li>
              <li>
                Local storage data: Retained until you clear your browser data
                or manually delete it
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              10. Security Measures
            </h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>HTTPS encryption for data transmission</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage practices</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              However, no method of transmission over the internet is 100%
              secure. While we strive to protect your data, we cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              11. Children's Privacy
            </h2>
            <p className="text-muted-foreground mb-4">
              CryptoFlow is not intended for use by individuals under the age of
              18. We do not knowingly collect personal information from
              children. If you believe we have collected information from a
              child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              12. International Data Transfers
            </h2>
            <p className="text-muted-foreground mb-4">
              Your information may be transferred to and processed in countries
              other than your own. These countries may have different data
              protection laws. By using CryptoFlow, you consent to such
              transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              13. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last Updated" date. You are advised to
              review this privacy policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-foreground">
                <strong>Email:</strong> privacy@cryptoflow.com
              </p>
              <p className="text-foreground">
                <strong>Data Protection Officer:</strong> dpo@cryptoflow.com
              </p>
            </div>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground">
              By using CryptoFlow, you acknowledge that you have read and
              understood this Privacy Policy and agree to its terms.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
