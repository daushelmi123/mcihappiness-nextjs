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
    title: t.seasonsPage.metaTitle,
    description: t.seasonsPage.metaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}/seasons`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}/seasons`])),
    },
  }
}

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default async function SeasonsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)
  const s = t.seasonsPage

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader lang={lang} />

      {/* ============ HERO ============ */}
      <section className="bg-[#0D1B3E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="py-10 md:py-16">
            <div className="flex items-center gap-2 text-xs mb-5">
              <Link href={`/${lang}`} className="text-[#F5A800] hover:underline font-semibold">{s.breadcrumbHome}</Link>
              <span className="text-white/40" aria-hidden>›</span>
              <span className="text-white/60 font-semibold">{s.breadcrumbSelf}</span>
            </div>
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">{s.eyebrow}</div>
            <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-[1.12] mb-4 max-w-2xl">{s.h1}</h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">{s.heroSub}</p>
          </div>
        </div>
      </section>

      {/* ============ SEASONS GRID ============ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {s.seasons.map((season) => (
              <div key={season.key} className="rounded-xl border border-gray-200 overflow-hidden hover:border-[#F5A800] transition">
                <div className="relative h-40 md:h-48">
                  <Image src={`${CDN}/photos/festive/${season.key}.png`} alt={season.title} fill className="object-cover" />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-[#0D1B3E] text-lg md:text-xl font-extrabold mb-2">{season.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{season.desc}</p>
                  <Link href={`/${lang}/products`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D1B3E] hover:text-[#F5A800] transition">
                    {s.viewProducts} <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PLAN AHEAD ============ */}
      <section className="bg-[#F4F6FB] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-[#0D1B3E] rounded-xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-3">{s.planEyebrow}</div>
              <h2 className="text-white text-xl md:text-2xl font-extrabold mb-2">{s.planH2}</h2>
              <p className="text-white/70 text-sm md:text-base max-w-xl">{s.planP}</p>
            </div>
            <a
              href="https://wa.me/60167338738?text=Wholesale%20enquiry"
              className="flex-shrink-0 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-3.5 rounded-md text-sm font-bold transition text-center whitespace-nowrap"
            >
              {s.ctaBtn} →
            </a>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-[#0D1B3E] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-[#F5A800] opacity-70" />
        <div className="absolute top-16 right-24 w-1.5 h-1.5 rounded-full bg-orange-400 opacity-60" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-white text-2xl md:text-4xl font-extrabold leading-tight mb-4">
            {s.ctaH2[0]} {s.ctaH2[1]}
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md mx-auto">{s.ctaP}</p>
          <a
            href="https://wa.me/60167338738?text=Wholesale%20enquiry"
            className="inline-block bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-8 py-4 rounded-md text-sm font-bold transition"
          >
            {s.ctaBtn} →
          </a>
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
