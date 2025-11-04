import React from "react";
import { Settings } from "lucide-react";

interface UserPreferences {
  currency: string;
  newsCategories: string[];
  chartDays: number;
}

interface SettingsPanelProps {
  preferences: UserPreferences;
  onUpdate: (preferences: UserPreferences) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  preferences,
  onUpdate,
}) => {
  const toggleNewsCategory = (category: string) => {
    const updated = preferences.newsCategories.includes(category)
      ? preferences.newsCategories.filter((c) => c !== category)
      : [...preferences.newsCategories, category];

    onUpdate({ ...preferences, newsCategories: updated });
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings size={20} className="text-primary" />
        <h3 className="text-xl font-semibold">Preferences</h3>
      </div>

      <div className="space-y-6">
        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Default Currency
          </label>
          <select
            value={preferences.currency}
            onChange={(e) =>
              onUpdate({ ...preferences, currency: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="usd">USD ($)</option>
            <option value="eur">EUR (€)</option>
            <option value="gbp">GBP (£)</option>
            <option value="jpy">JPY (¥)</option>
            <option value="cad">CAD ($)</option>
            <option value="aud">AUD ($)</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Note: Currently only USD is fully supported by the API
          </p>
        </div>

        {/* Chart Time Range */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Default Chart Time Range
          </label>
          <select
            value={preferences.chartDays}
            onChange={(e) =>
              onUpdate({ ...preferences, chartDays: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1">24 Hours</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
            <option value="365">1 Year</option>
          </select>
        </div>

        {/* News Categories */}
        <div>
          <label className="block text-sm font-medium mb-3">
            News Categories to Display
          </label>
          <div className="space-y-2">
            {[
              { id: "analysis", label: "Market Analysis" },
              { id: "market", label: "Market News" },
              { id: "regulation", label: "Regulation & Legal" },
              { id: "technology", label: "Technology & Innovation" },
              { id: "defi", label: "DeFi & NFTs" },
              { id: "events", label: "Events & Announcements" },
            ].map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={preferences.newsCategories.includes(category.id)}
                  onChange={() => toggleNewsCategory(category.id)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            <strong>💡 Tip:</strong> Your preferences are saved locally in your
            browser. Clear your browser data to reset to defaults.
          </p>
        </div>
      </div>
    </div>
  );
};
