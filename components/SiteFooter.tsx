import Link from 'next/link'
import Image from 'next/image'
import { getDict, type Lang } from '@/lib/dictionaries'

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = getDict(lang)

  return (
    <footer className="bg-[#0A142E] text-white pt-14 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/mci-logo-500.webp" alt="MCI Happiness Logo" width={56} height={56} className="w-14 h-14 object-contain" />
              <div className="text-xl font-extrabold">
                MCI <span className="text-[#F5A800]">HAPPINESS</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{t.footer.desc}</p>
            <div className="text-white/40 text-xs space-y-1">
              <p>Adin Redcracker Sdn Bhd</p>
              <p>Registration No: 1226015-P</p>
            </div>
          </div>
          <div>
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">{t.footer.colProducts}</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href={`/${lang}/products`} className="hover:text-[#F5A800]">Celebration Cakes</Link></li>
              <li><Link href={`/${lang}/products`} className="hover:text-[#F5A800]">Fountains</Link></li>
              <li><Link href={`/${lang}/products`} className="hover:text-[#F5A800]">Roman Candles</Link></li>
              <li><Link href={`/${lang}/products`} className="hover:text-[#F5A800]">{t.footer.linkAllProducts}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">{t.footer.colMci}</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href={`/${lang}/about`} className="hover:text-[#F5A800]">{t.footer.linkAbout}</Link></li>
              <li><Link href={`/${lang}/operations`} className="hover:text-[#F5A800]">{t.nav.operations}</Link></li>
              <li><Link href={`/${lang}/distribution`} className="hover:text-[#F5A800]">{t.nav.distribution}</Link></li>
              <li><Link href={`/${lang}/seasons`} className="hover:text-[#F5A800]">{t.nav.seasons}</Link></li>
              <li><Link href={`/${lang}/faq`} className="hover:text-[#F5A800]">{t.nav.faq}</Link></li>
              <li><Link href={`/${lang}/wholesale`} className="hover:text-[#F5A800]">{t.footer.linkWholesale}</Link></li>
              <li><Link href={`/${lang}/portal`} className="hover:text-[#F5A800]">{t.portalPage.footerLink}</Link></li>
              <li><a href="https://wa.me/60167338738" className="hover:text-[#F5A800]">{t.footer.linkDealer}</a></li>
              <li><a href="https://wa.me/60167338738" className="hover:text-[#F5A800]">{t.footer.linkSupport}</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-4">{t.footer.colContact}</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href="https://wa.me/60167338738" className="hover:text-[#F5A800]">+60 16-733 8738</a>
              </li>
              <li>
                <a href="mailto:admin@adinredcracker.com" className="hover:text-[#F5A800] break-all">admin@adinredcracker.com</a>
              </li>
              <li className="text-white/50">www.mcihappiness.com</li>
            </ul>
            <div className="mt-6">
              <div className="text-[#F5A800] text-xs font-bold tracking-widest uppercase mb-2">{t.footer.colHours}</div>
              <p className="text-white/70 text-sm">{t.footer.hoursValue}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-white/40">
          <p>{t.footer.rights}</p>
          <p>MCI Happiness · Don Fireworks · ADN RedCracker</p>
        </div>
      </div>
    </footer>
  )
}
