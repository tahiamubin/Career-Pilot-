"use client";

import { useState, useEffect } from "react";
import { FiX, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiGrid, FiImage, FiTag, FiFileText } from "react-icons/fi";

export default function JobForm({ initialData = null, onSubmit, onClose, title = "Post a New Job" }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    category: "Full-Stack",
    shortDescription: "",
    description: "",
    salary: "",
    location: "",
    type: "Full-time",
    imageUrl: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "AI / Machine Learning",
    "Frontend",
    "Backend",
    "Full-Stack",
    "Infrastructure",
    "Design",
    "Mobile"
  ];

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote"
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        company: initialData.company || "",
        category: initialData.category || "Full-Stack",
        shortDescription: initialData.shortDescription || "",
        description: initialData.description || "",
        salary: initialData.salary || "",
        location: initialData.location || "",
        type: initialData.type || "Full-time",
        imageUrl: initialData.imageUrl || initialData.logoUrl || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.title || !formData.company || !formData.description || !formData.location || !formData.salary) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Process tags into an array
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter((t) => t !== "")
        : [];

      // Generate a nice logo representation from company name if no image URL is provided
      const logo = formData.company ? formData.company.substring(0, 2).toUpperCase() : "JB";
      const logoBgs = [
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "bg-rose-500/10 text-rose-400 border-rose-500/20"
      ];
      // Deterministic choice of logoBg based on company length
      const logoBg = logoBgs[formData.company.length % logoBgs.length];

      const payload = {
        ...formData,
        tags: tagsArray,
        logo,
        logoBg,
        matchScore: initialData?.matchScore || Math.floor(Math.random() * 20) + 80, // Random compat score 80-99
        postedAt: initialData?.postedAt || new Date().toISOString(),
      };

      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#18181E] border border-[#2D2D35] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2D2D35] px-6 py-4 bg-[#1F1F27]/60">
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent flex items-center gap-2">
          <FiBriefcase className="text-[#2DD4BF]" />
          {title}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-[#2D2D35] transition-colors cursor-pointer"
            type="button"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
        {error && (
          <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              Job Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Lead AI Engineer"
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors text-sm"
              required
            />
          </div>

          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. OpenAI"
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors text-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiGrid className="text-gray-500" /> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white focus:outline-none focus:border-[#4F46E5] cursor-pointer text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiClock className="text-gray-500" /> Job Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white focus:outline-none focus:border-[#4F46E5] cursor-pointer text-sm"
            >
              {jobTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiMapPin className="text-gray-500" /> Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA (Hybrid) or Remote"
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors text-sm"
              required
            />
          </div>

          {/* Salary */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiDollarSign className="text-gray-500" /> Salary Range <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $140k - $180k"
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors text-sm"
              required
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            Short Description <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Brief 1-sentence teaser of the role"
            className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors text-sm"
            required
          />
        </div>

        {/* Full Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <FiFileText className="text-gray-500" /> Full Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Detailed description of the responsibilities and team role..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors text-sm font-sans"
            required
          />
        </div>

        

        {/* Tags */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <FiTag className="text-gray-500" /> Tags / Technologies (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, TypeScript, AWS"
            className="w-full px-4 py-2.5 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2D2D35]">
          {onClose && (
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 rounded-xl border border-[#2D2D35] text-sm text-gray-400 hover:text-white hover:bg-[#2D2D35]/30 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : initialData ? "Update Job" : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
