import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorFallback } from "../components/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorFallback
            error={this.state.error}
            resetError={this.handleReset}
            title="Something went wrong"
            message="An unexpected error occurred. Please try refreshing the page."
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
