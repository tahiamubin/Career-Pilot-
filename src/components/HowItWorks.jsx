"use client";

import { motion } from "framer-motion";
import { FiUploadCloud, FiCpu, FiFileText } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Sync Your Profile",
      description: "Upload your resume. Our parsing engine indexes your core skill sets, tech stack, and career criteria to build your agentic identity.",
      icon: <FiUploadCloud className="h-6 w-6 text-[#4F46E5]" />,
      bg: "from-[#4F46E5]/10 to-transparent border-[#4F46E5]/20",
    },
    {
      number: "02",
      title: "AI Agent Scanning",
      description: "Your autonomous copilot scans top tech portals, matching roles semantically. It filters out spam and pre-calculates match scores.",
      icon: <FiCpu className="h-6 w-6 text-[#2DD4BF]" />,
      bg: "from-[#2DD4BF]/10 to-transparent border-[#2DD4BF]/20",
    },
    {
      number: "03",
      title: "Auto-Tailored Apply",
      description: "Generate customized cover letters and resume adjustments aligned with the job description in one click. Submit and track.",
      icon: <FiFileText className="h-6 w-6 text-purple-400" />,
      bg: "from-purple-500/10 to-transparent border-purple-500/20",
    },
  ];

  return (
    <section className="relative py-20 bg-[#0A0A0F] overflow-hidden border-t border-[#2D2D35]/30">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#4F46E5]/3 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            The Process
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="text-base text-gray-400">
            Let AI take care of the search, curation, and tailoring process while you focus on preparing for the interviews.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-12 right-12 h-[1px] bg-gradient-to-r from-[#4F46E5] via-[#2DD4BF] to-purple-500 opacity-20 -translate-y-1/2 hidden lg:block pointer-events-none" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-[#2D2D35] bg-gradient-to-b from-[#18181E] to-[#18181E]/40"
              >
                {/* Step Icon Container */}
                <div className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-b ${step.bg}`}>
                  {step.icon}
                  {/* Step Number Badge */}
                  <span className="absolute -top-3.5 -right-3.5 flex h-7 w-7 items-center justify-center rounded-lg border border-[#2D2D35] bg-[#22222A] text-xs font-bold text-gray-400">
                    {step.number}
                  </span>
                </div>

                {/* Text Details */}
                <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
