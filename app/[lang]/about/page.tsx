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
    title: t.aboutPage.metaTitle,
    description: t.aboutPage.metaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}/about`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}/about`])),
    },
  }
}

const CAT_KEYS = ['FIRECRACKER', 'CAKE', 'FOUNTAIN', 'FLYING', 'HANDHELD', 'GROUND', 'GENERAL'] as const
const CELEB_KEYS = ['raya', 'cny', 'deepavali', 'national']

const WHO_ICONS = [
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
]

const HOW_ICONS = [
  'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
]

const SERVE_ICONS = [
  'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
]

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)
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
                <Link href={`/${lang}`} className="text-[#F5A800] hover:underline font-semibold">{a.breadcrumbHome}</Link>
                <span className="text-white/40" aria-hidden>›</span>
                <span className="text-white/60 font-semibold">{a.breadcrumbAbout}</span>
              </div>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-[1.12] mb-3 uppercase">
                {a.h1}
              </h1>
              <div className="text-[#F5A800] text-base md:text-xl font-bold mb-4">{a.subtitle}</div>
              <p className="text-white/80 text-base leading-relaxed max-w-md mb-5">{a.heroSub}</p>
              <div className="w-16 border-t-2 border-[#F5A800]" />
            </div>
            <div className="relative h-56 md:h-full md:min-h-[400px] rounded-xl md:rounded-none overflow-hidden">
              <Image src={`${CDN}/photos/about-exterior.png`} alt="MCI Fireworks premises" fill className="object-cover" />
              <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-[#F5A800] opacity-80" />
              <div className="absolute top-16 right-24 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-70" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO IS MCI ============ */}
      <section className="bg-white py-14 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
            <div className="md:col-span-2">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{a.whoEyebrow}</div>
              <h2 className="text-[#0D1B3E] text-2xl md:text-4xl font-extrabold leading-tight mb-4">{a.whoH2}</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">{a.whoP1}</p>
              <p className="text-gray-600 text-base leading-relaxed mb-4">{a.whoP2}</p>
              <p className="text-gray-600 text-base leading-relaxed">{a.whoP3}</p>
            </div>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-gray-200">
              {a.whoFeatures.map((f, i) => (
                <div key={f.title} className="text-center px-2 md:px-4">
                  <div className="w-16 h-16 rounded-full bg-[#0D1B3E] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={WHO_ICONS[i]} />
                    </svg>
                  </div>
                  <h3 className="text-[#0D1B3E] text-sm font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-xs leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="bg-white py-14 md:py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-10">{a.howEyebrow}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 relative">
            <div className="hidden md:block absolute top-5 left-[12%] right-[12%] border-t-2 border-dashed border-gray-300" />
            {a.howSteps.map((s, i) => (
              <div key={s.title} className="text-center relative">
                <div className="w-10 h-10 rounded-full bg-[#0D1B3E] text-white text-sm font-bold flex items-center justify-center mx-auto mb-4 relative z-10">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <svg className="w-9 h-9 text-[#F5A800] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={HOW_ICONS[i]} />
                </svg>
                <h3 className="text-[#0D1B3E] text-sm font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4-COLUMN INFO BAND ============ */}
      <section className="bg-[#F4F6FB] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-10 gap-10 md:gap-8">

            {/* Column 1: Product Range */}
            <div className="md:col-span-3">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{a.rangeEyebrow}</div>
              <h2 className="text-[#0D1B3E] text-xl md:text-2xl font-extrabold leading-tight mb-6">
                {a.rangeH2[0]}<br />{a.rangeH2[1]}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4 mb-6">
                {range.map(r => (
                  <div key={r.key} className="text-center">
                    <div className="relative h-20 md:h-24 bg-white rounded-lg border border-gray-200 mb-2">
                      {r.image && (
                        <Image src={r.image} alt={r.name} fill className="object-contain p-2" />
                      )}
                    </div>
                    <div className="text-[#0D1B3E] text-xs font-bold mb-0.5">{r.name}</div>
                    <p className="text-gray-500 text-[11px] leading-snug">{r.desc}</p>
                  </div>
                ))}
              </div>
              <Link href={`/${lang}/products`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0D1B3E] hover:text-[#F5A800] transition">
                {a.viewAll} <span className="text-[#F5A800]" aria-hidden>→</span>
              </Link>
            </div>

            {/* Column 2: Who We Supply */}
            <div className="md:col-span-2">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{a.serveEyebrow}</div>
              <h2 className="text-[#0D1B3E] text-xl md:text-2xl font-extrabold leading-tight mb-6">
                {a.serveH2[0]}<br />{a.serveH2[1]}
              </h2>
              <div className="flex flex-col gap-5">
                {a.serveItems.map((w, i) => (
                  <div key={w.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg border border-[#F5A800]/40 bg-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={SERVE_ICONS[i]} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#0D1B3E] text-sm font-bold mb-0.5">{w.title}</h3>
                      <p className="text-gray-600 text-xs leading-snug">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Celebrations */}
            <div className="md:col-span-3">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{a.celebEyebrow}</div>
              <h2 className="text-[#0D1B3E] text-xl md:text-2xl font-extrabold leading-tight mb-6">
                {a.celebH2[0]}<br />{a.celebH2[1]}
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {a.celebItems.map((c, i) => (
                  <div key={c} className="relative h-28 md:h-32 rounded-xl overflow-hidden border border-[#F5A800]/30">
                    <Image src={`${CDN}/photos/festive/${CELEB_KEYS[i]}.png`} alt={c} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1.5">
                      <div className="text-white text-[11px] font-bold leading-tight">{c}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">{a.celebNote}</p>
            </div>

            {/* Column 4: Why Choose MCI */}
            <div className="md:col-span-2">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{a.whyEyebrow}</div>
              <h2 className="text-[#0D1B3E] text-xl md:text-2xl font-extrabold leading-tight mb-6">
                {a.whyH2[0]}<br />{a.whyH2[1]}
              </h2>
              <div className="flex flex-col gap-4">
                {a.whyItems.map(f => (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0D1B3E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#0D1B3E] text-sm font-bold mb-0.5">{f.title}</h3>
                      <p className="text-gray-600 text-xs leading-snug">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="bg-[#0D1B3E] py-10 md:py-12 relative overflow-hidden">
        <div className="absolute top-4 right-10 w-2 h-2 rounded-full bg-[#F5A800] opacity-70" />
        <div className="absolute bottom-6 right-24 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-60" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="w-14 h-14 rounded-full border-2 border-[#F5A800] flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a4 4 0 010-5.656m-6.364 9.192a9 9 0 010-12.728m3.536 3.536a4 4 0 010 5.656M12 12h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl md:text-2xl font-extrabold uppercase mb-1">{a.ctaH2}</h2>
              <p className="text-white/70 text-sm md:text-base">{a.ctaP}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${lang}/products`}
                className="bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-3.5 rounded-md text-sm font-bold transition text-center"
              >
                {a.ctaProducts} →
              </Link>
              <a
                href="https://wa.me/60167338738?text=Wholesale%20enquiry"
                className="border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-[#0D1B3E] px-7 py-3.5 rounded-md text-sm font-bold transition text-center"
              >
                {a.ctaWholesale} →
              </a>
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
