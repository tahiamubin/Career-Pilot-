"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Senior Frontend Engineer at Stripe",
      quote: "The Resume Matcher was a game changer. I added a couple of recommended keywords to my profile, drafted a tailored cover letter, and had an interview scheduled the very next day. Brilliant platform!",
      rating: 5,
      initials: "SJ",
      bgColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    },
    {
      name: "David Chen",
      role: "Engineering Manager at Vercel",
      quote: "As a hiring manager, I instantly notice candidates using Career Pilot. Their applications are highly tailored, mapping directly to our specific Next.js requirements. It cuts down screening time by 75%.",
      rating: 5,
      initials: "DC",
      bgColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      name: "Elena Rostova",
      role: "Full-Stack Devops Engineer",
      quote: "I set the AI Copilot to run in the background. In just 2 weeks, it found 15 highly compatible jobs, customized applications for 5 of them, and secured 3 solid interviews. Saving me hours of work!",
      rating: 5,
      initials: "ER",
      bgColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
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
    <section className="relative py-20 bg-[#0A0A0F] overflow-hidden border-t border-[#2D2D35]/30">
      {/* Background decoration glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-[#4F46E5]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[350px] h-[350px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Landed by Career Pilot
          </h2>
          <p className="text-base text-gray-400">
            Hear from developers and hiring team leads who successfully automate and streamline applications using AI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: "#2DD4BF" }}
              className="relative rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 text-[#2DD4BF] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} className="fill-current h-4.5 w-4.5" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-gray-300 italic leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#2D2D35]/50">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold shrink-0 ${t.bgColor}`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{t.name}</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
