'use client';

import { Select, SelectItem } from '@tremor/react';
import { Board } from '@/lib/board.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface BoardSelectorProps {
  boardId: string;
  boards: Board[];
}

export default function BoardSelector({ boards, boardId }: BoardSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  createQueryString('boardId', boardId);

  return (
    <div className="flex items-center gap-2">
      <div>Board actuel: </div>
      <Select
        className="w-14"
        value={`${boardId}`}
        onValueChange={(boardId) =>
          router.push(`${pathname}?${createQueryString('boardId', boardId)}`)
        }>
        {boards.map((board) => (
          <SelectItem key={board.id} value={`${board.id}`}>
            {board.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
