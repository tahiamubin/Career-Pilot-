"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiBriefcase,
  FiTrendingUp,
  FiFolder,
  FiMapPin,
  FiArrowRight,
  FiPlus
} from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

const TOAST_STYLE = {
  style: {
    background: "#18181E",
    color: "#fff",
    border: "1px solid #2D2D35",
  },
};

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please sign in to access your dashboard", TOAST_STYLE);
      router.push("/signin");
    }
  }, [session, isPending, router]);

  // Fetch all jobs using TanStack Query
  const { data: allJobs = [], isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs from backend");
      return res.json();
    },
    enabled: !!session,
  });

  if (isPending || (session && isLoading)) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white pt-28 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-10 w-10 border-4 border-t-[#2DD4BF] border-[#2D2D35] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm font-semibold">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!session) return null; // router.push will handle redirection

  // Filter jobs by logged-in user
  const userJobs = allJobs.filter(
    (job) => job.userId === session.user.id || job.postedBy === session.user.id
  );

  // Get last 5 posted jobs
  const recentJobs = [...userJobs]
    .sort((a, b) => new Date(b.postedAt || 0).getTime() - new Date(a.postedAt || 0).getTime())
    .slice(0, 5);

  // Compute Stats
  const totalJobs = userJobs.length;
  const uniqueCategories = new Set(userJobs.map((j) => j.category)).size;
  const uniqueLocations = new Set(userJobs.map((j) => j.location)).size;

  // Format Member Since date
  const memberSinceDate = session.user.createdAt || session.user.emailVerified;
  const memberSince = memberSinceDate
    ? new Date(memberSinceDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "July 2026";

  // Generate User Initials for fallback avatar
  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : session.user.email?.substring(0, 2).toUpperCase() || "US";

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-20 relative">
      {/* Background radial glow gradients */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#4F46E5]/4 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-10 space-y-2">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            User Center
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Developer Dashboard
          </h1>
          <p className="text-sm text-gray-400">
            Overview of your posted jobs, profile details, and usage metrics.
          </p>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile Card (Left column - Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-md p-6 relative overflow-hidden shadow-xl">
              {/* Blur accent glow */}
              <div className="absolute top-0 right-0 h-28 w-28 bg-[#4F46E5]/5 blur-2xl pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar */}
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="h-20 w-20 rounded-2xl object-cover border border-[#2D2D35]/50 shadow-md"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] text-white font-extrabold text-2xl border border-[#2D2D35] shadow-md">
                    {initials}
                  </div>
                )}

                {/* Identity Info */}
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">{session.user.name || "Developer User"}</h2>
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5 font-sans">
                    <FiMail className="shrink-0 text-gray-500" />
                    <span className="truncate max-w-[220px]">{session.user.email}</span>
                  </p>
                </div>

                <div className="w-full border-t border-[#2D2D35]/50 pt-4 mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1 text-gray-500">
                      <FiCalendar /> Member Since
                    </span>
                    <span className="font-bold text-gray-300">{memberSince}</span>
                  </div>
                </div>

                {/* Fast Action */}
                <Link
                  href="/jobs/new"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] py-2.5 text-xs font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-[#4F46E5]/10 mt-4 cursor-pointer"
                >
                  <FiPlus className="h-4 w-4" /> Post a New Job
                </Link>
              </div>
            </div>
          </div>

          {/* Metrics & Recent Jobs (Right column - Span 8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Total Jobs Posted */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A0A0F] border border-[#2D2D35]">
                  <FiBriefcase className="h-5 w-5 text-[#4F46E5]" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{totalJobs}</div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Posted</p>
                </div>
              </div>

              {/* Stat 2: Total Applications Sent */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A0A0F] border border-[#2D2D35]">
                  <FiTrendingUp className="h-5 w-5 text-[#2DD4BF]" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">0</div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider" title="Not tracked on server">Apps Sent (N/A)</p>
                </div>
              </div>

              {/* Stat 3: Unique Categories */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A0A0F] border border-[#2D2D35]">
                  <FiFolder className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{uniqueCategories}</div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Categories</p>
                </div>
              </div>

              {/* Stat 4: Active Locations */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A0A0F] border border-[#2D2D35]">
                  <FiMapPin className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{uniqueLocations}</div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Locations</p>
                </div>
              </div>
            </div>

            {/* Recent Jobs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Recent Job Postings</h3>
                {userJobs.length > 0 && (
                  <Link
                    href="/items/manage"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2DD4BF] hover:text-[#4F46E5] transition-colors"
                  >
                    View All Listings <FiArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>

              {/* Table or Placeholder */}
              {userJobs.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border border-[#2D2D35] bg-[#18181E]/40 backdrop-blur-sm space-y-4">
                  <FiBriefcase className="h-10 w-10 text-gray-500 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">No jobs posted yet</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      Create job listing entries and they will be displayed right here.
                    </p>
                  </div>
                  <Link
                    href="/jobs/new"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] px-4 py-2 text-xs font-bold text-white transition-all hover:scale-[1.02] shadow-md shadow-[#4F46E5]/10 cursor-pointer"
                  >
                    <FiPlus className="h-3.5 w-3.5" /> Post Your First Job
                  </Link>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#2D2D35] bg-[#1F1F27]/40 text-xs font-bold uppercase tracking-wider text-gray-400">
                          <th className="px-6 py-4">Job Details</th>
                          <th className="px-6 py-4">Category</th>
                          <th className="px-6 py-4">Location</th>
                          <th className="px-6 py-4">Posted Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2D2D35]/40 text-sm font-sans">
                        {recentJobs.map((job) => {
                          const jobId = job.id || job._id;
                          return (
                            <tr key={jobId} className="hover:bg-[#202028]/20 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  {job.imageUrl || job.logoUrl ? (
                                    <img
                                      src={job.imageUrl || job.logoUrl}
                                      alt={job.title}
                                      className="h-8 w-8 rounded-lg object-cover shrink-0 border border-[#2D2D35]/30"
                                    />
                                  ) : (
                                    <div
                                      className={`flex h-8 w-8 items-center justify-center rounded-lg border font-bold text-[10px] shrink-0 ${
                                        job.logoBg || "bg-[#2D2D35]/50 text-white"
                                      }`}
                                    >
                                      {job.logo || job.title?.substring(0, 2).toUpperCase() || "JB"}
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <p className="font-bold text-white truncate max-w-[180px] font-sans">
                                      <Link
                                        href={`/jobs/${jobId}`}
                                        className="hover:text-[#2DD4BF] transition-colors"
                                      >
                                        {job.title}
                                      </Link>
                                    </p>
                                    <p className="text-xs text-gray-400 truncate max-w-[180px] font-sans">{job.company}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-[#22222A] border border-[#2D2D35] px-2.5 py-1 text-xs text-gray-300 font-medium font-sans">
                                  {job.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-xs text-gray-400 max-w-[150px] truncate font-sans font-medium">
                                {job.location}
                              </td>
                              <td className="px-6 py-4 text-xs text-gray-400 font-sans">
                                {new Date(job.postedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
