import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fireworks Supplier & Wholesale Malaysia | MCI Fireworks",
  description: "Explore MCI Fireworks products and wholesale supply for dealers, distributors, resellers and businesses in Malaysia. Browse fireworks categories and enquire about wholesale orders.",
  keywords: [
    "mci happiness",
    "don fireworks",
    "adn redcracker",
    "adin redcracker",
    "mercun borong malaysia",
    "bunga api borong",
    "pemborong mercun",
    "mercun murah",
    "permit pdrm mercun",
    "pengedar mercun berlesen",
    "borong mercun malaysia",
    "wholesale fireworks malaysia",
    "firecracker wholesale",
    "celebration cakes malaysia"
  ],
  authors: [{ name: "MCI Happiness" }],
  creator: "MCI Happiness",
  publisher: "Adin Redcracker Sdn Bhd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ms_MY',
    url: 'https://mcihappiness.com',
    title: 'Fireworks Supplier & Wholesale Malaysia | MCI Fireworks',
    description: 'MCI Fireworks supplies fireworks products for dealers, distributors, resellers and businesses in Malaysia. Browse fireworks categories and enquire about wholesale orders.',
    siteName: 'MCI Happiness',
    images: [
      {
        url: 'https://mcihappiness.com/og-image-1200x630.webp',
        width: 1200,
        height: 630,
        alt: 'MCI Happiness - Pemborong Mercun Malaysia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fireworks Supplier & Wholesale Malaysia | MCI Fireworks',
    description: 'MCI Fireworks supplies fireworks products for dealers, distributors, resellers and businesses in Malaysia.',
    images: ['https://mcihappiness.com/og-image-1200x630.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://mcihappiness.com',
  },
  other: {
    'contact:phone_number': '+60167338738',
    'contact:email': 'admin@adinredcracker.com',
  }
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MCI Happiness",
  "alternateName": ["MCI Fireworks", "Don Fireworks", "ADN RedCracker"],
  "legalName": "Adin Redcracker Sdn Bhd",
  "url": "https://mcihappiness.com",
  "logo": "https://mcihappiness.com/mci-logo-500.webp",
  "telephone": "+60167338738",
  "email": "admin@adinredcracker.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MY",
    "addressRegion": "Malaysia"
  },
  "sameAs": [
    "https://www.facebook.com/adinredcracker",
    "https://t.me/adinredcracker"
  ],
  "description": "MCI Fireworks supplies fireworks products for dealers, distributors, resellers and businesses in Malaysia under the MCI Happiness, Don Fireworks and ADN RedCracker brands.",
  "identifier": "1226015-P"
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "MCI Happiness",
  "image": "https://mcihappiness.com/mci-logo-500.webp",
  "telephone": "+60167338738",
  "email": "admin@adinredcracker.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "addressCountry": "MY"
  },
  "url": "https://mcihappiness.com",
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "11:00",
    "closes": "17:00"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ms"
      className={`${poppins.variable} ${poppins.className} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0D1B3E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MCI Happiness" />

        {/* Schema.org JSON-LD */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
