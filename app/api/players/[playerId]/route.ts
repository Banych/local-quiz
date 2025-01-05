import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  try {
    const { playerId } = await params;

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: playersData, error: playersError } = await supabase
      .from('active-players')
      .select('*')
      .eq('id', playerId)
      .single();

    if (playersError) {
      console.error('Database error:', playersError.message);
      return NextResponse.json(
        { error: playersError.message },
        { status: 500 }
      );
    }

    if (!playersData) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json(playersData, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  try {
    const { playerId } = await params;
    const body = await req.json();

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: playersData, error: playersError } = await supabase
      .from('active-players')
      .update(body)
      .eq('id', playerId)
      .select('*')
      .single();

    if (playersError) {
      console.error('Database error:', playersError.message);
      return NextResponse.json(
        { error: playersError.message },
        { status: 500 }
      );
    }

    if (!playersData) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json(playersData, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  try {
    const { playerId } = await params;

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error: playersError } = await supabase
      .from('active-players')
      .delete()
      .eq('id', playerId);

    if (playersError) {
      console.error('Database error:', playersError.message);
      return NextResponse.json(
        { error: playersError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
