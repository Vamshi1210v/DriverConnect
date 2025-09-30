import { supabase } from './supabase';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  await supabase.auth.signOut();
}

// Listen to auth changes
export function onAuthChange(cb: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    cb(event, session);
  });
}
