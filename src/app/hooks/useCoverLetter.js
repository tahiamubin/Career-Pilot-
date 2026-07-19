import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCoverLetter() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/ai/cover-letter`, data);
      return res.data.coverLetter;
    },
  });
}