import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { ICONS } from "../constants";
import { triggerHaptic } from "../lib/native";

interface LayoutProps {
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Início", path: "/", icon: <ICONS.Stethoscope size={18} /> },
    {
      label: "RCP",
      path: "/cpr",
      icon: <ICONS.HeartPulse size={18} />,
    },
    {
      label: "Emergência",
      path: "/emergencia",
      icon: <ICONS.Calculator size={18} />,
    },
    {
      label: "Calculadora",
      path: "/calculadora",
      icon: <ICONS.Calculator size={18} />,
    },
    {
      label: "Especialidades",
      path: "/especialidades",
      icon: <ICONS.FileText size={18} />,
    },
  ];

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
    navigate("/auth");
  };

  const handleTabClick = (path: string) => {
    triggerHaptic("light");
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen gradient-primary flex flex-col font-sans selection:bg-purple-500/30">
      {/* Medical Disclaimer Modal - Apple & Google Play Compliance (Guideline 1.4.1) */}
      {showDisclaimer && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[210] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowDisclaimer(false)}
        >
          <div
            className="glass p-6 md:p-8 rounded-3xl max-w-md w-full space-y-4 border border-purple-500/30 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto text-purple-300">
              <ICONS.AlertTriangle size={26} />
            </div>
            <h3 className="text-xl font-bold text-center text-white">
              Aviso Médico Legal & Regulatório
            </h3>
            <div className="text-sm text-white/80 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                O <strong>VetAcademy</strong> é um aplicativo destinado
                exclusivamente a médicos veterinários graduados e estudantes de
                medicina veterinária sob supervisão docente.
              </p>
              <p>
                Os cálculos de doses, protocolos de ressuscitação cardiopulmonar
                (RECOVER) e informações farmacológicas servem como suporte
                rápido à decisão clínica e referência educacional.
              </p>
              <p className="bg-purple-950/50 p-3 rounded-xl border border-purple-800/40 text-xs text-purple-200">
                <strong>Atenção:</strong> O aplicativo não substitui o raciocínio
                médico, exame físico do paciente, diagnósticos laboratoriais ou
                a prescrição médica individualizada. Verifique sempre as doses
                em bula antes da administração.
              </p>
            </div>
            <button
              onClick={() => {
                triggerHaptic("light");
                setShowDisclaimer(false);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-button text-white font-bold transition-all shadow-glow hover:opacity-95"
            >
              Compreendi e Concordo
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="glass p-6 rounded-2xl max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <ICONS.LogOut size={24} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold">Sair da conta?</h3>
              <p className="text-sm text-muted-foreground">
                Você precisará fazer login novamente para acessar o sistema.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Logo - Com suporte a Safe Area no topo (iPhone Notch / Dynamic Island) */}
      <header className="header-gradient pt-safe">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => triggerHaptic("light")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full logo-circle flex items-center justify-center shadow-glow">
              <ICONS.Stethoscope className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                VetAcademy
              </h1>
              <p className="text-xs text-white/60 hidden md:block">
                Base de Conhecimento Veterinário
              </p>
            </div>
          </Link>

          {/* User Menu & Disclaimer button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                triggerHaptic("light");
                setShowDisclaimer(true);
              }}
              className="p-2.5 rounded-xl glass text-purple-300 hover:text-white hover:bg-white/10 transition-all"
              title="Aviso Médico Legal"
              aria-label="Aviso Médico Legal"
            >
              <ICONS.AlertTriangle size={18} />
            </button>
            <button
              onClick={() => {
                triggerHaptic("light");
                setShowLogoutConfirm(true);
              }}
              className="p-2.5 rounded-xl glass icon-pink hover:text-white hover:bg-white/10 transition-all"
              title="Sair"
              aria-label="Perfil e Sair"
            >
              <ICONS.User size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Desktop */}
      <nav className="hidden md:flex px-4 md:px-6 gap-2 pb-4 nav-gradient">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => handleTabClick(item.path)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
              location.pathname === item.path
                ? "tab-active text-white shadow-glow"
                : "tab-inactive text-white hover:text-white"
            }`}
          >
            <span
              className={
                location.pathname === item.path ? "text-white" : "text-white/70"
              }
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Main Content - Adiciona espaço na base para o Bottom Bar em smartphones */}
      <main className="flex-1 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>

      {/* Native-style Mobile Bottom Bar (iOS & Android) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 header-gradient pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleTabClick(item.path)}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
                  isActive
                    ? "text-pink-400 font-bold scale-105"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? "bg-pink-500/20 text-pink-400" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
