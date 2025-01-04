import { createClient } from "@/lib/supabase/middleware";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return createClient(request);
}
