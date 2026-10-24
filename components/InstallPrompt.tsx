'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const DISMISS_KEY = 'mci-install-prompt-dismissed'
const SHOW_DELAY_MS = 1200

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt({
  badge,
  title,
  subtitle,
  installBtn,
  iosInstruction,
  iosHowBtn,
}: {
  badge: string
  title: string
  subtitle: string
  installBtn: string
  iosInstruction: string
  iosHowBtn: string
}) {
  const [visible, setVisible] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [showIosSteps, setShowIosSteps] = useState(false)
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    const alreadyDismissed = localStorage.getItem(DISMISS_KEY)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    if (alreadyDismissed || isStandalone) return

    const ua = window.navigator.userAgent
    const iosDevice = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream

    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      deferredPrompt.current = e as BeforeInstallPromptEvent
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    const onInstalled = () => {
      localStorage.setItem(DISMISS_KEY, '1')
      setVisible(false)
    }
    window.addEventListener('appinstalled', onInstalled)

    const timer = setTimeout(() => {
      if (iosDevice || deferredPrompt.current) {
        setIsIos(iosDevice)
        setVisible(true)
      }
    }, SHOW_DELAY_MS)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1')
    setVisible(false)
  }

  const handleInstall = async () => {
    if (!deferredPrompt.current) return
    await deferredPrompt.current.prompt()
    await deferredPrompt.current.userChoice
    deferredPrompt.current = null
    dismiss()
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:w-[300px] z-[90] animate-install-prompt-in">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#F5A800]/30 p-4 relative">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-gray-100 hover:bg-[#F5A800] hover:text-white text-gray-500 flex items-center justify-center transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-lg inline-block animate-icon-ring">🔔</span>
          <span className="inline-block bg-gradient-to-r from-[#F5A800] to-[#E09A00] text-[#0D1B3E] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {badge}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-3.5">
          <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
            <Image src="/icon-192.png" alt="MCI Happiness" width={44} height={44} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#0D1B3E] font-bold text-sm leading-snug">{title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{subtitle}</p>
          </div>
        </div>

        {isIos ? (
          <div>
            <button
              type="button"
              onClick={() => setShowIosSteps((v) => !v)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0D1B3E] to-[#132145] hover:brightness-110 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0-12l-4 4m4-4l4 4M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
              </svg>
              {iosHowBtn}
            </button>
            {showIosSteps && (
              <div className="mt-2.5 bg-[#F4F6FB] rounded-lg p-3 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0D1B3E] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <svg className="w-4 h-4 text-[#0D1B3E] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0-12l-4 4m4-4l4 4M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
                  </svg>
                  <span className="text-xs text-[#0D1B3E] font-medium">{iosInstruction}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleInstall}
            className="w-full bg-gradient-to-r from-[#0D1B3E] to-[#132145] hover:brightness-110 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition"
          >
            {installBtn}
          </button>
        )}
      </div>
    </div>
  )
}
