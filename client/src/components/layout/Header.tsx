import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, Moon, Sun, TrendingUp } from "lucide-react";
import { useTheme } from "../../hooks";
import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CryptoFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:flex"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`h-9 w-9 p-0 ${
                theme === "dark" ? "text-[hsl(45,93%,47%)]" : ""
              }`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="md:hidden h-9 w-9 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="pb-4 hidden sm:block">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};
