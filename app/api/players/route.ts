import { NextRequest, NextResponse } from 'next/server';
import { PlayerFormType } from '@/types/player.type';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { name, avatar_url, status_message } =
      (await req.json()) as PlayerFormType;

    if (!name) {
      console.error('Name is required', { name, avatar_url, status_message });
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('active-players')
      .insert([{ name, avatar_url, status_message }])
      .select('*')
      .single();

    if (error) {
      console.error('Database error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      console.error('Player not created', { name, avatar_url, status_message });
      return NextResponse.json(
        { error: 'Player not created' },
        { status: 500 }
      );
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
