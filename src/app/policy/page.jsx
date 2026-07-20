"use client";

import { motion } from "framer-motion";
import {
  FiFileText,
  FiUserCheck,
  FiAlertTriangle,
  FiXCircle,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

export default function TermsPage() {
  const highlights = [
    {
      icon: <FiUserCheck className="h-6 w-6 text-[#4F46E5]" />,
      title: "Your Account",
      desc: "You're responsible for the accuracy of the profile and resume information you submit, and for keeping your login credentials secure.",
    },
    {
      icon: <FiFileText className="h-6 w-6 text-[#2DD4BF]" />,
      title: "Fair Use",
      desc: "CareerPilot is for genuine job seekers. Scraping listings, automating fake applications, or abusing the matching engine isn't permitted.",
    },
    {
      icon: <FiAlertTriangle className="h-6 w-6 text-purple-400" />,
      title: "No Guarantees",
      desc: "Compatibility scores and matches are estimates to help guide your search — they don't guarantee interviews, offers, or employment outcomes.",
    },
    {
      icon: <FiXCircle className="h-6 w-6 text-rose-400" />,
      title: "Termination",
      desc: "We may suspend accounts that violate these terms, including spam, fraudulent listings, or misuse of applicant data.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-[#4F46E5]/3 blur-[110px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[450px] h-[450px] bg-[#2DD4BF]/3 blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* 1. Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            The ground rules for using CareerPilot — written plainly, so there are no surprises.
          </p>
          <p className="text-xs text-gray-600 font-semibold">Last updated: July 20, 2026</p>
        </div>

        {/* 2. Highlight cards */}
        <div className="mb-28 border-t border-[#2D2D35]/30 pt-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 space-y-4 hover:border-gray-500 transition-colors duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A0A0F] border border-[#2D2D35]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3. Full terms text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28 border-t border-[#2D2D35]/30 pt-16">
          <div className="lg:col-span-12 space-y-10">
            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                By creating an account or using CareerPilot, you agree to these Terms of Service and our Privacy
                Policy. If you don't agree, please don't use the platform.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">2. Eligibility</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                You must be at least 16 years old to create a CareerPilot account and use our services to search and
                apply for jobs.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">3. Account Responsibilities</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                You agree to provide accurate information in your profile and applications, and to keep your account
                credentials confidential. You're responsible for all activity that happens under your account.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">4. Acceptable Use</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                You may not scrape or bulk-download job listings, submit fraudulent or automated applications, post
                fake job listings as an employer, or attempt to interfere with the matching engine's normal
                operation.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">5. Matching Disclaimer</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Compatibility scores are generated by an AI model and are intended as guidance only. CareerPilot does
                not guarantee interviews, job offers, or the accuracy of any third-party job listing.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">6. Termination</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these terms, including abuse,
                fraud, or activity that harms other users or partner companies.
              </p>
            </div>

            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">7. Changes to These Terms</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                We may update these terms from time to time. Continued use of CareerPilot after changes are posted
                means you accept the revised terms.
              </p>
            </div>
          </div>
        </div>

        {/* 4. CTA */}
        <div className="rounded-3xl border border-[#2D2D35] bg-gradient-to-br from-[#18181E] via-[#101015] to-[#4F46E5]/10 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#2DD4BF]/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#4F46E5]/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative">
            <FiFileText className="h-10 w-10 mx-auto text-[#2DD4BF]" />
            <h2 className="text-3xl font-extrabold sm:text-4xl">Have questions about these terms?</h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Reach out and we'll walk you through anything that's unclear.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/help"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4F46E5]/20 flex items-center justify-center gap-2"
              >
                Visit Help Center
                <FiArrowRight />
              </Link>
              <Link
                href="/privacy"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#2D2D35] bg-transparent text-sm font-bold text-gray-300 hover:text-white hover:bg-[#18181E] transition-all"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}