'use client';

import { Title } from '@tremor/react';
import Loading from '../../../../../../components/loading';

interface SprintPanelLoadingProps {}

export default function SprintPanelLoading({}: SprintPanelLoadingProps) {
  return (
    <div>
      <Title className="text-2xl">Chargement du Sprint actuel...</Title>
      <Loading className="m-auto" />
    </div>
  );
}
