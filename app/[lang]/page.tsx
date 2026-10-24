import Link from 'next/link'
import Image from 'next/image'
import products from '@/data/products.json'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import InstallPrompt from '@/components/InstallPrompt'
import { getDict, isLang, LANGS, type Lang } from '@/lib/dictionaries'
import { CDN } from '@/lib/cdn'

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const t = getDict(lang)
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}`])),
    },
  }
}

const CAT_KEYS = ['FIRECRACKER', 'CAKE', 'FOUNTAIN', 'FLYING', 'HANDHELD', 'GROUND', 'GENERAL'] as const

const STRIP_ICONS = [
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
]

const OPS_PHOTOS = [
  `${CDN}/photos/ops-01-select.png`,
  `${CDN}/photos/ops-02-check.png`,
  `${CDN}/photos/ops-03-packing.png`,
  `${CDN}/photos/ops-04-delivery.png`,
]

const WS_ICONS = [
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z',
  'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 11-4 0m0 0H5',
]

const WHY_ICONS = [
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z',
]

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)

  const cards = CAT_KEYS.map(key => ({
    key,
    anchor: `cat-${key.toLowerCase().replace(/\s+/g, '-')}`,
    ...t.range.cats[key],
    products: products.filter(p => p.category === key && p.image).slice(0, 5),
  }))

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader lang={lang} />

      {/* ============ HERO ============ */}
      <section className="bg-[#0D1B3E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-0">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:min-h-[560px]">
            <div className="relative z-10 md:py-16">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">
                {t.hero.eyebrow}
              </div>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-5">
                {t.hero.h1[0]}<br />
                {t.hero.h1[1]}<br />
                <span className="text-[#F5A800]">{t.hero.h1[2]}<br />{t.hero.h1[3]}</span>
                {t.hero.h1[4] && <><br />{t.hero.h1[4]}</>}
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-7 max-w-sm">
                {t.hero.sub}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <Link
                  href={`/${lang}/products`}
                  className="bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition inline-flex items-center justify-center gap-2"
                >
                  {t.hero.ctaProducts}
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href="https://wa.me/60167338738?text=Wholesale%20enquiry"
                  className="border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition inline-flex items-center justify-center gap-2"
                >
                  {t.hero.ctaWholesale}
                  <span aria-hidden>→</span>
                </a>
              </div>
              <div className="text-white/50 text-xs font-bold tracking-widest uppercase">
                {t.hero.tagline1} <span className="text-[#F5A800]/80">{t.hero.tagline2}</span>
              </div>
            </div>

            {/* Hero photo */}
            <div className="relative h-64 md:h-full md:min-h-[560px] rounded-xl md:rounded-none overflow-hidden">
              <Image src={`${CDN}/photos/hero-warehouse.png`} alt="MCI Fireworks warehouse" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A142E]/40 via-transparent to-transparent" />
              <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-[#F5A800] opacity-80" />
              <div className="absolute top-16 right-24 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-70" />
              <div className="absolute top-6 right-32 w-1 h-1 rounded-full bg-yellow-300 opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BADGES STRIP ============ */}
      <section className="bg-[#0A142E] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            {t.strip.map((b, i) => (
              <div key={b.title} className="text-center px-2 md:border-r last:border-r-0 md:border-white/10">
                <svg className="w-9 h-9 md:w-10 md:h-10 text-[#F5A800] mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={STRIP_ICONS[i]} />
                </svg>
                <div className="text-white text-xs md:text-sm font-bold tracking-wide leading-snug mb-1">{b.title}</div>
                <div className="text-white/50 text-xs leading-snug">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT RANGE ============ */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-12">
            <div>
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{t.range.eyebrow}</div>
              <h2 className="text-[#0D1B3E] text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                {t.range.h2[0]}<br className="md:hidden" /> {t.range.h2[1]}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-2xl">{t.range.intro}</p>
            </div>
            <Link href={`/${lang}/products`} className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-[#0D1B3E] hover:text-[#F5A800] transition flex-shrink-0 ml-6">
              {t.range.viewAll} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="flex flex-col gap-10 md:gap-12">
            {cards.map(c => (
              <div key={c.key}>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h3 className="text-[#0D1B3E] text-lg md:text-xl font-extrabold tracking-wide">{c.name}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-snug mt-0.5">{c.desc}</p>
                  </div>
                  <Link
                    href={`/${lang}/products#${c.anchor}`}
                    className="flex-shrink-0 ml-4 inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#0D1B3E] hover:text-[#F5A800] transition whitespace-nowrap"
                  >
                    {t.range.seeAll} <span aria-hidden>→</span>
                  </Link>
                </div>
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-5 md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
                  {c.products.map(p => {
                    const displayName = lang === 'zh' && p.nameChinese ? p.nameChinese : p.name
                    return (
                      <Link
                        key={p.id}
                        href={`/${lang}/products#${c.anchor}`}
                        className="group bg-white rounded-xl border border-gray-200 hover:border-[#F5A800] hover:shadow-lg transition overflow-hidden flex-shrink-0 w-32 sm:w-36 md:w-auto"
                      >
                        <div className="relative h-28 md:h-32 bg-[#F4F6FB]">
                          <Image src={p.image!} alt={displayName} fill className="object-contain p-3 group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-2.5">
                          <div className="text-[#0D1B3E] text-xs font-bold leading-snug line-clamp-2">{displayName}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12 text-center">
            <Link
              href={`/${lang}/products`}
              className="inline-flex items-center gap-2 bg-[#0D1B3E] hover:bg-[#132145] text-white px-7 py-3.5 rounded-md text-sm font-bold transition"
            >
              {t.range.viewAll} <span className="text-[#F5A800]" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ ABOUT MCI ============ */}
      <section id="about" className="bg-[#0D1B3E] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden order-2 md:order-1">
              <Image src={`${CDN}/photos/about-exterior.png`} alt="MCI Fireworks premises" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{t.homeAbout.eyebrow}</div>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                {t.homeAbout.h2[0]}<br />{t.homeAbout.h2[1]}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-5">{t.homeAbout.p1}</p>
              <p className="text-white/70 text-base leading-relaxed mb-8">{t.homeAbout.p2}</p>
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition"
              >
                {t.homeAbout.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHOLESALE ============ */}
      <section id="wholesale" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{t.wholesale.eyebrow}</div>
              <h2 className="text-[#0D1B3E] text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                {t.wholesale.h2}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">{t.wholesale.intro}</p>
              <a
                href="https://wa.me/60167338738?text=Wholesale%20enquiry"
                className="hidden md:inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition"
              >
                {t.wholesale.cta} <span aria-hidden>→</span>
              </a>
            </div>
            <div className="flex flex-col gap-6">
              {t.wholesale.features.map((f, i) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg border border-[#F5A800]/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={WS_ICONS[i]} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#0D1B3E] text-sm font-bold tracking-wide mb-1">{f.title}</div>
                    <div className="text-gray-600 text-sm leading-snug">{f.desc}</div>
                  </div>
                </div>
              ))}
              <a
                href="https://wa.me/60167338738?text=Wholesale%20enquiry"
                className="md:hidden inline-flex items-center justify-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition mt-2"
              >
                {t.wholesale.cta} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OPERATIONS ============ */}
      <section id="operations" className="bg-[#F4F6FB] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{t.operations.eyebrow}</div>
          <h2 className="text-[#0D1B3E] text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            {t.operations.h2[0]}<br className="md:hidden" /> {t.operations.h2[1]}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl mb-10 md:mb-14">{t.operations.intro}</p>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {t.operations.steps.map((o, i) => (
              <div key={o.title}>
                <div className="relative h-44 md:h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[#1B2C56] to-[#0A142E]">
                  <Image src={OPS_PHOTOS[i]} alt={o.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-[#0D1B3E] text-white text-xs font-bold px-2.5 py-1.5 rounded z-10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-[#0D1B3E] text-sm font-bold tracking-wide mb-1">{o.title}</h3>
                <p className="text-gray-600 text-sm leading-snug">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DISTRIBUTION ============ */}
      <section id="distribution" className="bg-[#0D1B3E] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{t.distribution.eyebrow}</div>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                {t.distribution.h2[0]}<br />{t.distribution.h2[1]}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-5 max-w-md">{t.distribution.p1}</p>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">{t.distribution.p2}</p>
              <Link
                href={`/${lang}/distribution`}
                className="inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-4 rounded-md text-sm font-bold transition"
              >
                {t.distribution.cta} <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-[#0A142E] p-4 md:p-8 flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/malaysia-map.svg"
                alt="Malaysia map"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE MCI ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{t.why.eyebrow}</div>
          <h2 className="text-[#0D1B3E] text-3xl md:text-4xl font-extrabold leading-tight">
            {t.why.h2[0]}<br className="md:hidden" /> {t.why.h2[1]}
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-8">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <Image src={`${CDN}/photos/why-choose.png`} alt="MCI Fireworks organised warehouse" fill className="object-cover" />
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {t.why.features.map((f, i) => (
                <div key={f.title} className="flex md:flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-lg border border-[#F5A800]/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#F5A800]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={WHY_ICONS[i]} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[#0D1B3E] text-base font-bold mb-1">{f.title}</div>
                    <div className="text-gray-600 text-sm leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BRANDS ============ */}
      <section className="bg-[#F4F6FB] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{t.brands.eyebrow}</div>
          <h2 className="text-[#0D1B3E] text-3xl md:text-4xl font-extrabold leading-tight mb-10">
            {t.brands.h2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              { key: 'mci', src: '/mci-logo-500.webp', alt: 'MCI Happiness', name: 'MCI Happiness' },
              { key: 'don', src: `${CDN}/brands/don-fireworks.png`, alt: 'Don Fireworks', name: 'Don Fireworks' },
              { key: 'adn', src: `${CDN}/brands/adn-redcracker.png`, alt: 'ADN RedCracker', name: 'ADN RedCracker' },
            ].map((brand) => (
              <div key={brand.key} className="bg-white rounded-xl border border-gray-200 hover:border-[#F5A800] transition p-6 md:p-8 flex flex-col items-center justify-center gap-3">
                <div className="relative w-full h-20 md:h-24">
                  <Image src={brand.src} alt={brand.alt} fill className="object-contain" />
                </div>
                <div className="text-[#0D1B3E] text-sm md:text-base font-extrabold tracking-wide">{brand.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-[#0D1B3E] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[#F5A800] opacity-70" />
        <div className="absolute top-20 right-28 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-60" />
        <div className="absolute bottom-16 left-12 w-1.5 h-1.5 rounded-full bg-yellow-300 opacity-50" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight mb-5">
            {t.finalCta.h2[0]}<br />{t.finalCta.h2[1]}
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">{t.finalCta.p}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/60167338738?text=Saya%20nak%20jadi%20dealer"
              className="bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-8 py-4 rounded-md text-sm font-bold transition text-center"
            >
              {t.finalCta.cta1} →
            </a>
            <a
              href="https://wa.me/60167338738"
              className="border-2 border-[#F5A800] text-[#F5A800] hover:bg-[#F5A800] hover:text-[#0D1B3E] px-8 py-4 rounded-md text-sm font-bold transition text-center"
            >
              {t.finalCta.cta2} →
            </a>
          </div>
        </div>
      </section>

      {/* ============ NEED HELP ============ */}
      <section id="contact" className="bg-[#0A142E] py-16 md:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                {t.help.h2[0]}<br />{t.help.h2[1]}
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-sm">{t.help.p}</p>
            </div>
            <a
              href="https://wa.me/60167338738"
              className="inline-flex items-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-8 py-4 rounded-md text-sm font-bold transition"
            >
              {t.help.cta}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={WA_PATH} />
              </svg>
            </a>
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

      <InstallPrompt
        badge={t.installPrompt.badge}
        title={t.installPrompt.title}
        subtitle={t.installPrompt.subtitle}
        installBtn={t.installPrompt.installBtn}
        iosInstruction={t.installPrompt.iosInstruction}
        iosHowBtn={t.installPrompt.iosHowBtn}
      />
    </main>
  )
}
