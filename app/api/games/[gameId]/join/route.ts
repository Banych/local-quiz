import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const supabase = await createClient();
    const { gameId } = await params;
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    const { data: gameSessionData, error: errorDetails } = await supabase
      .from('game-sessions')
      .select('*')
      .eq('id', gameId)
      .single();

    if (errorDetails) {
      console.error('Database error:', errorDetails.message);
      return NextResponse.json(
        { error: errorDetails.message },
        { status: 500 }
      );
    }

    if (!gameSessionData) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    const playersIds = gameSessionData.players_ids as string[];
    if (playersIds.includes(userId)) {
      return NextResponse.json(
        { error: 'User already joined' },
        { status: 400 }
      );
    }

    const { data: updatedGameSessionData, error: updateError } = await supabase
      .from('game-sessions')
      .update({
        players_ids: [...(gameSessionData.players_ids as string[]), userId],
      })
      .eq('id', gameId)
      .select('*')
      .single();

    if (updateError) {
      console.error('Database error:', updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(updatedGameSessionData, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
