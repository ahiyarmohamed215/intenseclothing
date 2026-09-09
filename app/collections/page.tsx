import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse shorts, denims and trousers from INTENSE Clothing.',
};

import CollectionsPage from './page-client';

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-ink/40">Loading collections…</div>}>
      <CollectionsPage />
    </Suspense>
  );
}
