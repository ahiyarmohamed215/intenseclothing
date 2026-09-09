'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/src/config/site';
import { products } from '@/src/data/products';

const enquiryTypes = [
  'General Enquiry',
  'Wholesale / Retail Partnership',
  'Product Information',
  'Custom Manufacturing',
  'Other',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  product: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';
  const preselectedType = searchParams.get('type') === 'wholesale'
    ? 'Wholesale / Retail Partnership'
    : '';

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    enquiryType: preselectedType || 'General Enquiry',
    product: preselectedProduct,
    message: preselectedProduct
      ? `I'm interested in learning more about the ${preselectedProduct}.`
      : '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Please enter a message.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (siteConfig.email) {
      /* Prepare mailto link */
      const subject = encodeURIComponent(
        `${form.enquiryType} — ${siteConfig.brandName}`
      );
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nEnquiry Type: ${form.enquiryType}\nProduct: ${form.product || 'Not specified'}\n\nMessage:\n${form.message}`
      );
      window.open(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`);
    }

    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="label-sm text-taupe mb-3">Get in Touch</p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl mb-6">
            Contact <span className="text-orange">INTENSE</span>
          </h1>
          <p className="text-ink/60 text-base md:text-lg leading-relaxed">
            Whether you&apos;re a retailer looking to stock our range or have
            questions about our products, we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="label-sm text-taupe mb-3">Visit Us</h2>
                <address className="not-italic text-ink/70 leading-relaxed">
                  <p className="font-medium text-ink">
                    {siteConfig.brandName}
                  </p>
                  <p>{siteConfig.address}</p>
                </address>
              </div>

              <div>
                <h2 className="label-sm text-taupe mb-3">Call Us</h2>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="text-lg font-medium text-ink hover:text-orange transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>

              <div>
                <h2 className="label-sm text-taupe mb-3">Hours</h2>
                <p className="text-ink/70">{siteConfig.openingHours}</p>
              </div>

              {siteConfig.enableWhatsApp && (
                <div>
                  <h2 className="label-sm text-taupe mb-3">WhatsApp</h2>
                  <a
                    href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink hover:text-orange transition-colors"
                  >
                    Message us on WhatsApp
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17l9.2-9.2M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="p-8 border border-taupe/20 text-center">
                {siteConfig.email ? (
                  <>
                    <p className="font-editorial text-2xl mb-4">
                      Thank you for your enquiry
                    </p>
                    <p className="text-ink/60 text-sm mb-2">
                      Your email client should have opened with the prepared message.
                      Please send it to complete your enquiry.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-editorial text-2xl mb-4">
                      Online submission is not yet connected
                    </p>
                    <p className="text-ink/60 text-sm mb-4">
                      The form backend has not been configured yet. Please contact
                      us directly by phone to discuss your enquiry.
                    </p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center px-6 py-3 bg-ink text-ivory text-xs tracking-[0.15em] uppercase hover:bg-orange transition-colors"
                    >
                      Call {siteConfig.phoneDisplay}
                    </a>
                  </>
                )}
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 block mx-auto text-sm text-ink/40 hover:text-ink transition-colors"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-transparent border text-sm focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-taupe/25 focus:border-ink'
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-transparent border text-sm focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-taupe/25 focus:border-ink'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone <span className="text-ink/30">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-taupe/25 text-sm focus:border-ink focus:outline-none transition-colors"
                  />
                </div>

                {/* Enquiry Type */}
                <div>
                  <label htmlFor="enquiryType" className="block text-sm font-medium mb-2">
                    Enquiry Type
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={form.enquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-taupe/25 text-sm focus:border-ink focus:outline-none transition-colors"
                  >
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product of interest */}
                <div>
                  <label htmlFor="product" className="block text-sm font-medium mb-2">
                    Product of Interest <span className="text-ink/30">(optional)</span>
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-taupe/25 text-sm focus:border-ink focus:outline-none transition-colors"
                  >
                    <option value="">Not specified</option>
                    {products.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-orange">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-transparent border text-sm focus:outline-none transition-colors resize-y ${
                      errors.message ? 'border-red-500' : 'border-taupe/25 focus:border-ink'
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Notice */}
                {!siteConfig.email && (
                  <div className="p-4 border border-orange/20 bg-orange/5">
                    <p className="text-xs text-ink/60 leading-relaxed">
                      <strong>Note:</strong> Online form submission is not yet
                      connected. For immediate assistance, please call us at{' '}
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                        className="text-orange hover:underline"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3 bg-ink text-ivory text-xs tracking-[0.15em] uppercase hover:bg-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
                >
                  {siteConfig.email ? 'Prepare Email' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
