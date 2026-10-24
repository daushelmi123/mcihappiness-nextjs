import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getDict, isLang, LANGS } from '@/lib/dictionaries'

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const t = getDict(lang)
  return {
    title: t.standalone.distributionMetaTitle,
    description: t.standalone.distributionMetaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}/distribution`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}/distribution`])),
    },
  }
}

const SERVE_ICONS = [
  'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
]

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default async function DistributionPage({ params }: { params: Promise<{ lang: string }> }) {
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
                <span className="text-white/60 font-semibold">{s.distributionTitle}</span>
              </div>
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">{t.distribution.eyebrow}</div>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-[1.12] mb-5">
                {t.distribution.h2[0]}<br />{t.distribution.h2[1]}
              </h1>
              <p className="text-white/80 text-base leading-relaxed max-w-md mb-3">{t.distribution.p1}</p>
              <p className="text-white/70 text-base leading-relaxed max-w-md mb-6">{t.distribution.p2}</p>
              <a
                href="https://wa.me/60167338738?text=Delivery%20enquiry"
                className="inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition"
              >
                {t.distribution.cta} →
              </a>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-[#0A142E] p-4 md:p-6 flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/malaysia-map.svg" alt="Malaysia map" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO WE DELIVER TO ============ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{s.serveEyebrow}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:divide-x md:divide-gray-200">
            {s.serveItems.map((w, i) => (
              <div key={w.title} className="text-center px-2 md:px-6">
                <div className="w-14 h-14 rounded-full bg-[#0D1B3E] flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={SERVE_ICONS[i]} />
                  </svg>
                </div>
                <h3 className="text-[#0D1B3E] text-sm font-bold mb-1.5">{w.title}</h3>
                <p className="text-gray-600 text-xs leading-snug">{w.desc}</p>
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
                href="https://wa.me/60167338738?text=Delivery%20enquiry"
                className="border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-[#0D1B3E] px-6 py-3.5 rounded-md text-sm font-bold transition text-center"
              >
                {t.distribution.cta} →
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
