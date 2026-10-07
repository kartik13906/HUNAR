import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComprehendAI — Active Recall & Technical Reading Assessment",
  description:
    "Build stronger comprehension by reading focused technical content, explaining it in your own words, and receiving instant feedback.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('comprehend_theme_v1');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && supportDarkMode) || (stored === 'system' && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFCFD] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-950 dark:selection:text-indigo-100 transition-colors duration-150">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-700 focus:text-white focus:rounded-md text-sm font-semibold"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <AppProvider>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
