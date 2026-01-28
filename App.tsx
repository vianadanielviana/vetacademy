import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/useAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CPRPage from "./pages/CPRPage";
import EmergencyCalculator from "./pages/EmergencyCalculator";
import Medications from "./pages/Medications";
import Calculator from "./pages/Calculator";
import Content from "./pages/Content";
import Auth from "./pages/Auth";

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

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
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
  );
};

export default App;
