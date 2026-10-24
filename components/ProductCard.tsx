'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Product = {
  id: string
  name: string
  nameChinese?: string
  image?: string
  video?: string
}

export default function ProductCard({
  product,
  mainName,
  subName,
  askPrice,
  shareText,
  linkCopied,
}: {
  product: Product
  mainName: string
  subName?: string
  askPrice: string
  shareText: string
  linkCopied: string
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const text = shareText.replace('{name}', mainName)
    const url = window.location.href
    const shareData = { title: mainName, text, url }

    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank')
    }
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-[#F5A800] hover:shadow-xl transition-all overflow-hidden">
      <div className="relative h-40 md:h-56 w-full bg-[#F4F6FB] overflow-hidden">
        <button
          type="button"
          onClick={() => product.video && setOpen(true)}
          className="absolute inset-0 block w-full h-full"
          aria-label={product.video ? `${mainName} — play video` : mainName}
        >
          <Image
            src={product.image!}
            alt={mainName}
            fill
            className="object-contain p-4 md:p-6 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.video && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
              <span className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/60 group-hover:bg-[#F5A800] flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 md:w-5 md:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Share"
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-[#F5A800] text-[#0D1B3E] hover:text-white shadow-md flex items-center justify-center transition-colors"
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          )}
        </button>

        {copied && (
          <span className="absolute top-2 right-11 z-10 bg-[#0D1B3E] text-white text-[10px] font-semibold px-2 py-1 rounded-md whitespace-nowrap">
            {linkCopied}
          </span>
        )}
      </div>

      <div className="p-3 md:p-4">
        <h3 className="font-bold text-xs md:text-sm mb-1 md:mb-2 line-clamp-2 min-h-[32px] md:min-h-[40px] leading-tight text-[#0D1B3E]">
          {mainName}
        </h3>
        {subName && (
          <p className="text-xs text-gray-500 mb-2 md:mb-3 line-clamp-1">
            {subName}
          </p>
        )}
        <a
          href={`https://wa.me/60167338738?text=${encodeURIComponent(`Wholesale enquiry: ${product.name}`)}`}
          className="block bg-[#25D366] hover:bg-[#20BD5A] text-white px-3 md:px-4 py-2.5 md:py-3 rounded-md text-center text-xs md:text-sm font-bold transition"
          target="_blank"
        >
          {askPrice}
        </a>
      </div>

      {open && product.video && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-0 md:p-8"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              playsInline
              poster={product.image}
              className="w-full h-full md:h-auto md:max-h-[80vh] object-contain"
            >
              <source src={product.video} type="video/mp4" />
            </video>
            <p className="text-white text-sm md:text-base font-semibold text-center mt-3 px-4">
              {mainName}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
