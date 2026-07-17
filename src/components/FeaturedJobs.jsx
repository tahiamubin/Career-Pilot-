"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign, FiClock, FiCpu, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function FeaturedJobs() {
  const jobs = [
    {
      id: 1,
      title: "Senior AI Research Engineer",
      company: "OpenAI",
      logo: "AI",
      logoBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      location: "San Francisco, CA (Hybrid)",
      salary: "$210k - $260k",
      type: "Full-time",
      matchScore: 98,
      tags: ["Python", "PyTorch", "LLMs", "Reinforcement Learning"],
    },
    {
      id: 2,
      title: "Frontend Architect",
      company: "Vercel",
      logo: "VC",
      logoBg: "bg-white/10 text-white border-white/20",
      location: "Remote (Global)",
      salary: "$180k - $220k",
      type: "Full-time",
      matchScore: 96,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 3,
      title: "Platform Infrastructure Engineer",
      company: "HashiCorp",
      logo: "HC",
      logoBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      location: "Remote (US)",
      salary: "$160k - $190k",
      type: "Full-time",
      matchScore: 93,
      tags: ["Go", "Kubernetes", "AWS", "Terraform"],
    },
    {
      id: 4,
      title: "Product Engineer (Full-Stack)",
      company: "Linear",
      logo: "LN",
      logoBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      location: "San Francisco, CA",
      salary: "$150k - $185k",
      type: "Full-time",
      matchScore: 91,
      tags: ["React", "Node.js", "PostgreSQL", "GraphQL"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section className="relative py-20 bg-[#0A0A0F] border-t border-[#2D2D35]/30">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-[#2DD4BF]/3 blur-[90px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-[#4F46E5]/3 blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            Curated Recommendations
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Featured Agent Matches
          </h2>
          <p className="text-base text-gray-400">
            Our AI Agents analyze market listings in real time to fetch high-compatibility roles tailored to your stack.
          </p>
        </div>

        {/* Job Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                borderColor: "#4F46E5",
                boxShadow: "0 10px 30px -15px rgba(79,70,229,0.3)"
              }}
              className="relative rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card top details */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Company Logo and Names */}
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border font-bold text-lg shrink-0 ${job.logoBg}`}>
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug hover:text-[#2DD4BF] transition-colors">
                        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="text-sm font-semibold text-gray-400">{job.company}</p>
                    </div>
                  </div>

                  {/* Match score label */}
                  <div className="flex flex-col items-end">
                    <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#4F46E5]/10 to-[#2DD4BF]/10 border border-[#4F46E5]/30 px-3 py-1 text-xs font-bold text-white">
                      <FiCpu className="text-[#2DD4BF] h-3.5 w-3.5 animate-pulse" />
                      <span>{job.matchScore}% Match</span>
                    </div>
                  </div>
                </div>

                {/* Job Metadata details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-5">
                  <div className="flex items-center gap-1.5">
                    <FiMapPin className="text-gray-500 h-3.5 w-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiDollarSign className="text-gray-500 h-3.5 w-3.5" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 mt-1">
                    <FiClock className="text-gray-500 h-3.5 w-3.5" />
                    <span>Posted 1 day ago · {job.type}</span>
                  </div>
                </div>

                {/* Job Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="rounded-lg bg-[#22222A] border border-[#2D2D35] px-2.5 py-1 text-xs text-gray-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="flex items-center justify-between border-t border-[#2D2D35]/50 pt-4 mt-auto">
                <Link 
                  href={`/jobs/${job.id}`}
                  className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  View Details
                </Link>

                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#22222A] hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#2DD4BF] border border-[#2D2D35] hover:border-transparent px-4 py-2 text-xs font-bold text-white transition-all duration-300"
                >
                  Apply with AI
                  <FiArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#2D2D35] bg-[#18181E] px-6 py-3 text-sm font-semibold text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-200"
          >
            Explore All Listings
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
