import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kilometrówki posłów - Sejm X kadencji",
    template: "%s | Kilometrówki posłów",
  },
  description: "Ranking ryczałtów kilometrowych posłów Sejmu RP. Sprawdź, którzy posłowie deklarują najwięcej przejechanych kilometrów i jakie są koszty ich przejazdów w X kadencji Sejmu.",
  keywords: [
    "kilometrówki posłów",
    "ryczałt kilometrowy",
    "wydatki posłów",
    "Sejm X kadencji",
    "Sejm RP",
    "statystyki posłów",
    "rozliczenia poselskie",
    "wydatki na paliwo"
  ],
  authors: [{ name: "Jakub Gałosz" }],
  creator: "Jakub Gałosz",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kilometrowki.vercel.app"),
  openGraph: {
    title: "Kilometrówki posłów - Sejm X kadencji",
    description: "Ranking ryczałtów kilometrowych posłów Sejmu RP. Kto deklaruje najwięcej?",
    url: "/",
    siteName: "Kilometrówki posłów",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kilometrówki posłów - Sejm X kadencji",
    description: "Ranking ryczałtów kilometrowych posłów Sejmu RP. Kto deklaruje najwięcej?",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full" style={{ background: "var(--c-bg)", color: "var(--c-text-1)" }}>
        {children}
      </body>
    </html>
  );
}
