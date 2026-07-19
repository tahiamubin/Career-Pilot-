import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useResumeAnalyzer() {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("resume", file);

      const apiBase = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASEURL || "http://localhost:5000";
      const res = await axios.post(`${apiBase}/ai/resume-analyze`, formData);
      return res.data;
    },
  });
}
