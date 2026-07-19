"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
  FiPlus,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import JobForm from "@/components/JobForm";
import { getTokenServer } from "@/lib/token";

const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

const TOAST_STYLE = {
  style: {
    background: "#18181E",
    color: "#fff",
    border: "1px solid #2D2D35",
  },
};

export default function ManageJobsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please sign in to manage your jobs", TOAST_STYLE);
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const {
    data: allJobs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
    enabled: !!session,
  });

  const userJobs = allJobs.filter(
    (job) =>
      job.userId === session?.user?.id || job.postedBy === session?.user?.id,
  );

  const refreshJobs = () =>
    queryClient.invalidateQueries({ queryKey: ["jobs"] });

  const handleDelete = async (jobId) => {
    const { token } = await getTokenServer();
    if (!window.confirm("Are you sure you want to delete this job listing?"))
      return;

    try {
      const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
        authorization: `Bearer ${token}`,
      });
      if (!res.ok) throw new Error("Failed to delete job listing");

      toast.success("Job listing deleted successfully", TOAST_STYLE);
      refreshJobs();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete job");
    }
  };

  const handleEditSubmit = async (data) => {
    const { token } = await getTokenServer();
    if (!editingJob) return;
    const jobId = editingJob.id || editingJob._id;

    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to update job listing");
    }

    toast.success("Job listing updated successfully", TOAST_STYLE);
    setEditingJob(null);
    refreshJobs();
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white pt-28 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-10 w-10 border-4 border-t-[#2DD4BF] border-[#2D2D35] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm font-semibold">
            Loading management console...
          </p>
        </div>
      </div>
    );
  }

  if (!session) return null; // redirect handled by useEffect

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-20 relative">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#4F46E5]/4 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
            >
              <FiArrowLeft /> Back to Explore
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Manage Your Job Posts
            </h1>
            <p className="text-sm text-gray-400">
              Manage, edit, or remove listings you've posted on CareerPilot.
            </p>
          </div>

          <Link
            href="/jobs/new"
            className="self-start sm:self-center inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-[#4F46E5]/10"
          >
            <FiPlus /> Post a Job
          </Link>
        </div>

        {error && (
          <div className="text-center py-6 text-rose-400 text-sm">
            {error.message}
          </div>
        )}

        {userJobs.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-[#2D2D35] bg-[#18181E]/40 backdrop-blur-sm">
            <FiBriefcase className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No jobs posted yet</h3>
            <p className="text-gray-400 mt-2 max-w-sm mx-auto mb-6">
              You haven't posted any jobs under this account. Post a new opening
              to start matching with candidate profiles.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2D2D35] bg-[#1F1F27]/40 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">Job details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Metadata</th>
                  <th className="px-6 py-4">Posted Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D2D35]/50 text-sm">
                {userJobs.map((job) => (
                  <JobRow
                    key={job.id || job._id}
                    job={job}
                    onEdit={() => setEditingJob(job)}
                    onDelete={() => handleDelete(job.id || job._id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {editingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingJob(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl"
            >
              <JobForm
                title="Edit Job Listing"
                initialData={editingJob}
                onSubmit={handleEditSubmit}
                onClose={() => setEditingJob(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function JobRow({ job, onEdit, onDelete }) {
  const jobId = job.id || job._id;

  return (
    <tr className="hover:bg-[#202028]/20 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {job.imageUrl || job.logoUrl ? (
            <img
              src={job.imageUrl || job.logoUrl}
              alt={job.title}
              className="h-10 w-10 rounded-xl object-cover shrink-0 border border-[#2D2D35]/30"
            />
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold text-xs shrink-0 ${
                job.logoBg || "bg-[#2D2D35]/50 text-white"
              }`}
            >
              {job.logo || job.title?.substring(0, 2).toUpperCase() || "JB"}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-bold text-white truncate max-w-[220px]">
              <Link
                href={`/jobs/${jobId}`}
                className="hover:text-[#2DD4BF] transition-colors"
              >
                {job.title}
              </Link>
            </p>
            <p className="text-xs text-gray-400 truncate max-w-[220px]">
              {job.company}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-lg bg-[#22222A] border border-[#2D2D35] px-2.5 py-1 text-xs text-gray-300 font-medium">
          {job.category}
        </span>
      </td>

      <td className="px-6 py-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FiMapPin className="text-gray-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FiDollarSign className="text-gray-500" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FiClock className="text-gray-500" />
          <span>{job.type}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-xs text-gray-400">
        {new Date(job.postedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg border border-[#2D2D35] text-gray-400 hover:text-white hover:bg-[#2D2D35]/50 transition-all cursor-pointer"
            title="Edit Job"
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg border border-rose-500/20 text-rose-400 hover:text-white hover:bg-rose-500/30 transition-all cursor-pointer"
            title="Delete Job"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
