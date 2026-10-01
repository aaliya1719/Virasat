import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { sendChatMessage } from '../lib/api';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  isGuest: true,
  isConfigured: false,
  authModalOpen: false,
  authModalInitialMode: 'signin',
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signInWithPassword: async () => ({ error: null }),
  signUpWithPassword: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
  continueAsGuest: () => {}
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState('signin');

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('[Virasat Auth] Session check error:', error.message);
        }
        if (mounted) {
          setSession(data?.session ?? null);
          setUser(data?.session?.user ?? null);
          setLoading(false);
        }
      } catch (err) {
        console.warn('[Virasat Auth] Session check exception:', err);
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getInitialSession();

    if (!isSupabaseConfigured) {
      return () => {
        mounted = false;
      };
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const openAuthModal = (mode = 'signin') => {
    setAuthModalInitialMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const signInWithPassword = async ({ email, password }) => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          'Supabase credentials are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
        )
      };
    }
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (!result.error) {
      setAuthModalOpen(false);
    }
    return result;
  };

  const signUpWithPassword = async ({ email, password, fullName }) => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error(
          'Supabase credentials are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
        )
      };
    }
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '',
          avatar_url: ''
        }
      }
    });
    if (!result.error && result.data?.session) {
      setAuthModalOpen(false);
    }
    return result;
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      return { error: null };
    }
    const result = await supabase.auth.signOut();
    return result;
  };

  const continueAsGuest = () => {
    setAuthModalOpen(false);
  };

  const isGuest = !user;

  useEffect(() => {
    window.__virasatChat = { send: sendChatMessage };
    return () => {
      delete window.__virasatChat;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isGuest,
      isConfigured: isSupabaseConfigured,
      authModalOpen,
      authModalInitialMode,
      openAuthModal,
      closeAuthModal,
      signInWithPassword,
      signUpWithPassword,
      signOut,
      continueAsGuest
    }),
    [user, session, loading, isGuest, authModalOpen, authModalInitialMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
