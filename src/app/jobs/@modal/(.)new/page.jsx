"use client";

import JobForm from "@/components/JobForm";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function InterceptedNewJobPage() {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleClose = () => {
    // Navigate back to the /jobs page
    router.back();
  };

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      userId: session?.user?.id,
      postedBy: session?.user?.id,
    };

    const response = await fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        border: "1px solid #2D2D35"
      }
    });

    // Invalidate the jobs query so the main jobs list refreshes
    queryClient.invalidateQueries({ queryKey: ["jobs"] });

    // Close the modal and return to /jobs
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <JobForm onSubmit={handleSubmit} onClose={handleClose} />
      </motion.div>
    </div>
  );
}
