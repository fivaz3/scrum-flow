'use client';
import { useState } from 'react';
import Loading from '@/components/loading';
import { sendIssues } from '@/app/(dashboard)/prediction/prediction-client/service';
import { Board } from '@/lib/board.service';
import ButtonWithLoading from '@/components/button-with-loading';

interface PredictionClientProps {
  board: Board;
  accessToken: string;
  cloudId: string;
}

export default function PredictionClient({ board, accessToken, cloudId }: PredictionClientProps) {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <div className="text-2xl font-bold">
      PredictionClient
      <ButtonWithLoading
        onClick={async () => {
          setLoading(true);
          await sendIssues(board, accessToken, cloudId);
          setLoading(false);
        }}
        isLoading={isLoading}>
        Envoyer les Issues
      </ButtonWithLoading>
      {isLoading && <Loading></Loading>}
    </div>
  );
}
