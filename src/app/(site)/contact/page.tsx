import Image from "next/image";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";
import ContactForm from "@/components/site/ContactForm";

export default function ContactPage() {
  return (
    <PageShell title="Contact Us" description="Have questions? We'd love to hear from you. Reach out anytime.">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-48 bg-slate-100">
              <Image src="/images/hero-bg.svg" alt="FGCK Githurai 44" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-bold text-white">FGCK Githurai 44</h3>
                <p className="text-sm text-white/80">Jesus Healing Center</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Address</h4>
                    <p className="mt-1 text-sm text-slate-600">{site.contact.addressLine}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Phone</h4>
                    <p className="mt-1 text-sm text-slate-600">{site.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <svg className="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <p className="mt-1 text-sm text-slate-600">{site.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.762749608763!2d36.90459324725747!3d-1.2017814305877208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f2ae8740691%3A0x6f9dba54754c29fc!2sFull%20Gospel%20Churches%20of%20Kenya%20Githurai%2044.Jesus%20healing%20center!5e0!3m2!1sen!2suk!4v1765977613853!5m2!1sen!2suk"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="FGCK Githurai 44 Location"
            />
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </PageShell>
  );
}
