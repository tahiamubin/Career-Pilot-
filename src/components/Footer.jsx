"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCpu, FiGithub, FiTwitter, FiLinkedin, FiSend, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 1200);
  };

  return (
    <footer className="relative bg-[#0A0A0F] border-t border-[#2D2D35]/30 pt-16 pb-12">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-[#4F46E5]/3 blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Newsletter / CTA Banner */}
        <div className="relative rounded-3xl border border-[#2D2D35] bg-[#18181E] p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Subtle gradient blob inside card */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-[#2DD4BF]/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-[#4F46E5]/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* CTA Copy */}
            <div className="lg:col-span-7 space-y-3.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#2DD4BF]">
                Get Early Access
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Ready to accelerate your job search?
              </h3>
              <p className="text-sm text-gray-400 max-w-xl">
                Join thousands of software engineers using autonomous AI agents to bypass filtering and secure tech offers.
              </p>
            </div>

            {/* CTA Form */}
            <div className="lg:col-span-5">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-400"
                >
                  <FiCheckCircle className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Successfully joined beta!</p>
                    <p className="text-xs text-emerald-500/80">We've sent a welcome email to your inbox.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 rounded-xl border border-[#2D2D35] bg-[#22222A] px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#2DD4BF] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#4F46E5]/20 hover:scale-[1.02] hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Join Beta"}
                    <FiSend className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-[#2D2D35]/30">
          {/* Logo & Tagline column */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#0A0A0F]">
                  <FiCpu className="h-4.5 w-4.5 text-[#2DD4BF]" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Career<span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent">Pilot</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Automating structural job search pipelines. Our AI agents parse, scan, pre-score, match, and tailor applications for tech engineers globally.
            </p>
          </div>

          {/* Links columns */}
          <div className="md:col-span-8 grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Platform</h4>
              <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
                <li><Link href="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link href="/signin" className="hover:text-white transition-colors">AI Resume Matcher</Link></li>
                <li><Link href="/signin" className="hover:text-white transition-colors">AI Letter Writer</Link></li>
                <li><Link href="/jobs/new" className="hover:text-white transition-colors">Post a Job</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Support Center</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">API Docs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Cookie settings</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright / socials row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#2D2D35]/30 text-xs text-gray-500 font-medium">
          <span>&copy; {new Date().getFullYear()} Career Pilot Inc. All rights reserved.</span>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FiGithub className="h-4.5 w-4.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FiTwitter className="h-4.5 w-4.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <FiLinkedin className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
