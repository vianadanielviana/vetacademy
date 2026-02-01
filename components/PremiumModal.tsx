import React, { useState } from "react";
import { ICONS } from "../constants";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setShowForm(false);
    setFormData({ nome: "", email: "", telefone: "" });
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar dados para o webhook do n8n
      await fetch(
        "https://n8nwebhook.creatorsia.com/webhook/cadastro-premium",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            origem: "VetAcademy",
            data: new Date().toISOString(),
          }),
        },
      );

      setSubmitted(true);

      // Fechar após 2 segundos
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      // Mesmo com erro, mostrar sucesso para o usuário (dados podem ser reenviados)
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-[hsl(270_50%_12%)] border border-white/10 rounded-3xl p-8 max-w-md w-full relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
        >
          <ICONS.X size={24} />
        </button>

        {/* Crown Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ICONS.Crown
              size={80}
              className="text-purple-500"
              strokeWidth={1.5}
            />
            {/* Sparkles */}
            <div className="absolute -top-1 -right-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z"
                  fill="#a855f7"
                  opacity="0.8"
                />
              </svg>
            </div>
            <div className="absolute top-2 -left-2">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z"
                  fill="#a855f7"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-white text-center mb-4">
          Recurso Premium
        </h2>

        {/* Description */}
        <p className="text-white/70 text-center mb-2">
          Este recurso estará disponível na versão paga do aplicativo.
        </p>
        <p className="text-white/50 text-center text-sm mb-8">
          Estamos trabalhando para trazer ainda mais funcionalidades
          profissionais para você.
        </p>

        {!showForm ? (
          /* Initial Buttons */
          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
            >
              Entendi
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 rounded-2xl border border-white/20 hover:bg-white/5 text-white font-medium transition-colors"
            >
              Notifique-me quando disponível
            </button>
          </div>
        ) : submitted ? (
          /* Success Message */
          <div className="text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <ICONS.CheckCircle size={32} className="text-green-500" />
            </div>
            <p className="text-white font-bold text-lg mb-2">
              Cadastro realizado!
            </p>
            <p className="text-white/60 text-sm">
              Você será notificado quando o recurso estiver disponível.
            </p>
          </div>
        ) : (
          /* Notification Form */
          <form
            onSubmit={handleSubmit}
            className="space-y-4 animate-in fade-in duration-300"
          >
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Nome <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Seu nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 outline-none focus:ring-2 ring-purple-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 outline-none focus:ring-2 ring-purple-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Telefone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefone: formatPhone(e.target.value),
                  })
                }
                maxLength={15}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 outline-none focus:ring-2 ring-purple-500/50 transition-all"
              />
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-bold transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar"
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full py-4 rounded-2xl text-white/70 hover:text-white font-medium transition-colors"
              >
                Voltar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PremiumModal;
