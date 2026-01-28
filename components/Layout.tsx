import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { ICONS } from "../constants";

interface LayoutProps {
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Início", path: "/", icon: <ICONS.Stethoscope size={18} /> },
    {
      label: "RCP / Recuperação",
      path: "/cpr",
      icon: <ICONS.HeartPulse size={18} />,
    },
    {
      label: "Calculadora Emergência",
      path: "/emergencia",
      icon: <ICONS.Calculator size={18} />,
    },
    {
      label: "Medicamentos",
      path: "/medicamentos",
      icon: <ICONS.Pill size={18} />,
    },
    {
      label: "Calculadoras Gerais",
      path: "/calculadora",
      icon: <ICONS.Calculator size={18} />,
    },
  ];

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
    navigate("/auth");
  };

  return (
    <div className="min-h-screen gradient-primary flex flex-col font-sans selection:bg-purple-500/30">
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

      {/* Header with Logo - LOVABLE STYLE (semi-transparente) */}
      <header className="header-gradient">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          {/* Logo - círculo com borda rosa */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full logo-circle flex items-center justify-center shadow-glow">
              <ICONS.Stethoscope className="text-white" size={24} />
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

          {/* User Menu - ícones rosa/magenta */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 md:hidden icon-pink hover:bg-white/10 rounded-lg transition-colors"
            >
              <ICONS.Menu size={24} />
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="p-2.5 rounded-xl glass icon-pink hover:text-white hover:bg-white/10 transition-all"
              title="Sair"
            >
              <ICONS.User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Desktop (fora do header para ter opacidade própria) */}
      <nav className="hidden md:flex px-4 md:px-6 gap-2 pb-4 nav-gradient">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
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

      {/* Mobile Navigation Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] md:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-[85%] max-w-sm h-full header-gradient p-6 flex flex-col gap-6 border-r border-white/10 shadow-2xl animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full logo-circle flex items-center justify-center">
                  <ICONS.Stethoscope className="text-white" size={20} />
                </div>
                <span className="text-xl font-black text-white">
                  VetAcademy
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors icon-pink"
              >
                <ICONS.X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                    location.pathname === item.path
                      ? "tab-active font-bold text-white"
                      : "tab-inactive text-white hover:text-white"
                  }`}
                >
                  <span
                    className={
                      location.pathname === item.path
                        ? "text-white"
                        : "text-white/70"
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="text-base">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-auto">
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              >
                <ICONS.LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
