'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, links, pathname }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /* Scroll lock */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-locked');
      /* Focus first link */
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => document.body.classList.remove('scroll-locked');
  }, [isOpen]);

  /* Escape to close */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  /* Trap focus */
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-[85vw] max-w-sm bg-ivory shadow-2xl transition-transform duration-400 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-8 py-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="self-end p-2 text-ink"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 mt-10" aria-label="Mobile navigation">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={i === 0 ? firstLinkRef : null}
                onClick={onClose}
                className={`text-2xl font-serif py-3 border-b border-taupe/15 transition-colors ${
                  pathname === link.href
                    ? 'text-orange'
                    : 'text-ink hover:text-orange'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="mt-auto pb-8">
            <Link
              href="/contact?type=wholesale"
              onClick={onClose}
              className="block w-full text-center px-6 py-3 bg-ink text-ivory text-sm tracking-[0.15em] uppercase hover:bg-orange transition-colors"
            >
              Wholesale Enquiry
            </Link>


          </div>
        </div>
      </div>
    </>
  );
}
