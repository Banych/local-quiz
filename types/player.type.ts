import { Database } from "@/types/supabase";

export type PlayerDTO = Database["public"]["Tables"]["active-players"]["Row"];

export type PlayerInsertDTO =
  Database["public"]["Tables"]["active-players"]["Insert"];

type PlayerUpdateDTO =
            Database["public"]["Tables"]["active-players"]["Update"];
