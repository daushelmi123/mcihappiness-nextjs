import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import { getDict, isLang, LANGS } from '@/lib/dictionaries'

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const t = getDict(lang)
  return {
    title: t.portalPage.metaTitle,
    description: t.portalPage.metaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}/portal`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}/portal`])),
    },
  }
}

export default async function PortalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)
  const p = t.portalPage

  return (
    <main className="min-h-screen bg-[#F4F6FB]">
      <SiteHeader lang={lang} />

      <section className="max-w-2xl mx-auto px-4 md:px-8 py-10 md:py-16 text-center">
        <Image
          src="/icon-192.png"
          alt="MCI Happiness"
          width={72}
          height={72}
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto mb-4 shadow-lg"
        />
        <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-2">{p.eyebrow}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D1B3E] mb-2">{p.h1}</h1>
        <p className="text-gray-500 text-sm md:text-base">{p.subtitle}</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          <Link
            href={`/${lang}/products`}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-[#F5A800] hover:shadow-xl transition-all p-5 md:p-6 flex flex-col items-start"
          >
            <span className="text-3xl mb-3">🧨</span>
            <h3 className="font-bold text-sm md:text-base text-[#0D1B3E] mb-1">{p.tileProducts}</h3>
            <p className="text-xs text-gray-500 leading-snug">{p.tileProductsDesc}</p>
          </Link>

          <a
            href="https://wa.me/60167338738"
            target="_blank"
            className="group bg-white rounded-2xl border border-gray-200 hover:border-[#25D366] hover:shadow-xl transition-all p-5 md:p-6 flex flex-col items-start"
          >
            <span className="text-3xl mb-3">💬</span>
            <h3 className="font-bold text-sm md:text-base text-[#0D1B3E] mb-1">{p.tileWhatsapp}</h3>
            <p className="text-xs text-gray-500 leading-snug">{p.tileWhatsappDesc}</p>
          </a>

          <div className="relative bg-white/60 rounded-2xl border border-gray-200 p-5 md:p-6 flex flex-col items-start cursor-not-allowed">
            <span className="absolute top-3 right-3 bg-[#F5A800] text-[#0D1B3E] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {p.soonBadge}
            </span>
            <span className="text-3xl mb-3 grayscale opacity-50">📄</span>
            <h3 className="font-bold text-sm md:text-base text-gray-400 mb-1">{p.tileLetter}</h3>
            <p className="text-xs text-gray-400 leading-snug">{p.tileLetterSoon}</p>
          </div>

          <div className="relative bg-white/60 rounded-2xl border border-gray-200 p-5 md:p-6 flex flex-col items-start cursor-not-allowed">
            <span className="absolute top-3 right-3 bg-[#F5A800] text-[#0D1B3E] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {p.soonBadge}
            </span>
            <span className="text-3xl mb-3 grayscale opacity-50">📋</span>
            <h3 className="font-bold text-sm md:text-base text-gray-400 mb-1">{p.tileOrder}</h3>
            <p className="text-xs text-gray-400 leading-snug">{p.tileOrderSoon}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
