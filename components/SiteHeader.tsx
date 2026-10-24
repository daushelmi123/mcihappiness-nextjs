'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getDict, LANGS, LANG_LABELS, type Lang } from '@/lib/dictionaries'

export default function SiteHeader({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const t = getDict(lang)

  const links = [
    { href: `/${lang}/products`, label: t.nav.products },
    { href: `/${lang}/wholesale`, label: t.nav.wholesale },
    { href: `/${lang}/operations`, label: t.nav.operations },
    { href: `/${lang}/distribution`, label: t.nav.distribution },
    { href: `/${lang}/seasons`, label: t.nav.seasons },
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/contact`, label: t.nav.contact },
  ]

  // Swap the language segment of the current path
  const pathFor = (l: Lang) => {
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length > 0 && (LANGS as readonly string[]).includes(parts[0])) {
      parts[0] = l
    } else {
      parts.unshift(l)
    }
    return '/' + parts.join('/')
  }

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-bold px-2.5 py-2 rounded-md border border-white/20 hover:border-[#F5A800]/60 transition"
        aria-label="Language"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {LANG_LABELS[lang]}
        <svg className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {langOpen && (
        <>
          {/* click-away backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-40 bg-[#0A142E] border border-white/15 rounded-lg shadow-2xl overflow-hidden z-50">
            {LANGS.map(l => (
              <Link
                key={l}
                href={pathFor(l)}
                onClick={() => setLangOpen(false)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-semibold transition ${
                  l === lang
                    ? 'text-[#F5A800] bg-white/5'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {LANG_LABELS[l]}
                {l === lang && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )

  return (
    <header className="bg-[#0D1B3E] sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <Link href={`/${lang}`} className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/mci-logo-500.webp"
              alt="MCI Happiness Logo"
              width={52}
              height={52}
              className="w-11 h-11 md:w-12 md:h-12 object-contain"
              priority
            />
            <span className="text-white font-bold text-lg tracking-tight hidden xl:block">
              MCI <span className="text-[#F5A800]">HAPPINESS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-xs font-semibold tracking-wide text-white/80">
            {links.map(l => (
              <Link key={l.label} href={l.href} className="hover:text-[#F5A800] transition whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <LangToggle />
            <a
              href="https://wa.me/60167338738"
              className="bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-4 py-2.5 rounded-md text-xs font-bold transition whitespace-nowrap"
            >
              {t.nav.becomeDealer}
            </a>
          </div>

          {/* Mobile/tablet: lang toggle + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LangToggle />
            <button
              onClick={() => setOpen(!open)}
              className="text-white p-2 -mr-2"
              aria-label="Menu"
            >
              {open ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0A142E] border-t border-white/10">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/90 font-semibold text-sm py-3 px-2 border-b border-white/5 hover:text-[#F5A800]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://wa.me/60167338738"
              className="bg-[#F5A800] text-[#0D1B3E] text-center px-5 py-3.5 rounded-md text-sm font-bold mt-3"
            >
              {t.nav.becomeDealer}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
