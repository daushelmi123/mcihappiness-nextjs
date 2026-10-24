import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getDict, isLang, LANGS } from '@/lib/dictionaries'
import { CDN } from '@/lib/cdn'

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const t = getDict(lang)
  return {
    title: t.standalone.wholesaleMetaTitle,
    description: t.standalone.wholesaleMetaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}/wholesale`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}/wholesale`])),
    },
  }
}

const FEATURE_ICONS = [
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
]

const SERVE_ICONS = [
  'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
]

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default async function WholesalePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)
  const s = t.standalone

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader lang={lang} />

      {/* ============ HERO ============ */}
      <section className="bg-[#0D1B3E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-10 md:py-0 md:min-h-[380px]">
            <div className="relative z-10 md:py-14">
              <div className="flex items-center gap-2 text-xs mb-5">
                <Link href={`/${lang}`} className="text-[#F5A800] hover:underline font-semibold">{s.breadcrumbHome}</Link>
                <span className="text-white/40" aria-hidden>›</span>
                <span className="text-white/60 font-semibold">{s.wholesaleTitle}</span>
              </div>
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">{t.wholesale.eyebrow}</div>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-[1.12] mb-5 uppercase">
                {t.wholesale.h2}
              </h1>
              <p className="text-white/80 text-base leading-relaxed max-w-md mb-6">{t.wholesale.intro}</p>
              <a
                href="https://wa.me/60167338738?text=Wholesale%20enquiry"
                className="inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition"
              >
                {t.wholesale.cta} →
              </a>
            </div>
            <div className="relative h-56 md:h-full md:min-h-[380px] rounded-xl md:rounded-none overflow-hidden">
              <Image src={`${CDN}/photos/hero-warehouse.png`} alt="MCI Fireworks wholesale warehouse" fill className="object-cover" />
              <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-[#F5A800] opacity-80" />
              <div className="absolute top-16 right-24 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-70" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
            {t.wholesale.features.map((f, i) => (
              <div key={f.title} className="bg-[#F4F6FB] rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-lg bg-[#0D1B3E] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={FEATURE_ICONS[i]} />
                  </svg>
                </div>
                <h3 className="text-[#0D1B3E] text-sm font-bold tracking-wide mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO WE SUPPLY ============ */}
      <section className="bg-[#0D1B3E] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{s.serveEyebrow}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:divide-x md:divide-white/10">
            {s.serveItems.map((w, i) => (
              <div key={w.title} className="text-center px-2 md:px-6">
                <svg className="w-9 h-9 text-[#F5A800] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={SERVE_ICONS[i]} />
                </svg>
                <h3 className="text-white text-sm font-bold mb-1.5">{w.title}</h3>
                <p className="text-white/50 text-xs leading-snug">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-[#F4F6FB] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-[#0D1B3E] rounded-xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-white text-xl md:text-2xl font-extrabold mb-2">{t.finalCta.h2[0]} {t.finalCta.h2[1]}</h2>
              <p className="text-white/70 text-sm md:text-base">{t.finalCta.p}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href={`/${lang}/products`}
                className="bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-6 py-3.5 rounded-md text-sm font-bold transition text-center"
              >
                {t.hero.ctaProducts} →
              </Link>
              <a
                href="https://wa.me/60167338738?text=Wholesale%20enquiry"
                className="border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-[#0D1B3E] px-6 py-3.5 rounded-md text-sm font-bold transition text-center"
              >
                {t.wholesale.cta} →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />

      <a
        href="https://wa.me/60167338738"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BD5A] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl z-50 transition inline-flex items-center gap-2"
        target="_blank"
        aria-label="WhatsApp"
      >
        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d={WA_PATH} />
        </svg>
        <span className="font-bold text-sm">WhatsApp</span>
      </a>
    </main>
  )
}
