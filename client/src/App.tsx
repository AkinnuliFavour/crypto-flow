import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Dashboard } from "./pages/Dashboard";
import { Article } from "./pages/Article";
import "./App.css";

// Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       gcTime: 1000 * 60 * 10, // 10 minutes
//       retry: (failureCount, error) => {
//         // Don't retry on 4xx errors
//         if (error instanceof Error && error.message.includes("4")) {
//           return false;
//         }
//         return failureCount < 3;
//       },
//     },
//   },
// });

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/:id" element={<Article />} />
                  <Route path="/article/*" element={<Article />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* 404 route */}
                  <Route
                    path="*"
                    element={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-4xl font-bold mb-4">404</h1>
                          <p className="text-muted-foreground mb-6">
                            Page not found
                          </p>
                          <a href="/" className="text-primary hover:underline">
                            Go back home
                          </a>
                        </div>
                      </div>
                    }
                  />
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
