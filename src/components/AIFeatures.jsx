"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiTrendingUp, FiCpu, FiCheckCircle, FiFileText } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function AIFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "AI Copilot Chat",
      description: "Chat directly with your job hunting agent. Tell it what you're looking for, ask for salary updates, or direct it to write letters on autopilot.",
      icon: <FiMessageSquare className="h-5 w-5" />,
      color: "text-[#4F46E5]",
      glow: "shadow-[#4F46E5]/10 border-[#4F46E5]/20",
    },
    {
      title: "Resume Match Analyzer",
      description: "Scan your resume against any job description. Instantly see skill gaps, missing keywords, and get recommendations to optimize your profile.",
      icon: <FiTrendingUp className="h-5 w-5" />,
      color: "text-[#2DD4BF]",
      glow: "shadow-[#2DD4BF]/10 border-[#2DD4BF]/20",
    },
    {
      title: "AI Cover Letter Generator",
      description: "Generate customized, hyper-targeted cover letters tailored to specific positions and companies. Edit, preview, and export instantly.",
      icon: <FiFileText className="h-5 w-5" />,
      color: "text-purple-400",
      glow: "shadow-purple-500/10 border-purple-500/20",
    },
  ];

  // Typewriter effect for Cover Letter tab
  const [typedText, setTypedText] = useState("");
  const fullText = `Dear Hiring Team at Stripe,

I am writing to express my strong interest in the Staff React Architect position. With over 6 years of experience building Next.js systems and managing micro-frontend states, I am confident in my ability to enhance Stripe's dashboard UX.

In my previous role, I optimized application load speeds by 40% using Next.js Server Actions and React Server Components...`;

  useEffect(() => {
    if (activeTab !== 2) {
      setTypedText("");
      return;
    }
    
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="ai-features" className="relative py-20 bg-[#0A0A0F] overflow-hidden border-t border-[#2D2D35]/30">
      {/* Glow blobs */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#4F46E5]/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Autonomous AI Feature Suite
          </h2>
          <p className="text-base text-gray-400">
            Automate the tedious parts of the application process with specialized AI models built for tech candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Tab Selectors */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((feature, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 flex items-start gap-4 shadow-lg cursor-pointer ${
                    isActive
                      ? `bg-[#18181E] border-[#4F46E5] ${feature.glow} scale-[1.01]`
                      : "bg-[#18181E]/40 border-[#2D2D35] hover:bg-[#18181E] hover:border-[#2D2D35]/80"
                  }`}
                >
                  <div className={`p-3 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`text-base font-bold transition-colors ${isActive ? "text-white" : "text-gray-300"}`}>
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Interactive Canvas */}
          <div className="lg:col-span-7 h-[400px] rounded-2xl border border-[#2D2D35] bg-[#18181E] shadow-2xl relative overflow-hidden flex flex-col">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-[#2D2D35] bg-[#0A0A0F] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                {features[activeTab].title.replace(" ", "_")}_DEMO
              </span>
            </div>

            {/* Inner dynamic content wrapper */}
            <div className="flex-1 p-6 overflow-y-auto relative bg-[#0A0A0F]/50">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Chat Bubble 1 */}
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] flex items-center justify-center text-xs font-bold text-white shrink-0">
                        CP
                      </div>
                      <div className="rounded-2xl rounded-tl-none bg-[#18181E] border border-[#2D2D35] p-3 text-xs text-gray-300 max-w-[80%] leading-relaxed">
                        Hey there! I am your career pilot copilot. What kind of software roles can I find you today?
                      </div>
                    </div>

                    {/* Chat Bubble 2 */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="rounded-2xl rounded-tr-none bg-[#4F46E5] p-3 text-xs text-white max-w-[80%] leading-relaxed shadow-lg">
                        Find me high-paying Remote React roles with Next.js skills required.
                      </div>
                      <div className="h-8 w-8 rounded-full bg-[#22222A] border border-[#2D2D35] flex items-center justify-center text-xs font-bold text-gray-300 shrink-0">
                        ME
                      </div>
                    </div>

                    {/* Chat Bubble 3 */}
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] flex items-center justify-center text-xs font-bold text-white shrink-0 animate-pulse">
                        CP
                      </div>
                      <div className="rounded-2xl rounded-tl-none bg-[#18181E] border border-[#2D2D35] p-3 text-xs text-gray-300 max-w-[80%] leading-relaxed">
                        Scanning platforms... I found **12 new matches** today! 
                        <br /><br />
                        Top match: **Frontend Architect at Vercel** (96% Match, $180k). Should we draft a customized cover letter for this position?
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    {/* Circle Indicator */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-[#2D2D35] p-1 mb-2">
                        <div className="absolute inset-2 rounded-full border-[6px] border-[#2D2D35]" />
                        <div className="absolute inset-2 rounded-full border-[6px] border-t-[#2DD4BF] border-r-[#2DD4BF] border-b-[#4F46E5] border-l-[#4F46E5] rotate-45" />
                        <span className="text-2xl font-black text-white">96%</span>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-[#2DD4BF] uppercase">Match Score</span>
                    </div>

                    {/* Skills Checklist */}
                    <div className="md:col-span-8 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Matched Skills (14)</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {["React", "Next.js", "Tailwind CSS", "TypeScript", "Git", "REST APIs"].map((s, i) => (
                            <span key={i} className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                              <FiCheckCircle />
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Missing/Recommended (2)</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {["GraphQL", "Next.js Server Actions"].map((s, i) => (
                            <span key={i} className="inline-flex items-center gap-1 rounded bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 text-[10px] font-medium text-yellow-400">
                              💡 Add: {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="writer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    {/* Cover Letter Box */}
                    <div className="flex-1 bg-[#18181E] border border-[#2D2D35] rounded-xl p-4 font-mono text-[11px] text-gray-300 min-h-[220px] whitespace-pre-wrap leading-relaxed shadow-inner">
                      {typedText}
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-[#4F46E5] animate-pulse" />
                    </div>

                    <div className="flex justify-between items-center mt-3 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <HiSparkles className="text-[#2DD4BF] animate-spin" />
                        AI Agent Customizing...
                      </span>
                      <span>{typedText.length} characters</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
