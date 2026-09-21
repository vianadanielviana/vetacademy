import { useState, useEffect } from "react";
import { supabase, isMissingCredentials } from "./supabase";
import type { User, Session, AuthError } from "@supabase/supabase-js";

const DEMO_USER: User = {
  id: "demo-vet-user",
  app_metadata: { provider: "email" },
  user_metadata: { name: "Veterinário Convidado" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "veterinario@vetacademy.app",
};

const DEMO_SESSION: Session = {
  access_token: "demo-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "demo-refresh",
  user: DEMO_USER,
};

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isDemo: boolean;
}

interface AuthActions {
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error: AuthError | null }>;
  signInDemo: () => void;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if user previously chosen demo mode
    const storedDemo = localStorage.getItem("vetacademy_demo_mode") === "true";
    if (storedDemo) {
      setUser(DEMO_USER);
      setSession(DEMO_SESSION);
      setIsDemo(true);
      setLoading(false);
      return;
    }

    if (isMissingCredentials) {
      setLoading(false);
      return;
    }

    // Get initial session from Supabase
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInDemo = () => {
    localStorage.setItem("vetacademy_demo_mode", "true");
    setUser(DEMO_USER);
    setSession(DEMO_SESSION);
    setIsDemo(true);
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    if (isMissingCredentials || email.toLowerCase().includes("demo")) {
      signInDemo();
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch {
      // If network fails or offline, provide graceful fallback
      return {
        error: {
          name: "AuthError",
          message: "Erro de conexão com o Supabase. Você pode usar o modo Demonstração.",
        } as AuthError,
      };
    }
  };

  const signUp = async (email: string, password: string) => {
    if (isMissingCredentials) {
      signInDemo();
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://www.vetacademy.app/#/",
        },
      });
      return { error };
    } catch {
      return {
        error: {
          name: "AuthError",
          message: "Erro ao criar conta no Supabase.",
        } as AuthError,
      };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("vetacademy_demo_mode");
    setIsDemo(false);
    setUser(null);
    setSession(null);
    try {
      if (!isMissingCredentials) {
        await supabase.auth.signOut();
      }
    } catch {
      // ignore
    }
  };

  const resetPassword = async (email: string) => {
    if (isMissingCredentials) {
      return { error: null };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.vetacademy.app/#/auth",
    });
    return { error };
  };

  return {
    user,
    session,
    loading,
    isAuthenticated: !!session,
    isDemo,
    signIn,
    signUp,
    signInDemo,
    signOut,
    resetPassword,
  };
}
