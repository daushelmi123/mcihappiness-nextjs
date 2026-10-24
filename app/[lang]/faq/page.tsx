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
    title: t.faqPage.metaTitle,
    description: t.faqPage.metaDesc,
    alternates: {
      canonical: `https://mcihappiness.com/${lang}/faq`,
      languages: Object.fromEntries(LANGS.map(l => [l, `https://mcihappiness.com/${l}/faq`])),
    },
  }
}

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDict(lang)
  const f = t.faqPage

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: f.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader lang={lang} />

      {/* ============ HERO ============ */}
      <section className="bg-[#0D1B3E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="py-10 md:py-16">
            <div className="flex items-center gap-2 text-xs mb-5">
              <Link href={`/${lang}`} className="text-[#F5A800] hover:underline font-semibold">{f.breadcrumbHome}</Link>
              <span className="text-white/40" aria-hidden>›</span>
              <span className="text-white/60 font-semibold">{f.breadcrumbSelf}</span>
            </div>
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">{f.eyebrow}</div>
            <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-[1.12] mb-4 max-w-2xl">{f.h1}</h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">{f.heroSub}</p>
          </div>
        </div>
      </section>

      {/* ============ FAQ LIST (native accordion, no JS) ============ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-3">
            {f.items.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-gray-200 open:border-[#F5A800] transition [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 md:px-6 py-4 md:py-5">
                  <span className="text-[#0D1B3E] text-sm md:text-base font-bold">{item.q}</span>
                  <svg
                    className="w-5 h-5 text-[#F5A800] flex-shrink-0 transition-transform group-open:rotate-45"
                    fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <div className="px-5 md:px-6 pb-4 md:pb-5">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-[#F4F6FB] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-[#0D1B3E] rounded-xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-white text-xl md:text-2xl font-extrabold mb-2">{f.ctaH2[0]} {f.ctaH2[1]}</h2>
              <p className="text-white/70 text-sm md:text-base">{f.ctaP}</p>
            </div>
            <a
              href="https://wa.me/60167338738"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-[#F5A800] hover:bg-[#E09A00] text-[#0D1B3E] px-7 py-3.5 rounded-md text-sm font-bold transition"
            >
              {f.ctaBtn}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={WA_PATH} />
              </svg>
            </a>
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
