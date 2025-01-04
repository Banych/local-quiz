import React from 'react';
import { createClient } from '@/lib/supabase/server';

export const QuestionsList: React.FC = async () => {
  const supabase = await createClient();

  const { data } = await supabase.from('questions-pull').select('*');

  return (
    <>
      {data?.map((question) => (
        <div key={question.id}>
          <h2>{question.question}</h2>
          <p>{JSON.stringify(question.correct_answers)}</p>
        </div>
      ))}
    </>
  );
};
