import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider, NO_FLASH_SCRIPT } from "@/components/shared/ThemeProvider";
import { MotionRoot } from "@/components/shared/MotionRoot";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { PageLoader } from "@/components/shared/PageLoader";
import { BackToTop } from "@/components/shared/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PromptEdit · The OS for AI Creators",
  description:
    "Access every major AI tool, prompt, and creator workflow in one place. Pay only for what you use.",
  metadataBase: new URL("https://promptedit.ai"),
  openGraph: {
    title: "PromptEdit · The OS for AI Creators",
    description: "Your AI Toolbox. One Platform. Zero Subscriptions.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030014" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6fb" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, display.variable, mono.variable)} suppressHydrationWarning>
      <head>
        {/* Prevent FOUC by applying theme before paint */}
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body className="font-sans antialiased bg-app text-fg overflow-x-hidden">
        <ThemeProvider>
          <MotionRoot>
            <PageLoader />
            <ScrollProgress />
            <CustomCursor />
            {children}
            <BackToTop />
          </MotionRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
