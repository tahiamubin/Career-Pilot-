"use client";

import JobForm from "@/components/JobForm";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function NewJobPage() {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSubmit = async (data) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    console.log("=== DEBUG FRONTEND TOKEN ===");
    console.log("Extracted token string:", token);
    console.log("Authorization header value:", `Bearer ${token}`);
    console.log("=============================");

    const payload = {
      ...data,
      userId: session?.user?.id,
      postedBy: session?.user?.id,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to post job listing.");
    }

    toast.success("Job posted successfully!", {
      style: {
        background: "#18181E",
        color: "#fff",
        border: "1px solid #2D2D35",
      },
    });

    // Invalidate the jobs query to trigger a reload
    queryClient.invalidateQueries({ queryKey: ["jobs"] });

    // Navigate back to the listings page
    router.push("/jobs");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-28 pb-20 flex flex-col items-center px-4 relative">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#4F46E5]/4 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl mb-6">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft /> Back to Explore
        </Link>
      </div>

      <JobForm onSubmit={handleSubmit} onClose={() => router.push("/jobs")} />
    </div>
  );
}
