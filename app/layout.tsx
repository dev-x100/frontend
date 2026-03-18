import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})


export const metadata: Metadata = {
  title: "TunuDada | Professional Webinar Platform",
  description: "Live and on-demand webinar platform for compliance, HR, and operational excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={plusJakarta.variable}
      >
        <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  );
}
