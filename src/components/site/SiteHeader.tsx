"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav, site } from "@/lib/site";
import { Container } from "./Container";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        "relative rounded-md px-3 py-2 text-sm font-semibold tracking-tight transition-all duration-300 " +
        (isActive
          ? "bg-white/15 text-white"
          : "text-white/90 hover:bg-white/10 hover:text-white hover:scale-105")
      }
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-white" />
      )}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top accent bar like Zimmerman */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500" />
      
      {/* Top info bar */}
      <div className="bg-blue-950 text-white">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="animate-pulse">✦</span>
              <span className="opacity-90">Welcome to {site.name}.</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 opacity-90">
              <a href={`tel:${site.contact.phone}`} className="flex items-center gap-1 transition-colors hover:text-green-400">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {site.contact.phone}
              </a>
              <span className="hidden sm:inline text-white/50">|</span>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-1 transition-colors hover:text-green-400">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">{site.contact.email}</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <Container>
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white p-1 shadow-lg transition-shadow group-hover:shadow-xl">
                <Image src="/logo.png" alt="FGCK logo" fill className="object-contain" priority />
              </div>
              <div className="leading-tight">
                <div className="text-base font-extrabold tracking-tight">F.G.C.K Githurai 44</div>
                <div className="text-xs italic text-blue-200">{site.tagline}</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex">
              {primaryNav.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
              <Link
                href="/give"
                className="ml-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-xl"
              >
                GIVE
              </Link>
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/20 xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {open && (
            <div id="mobile-nav" className="animate-fade-in pb-4 xl:hidden">
              <div className="grid gap-1 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                {primaryNav.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-4 py-3 text-sm font-semibold text-white/90 transition-all duration-200 hover:bg-white/15 hover:text-white hover:translate-x-1"
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/give"
                  className="mt-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 text-center text-sm font-extrabold text-white"
                  onClick={() => setOpen(false)}
                >
                  GIVE
                </Link>
              </div>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
}
