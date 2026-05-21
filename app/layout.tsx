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
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full" style={{ background: "var(--c-bg)", color: "var(--c-text-1)" }}>
        {children}
      </body>
    </html>
  );
}
