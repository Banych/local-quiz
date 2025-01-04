import { Database } from "@/types/supabase";

export type QuestionDTO = Database["public"]["Tables"]["questions-pull"]["Row"];

export type QuestionInsertDTO =
  Database["public"]["Tables"]["questions-pull"]["Insert"];

export type QuestionUpdateDTO =
  Database["public"]["Tables"]["questions-pull"]["Update"];
