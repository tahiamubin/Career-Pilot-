"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiSearch, FiCheck, FiCpu, FiPlay, FiBriefcase } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const dashboardLogs = [
    { text: "Scanning 50+ job platforms...", status: "completed", delay: 0 },
    { text: "Senior Frontend Developer at Stripe: 98% Match!", status: "success", delay: 1.5 },
    { text: "Resume aligned for 'Next.js & Server Actions'...", status: "completed", delay: 3 },
    { text: "Cover letter tailored & ready to submit.", status: "ready", delay: 4.5 },
  ];

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-[#0A0A0F] pt-24 pb-16 flex items-center">
      {/* Background Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#4F46E5]/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#2DD4BF]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[150px] rounded-full bg-[#4F46E5]/3 blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Copywriting & CTAs */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2D2D35] bg-[#18181E] px-3.5 py-1.5 text-xs font-semibold text-[#2DD4BF] shadow-lg">
                <HiSparkles className="animate-pulse" />
                The Autonomous Job Search Agent
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Hire Smarter.<br />
              Land Faster.<br />
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent">
                Powered by AI Agents.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants} 
              className="max-w-xl text-base text-gray-400 sm:text-lg"
            >
              The first full-stack agentic job platform that automates your search, matches your skills instantly, and autogenerates hyper-tailored cover letters.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/jobs"
                className="relative inline-flex items-center justify-center rounded-xl p-[1.5px] text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF]" />
                <span className="relative flex items-center justify-center px-6 py-3.5 rounded-[10px] bg-[#0A0A0F] hover:bg-transparent transition-all duration-300">
                  Find Jobs Now
                </span>
              </Link>

              <button
                onClick={() => {
                  const section = document.getElementById("ai-features");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 rounded-xl border border-[#2D2D35] bg-[#18181E] px-6 py-3.5 text-sm font-semibold text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <FiPlay className="fill-current text-[#2DD4BF] h-4 w-4" />
                See How It Works
              </button>
            </motion.div>

            {/* Micro Stats */}
            <motion.div 
              variants={itemVariants} 
              className="pt-6 border-t border-[#2D2D35] flex items-center gap-6 text-gray-400 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1.5">
                <FiCheck className="text-[#2DD4BF]" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheck className="text-[#2DD4BF]" />
                Cancel plan anytime
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Dashboard Mockup */}
          <motion.div 
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Visual glow frame */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] opacity-20 blur-xl pointer-events-none" />

            {/* Dashboard Container */}
            <motion.div 
              className="relative w-full max-w-md rounded-2xl border border-[#2D2D35] bg-[#18181E] shadow-2xl overflow-hidden"
              variants={floatingVariants}
              animate="animate"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-[#2D2D35] bg-[#0A0A0F] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-gray-500 flex items-center gap-1">
                  <FiCpu className="text-[#2DD4BF]" />
                  COPILOT_AGENT_ACTIVE
                </span>
              </div>

              {/* Terminal Inner Content */}
              <div className="p-5 space-y-4">
                {/* Search Bar Visual */}
                <div className="flex items-center gap-2.5 rounded-xl bg-[#22222A] px-3.5 py-2.5 border border-[#2D2D35]">
                  <FiSearch className="text-gray-400 h-4 w-4 shrink-0" />
                  <div className="text-xs text-gray-300 font-mono flex items-center">
                    <span>agent.find_jobs(role="React Architect")</span>
                    <span className="w-1.5 h-3.5 ml-1 bg-[#2DD4BF] animate-pulse" />
                  </div>
                </div>

                {/* Job Card Mock */}
                <div className="rounded-xl border border-[#2D2D35] bg-[#0A0A0F] p-4 space-y-3 relative overflow-hidden">
                  {/* Backdrop shine */}
                  <div className="absolute top-0 right-0 h-16 w-16 bg-[#2DD4BF]/5 blur-lg pointer-events-none" />
                  
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Staff React Developer</h4>
                      <p className="text-[11px] text-gray-400">Stripe · Remote (US/Canada)</p>
                    </div>
                    <span className="inline-block rounded-full bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] px-2 py-0.5 text-[10px] font-bold text-white">
                      98% Match
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#18181E] px-2 py-0.5 text-[10px] text-gray-400 border border-[#2D2D35]">Full-time</span>
                    <span className="rounded bg-[#18181E] px-2 py-0.5 text-[10px] text-gray-400 border border-[#2D2D35]">$170k - $210k</span>
                  </div>
                </div>

                {/* Agent Activity Logs */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Agent Action History</span>
                  <div className="space-y-2 font-mono text-[11px]">
                    {dashboardLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: log.delay, duration: 0.5 }}
                        className="flex items-center justify-between py-1 border-b border-[#2D2D35]/50 last:border-0"
                      >
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <span className={`h-1 w-1 rounded-full ${
                            log.status === "success" ? "bg-[#2DD4BF]" : 
                            log.status === "ready" ? "bg-[#4F46E5]" : "bg-gray-500"
                          }`} />
                          {log.text}
                        </span>
                        <span className={`text-[10px] ${
                          log.status === "success" ? "text-[#2DD4BF]" : 
                          log.status === "ready" ? "text-[#4F46E5] font-bold" : "text-gray-500"
                        }`}>
                          {log.status === "success" ? "[MATCHED]" : 
                           log.status === "ready" ? "[DONE]" : "[OK]"}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small floating details */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -left-6 rounded-xl border border-[#2D2D35] bg-[#18181E]/90 backdrop-blur-md p-3.5 shadow-xl flex items-center gap-3 hidden sm:flex"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4F46E5]/10 border border-[#4F46E5]/30">
                <FiBriefcase className="text-[#4F46E5] h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">4 New Applications</p>
                <p className="text-[10px] text-[#2DD4BF]">Submitted by Agent on Autopilot</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
