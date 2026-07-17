"use client";

import { use, useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  FiMapPin, 
  FiDollarSign, 
  FiClock, 
  FiCpu, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiBriefcase, 
  FiArrowRight, 
  FiCalendar,
  FiUser
} from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function JobDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session;

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Job listing not found");
        }
        const data = await response.json();
        setJob(data.job);
        setRelatedJobs(data.relatedJobs || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
      toast.success("Application submitted successfully with AI Profile!", {
        style: {
          background: "#18181E",
          color: "#fff",
          border: "1px border #2D2D35"
        }
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white pt-28 flex items-center justify-center">
        <div className="space-y-4 text-center animate-pulse">
          <div className="h-12 w-12 border-4 border-t-[#4F46E5] border-[#2D2D35] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm font-semibold">Fetching job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white pt-28 flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl border border-[#2D2D35] bg-[#18181E] max-w-md">
          <h2 className="text-2xl font-black text-white">Listing not found</h2>
          <p className="text-gray-400 mt-2">The job post you are looking for does not exist or was removed.</p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-sm font-bold text-white transition-all hover:opacity-90"
          >
            <FiArrowLeft /> Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#4F46E5]/4 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Back Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Listings
        </Link>

        {/* Hero Details Block */}
        <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-md p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            <div className="flex items-center gap-5">
              {/* Logo block */}
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border font-black text-2xl shrink-0 ${job.logoBg}`}>
                {job.logo}
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {job.title}
                </h1>
                <p className="text-lg font-semibold text-[#2DD4BF] mt-1">
                  {job.company}
                </p>
              </div>
            </div>

            {/* AI Match Score Badge if Logged In */}
            {isLoggedIn ? (
              <div className="flex flex-col items-start sm:items-end">
                <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5]/20 to-[#2DD4BF]/20 border border-[#2DD4BF]/40 px-4 py-2 text-sm font-black text-white">
                  <FiCpu className="text-[#2DD4BF] h-4.5 w-4.5 animate-pulse" />
                  <span>{job.matchScore}% Match Score</span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold mt-1">Compatible with your developer profile</span>
              </div>
            ) : (
              <div className="flex flex-col items-start sm:items-end">
                <Link
                  href="/signin"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2D2D35]/50 border border-[#2D2D35] hover:border-[#4F46E5]/50 px-4 py-2 text-xs font-bold text-gray-300 hover:text-white transition-all"
                >
                  <FiCpu className="text-gray-400 h-4 w-4" />
                  Calculate AI Match Score
                </Link>
                <span className="text-[10px] text-gray-500 mt-1">Login to view compatibility</span>
              </div>
            )}
          </div>

          {/* Quick metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#2D2D35]/50 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-[#2DD4BF]" />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Location</p>
                <p className="text-white font-semibold mt-0.5">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiDollarSign className="text-[#2DD4BF]" />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Compensation</p>
                <p className="text-white font-semibold mt-0.5">{job.salary}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-[#2DD4BF]" />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Job Type</p>
                <p className="text-white font-semibold mt-0.5">{job.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-[#2DD4BF]" />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Posted At</p>
                <p className="text-white font-semibold mt-0.5">
                  {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main details column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D2D35] pb-3">
                <FiBriefcase className="text-[#2DD4BF]" />
                Job Description
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D2D35] pb-3">
                <FiCheckCircle className="text-[#2DD4BF]" />
                Requirements
              </h2>
              <ul className="space-y-3.5">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D2D35] pb-3">
                <FiDollarSign className="text-[#2DD4BF]" />
                Benefits & Perks
              </h2>
              <ul className="space-y-3.5">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/20 text-[#4F46E5] text-xs font-bold mt-0.5">
                      +
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action sidebar column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Interested in this role?</h3>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Use CareerPilot's integrated agent framework to analyze compatibility and apply with your verified candidate credentials.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleApply}
                  disabled={applying || applied}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer ${
                    applied
                      ? "bg-emerald-600 border border-emerald-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] hover:shadow-lg hover:shadow-[#4F46E5]/20"
                  }`}
                >
                  {applying ? (
                    <>
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      Submitting with AI...
                    </>
                  ) : applied ? (
                    <>
                      <FiCheckCircle />
                      Applied Successfully
                    </>
                  ) : (
                    <>
                      Apply with AI Pilot
                      <FiArrowRight />
                    </>
                  )}
                </button>
                
                <button 
                  onClick={() => toast.success("Saved to your developer console!")}
                  className="w-full py-3.5 px-4 rounded-xl border border-[#2D2D35] bg-transparent text-sm font-semibold text-gray-400 hover:text-white hover:bg-[#18181E] transition-all cursor-pointer"
                >
                  Bookmark Listing
                </button>
              </div>

              {/* Tags summary inside sidebar */}
              <div className="border-t border-[#2D2D35]/50 mt-6 pt-6 space-y-3">
                <p className="text-xs text-gray-500 font-bold uppercase">Required Stack</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="rounded-lg bg-[#0A0A0F] border border-[#2D2D35] px-2.5 py-1 text-xs text-gray-300 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs Section */}
        {relatedJobs.length > 0 && (
          <div className="mt-20 border-t border-[#2D2D35]/30 pt-16 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Related Opportunities</h2>
              <p className="text-sm text-gray-400 mt-1">Explore similar job listing recommendations matching this category.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedJobs.map((relJob) => (
                <motion.div
                  key={relJob.id}
                  whileHover={{ y: -5, borderColor: "#4F46E5" }}
                  className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold text-sm shrink-0 ${relJob.logoBg}`}>
                        {relJob.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1 hover:text-[#2DD4BF] transition-colors">
                          <Link href={`/jobs/${relJob.id}`}>{relJob.title}</Link>
                        </h4>
                        <p className="text-xs font-semibold text-gray-400">{relJob.company}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 line-clamp-2 mb-4">{relJob.description}</p>
                    
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <FiMapPin className="h-3 w-3" />
                        {relJob.location.replace(" (Hybrid)", "").replace(" (US)", "")}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiDollarSign className="h-3 w-3" />
                        {relJob.salary}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/jobs/${relJob.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2DD4BF] hover:text-white transition-colors pt-3 border-t border-[#2D2D35]/50 mt-4"
                  >
                    Details <FiArrowRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
