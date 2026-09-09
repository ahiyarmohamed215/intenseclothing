'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import Logo from '@/src/components/ui/Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/our-craft', label: 'Our Craft' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const isHome = pathname === '/';
  const headerBg = scrolled || !isHome
    ? 'bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_rgba(167,151,123,0.15)]'
    : 'bg-transparent';
  const textColor = scrolled || !isHome ? 'text-ink' : 'text-white';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
        role="banner"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              aria-label="INTENSE Clothing — Home"
            >
              <Logo height={32} className="md:h-[38px]" />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm tracking-wide nav-link ${textColor} transition-colors duration-300 ${
                    pathname === link.href ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-current" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact?type=wholesale"
                className={`hidden md:inline-flex items-center px-5 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-300 ${
                  scrolled || !isHome
                    ? 'border-ink text-ink hover:bg-ink hover:text-ivory'
                    : 'border-white/60 text-white hover:bg-white hover:text-ink'
                }`}
              >
                Wholesale Enquiry
              </Link>

              {/* Mobile hamburger */}
              <button
                className={`md:hidden p-2 ${textColor} transition-colors`}
                onClick={toggleMobile}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {mobileOpen ? (
                    <>
                      <line x1="6" y1="6" x2="18" y2="18" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="17" x2="20" y2="17" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        pathname={pathname}
      />
    </>
  );
}
