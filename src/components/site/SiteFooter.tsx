import Image from "next/image";
import Link from "next/link";
import { primaryNav, site } from "@/lib/site";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-950 to-slate-950 text-white">
      {/* Removed decorative stars */}
      <Container>
        <div className="relative grid gap-10 py-16 md:grid-cols-4">
          {/* Logo & Info */}
          <div className="md:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white p-1 shadow-lg transition-transform group-hover:scale-110">
                <Image src="/logo.png" alt="FGCK logo" fill className="object-contain" />
              </div>
            </Link>
            <div className="mt-4 text-lg font-bold">{site.name}</div>
            <div className="mt-1 text-sm italic text-blue-300">{site.tagline}</div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              A community of faith, hope, and love serving Githurai and beyond.
            </p>
            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <a href="https://www.facebook.com/githurai2014" target="_blank" className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-800/50 text-white transition-all hover:bg-blue-600 hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@fullgospelchurchesofkenyag599/streams" target="_blank" className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/50 text-white transition-all hover:bg-red-600 hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Menu</h4>
            <ul className="mt-4 space-y-3">
              {primaryNav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-white/80 transition-all hover:text-white hover:translate-x-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="group flex items-center gap-2 text-sm text-white/80 transition-all hover:text-white hover:translate-x-1"
                >
                  Our Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Contact Info</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div>{site.contact.addressLine}</div>
                  <div className="mt-1 text-blue-300">P.O. BOX {site.contact.poBox}</div>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <svg className="h-5 w-5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{site.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <svg className="h-5 w-5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{site.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Service Times</h4>
            <ul className="mt-4 space-y-3">
              {site.serviceTimes.map((t) => (
                <li key={t.label} className="rounded-lg bg-white/5 p-3 backdrop-blur-sm">
                  <div className="text-xs text-blue-300">{t.label}</div>
                  <div className="text-sm font-bold text-white">{t.time}</div>
                </li>
              ))}
            </ul>
            <Link
              href="/new-here"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 text-sm font-bold text-white transition-all hover:from-green-500 hover:to-green-600 hover:scale-105"
            >
              Plan Your Visit
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-white/60">
            <p>© {new Date().getFullYear()} {site.name}</p>
            <p>All rights reserved.</p>
            <p>
              Powered by{" "}
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-400 transition-all hover:text-blue-300 drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]"
              >
                Spectre Tech limited
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
