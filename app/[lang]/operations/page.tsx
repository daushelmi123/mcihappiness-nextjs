import Link from 'next/link'
import Image from 'next/image'
import products from '@/data/products.json'
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
    title: t.operationsPage.metaTitle,
    description: t.operationsPage.metaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}/operations`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}/operations`])),
    },
  }
}

const CAT_KEYS = ['FIRECRACKER', 'CAKE', 'FOUNTAIN', 'FLYING', 'HANDHELD', 'GROUND', 'GENERAL'] as const

const STEP_PHOTOS = [
  `${CDN}/photos/ops-01-select.png`,
  `${CDN}/photos/hero-warehouse.png`,
  `${CDN}/photos/ops-03-packing.png`,
  `${CDN}/photos/ops-04-delivery.png`,
  `${CDN}/photos/ops-02-check.png`,
]

const STEP_ICONS = [
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  'M3 21V8l9-5 9 5v13M9 21v-6h6v6M3 21h18',
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
  'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z',
]

const SUPPLY_ICONS = [
  'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  'M3 21V8l9-5 9 5v13M9 21v-6h6v6M3 21h18',
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
]

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default async function OperationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)
  const o = t.operationsPage
  const a = t.aboutPage

  const range = CAT_KEYS.map(key => ({
    key,
    ...a.rangeItems[key],
    image: products.find(p => p.category === key && p.image)?.image ?? null,
  }))

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader lang={lang} />

      {/* ============ HERO ============ */}
      <section className="bg-[#0D1B3E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-10 md:py-0 md:min-h-[400px]">
            <div className="relative z-10 md:py-14">
              <div className="flex items-center gap-2 text-xs mb-5">
                <Link href={`/${lang}`} className="text-[#F5A800] hover:underline font-semibold">{o.breadcrumbHome}</Link>
                <span className="text-white/40" aria-hidden>›</span>
                <span className="text-white/60 font-semibold">{o.breadcrumbSelf}</span>
              </div>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-[1.12] mb-3 uppercase">
                {o.h1}
              </h1>
              <div className="text-[#F5A800] text-base md:text-xl font-bold mb-4 leading-snug">
                {o.subtitle[0]}<br />{o.subtitle[1]}
              </div>
              <p className="text-white/80 text-base leading-relaxed max-w-md mb-5">{o.heroSub}</p>
              <div className="w-16 border-t-2 border-[#F5A800]" />
            </div>
            <div className="relative h-56 md:h-full md:min-h-[400px] rounded-xl md:rounded-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B2C56] via-[#132145] to-[#0A142E] flex items-center justify-center">
                <div className="text-white/15 text-sm font-bold">{o.ctaPhotoPlaceholder}</div>
              </div>
              <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-[#F5A800] opacity-80" />
              <div className="absolute top-16 right-24 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-70" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS: 5 STEPS ============ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{o.processEyebrow}</div>
            <h2 className="text-[#0D1B3E] text-2xl md:text-4xl font-extrabold leading-tight">{o.processH2}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 relative">
            {o.steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#0D1B3E] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <svg className="w-8 h-8 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={STEP_ICONS[i]} />
                  </svg>
                  {i < o.steps.length - 1 && (
                    <span className="hidden md:block text-gray-300 font-bold ml-auto" aria-hidden>→</span>
                  )}
                </div>
                <h3 className="text-[#0D1B3E] text-sm font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">{s.desc}</p>
                <div className="relative h-32 md:h-28 rounded-xl overflow-hidden">
                  <Image src={STEP_PHOTOS[i]} alt={s.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO WE SUPPLY (dark band) ============ */}
      <section className="bg-[#0D1B3E] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{o.supplyEyebrow}</div>
            <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight">{o.supplyH2}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:divide-x md:divide-white/10">
            {o.supplyItems.map((w, i) => (
              <div key={w.title} className="text-center px-2 md:px-6">
                <svg className="w-9 h-9 text-[#F5A800] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={SUPPLY_ICONS[i]} />
                </svg>
                <h3 className="text-white text-sm font-bold mb-1.5">{w.title}</h3>
                <p className="text-white/50 text-xs leading-snug">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES + CTA (two-column) ============ */}
      <section className="bg-[#F4F6FB] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">

            {/* Left: categories */}
            <div>
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{o.catEyebrow}</div>
              <h2 className="text-[#0D1B3E] text-2xl md:text-3xl font-extrabold leading-tight mb-6">{o.catH2}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {range.map(r => (
                  <div key={r.key} className="bg-white rounded-xl border border-gray-200 p-3 text-center">
                    <div className="relative h-20 mb-2">
                      {r.image && (
                        <Image src={r.image} alt={r.name} fill className="object-contain p-1" />
                      )}
                    </div>
                    <div className="text-[#0D1B3E] text-xs font-bold mb-0.5">{r.name}</div>
                    <p className="text-gray-500 text-[11px] leading-snug">{r.desc}</p>
                  </div>
                ))}
              </div>
              <Link href={`/${lang}/products`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0D1B3E] hover:text-[#F5A800] transition">
                {o.viewAll} <span className="text-[#F5A800]" aria-hidden>→</span>
              </Link>
            </div>

            {/* Right: CTA card with photo placeholder */}
            <div className="relative rounded-xl overflow-hidden bg-[#0D1B3E] min-h-[320px] md:min-h-[420px] flex">
              <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-br from-[#1B2C56] to-[#0A142E] hidden sm:flex items-center justify-center">
                <div className="text-white/15 text-xs font-bold rotate-90 sm:rotate-0">{o.ctaPhotoPlaceholder}</div>
              </div>
              <div className="relative z-10 p-7 md:p-10 sm:max-w-[60%] flex flex-col justify-center">
                <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-4">
                  {o.ctaH2[0]}<br />{o.ctaH2[1]}
                </h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-7">{o.ctaP}</p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/${lang}/products`}
                    className="bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-6 py-3.5 rounded-md text-sm font-bold transition text-center"
                  >
                    {o.ctaProducts} →
                  </Link>
                  <a
                    href="https://wa.me/60167338738?text=Wholesale%20enquiry"
                    className="border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-[#0D1B3E] px-6 py-3.5 rounded-md text-sm font-bold transition text-center"
                  >
                    {o.ctaWholesale} →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />

      {/* WhatsApp Float */}
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
