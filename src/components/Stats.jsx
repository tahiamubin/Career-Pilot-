"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiTrendingUp, FiBriefcase, FiUsers, FiAward } from "react-icons/fi";

function CountUp({ to, duration = 2, decimals = 0, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(to);
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30;
    const totalSteps = totalMiliseconds / incrementTime;
    const stepIncrement = (end - start) / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = start + stepIncrement * currentStep;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextValue);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  return (
    <span ref={elementRef}>
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statList = [
    {
      id: 1,
      title: "Active Job Listings",
      value: "12450",
      suffix: "+",
      decimals: 0,
      icon: <FiBriefcase className="h-6 w-6 text-[#4F46E5]" />,
    },
    {
      id: 2,
      title: "Agent Matching Accuracy",
      value: "98.4",
      suffix: "%",
      decimals: 1,
      icon: <FiTrendingUp className="h-6 w-6 text-[#2DD4BF]" />,
    },
    {
      id: 3,
      title: "Partner Companies",
      value: "500",
      suffix: "+",
      decimals: 0,
      icon: <FiAward className="h-6 w-6 text-purple-400" />,
    },
  ];

  return (
    <section className="relative py-20 bg-[#0A0A0F] overflow-hidden border-t border-[#2D2D35]/30">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#4F46E5]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Counter Metrics */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
                Platform Statistics
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
                Accelerating Career Discoveries
              </h2>
              <p className="text-base text-gray-400 mt-4 leading-relaxed">
                By index-scoring applicant profiles and real-time market opportunities, Career Pilot eliminates hours of manual filtering.
              </p>
            </div>

            {/* Counters */}
            <div className="space-y-6">
              {statList.map((stat) => (
                <div 
                  key={stat.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A0A0F] border border-[#2D2D35]">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">
                      <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-gray-400 font-semibold">{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Custom Animated Analytics Chart */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Card background glowing blur */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-[#4F46E5]/5 blur-2xl pointer-events-none" />

              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white">AI Matching Accuracy Over Time</h3>
                  <p className="text-xs text-gray-400">Monthly breakdown of model success metrics</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold tracking-wide uppercase text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                    Match Rate
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#2DD4BF]" />
                    Acceptance Rate
                  </span>
                </div>
              </div>

              {/* Custom SVG Graph */}
              <div className="relative h-[200px] w-full mt-4 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#2D2D35" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#2D2D35" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#2D2D35" strokeWidth="0.5" strokeDasharray="5,5" />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="gradientIndigo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="gradientTeal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area Chart - Indigo */}
                  <path
                    d="M 0 170 Q 100 130 200 90 T 400 40 T 500 20 L 500 200 L 0 200 Z"
                    fill="url(#gradientIndigo)"
                  />

                  {/* Line Chart - Indigo */}
                  <motion.path
                    d="M 0 170 Q 100 130 200 90 T 400 40 T 500 20"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Shaded Area Chart - Teal */}
                  <path
                    d="M 0 185 Q 100 150 200 115 T 400 65 T 500 50 L 500 200 L 0 200 Z"
                    fill="url(#gradientTeal)"
                  />

                  {/* Line Chart - Teal */}
                  <motion.path
                    d="M 0 185 Q 100 150 200 115 T 400 65 T 500 50"
                    fill="none"
                    stroke="#2DD4BF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                  />

                  {/* Glowing Data Dots */}
                  <circle cx="500" cy="20" r="5" fill="#4F46E5" className="animate-ping" />
                  <circle cx="500" cy="20" r="3.5" fill="#ffffff" />
                  
                  <circle cx="500" cy="50" r="5" fill="#2DD4BF" className="animate-ping" />
                  <circle cx="500" cy="50" r="3.5" fill="#ffffff" />
                </svg>
              </div>

              {/* Chart X-Axis Labels */}
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase mt-3 px-1">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
