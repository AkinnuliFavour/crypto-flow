import React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/SEO";

export const Terms: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Service - CryptoFlow"
        description="Read CryptoFlow's Terms of Service to understand the rules and guidelines for using our cryptocurrency news and portfolio tracking platform."
        keywords={[
          "terms of service",
          "terms and conditions",
          "user agreement",
        ]}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last Updated: November 7, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using CryptoFlow ("the Service"), you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to these Terms of Service, please do not use the
              Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground mb-4">
              CryptoFlow provides cryptocurrency news aggregation, market data
              visualization, portfolio tracking, and related information
              services. The Service is provided "as is" and "as available"
              without any warranties of any kind.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Investment Disclaimer
            </h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-2 text-amber-900 dark:text-amber-100">
                Important Notice
              </h3>
              <p className="text-amber-800 dark:text-amber-200">
                CryptoFlow does not provide financial, investment, tax, or legal
                advice. The information provided through our Service is for
                informational purposes only and should not be construed as
                investment advice. Cryptocurrency trading involves substantial
                risk of loss and is not suitable for all investors.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                All data, news, and analysis provided are for informational
                purposes only
              </li>
              <li>
                Users should conduct their own research and consult with
                financial advisors before making investment decisions
              </li>
              <li>Past performance does not guarantee future results</li>
              <li>
                CryptoFlow is not responsible for any investment losses incurred
                by users
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Accuracy</h2>
            <p className="text-muted-foreground mb-4">
              While we strive to provide accurate and up-to-date information,
              CryptoFlow does not guarantee the accuracy, completeness, or
              timeliness of any data, news, or market information provided
              through the Service. Market data is sourced from third-party
              providers and may be subject to delays or errors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. User Responsibilities
            </h2>
            <p className="text-muted-foreground mb-4">
              Users of the Service agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Use the Service in compliance with all applicable laws and
                regulations
              </li>
              <li>
                Not engage in any activity that disrupts or interferes with the
                Service
              </li>
              <li>
                Not attempt to gain unauthorized access to any part of the
                Service
              </li>
              <li>
                Not use the Service for any illegal or unauthorized purpose
              </li>
              <li>
                Be solely responsible for maintaining the security of their
                portfolio and watchlist data
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Portfolio and Watchlist Data
            </h2>
            <p className="text-muted-foreground mb-4">
              Portfolio and watchlist data entered by users is stored locally in
              the user's browser using local storage. CryptoFlow does not have
              access to or store this personal portfolio information on our
              servers. Users are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Backing up their portfolio and watchlist data</li>
              <li>
                Understanding that clearing browser data will delete their
                information
              </li>
              <li>
                Exporting their data regularly if they wish to preserve it
                across devices
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-4">
              CryptoFlow integrates with third-party services including but not
              limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>CoinGecko API for cryptocurrency market data</li>
              <li>NewsAPI for cryptocurrency news aggregation</li>
              <li>Other data providers and services</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Use of these third-party services is subject to their respective
              terms of service and privacy policies. CryptoFlow is not
              responsible for the content, accuracy, or practices of third-party
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Intellectual Property
            </h2>
            <p className="text-muted-foreground mb-4">
              All content on CryptoFlow, including but not limited to text,
              graphics, logos, icons, and software, is the property of
              CryptoFlow or its content suppliers and is protected by copyright
              laws. Users may not reproduce, distribute, or create derivative
              works without explicit permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              To the fullest extent permitted by law, CryptoFlow shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your use or inability to use the Service</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>
                Any interruption or cessation of transmission to or from the
                Service
              </li>
              <li>
                Any bugs, viruses, or other harmful code that may be transmitted
                through the Service
              </li>
              <li>
                Any errors or omissions in any content or for any loss or damage
                incurred as a result of your use of any content
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              10. Service Modifications
            </h2>
            <p className="text-muted-foreground mb-4">
              CryptoFlow reserves the right to modify, suspend, or discontinue
              the Service (or any part thereof) at any time with or without
              notice. We shall not be liable to you or any third party for any
              modification, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              11. Changes to Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to update or modify these Terms of Service at
              any time without prior notice. Your continued use of the Service
              after any such changes constitutes your acceptance of the new
              Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service shall be governed by and construed in
              accordance with the laws of the jurisdiction in which CryptoFlow
              operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              13. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-foreground">
                <strong>Email:</strong> legal@cryptoflow.com
              </p>
            </div>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground">
              By using CryptoFlow, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
