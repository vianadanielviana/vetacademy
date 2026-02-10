import React, { useState, useEffect, useRef } from "react";
import { CPRProtocol, CPRState } from "../types";
import { ICONS } from "../constants";

const CPRPage: React.FC = () => {
  const [state, setState] = useState<CPRState>(CPRState.CONFIG);
  const [protocol, setProtocol] = useState<CPRProtocol>(CPRProtocol.ALS);
  const [volume, setVolume] = useState(80);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cycleTime, setCycleTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(volume / 100);

  // Função para falar em português brasileiro
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.volume = volumeRef.current;
    window.speechSynthesis.speak(utterance);
  };

  // Inicializar áudio
  useEffect(() => {
    audioRef.current = new Audio("/cpr-audio.m4a");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Controlar volume
  useEffect(() => {
    volumeRef.current = volume / 100;
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Controlar play/pause do áudio
  useEffect(() => {
    if (audioRef.current) {
      if (state === CPRState.ACTIVE) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [state]);

  // Timer para contagem
  useEffect(() => {
    if (state === CPRState.ACTIVE) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        setCycleTime((prev) => {
          const next = prev + 1;

          if (next === 1) {
            speak('Iniciando novo ciclo de 2 minutos');
          } else if (next === 110) {
            speak('Preparar para verificar o pulso em 10 segundos');
          } else if (next === 120) {
            speak('Fim do ciclo. Verificar pulso agora');
          }

          if (protocol === CPRProtocol.BLS) {
            if (next === 18 || next === 40 || next === 62 || next === 84 || next === 106) {
              speak('Duas respirações');
            }
          }

          if (next >= 120) {
            return 0;
          }
          return next;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [state, protocol]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setState(CPRState.ACTIVE);
    if (cycleTime === 0 && elapsedTime === 0) {
      speak('Começando RCP. Inicie as compressões torácicas');
    }
  };

  const pauseTimer = () => {
    setState(CPRState.PAUSE);
    window.speechSynthesis.cancel();
    setTimeout(() => {
      speak('RCP pausada');
    }, 100);
  };

  const resetTimer = () => {
    setState(CPRState.CONFIG);
    setElapsedTime(0);
    setCycleTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
  };

  const progress = (cycleTime / 120) * 100;

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-8rem)] flex flex-col justify-center gap-8 animate-in slide-in-from-bottom duration-500 font-rubik">
      {state === CPRState.CONFIG ? (
        <div className="glass p-8 rounded-3xl space-y-8">
          <h2 className="text-2xl font-bold text-center">
            Configuração de RCP
          </h2>

          <div className="space-y-4">
            <label className="text-sm text-muted-foreground uppercase tracking-wider block">
              Protocolo
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setProtocol(CPRProtocol.ALS)}
                className={`p-4 rounded-xl border transition-all ${protocol === CPRProtocol.ALS ? "bg-purple-600 border-purple-400" : "bg-white/5 border-white/10"}`}
              >
                ALS (Contínuo)
              </button>
              <button
                onClick={() => setProtocol(CPRProtocol.BLS)}
                className={`p-4 rounded-xl border transition-all ${protocol === CPRProtocol.BLS ? "bg-purple-600 border-purple-400" : "bg-white/5 border-white/10"}`}
              >
                BLS (30:2)
              </button>
            </div>
          </div>

          <button
            onClick={startTimer}
            className="w-full bg-gradient-button h-16 rounded-2xl text-xl font-bold shadow-glow flex items-center justify-center gap-2"
          >
            <ICONS.Play size={24} /> INICIAR
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          {/* Timer Circle */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-white/10 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className={`fill-none transition-all duration-1000 ${state === CPRState.ACTIVE ? "stroke-red-500" : "stroke-yellow-500"}`}
                strokeWidth="8"
                strokeDasharray="283%"
                strokeDashoffset={`${283 - (283 * progress) / 100}%`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10 space-y-2">
              <div className="text-6xl md:text-7xl font-bold">
                {formatTime(cycleTime)}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">
                Tempo Total: {formatTime(elapsedTime)}
              </div>
            </div>
          </div>

          <div className="w-full glass p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Ciclo de 2 min
              </span>
              <span className="text-xs text-purple-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-button transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4 w-full">
            {state === CPRState.ACTIVE ? (
              <button
                onClick={pauseTimer}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 h-16 rounded-2xl text-xl font-bold text-black"
              >
                PAUSAR
              </button>
            ) : (
              <button
                onClick={startTimer}
                className="flex-1 bg-green-600 hover:bg-green-700 h-16 rounded-2xl text-xl font-bold"
              >
                RETOMAR
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 bg-red-600/20 hover:bg-red-600 border border-red-500/50 rounded-2xl text-red-500 hover:text-white transition-all"
            >
              REINICIAR
            </button>
          </div>

          <div className="w-full glass p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Volume do Áudio</span>
              <span>{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CPRPage;
