'use client';

import { useRouter } from 'next/navigation';

export default function DismissButton() {
  const router = useRouter();

  return (
    <button
      className="contents underline text-blue-600"
      onClick={() => {
        router.refresh();
      }}>
      Dismiss →
    </button>
  );
}
