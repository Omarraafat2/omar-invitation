
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.vercel.app"),

  title: {
    default: "Our Engagement ❤️ | You're Invited",
    template: "%s | Our Engagement",
  },

  description:
    "A beautiful beginning, a special day, and a lifetime of memories. Join us to celebrate our engagement! ❤️",

  applicationName: "Our Engagement",

  openGraph: {
    title: "Our Engagement ❤️ | You're Invited",
    description:
      "We would love to have you with us on our special day. Join us to celebrate!",
    type: "website",
    locale: "en_US",
    siteName: "Our Engagement",
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Engagement ❤️",
    description: "You're invited to celebrate our special day! ❤️",
  },

  robots: {
    index: true,
    follow: true,
  },

  themeColor: "#D94670",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
