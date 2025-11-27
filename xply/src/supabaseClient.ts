
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://amzbqjxieldvpkqcgsol.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_doSUEY9_3_Aaab82IsLxdA_LKOUljzy';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript para nuestras tablas
export interface Profile {
  id: string;
  email: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  user_id: string;
  username: string;
  avatar_url: string | null;
  title: string;
  body: string;
  images: string[];
  game: string | null;
  likes: number;
  created_at: string;
  updated_at: string;
  // Relaciones calculadas
  has_liked?: boolean;
  comments_count?: number;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: string;
  username: string;
  avatar_url: string | null;
  body: string;
  created_at: string;
}

export interface Like {
  id: number;
  post_id: number;
  user_id: string;
  created_at: string;
}