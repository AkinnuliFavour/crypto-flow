import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = React.useState("");
  const [subscribeStatus, setSubscribeStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setSubscribeStatus("error");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
      return;
    }

    // Create mailto link with pre-filled content
    const subject = encodeURIComponent("Newsletter Subscription Request");
    const body = encodeURIComponent(
      `New newsletter subscription request:\n\nEmail: ${email}\n\nPlease add this email to the CryptoFlow newsletter mailing list.`
    );
    const mailtoLink = `mailto:oluwasemiloreakinnuli@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setSubscribeStatus("success");
    setEmail("");
    setTimeout(() => setSubscribeStatus("idle"), 5000);
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <HiTrendingUp className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">CryptoFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for cryptocurrency news, analysis, and market
              insights.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/AkinnuliFavour"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="mailto:oluwasemiloreakinnuli@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Categories - Side by side on mobile */}
          <div className="flex gap-8 md:contents">
            {/* Quick Links */}
            <div className="space-y-4 flex-1">
              <h3 className="text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4 flex-1">
              <h3 className="text-sm font-semibold">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/news?category=bitcoin"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Bitcoin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news?category=defi"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    DeFi & NFTs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news?category=technology"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news?category=regulation"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Regulation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest crypto news delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {subscribeStatus === "success" && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Thank you! Opening your email client to complete subscription.
                </p>
              )}
              {subscribeStatus === "error" && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  Please enter a valid email address.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CryptoFlow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
