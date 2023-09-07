'use client';

import { Title } from '@tremor/react';
import LoadingBar from '@/components/LoadingBar';

export interface SprintPanelLoadingProps {}

export default function SprintPanelLoading({}: SprintPanelLoadingProps) {
  return (
    <div>
      <Title className="text-2xl">Chargement du Sprint actuel...</Title>
      <LoadingBar className="m-auto" />
    </div>
  );
}
