import React, { useState, useEffect, useRef } from "react";
import { CPRProtocol, CPRState } from "../types";
import { ICONS } from "../constants";

const CPRPage: React.FC = () => {
  const [state, setState] = useState<CPRState>(CPRState.CONFIG);
  const [protocol, setProtocol] = useState<CPRProtocol>(CPRProtocol.ALS);
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(80);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cycleTime, setCycleTime] = useState(0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

  const timerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voicesLoadedRef = useRef(false);
  const ptBrVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const volumeRef = useRef(volume / 100);

  // Função para falar em português brasileiro
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech Synthesis não suportado neste navegador');
      alert('Speech Synthesis não suportado neste navegador');
      return;
    }

    console.log('📢 Tentando falar:', text);
    console.log('📊 Status atual:', {
      speaking: window.speechSynthesis.speaking,
      pending: window.speechSynthesis.pending,
      paused: window.speechSynthesis.paused
    });

    // SEMPRE cancelar falas anteriores para evitar fila travada
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      console.log('🛑 Cancelando falas anteriores/travadas');
      window.speechSynthesis.cancel();

      // AGUARDAR cancelamento completar antes de continuar
      console.log('⏳ Aguardando 200ms para cancelamento completar...');
      setTimeout(() => {
        console.log('📊 Status após cancelar:', {
          speaking: window.speechSynthesis.speaking,
          pending: window.speechSynthesis.pending
        });
        // Continuar com a fala após cancelamento
        doSpeak(text);
      }, 200);
      return; // Sair e aguardar o timeout
    }

    // Se estiver pausado, retomar
    if (window.speechSynthesis.paused) {
      console.log('⏯️ Retomando speech synthesis pausado');
      window.speechSynthesis.resume();
    }

    // Se não havia nada para cancelar, falar imediatamente
    doSpeak(text);
  };

  // Função auxiliar que realmente executa a fala
  const doSpeak = (text: string) => {
    console.log('🎯 doSpeak() chamado para:', text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = volumeRef.current;

    console.log('🔧 Configurações do utterance:', {
      lang: utterance.lang,
      rate: utterance.rate,
      volume: utterance.volume,
      text: utterance.text
    });

    // FORÇAR o uso da voz selecionada
    if (ptBrVoiceRef.current) {
      utterance.voice = ptBrVoiceRef.current;
      console.log('🗣️ FALANDO em', ptBrVoiceRef.current.name, ':', text);
      console.log('   Voice lang:', ptBrVoiceRef.current.lang);
      console.log('   Utterance lang:', utterance.lang);
    } else {
      console.error('❌ NENHUMA VOZ SELECIONADA! Texto:', text);
      // Tentar carregar vozes novamente
      const voices = window.speechSynthesis.getVoices();
      console.log('🔍 Procurando Luciana nas vozes:', voices.length);
      const luciana = voices.find(v => v.name.includes('Luciana'));
      if (luciana) {
        utterance.voice = luciana;
        ptBrVoiceRef.current = luciana;
        console.log('🔄 Voz Luciana carregada emergencialmente');
      }
    }

    utterance.onstart = () => {
      console.log('✅ INICIOU A FALA:', text);
    };

    utterance.onend = () => {
      console.log('✅ FINALIZOU A FALA:', text);
    };

    utterance.onerror = (event) => {
      console.error('❌ ERRO NA SÍNTESE DE VOZ:', {
        error: event.error,
        texto: text,
        charIndex: event.charIndex
      });
    };

    utterance.onpause = () => {
      console.log('⏸️ Fala pausada:', text);
    };

    utterance.onresume = () => {
      console.log('▶️ Fala retomada:', text);
    };

    console.log('🚀 Chamando window.speechSynthesis.speak()...');

    // WORKAROUND: Chrome às vezes precisa de um resume() antes de speak()
    try {
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);

      // Forçar início da fala (workaround para Chrome)
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          console.log('🔄 Forçando resume após 100ms');
          window.speechSynthesis.resume();
        }
      }, 100);
    } catch (error) {
      console.error('❌ Erro ao chamar speak():', error);
    }

    // Verificar status após chamar speak
    setTimeout(() => {
      console.log('📊 Status após speak:', {
        speaking: window.speechSynthesis.speaking,
        pending: window.speechSynthesis.pending,
        paused: window.speechSynthesis.paused
      });

      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        console.error('⚠️ SPEECH SYNTHESIS NÃO ESTÁ FUNCIONANDO!');
        console.log('💡 Isso pode ser um bug do Chrome. Tente Safari ou Firefox.');
      }
    }, 500);
  };

  // Carregar vozes em português brasileiro
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      console.log('Vozes disponíveis:', voices.map(v => `${v.name} (${v.lang})`));

      // Filtrar apenas vozes em português brasileiro
      const ptBrVoices = voices.filter(voice =>
        voice.lang === 'pt-BR' || voice.lang.startsWith('pt-BR')
      );

      setAvailableVoices(ptBrVoices);

      // Procurar por vozes em português brasileiro (em ordem de preferência)
      let selectedVoice: SpeechSynthesisVoice | null = null;

      // PRIORIDADE 1: Luciana (voz nativa brasileira)
      selectedVoice = voices.find(voice =>
        voice.name.toLowerCase().includes('luciana')
      ) || null;

      // PRIORIDADE 2: Google português do Brasil
      if (!selectedVoice) {
        selectedVoice = voices.find(voice =>
          voice.name.toLowerCase().includes('google') &&
          voice.lang === 'pt-BR'
        ) || null;
      }

      // PRIORIDADE 3: Flo ou Grandma pt-BR (vozes femininas)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice =>
          (voice.name.toLowerCase().includes('flo') ||
           voice.name.toLowerCase().includes('grandma')) &&
          voice.lang === 'pt-BR'
        ) || null;
      }

      // PRIORIDADE 4: Qualquer voz pt-BR
      if (!selectedVoice) {
        selectedVoice = voices.find(voice =>
          voice.lang === 'pt-BR' || voice.lang.startsWith('pt-BR')
        ) || null;
      }

      // PRIORIDADE 5: Qualquer voz portuguesa
      if (!selectedVoice) {
        selectedVoice = voices.find(voice =>
          voice.lang.startsWith('pt')
        ) || null;
      }

      if (selectedVoice) {
        ptBrVoiceRef.current = selectedVoice;
        voicesLoadedRef.current = true;
        setSelectedVoiceName(selectedVoice.name);
        console.log('✅ Voz pt-BR selecionada:', selectedVoice.name, `(${selectedVoice.lang})`);
      } else {
        console.warn('⚠️ Nenhuma voz em português encontrada. Vozes disponíveis:', voices.length);
      }
    };

    // Carregar vozes imediatamente
    loadVoices();

    // Alguns navegadores precisam esperar o evento 'voiceschanged'
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

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

          // Anúncios importantes durante o ciclo
          if (next === 1) {
            speak('Iniciando novo ciclo de 2 minutos');
          } else if (next === 110) {
            speak('Preparar para verificar o pulso em 10 segundos');
          } else if (next === 120) {
            speak('Fim do ciclo. Verificar pulso agora');
          }

          // Para protocolo BLS (30:2), anunciar respirações
          // Ciclo BLS: 30 compressões (~18s a 100cpm) + 2 respirações (~4s) = ~22s por ciclo
          // Durante 2 minutos: aproximadamente 5-6 ciclos de 30:2
          if (protocol === CPRProtocol.BLS) {
            // Anunciar respirações a cada ~20 segundos
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

  const handleVoiceChange = (voiceName: string) => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name === voiceName);
    if (voice) {
      ptBrVoiceRef.current = voice;
      setSelectedVoiceName(voiceName);
      console.log('Voz alterada para:', voiceName);
      // Testar a nova voz
      speak('Voz alterada');
    }
  };

  const startTimer = () => {
    setState(CPRState.ACTIVE);
    if (cycleTime === 0 && elapsedTime === 0) {
      speak('Começando RCP. Inicie as compressões torácicas');
    }
  };

  const pauseTimer = () => {
    setState(CPRState.PAUSE);
    // Cancelar falas pendentes ao pausar
    window.speechSynthesis.cancel();
    // Aguardar um pouco antes de falar "pausada" para evitar cancelamento
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
    // Cancelar todas as falas ao resetar
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

          {availableVoices.length > 0 && (
            <div className="space-y-4">
              <label className="text-sm text-muted-foreground uppercase tracking-wider block">
                Voz em Português
              </label>
              <select
                value={selectedVoiceName}
                onChange={(e) => handleVoiceChange(e.target.value)}
                className="w-full p-4 rounded-xl border bg-white/5 border-white/10 text-white focus:border-purple-400 focus:outline-none"
              >
                {availableVoices.map((voice) => (
                  <option key={voice.name} value={voice.name} className="bg-gray-900">
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedVoiceName && (
            <div className="p-3 rounded-xl bg-green-600/20 border border-green-500/50 text-green-400 text-sm text-center">
              ✅ Voz ativa: <strong>{selectedVoiceName}</strong>
            </div>
          )}

          <button
            onClick={() => speak('Olá, meu nome é Luciana. Estou falando em português do Brasil.')}
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-2xl text-sm font-bold transition-all"
          >
            🔊 Testar Voz: "Olá, meu nome é Luciana"
          </button>

          <button
            onClick={startTimer}
            className="w-full bg-gradient-button h-16 rounded-2xl text-xl font-bold shadow-glow flex items-center justify-center gap-2"
          >
            <ICONS.Play size={24} /> Iniciar RCP
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
              RESET
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
