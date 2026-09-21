import React, { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/useAuth";
import { isMissingCredentials } from "./lib/supabase";
import { initNativeApp } from "./lib/native";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import UpdateNotification from "./components/UpdateNotification";
import Home from "./pages/Home";
import CPRPage from "./pages/CPRPage";
import EmergencyCalculator from "./pages/EmergencyCalculator";
import Medications from "./pages/Medications";
import Calculator from "./pages/Calculator";
import Content from "./pages/Content";
import Especialidades from "./pages/Especialidades";
import Auth from "./pages/Auth";

// Setup screen when .env.local is missing
const MissingEnvScreen: React.FC<{ onContinueDemo: () => void }> = ({
  onContinueDemo,
}) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-[hsl(var(--background))]">
    <div className="glass p-8 rounded-3xl max-w-lg w-full space-y-6 text-center">
      <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
        <span className="text-3xl">&#9888;</span>
      </div>
      <h1 className="text-2xl font-black text-white">
        Configuração Necessária
      </h1>
      <p className="text-muted-foreground leading-relaxed">
        As credenciais do Supabase não foram encontradas. Para conectar um banco remoto, configure as variáveis de ambiente:
      </p>
      <pre className="text-left bg-black/30 p-4 rounded-xl text-sm text-green-300 overflow-x-auto">
        {`VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui`}
      </pre>
      <button
        onClick={onContinueDemo}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-button text-white font-bold shadow-glow hover:opacity-95 transition-all text-base cursor-pointer"
      >
        Continuar no Modo Demonstração / Convidado
      </button>
      <p className="text-xs text-muted-foreground">
        No modo demonstração, o Metrônomo de RCP, Calculadoras de Emergência e Conteúdo Clínico funcionam normalmente.
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
  const { isAuthenticated, isDemo, loading, signOut, signInDemo } = useAuth();

  useEffect(() => {
    initNativeApp();
  }, []);

  if (isMissingCredentials && !isDemo) {
    return <MissingEnvScreen onContinueDemo={signInDemo} />;
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <UpdateNotification />
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
            <Route path="/especialidades" element={<Especialidades />} />
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
