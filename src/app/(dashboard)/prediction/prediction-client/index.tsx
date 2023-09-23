'use client';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';
import {
  getIssuesFromBacklog,
  sendIssues,
} from '@/app/(dashboard)/prediction/prediction-client/service';
import { Board } from '@/lib/board.service';
import ButtonWithLoading from '@/components/button-with-loading';
import { Issue } from '@/lib/issue/issue.service';

interface PredictionClientProps {
  board: Board;
  accessToken: string;
  cloudId: string;
}

export default function PredictionClient({ board, accessToken, cloudId }: PredictionClientProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setLoading(true);
    getIssuesFromBacklog(board.id, accessToken, cloudId).then((issues) => {
      setIssues(issues);
      setLoading(false);
    });
  }, [accessToken, board.id, cloudId]);

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
      {issues.map((issue) => (
        <p key={issue.key}>{issue.key}</p>
      ))}
    </div>
  );
}
