"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiMessageCircle,
  FiBookOpen,
  FiChevronDown,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const contactOptions = [
    {
      icon: <FiMail className="h-6 w-6 text-[#4F46E5]" />,
      title: "Email Support",
      desc: "Get a response from our team within one business day.",
      action: "support@careerpilot.app",
      href: "mailto:support@careerpilot.app",
    },
    {
      icon: <FiMessageCircle className="h-6 w-6 text-[#2DD4BF]" />,
      title: "Live Chat",
      desc: "Chat with our support agent for quick account or matching questions.",
      action: "Start a chat",
      href: "#",
    },
    {
      icon: <FiBookOpen className="h-6 w-6 text-purple-400" />,
      title: "Documentation",
      desc: "Browse guides on profiles, matching, and applying with AI.",
      action: "Read the docs",
      href: "#",
    },
  ];

  const faqs = [
    {
      q: "How does the AI matching score work?",
      a: "Our agent compares your parsed skills, experience, and stated preferences against a role's requirements, weighting factors like tech stack overlap, seniority fit, and location or remote preferences to produce a transparent compatibility percentage.",
    },
    {
      q: "Can I edit an application after submitting it?",
      a: "No — once an application is sent to a company it can't be edited. You can withdraw an application from your dashboard, then update your profile and reapply if the listing is still open.",
    },
    {
      q: "Why was my sign-in rejected on the live site?",
      a: "This is usually caused by an auth configuration mismatch between environments. If you're the site owner, check that your BETTER_AUTH_URL and trustedOrigins settings match your production domain exactly, then redeploy.",
    },
    {
      q: "How do I delete my account and data?",
      a: "Go to Account Settings → Privacy → Delete Account. This permanently removes your profile, resume data, and application history. See our Privacy Policy for full details.",
    },
    {
      q: "Is CareerPilot free to use?",
      a: "Yes, core job searching, matching, and applying is free for candidates. Companies pay to post verified listings and access the matching engine.",
    },
    {
      q: "How do I report an incorrect or fake job listing?",
      a: "Use the \"Report Listing\" option on any job page, or email support@careerpilot.app with the listing link. Our team reviews reports within 24 hours.",
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
            Support
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            How can we help?
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Answers to common questions, or reach our team directly if you need something more specific.
          </p>

          <div className="max-w-xl mx-auto pt-2">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full rounded-xl border border-[#2D2D35] bg-[#18181E] py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact options */}
        <div className="mb-28 border-t border-[#2D2D35]/30 pt-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {contactOptions.map((option, i) => (
              <motion.a
                key={i}
                href={option.href}
                variants={itemVariants}
                className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 text-center space-y-4 hover:border-gray-500 transition-colors duration-300 block"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A0A0F] border border-[#2D2D35]">
                  {option.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{option.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{option.desc}</p>
                <p className="text-sm font-bold text-[#2DD4BF] pt-1">{option.action}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* 3. FAQ accordion */}
        <div className="mb-28 border-t border-[#2D2D35]/30 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Can't find what you're looking for? Reach out to our support team above.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#2D2D35] bg-[#18181E] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                  <FiChevronDown
                    className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180 text-[#2DD4BF]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CTA */}
        <div className="rounded-3xl border border-[#2D2D35] bg-gradient-to-br from-[#18181E] via-[#101015] to-[#4F46E5]/10 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#2DD4BF]/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#4F46E5]/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Still need a hand?</h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Our support team is real people, not bots — email us and we'll get back to you within one business day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="mailto:support@careerpilot.app"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4F46E5]/20 flex items-center justify-center gap-2"
              >
                Email Support
                <FiArrowRight />
              </a>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#2D2D35] bg-transparent text-sm font-bold text-gray-300 hover:text-white hover:bg-[#18181E] transition-all"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}