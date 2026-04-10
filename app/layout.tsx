import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css";
import ConditionalLayout from "@/components/site/ConditionalLayout";
import AuthProvider from "@/context/AuthContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})


export const metadata: Metadata = {
  title: "dev-x100 | Professional Webinar Platform",
  description: "Live and on-demand webinar platform for compliance, HR, and operational excellence.",
  metadataBase: new URL("https://dev-x100.com"),
  openGraph: {
    title: "dev-x100 | Professional Webinar Platform",
    description: "Live and on-demand webinar platform for compliance, HR, and operational excellence.",
    url: "https://dev-x100.com",
    siteName: "dev-x100",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "dev-x100 | Professional Webinar Platform",
    description: "Live and on-demand webinar platform for compliance, HR, and operational excellence.",
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
    <html lang="en">
      <body className={plusJakarta.variable}>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
