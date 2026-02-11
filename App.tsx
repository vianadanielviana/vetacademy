import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/useAuth";
import { isMissingCredentials } from "./lib/supabase";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CPRPage from "./pages/CPRPage";
import EmergencyCalculator from "./pages/EmergencyCalculator";
import Medications from "./pages/Medications";
import Calculator from "./pages/Calculator";
import Content from "./pages/Content";
import Auth from "./pages/Auth";

// Setup screen when .env.local is missing
const MissingEnvScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="glass p-8 rounded-3xl max-w-lg w-full space-y-6 text-center">
      <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
        <span className="text-3xl">&#9888;</span>
      </div>
      <h1 className="text-2xl font-black text-white">
        Configuracao Necessaria
      </h1>
      <p className="text-muted-foreground leading-relaxed">
        As credenciais do Supabase nao foram encontradas. Crie o arquivo{" "}
        <code className="bg-white/10 px-2 py-1 rounded text-purple-300">
          .env.local
        </code>{" "}
        na raiz do projeto com as variaveis:
      </p>
      <pre className="text-left bg-black/30 p-4 rounded-xl text-sm text-green-300 overflow-x-auto">
        {`VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui`}
      </pre>
      <p className="text-xs text-muted-foreground">
        Use{" "}
        <code className="bg-white/10 px-1 rounded">
          cp .env.example .env.local
        </code>{" "}
        como ponto de partida.
      </p>
    </div>
  </div>
);

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const { isAuthenticated, loading, signOut } = useAuth();

  if (isMissingCredentials) {
    return <MissingEnvScreen />;
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          {/* Auth route - redirect to home if already authenticated */}
          <Route
            path="/auth"
            element={isAuthenticated ? <Navigate to="/" /> : <Auth />}
          />

          {/* Protected routes - require authentication */}
          <Route
            element={
              isAuthenticated ? (
                <Layout onLogout={signOut} />
              ) : (
                <Navigate to="/auth" />
              )
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/cpr" element={<CPRPage />} />
            <Route path="/emergencia" element={<EmergencyCalculator />} />
            <Route path="/medicamentos" element={<Medications />} />
            <Route path="/calculadora" element={<Calculator />} />
            <Route path="/conteudo" element={<Content />} />
            <Route
              path="/calc"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Calculadoras Gerais</h1>
                  <p className="text-muted-foreground mt-2">
                    Em desenvolvimento...
                  </p>
                </div>
              }
            />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
