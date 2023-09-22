'use client';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';
import { sendIssues } from '@/app/(dashboard)/prediction/prediction-client/service';
import { Board } from '@/lib/board.service';

interface PredictionClientProps {
  board: Board;
  accessToken: string;
  cloudId: string;
}

export default function PredictionClient({ board, accessToken, cloudId }: PredictionClientProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    sendIssues(board, accessToken, cloudId).then(() => setLoading(false));
  }, [board, accessToken, cloudId]);
  return (
    <div className="text-2xl font-bold">
      PredictionClient
      {isLoading && <Loading></Loading>}
    </div>
  );
}
