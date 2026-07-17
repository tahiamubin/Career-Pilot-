"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function TopCompanies() {
  const companies = [
    {
      name: "OpenAI",
      industry: "Artificial Intelligence",
      logo: "AI",
      logoBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      jobsCount: 12,
      rating: "4.9",
      path: "/jobs?q=OpenAI"
    },
    {
      name: "Vercel",
      industry: "Cloud & Frontend Dev",
      logo: "VC",
      logoBg: "bg-white/10 text-white border-white/20",
      jobsCount: 8,
      rating: "4.8",
      path: "/jobs?q=Vercel"
    },
    {
      name: "Stripe",
      industry: "Financial Infrastructure",
      logo: "ST",
      logoBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      jobsCount: 15,
      rating: "4.7",
      path: "/jobs?q=Stripe"
    },
    {
      name: "Figma",
      industry: "Collaborative Design",
      logo: "FG",
      logoBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      jobsCount: 6,
      rating: "4.8",
      path: "/jobs?q=Figma"
    },
    {
      name: "Linear",
      industry: "Productivity Software",
      logo: "LN",
      logoBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      jobsCount: 4,
      rating: "4.9",
      path: "/jobs?q=Linear"
    },
    {
      name: "Netflix",
      industry: "Streaming Entertainment",
      logo: "NF",
      logoBg: "bg-red-500/10 text-red-500 border-red-500/20",
      jobsCount: 9,
      rating: "4.6",
      path: "/jobs?q=Netflix"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative py-20 bg-[#0A0A0F] border-t border-[#2D2D35]/30 overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute left-1/4 top-1/3 w-[250px] h-[250px] bg-[#4F46E5]/2 blur-[80px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 w-[250px] h-[250px] bg-[#2DD4BF]/2 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            Top Partners
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Top Companies Hiring
          </h2>
          <p className="text-base text-gray-400">
            Work with world-class engineering teams building the future of software, AI, and design.
          </p>
        </div>

        {/* Company Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                borderColor: "#2DD4BF",
                boxShadow: "0 10px 30px -15px rgba(45,212,191,0.2)"
              }}
              className="relative rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Logo block */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border font-black text-xl shrink-0 ${company.logoBg}`}>
                    {company.logo}
                  </div>

                  {/* Openings count */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D2D35]/40 border border-[#2D2D35] text-xs font-semibold text-gray-300">
                    <FiBriefcase className="h-3.5 w-3.5 text-[#2DD4BF]" />
                    <span>{company.jobsCount} Openings</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#2DD4BF] transition-colors leading-tight">
                  {company.name}
                </h3>
                <p className="text-sm font-semibold text-gray-400 mt-1.5">{company.industry}</p>
              </div>

              {/* Card Footer Link */}
              <div className="flex items-center justify-between border-t border-[#2D2D35]/50 pt-4 mt-6">
                <span className="text-xs font-semibold text-gray-500">
                  Rating: <span className="text-gray-300 font-bold">{company.rating} ★</span>
                </span>
                
                <Link
                  href={company.path}
                  className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-white transition-colors"
                >
                  Explore Jobs
                  <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
