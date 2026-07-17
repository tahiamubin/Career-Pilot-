"use client";

import { motion } from "framer-motion";
import { 
  FiArrowRight, 
  FiCpu, 
  FiSearch, 
  FiCheckCircle, 
  FiSend, 
  FiGithub, 
  FiLinkedin,
  FiBriefcase,
  FiTrendingUp,
  FiAward
} from "react-icons/fi";
import Link from "next/link";

export default function AboutPage() {
  const steps = [
    {
      icon: <FiSearch className="h-6 w-6 text-[#2DD4BF]" />,
      title: "1. Search Listings",
      desc: "Browse a highly-curated directory of active roles at frontier technology companies, indexed daily by our crawlers."
    },
    {
      icon: <FiCpu className="h-6 w-6 text-[#4F46E5]" />,
      title: "2. Match Compatibility",
      desc: "Our AI agent analyzes your profile vs. job requirements to compute a precise, transparent compatibility score."
    },
    {
      icon: <FiSend className="h-6 w-6 text-purple-400" />,
      title: "3. Apply with AI",
      desc: "Submit your pre-verified profile details and generated cover letters directly to company recruiters instantly."
    }
  ];

  const stats = [
    {
      icon: <FiBriefcase className="h-6 w-6 text-[#4F46E5]" />,
      value: "12,450+",
      title: "Active Job Listings"
    },
    {
      icon: <FiTrendingUp className="h-6 w-6 text-[#2DD4BF]" />,
      value: "98.4%",
      title: "Agent Matching Accuracy"
    },
    {
      icon: <FiAward className="h-6 w-6 text-purple-400" />,
      value: "500+",
      title: "Partner Companies"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-[#4F46E5]/3 blur-[110px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[450px] h-[450px] bg-[#2DD4BF]/3 blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* 1. Hero / Mission Intro */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            Our Mission
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Navigating the Tech Job Horizon
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            CareerPilot is a developer-first platform designed to eliminate hours of manual job searching. We use intelligent, agent-driven profiles to match software developers with highly compatible roles.
          </p>
        </div>

        {/* 2. Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 border-t border-[#2D2D35]/30 pt-16">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Why We Built It
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed text-sm sm:text-base">
              <p>
                As software developers, we grew incredibly tired of generic recruiter spam, outdated job boards, and manually filtering through hundreds of listings that had nothing to do with our core tech stack.
              </p>
              <p>
                We set out to build CareerPilot to solve this. Instead of keyword hacking your resume for basic filters, CareerPilot parses deep technical skillsets, architectures, and systems preferences. Our AI matching model helps engineers pinpoint high-compatibility opportunities immediately.
              </p>
              <p>
                No noise. No mismatched salaries. Just highly relevant, developer-centric listings that match exactly what you want to build next.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-[#2D2D35] bg-[#18181E] p-8 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 h-36 w-36 bg-[#4F46E5]/5 blur-2xl pointer-events-none" />
              <h3 className="text-lg font-bold text-[#2DD4BF] mb-2">Developer First Ethos</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "Our core goal is to build software tools that respect developers' time and focus. We believe applying for jobs shouldn't feel like a lottery."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] p-[1px]">
                  <div className="h-full w-full rounded-full bg-[#0A0A0F] flex items-center justify-center font-bold text-xs">
                    CP
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">The CareerPilot Core Team</p>
                  <p className="text-xs text-gray-500 font-semibold">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. How It Works Section */}
        <div className="mb-28 border-t border-[#2D2D35]/30 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              How It Works
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              A seamless candidate lifecycle designed to get you matched and applied in three quick steps.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 text-center space-y-4 hover:border-gray-500 transition-colors duration-300"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A0A0F] border border-[#2D2D35]">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 4. Stats Section */}
        <div className="mb-28 border-t border-[#2D2D35]/30 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 p-5 rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A0A0F] border border-[#2D2D35] shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Meet the Team Section */}
        <div className="mb-28 border-t border-[#2D2D35]/30 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Meet the Team
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              The engineers, designers, and thinkers behind CareerPilot.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              whileHover={{ y: -6, borderColor: "#4F46E5" }}
              className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 text-center space-y-4 transition-all duration-300"
            >
              <div className="relative mx-auto h-24 w-24 rounded-full overflow-hidden border border-[#2D2D35] bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] p-[2px]">
                <div className="h-full w-full rounded-full bg-[#0A0A0F] flex items-center justify-center font-bold text-2xl text-white">
                  CP
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white">CareerPilot Creator</h3>
                <p className="text-xs font-semibold text-[#2DD4BF] mt-0.5">Founding Software Engineer</p>
              </div>
              
              <p className="text-sm text-gray-400 leading-relaxed">
                Full-stack developer focused on creating intelligent developer utilities. Building automation that handles the boring stuff so you can focus on writing code.
              </p>

              <div className="flex justify-center gap-4 pt-2">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#0A0A0F] border border-[#2D2D35] text-gray-400 hover:text-white transition-colors"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#0A0A0F] border border-[#2D2D35] text-gray-400 hover:text-white transition-colors"
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 6. Call to Action (CTA) */}
        <div className="rounded-3xl border border-[#2D2D35] bg-gradient-to-br from-[#18181E] via-[#101015] to-[#4F46E5]/10 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#2DD4BF]/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#4F46E5]/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to find your match?
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Create your profile today, align your agent matching preferences, and let verified roles find you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4F46E5]/20 flex items-center justify-center gap-2"
              >
                Browse Listings
                <FiArrowRight />
              </Link>
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#2D2D35] bg-transparent text-sm font-bold text-gray-300 hover:text-white hover:bg-[#18181E] transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
