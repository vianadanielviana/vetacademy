import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";
import { ICONS } from "../constants";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (showForgotPassword) {
        // Handle password reset
        const { error } = await resetPassword(email);
        if (error) {
          setError(translateError(error.message));
        } else {
          setSuccess(
            "E-mail de recuperação enviado! Verifique sua caixa de entrada.",
          );
          setShowForgotPassword(false);
        }
      } else if (isLogin) {
        // Handle login
        const { error } = await signIn(email, password);
        if (error) {
          setError(translateError(error.message));
        } else {
          navigate("/");
        }
      } else {
        // Handle sign up
        const { error } = await signUp(email, password);
        if (error) {
          setError(translateError(error.message));
        } else {
          setSuccess(
            "Conta criada! Verifique seu e-mail para confirmar o cadastro.",
          );
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError("Erro ao processar requisição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Translate common Supabase errors to Portuguese
  const translateError = (message: string): string => {
    const translations: Record<string, string> = {
      "Invalid login credentials": "E-mail ou senha incorretos",
      "Email not confirmed":
        "E-mail não confirmado. Verifique sua caixa de entrada.",
      "User already registered": "Este e-mail já está cadastrado",
      "Password should be at least 6 characters":
        "A senha deve ter pelo menos 6 caracteres",
      "Unable to validate email address: invalid format":
        "Formato de e-mail inválido",
      "Email rate limit exceeded": "Muitas tentativas. Aguarde alguns minutos.",
    };
    return translations[message] || message;
  };

  const resetForm = () => {
    setError(null);
    setSuccess(null);
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(var(--background))] overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-600/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-md glass p-8 rounded-3xl relative z-10 space-y-6 animate-in zoom-in-95 duration-500 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <ICONS.Stethoscope size={32} />
          </div>
          <h1 className="text-3xl font-bold">VetAcademy</h1>
          <p className="text-muted-foreground">
            {showForgotPassword
              ? "Recuperar senha"
              : "Sua plataforma avançada de suporte veterinário"}
          </p>
        </div>

        {/* Tab Switcher - only show when not in forgot password mode */}
        {!showForgotPassword && (
          <div className="flex bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                isLogin
                  ? "bg-purple-600 shadow-glow"
                  : "hover:bg-white/5 text-muted-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                !isLogin
                  ? "bg-purple-600 shadow-glow"
                  : "hover:bg-white/5 text-muted-foreground"
              }`}
            >
              Cadastro
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-sm text-red-200 flex items-center gap-2">
            <ICONS.AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-3 text-sm text-green-200 flex items-center gap-2">
            <ICONS.CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field - only for signup */}
          {!isLogin && !showForgotPassword && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium ml-1">Nome Completo</label>
              <input
                type="text"
                placeholder="Dr. Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-purple-500/50 transition-all"
              />
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium ml-1">E-mail</label>
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-purple-500/50 transition-all"
            />
          </div>

          {/* Password field - not shown in forgot password mode */}
          {!showForgotPassword && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium">Senha</label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-xs text-purple-400 hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-purple-500/50 transition-all"
              />
              {!isLogin && (
                <p className="text-xs text-muted-foreground ml-1">
                  Mínimo de 6 caracteres
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-button h-14 rounded-xl font-bold text-lg shadow-glow hover:scale-[1.02] active:scale-95 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processando...</span>
              </>
            ) : showForgotPassword ? (
              "Enviar E-mail de Recuperação"
            ) : isLogin ? (
              "Entrar"
            ) : (
              "Criar Conta"
            )}
          </button>

          {/* Back to login link - only in forgot password mode */}
          {showForgotPassword && (
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setError(null);
                setSuccess(null);
              }}
              className="w-full text-center text-sm text-purple-400 hover:underline"
            >
              Voltar para o login
            </button>
          )}
        </form>

        {/* Terms */}
        {!showForgotPassword && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Ao continuar, você concorda com nossos <br />
              <button className="text-purple-400 hover:underline">
                Termos de Uso
              </button>{" "}
              e{" "}
              <button className="text-purple-400 hover:underline">
                Privacidade
              </button>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
