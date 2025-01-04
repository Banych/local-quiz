import { Database } from '@/types/supabase';

export type SessionDTO = Database['public']['Tables']['game-sessions']['Row'];

export type SessionInsertDTO =
  Database['public']['Tables']['game-sessions']['Insert'];

export type SessionUpdateDTO =
  Database['public']['Tables']['game-sessions']['Update'];
