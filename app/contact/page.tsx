import { Suspense } from 'react';
import type { Metadata } from 'next';
import ContactPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with INTENSE Clothing for wholesale enquiries, product information, or to discuss your retail needs.',
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-ink/40">Loading…</div>}>
      <ContactPageClient />
    </Suspense>
  );
}
