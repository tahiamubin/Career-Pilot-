"use client";

import { use, useState, useEffect } from "react";

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
  FiUser,
  FiUpload,
  FiX,
  FiPlus
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useResumeAnalyzer } from "@/app/hooks/useResumeAnalyzer";
import { useCoverLetter } from "@/app/hooks/useCoverLetter";

// Normalizes a field that might be an array, a comma/newline-separated
// string, or missing — always returns a clean array of strings.
function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim() !== "") {
    return value
      .split(/\n|,/)
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

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

  const [showAiModal, setShowAiModal] = useState(false);
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [background, setBackground] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [customTagInput, setCustomTagInput] = useState("");

  const resumeAnalyzer = useResumeAnalyzer();
  const coverLetterGen = useCoverLetter();


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
    if (applied) return;
    setShowAiModal(true);
  };

  const submitApplication = () => {
    setApplying(true);
    setShowAiModal(false);
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
      toast.success("Application submitted successfully with AI Profile!", {
        style: {
          background: "#18181E",
          color: "#fff",
          border: "1px solid #2D2D35"
        }
      });
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["pdf", "docx", "txt"];
    const ext = file.name.split(".").pop().toLowerCase();
    if (!allowed.includes(ext)) {
      toast.error("Unsupported file type. Please upload a .pdf, .docx, or .txt file.");
      return;
    }

    setResumeFile(file);
  };

  const handleAnalyzeResume = async () => {
    if (!resumeFile) return;
    try {
      const data = await resumeAnalyzer.mutateAsync(resumeFile);
      const newSummary = data.summary || "";
      const newSkills = data.skills || [];
      setSkills(newSkills);

      const skillsStr = newSkills.length > 0 ? `\n\nSkills: ${newSkills.join(", ")}` : "";
      setBackground(`Candidate Summary: ${newSummary}${skillsStr}`);

      toast.success("Resume analyzed successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Failed to analyze resume.");
    }
  };

  const handleDeleteSkill = (indexToDelete) => {
    const updatedSkills = skills.filter((_, idx) => idx !== indexToDelete);
    setSkills(updatedSkills);

    const currentSummary = background.split("\n\nSkills:")[0] || "";
    const skillsStr = updatedSkills.length > 0 ? `\n\nSkills: ${updatedSkills.join(", ")}` : "";
    setBackground(`${currentSummary}${skillsStr}`);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const newSkill = customTagInput.trim();
    if (!newSkill) return;
    if (skills.includes(newSkill)) {
      toast.error("Skill tag already exists.");
      return;
    }

    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    setCustomTagInput("");

    const currentSummary = background.split("\n\nSkills:")[0] || "";
    const skillsStr = updatedSkills.length > 0 ? `\n\nSkills: ${updatedSkills.join(", ")}` : "";
    setBackground(`${currentSummary}${skillsStr}`);
  };

  const handleGenerateCoverLetter = async () => {
    if (!background.trim()) {
      toast.error("Please enter candidate background or analyze a resume first.");
      return;
    }

    try {
      await coverLetterGen.mutateAsync({
        jobId: job._id || job.id || id,
        background,
        tone,
        length
      });
      toast.success("Cover letter generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Failed to generate cover letter.");
    }
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

  const requirementsList = toList(job.requirements);
  const benefitsList = toList(job.benefits);
  const tagsList = toList(job.tags);

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
              {job.imageUrl || job.logoUrl ? (
                <img
                  src={job.imageUrl || job.logoUrl}
                  alt={job.title}
                  className="h-16 w-16 rounded-2xl object-cover shrink-0 border border-[#2D2D35]/30"
                />
              ) : (
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border font-black text-2xl shrink-0 ${job.logoBg || 'bg-[#2D2D35]/50 text-white'}`}>
                  {job.logo || job.title?.substring(0, 2).toUpperCase() || 'JB'}
                </div>
              )}

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
                {requirementsList.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
                {requirementsList.length === 0 && (
                  <li className="text-sm text-gray-500 italic">No specific requirements listed.</li>
                )}
              </ul>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D2D35] pb-3">
                <FiDollarSign className="text-[#2DD4BF]" />
                Benefits & Perks
              </h2>
              <ul className="space-y-3.5">
                {benefitsList.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/20 text-[#4F46E5] text-xs font-bold mt-0.5">
                      +
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
                {benefitsList.length === 0 && (
                  <li className="text-sm text-gray-500 italic">No specific benefits listed.</li>
                )}
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
                  {tagsList.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-[#0A0A0F] border border-[#2D2D35] px-2.5 py-1 text-xs text-gray-300 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                  {tagsList.length === 0 && (
                    <span className="text-xs text-gray-500 italic">No tags listed.</span>
                  )}
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
                        {(relJob.location || "").replace(" (Hybrid)", "").replace(" (US)", "")}
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

      {/* AI Resume Analyzer & Cover Letter Modal */}
      <AnimatePresence>
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#18181E] border border-[#2D2D35] rounded-2xl w-full max-w-2xl p-6 sm:p-8 relative shadow-2xl my-8 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAiModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-lg bg-[#2D2D35]/30 hover:bg-[#2D2D35]"
                aria-label="Close modal"
              >
                <FiX className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="border-b border-[#2D2D35]/50 pb-4 mb-6 pr-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FiCpu className="text-[#2DD4BF]" />
                  Apply with AI Pilot
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Upload your resume to extract details automatically and draft a matching cover letter.
                </p>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-1.5 scrollbar-thin">
                
                {/* 1. Resume Upload Section */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Resume Upload (.pdf, .docx, .txt)
                  </label>
                  
                  <div className="border-2 border-dashed border-[#2D2D35] hover:border-[#4F46E5]/50 rounded-xl p-5 text-center transition-all bg-[#0A0A0F]/50 relative group">
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiUpload className="h-8 w-8 text-gray-400 group-hover:text-[#2DD4BF] transition-colors" />
                      {resumeFile ? (
                        <div className="text-sm font-semibold text-white truncate max-w-full">
                          {resumeFile.name}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">
                          Drag and drop or <span className="text-[#2DD4BF] font-semibold underline">browse</span>
                        </div>
                      )}
                      <span className="text-[10px] text-gray-500">Max size 5MB</span>
                    </div>
                  </div>

                  {resumeFile && (
                    <button
                      type="button"
                      onClick={handleAnalyzeResume}
                      disabled={resumeAnalyzer.isPending}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/80 disabled:bg-[#4F46E5]/40 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {resumeAnalyzer.isPending ? (
                        <>
                          <div className="h-3.5 w-3.5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                          Analyzing resume...
                        </>
                      ) : (
                        <>
                          <FiCpu className="h-3.5 w-3.5" />
                          Analyze Resume
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* 2. Analysis Output Section */}
                {skills.length > 0 && (
                  <div className="space-y-3 p-4 rounded-xl border border-[#2D2D35] bg-[#0A0A0F]/30">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Extracted Skill Chips
                    </h4>
                    
                    {/* Chips grid */}
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-xs text-gray-300 font-semibold"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(idx)}
                            className="text-gray-400 hover:text-red-400 transition-colors p-0.5 rounded cursor-pointer animate-fade-in"
                          >
                            <FiX className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Add Custom Skill Form */}
                    <form onSubmit={handleAddSkill} className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Add custom skill..."
                        value={customTagInput}
                        onChange={(e) => setCustomTagInput(e.target.value)}
                        className="flex-1 bg-[#0A0A0F] border border-[#2D2D35] rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl border border-[#2D2D35] bg-[#18181E] hover:bg-[#2D2D35] hover:text-white text-xs font-semibold text-gray-400 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FiPlus className="h-3 w-3" /> Add
                      </button>
                    </form>
                  </div>
                )}

                {/* 3. Manual Fallback & Candidate Background */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Candidate Background
                    </label>
                    <span className="text-[10px] text-gray-500">
                      {resumeFile ? "Auto-extracted (Editable)" : "Type background manually"}
                    </span>
                  </div>
                  <textarea
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="Enter details about your background, career experience, and skills..."
                    className="w-full bg-[#0A0A0F] border border-[#2D2D35] rounded-xl p-4 text-xs sm:text-sm text-white min-h-[120px] focus:outline-none focus:border-[#4F46E5] placeholder-gray-500 font-sans leading-relaxed"
                  />
                </div>

                {/* 4. Generation Controls (Tone / Length) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Cover Letter Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full bg-[#0A0A0F] border border-[#2D2D35] rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="enthusiastic">Enthusiastic</option>
                      <option value="confident">Confident</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Cover Letter Length
                    </label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full bg-[#0A0A0F] border border-[#2D2D35] rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                    >
                      <option value="short">Short (~100 words)</option>
                      <option value="medium">Medium (~200 words)</option>
                      <option value="long">Long (~350 words)</option>
                    </select>
                  </div>
                </div>

                {/* 5. Generate Button */}
                <button
                  type="button"
                  onClick={handleGenerateCoverLetter}
                  disabled={coverLetterGen.isPending || !background.trim()}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-sm font-bold text-white transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {coverLetterGen.isPending ? (
                    <>
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      Generating Cover Letter...
                    </>
                  ) : (
                    <>
                      <HiSparkles className="h-4 w-4 text-amber-300" />
                      Generate Cover Letter
                    </>
                  )}
                </button>

                {/* 6. Generated Output */}
                {coverLetterGen.data && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 pt-4 border-t border-[#2D2D35]/50"
                  >
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Generated Cover Letter
                    </label>
                    <div className="bg-[#0A0A0F] border border-[#2D2D35] rounded-xl p-4 font-mono text-[11px] sm:text-xs text-gray-300 min-h-[160px] max-h-[300px] overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                      {coverLetterGen.data}
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Modal Footer / Submission Action */}
              {coverLetterGen.data && (
                <div className="border-t border-[#2D2D35]/50 pt-4 mt-6">
                  <button
                    type="button"
                    onClick={submitApplication}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiCheckCircle className="h-4.5 w-4.5" />
                    Submit Application
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}