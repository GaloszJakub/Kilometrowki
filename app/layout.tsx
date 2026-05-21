import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kilometrówki posłów - Sejm X kadencji",
  description:
    "Ranking ryczałtów kilometrowych posłów Sejmu RP. Kto deklaruje najwięcej?",
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
