import Link from 'next/link';
import { siteConfig } from '@/src/config/site';
import Logo from '@/src/components/ui/Logo';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/our-craft', label: 'Our Craft' },
  { href: '/contact', label: 'Contact' },
];

const categoryLinks = [
  { href: '/collections?category=Shorts', label: 'Shorts' },
  { href: '/collections?category=Denims', label: 'Denims' },
  { href: '/collections?category=Trousers', label: 'Trousers' },
];

/* Inline SVG icons for socials */
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppMessage)}`;

  return (
    <footer className="bg-ink text-ivory/80" role="contentinfo">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo height={36} showTagline taglineColor="#A7977B" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ivory/50 max-w-xs">
              {siteConfig.description}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/40 hover:text-orange transition-colors"
                  aria-label={`Follow INTENSE on ${social.name}`}
                >
                  {social.name === 'Instagram' && <InstagramIcon />}
                  {social.name === 'TikTok' && <TikTokIcon />}
                </a>
              ))}
              {siteConfig.enableWhatsApp && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/40 hover:text-green-400 transition-colors"
                  aria-label="Message INTENSE on WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="label-sm text-ivory/40 mb-4">Navigate</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="label-sm text-ivory/40 mb-4">Collections</h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="label-sm text-ivory/40 mb-4">Contact</h3>
            <address className="not-italic space-y-2 text-sm text-ivory/60">
              <p>{siteConfig.address}</p>
              <p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="hover:text-orange transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p className="text-ivory/40">{siteConfig.openingHours}</p>
            </address>

            {/* WhatsApp CTA in contact column */}
            {siteConfig.enableWhatsApp && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-green-500/30 text-green-400 text-xs tracking-wide uppercase hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/30">
            &copy; {currentYear} {siteConfig.brandName}. All rights reserved.
          </p>
          {siteConfig.marketingBy && (
            <p className="text-xs text-ivory/20">
              Developed by{' '}
              <a
                href={`https://${siteConfig.marketingBy.url.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/40 hover:text-orange transition-colors"
              >
                {siteConfig.marketingBy.name}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
