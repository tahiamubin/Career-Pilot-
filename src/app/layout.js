import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider";
import Providers from "./app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Career Pilot - Agentic AI Job Matching Platform",
  description: "Automate your job search. Let AI agents parse your resume, match you with software roles, and generate hyper-tailored cover letters.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#F3F4F6]">
        <QueryProvider>
          <Navbar />
          <main className="flex-1">
             <Providers>{children}</Providers>
           
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

