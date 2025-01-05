import { createClient } from '@/lib/supabase/server';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('game-sessions')
      .insert({
        created_by: randomUUID(),
      })
      .select('*')
      .single();

    if (error) {
      console.error('Database error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
