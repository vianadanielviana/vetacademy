import React from "react";
import { ICONS } from "../constants";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("VetAcademy Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[hsl(270,60%,10%)]">
          <div className="text-center p-8 max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ICONS.AlertTriangle size={32} className="text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Algo deu errado
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              {this.state.error?.message || "Erro inesperado na aplicação."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.hash = "#/";
                window.location.reload();
              }}
              className="px-6 py-3 rounded-xl font-medium text-white"
              style={{
                background:
                  "linear-gradient(90deg, hsl(280,60%,50%), hsl(320,70%,60%))",
              }}
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
