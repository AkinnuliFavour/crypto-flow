import React, { useRef } from "react";
import { Download, Upload } from "lucide-react";
import type { PortfolioItem, WatchlistItem } from "../../types";

interface ImportExportProps {
  portfolioData: PortfolioItem[];
  watchlistData: WatchlistItem[];
  onImport: (data: {
    portfolio?: PortfolioItem[];
    watchlist?: WatchlistItem[];
  }) => void;
}

export const ImportExport: React.FC<ImportExportProps> = ({
  portfolioData,
  watchlistData,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const exportData = {
      portfolio: portfolioData,
      watchlist: watchlistData,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `crypto-flow-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);

        // Validate the imported data structure
        if (!importedData || typeof importedData !== "object") {
          throw new Error("Invalid file format");
        }

        const dataToImport: {
          portfolio?: PortfolioItem[];
          watchlist?: WatchlistItem[];
        } = {};

        if (Array.isArray(importedData.portfolio)) {
          dataToImport.portfolio = importedData.portfolio;
        }

        if (Array.isArray(importedData.watchlist)) {
          dataToImport.watchlist = importedData.watchlist;
        }

        if (Object.keys(dataToImport).length === 0) {
          throw new Error("No valid portfolio or watchlist data found");
        }

        const confirmMessage = `Import ${
          dataToImport.portfolio
            ? portfolioData.length + " portfolio items"
            : ""
        }${dataToImport.portfolio && dataToImport.watchlist ? " and " : ""}${
          dataToImport.watchlist
            ? watchlistData.length + " watchlist items"
            : ""
        }? This will replace your current data.`;

        if (window.confirm(confirmMessage)) {
          onImport(dataToImport);
          alert("Data imported successfully!");
        }
      } catch (error) {
        alert(
          `Failed to import data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    };

    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-xl font-semibold mb-4">Backup & Restore</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Export your portfolio and watchlist data to a JSON file for backup,
            or import previously exported data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            disabled={portfolioData.length === 0 && watchlistData.length === 0}
          >
            <Download size={20} />
            <span className="font-medium">Export Data</span>
          </button>

          {/* Import Button */}
          <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
            <Upload size={20} />
            <span className="font-medium">Import Data</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        <div className="pt-4 border-t">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>📥 Export:</strong> Download your data as a JSON file
            </p>
            <p>
              <strong>📤 Import:</strong> Restore data from a previously
              exported file
            </p>
            <p className="text-xs pt-2">
              ⚠️ <strong>Warning:</strong> Importing will replace all your
              current data. Make sure to export first if you want to keep your
              current data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
