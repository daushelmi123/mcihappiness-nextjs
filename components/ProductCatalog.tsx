'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'

type Product = {
  id: string
  name: string
  nameChinese?: string
  image?: string
  video?: string
  category: string
}

type Category = {
  key: string
  icon: string
  name: string
}

export default function ProductCatalog({
  products,
  categories,
  lang,
  askPrice,
  shareText,
  linkCopied,
  searchPlaceholder,
  allCategories,
  resultsCount,
  noResults,
}: {
  products: Product[]
  categories: Category[]
  lang: string
  askPrice: string
  shareText: string
  linkCopied: string
  searchPlaceholder: string
  allCategories: string
  resultsCount: string
  noResults: string
}) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('ALL')

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash || '')
      .replace('#cat-', '')
      .toUpperCase()
      .replace(/-/g, ' ')
    if (hash && categories.some(c => c.key === hash)) {
      setActiveCat(hash)
    }
  }, [categories])

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    products.forEach(p => { c[p.category] = (c[p.category] || 0) + 1 })
    return c
  }, [products])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(p => {
      const matchesCat = activeCat === 'ALL' || p.category === activeCat
      if (!matchesCat) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.nameChinese ? p.nameChinese.includes(query.trim()) : false)
      )
    })
  }, [products, activeCat, query])

  return (
    <>
      <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-lg border border-gray-200 bg-[#F4F6FB] text-sm text-[#0D1B3E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5A800] focus:border-transparent"
            />
          </div>
          <div className="relative md:w-72 flex-shrink-0">
            <select
              value={activeCat}
              onChange={(e) => setActiveCat(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 md:py-3 rounded-lg border border-gray-200 bg-[#F4F6FB] text-sm font-bold text-[#0D1B3E] focus:outline-none focus:ring-2 focus:ring-[#F5A800] focus:border-transparent cursor-pointer"
            >
              <option value="ALL">{allCategories} ({products.length})</option>
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.name} ({counts[c.key] || 0})
                </option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <p className="text-sm text-gray-500 mb-4 md:mb-6">{resultsCount.replace('{n}', String(filtered.length))}</p>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-16 text-sm md:text-base">{noResults}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filtered.map((product) => {
              const mainName = lang === 'zh' && product.nameChinese ? product.nameChinese : product.name
              const subName = lang === 'zh' && product.nameChinese ? product.name : product.nameChinese
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  mainName={mainName}
                  subName={subName}
                  askPrice={askPrice}
                  shareText={shareText}
                  linkCopied={linkCopied}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
