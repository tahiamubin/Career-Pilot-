"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  FiSearch, 
  FiMapPin, 
  FiDollarSign, 
  FiClock, 
  FiCpu, 
  FiArrowRight, 
  FiFilter, 
  FiChevronLeft, 
  FiChevronRight,
  FiPlus
} from "react-icons/fi";
import Link from "next/link";

// Skeleton Loader
function JobCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-[#2D2D35] bg-[#18181E] p-6 animate-pulse space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#2D2D35]/50 shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-36 bg-[#2D2D35]/50 rounded" />
            <div className="h-3 w-20 bg-[#2D2D35]/50 rounded" />
          </div>
        </div>
        <div className="h-6 w-20 bg-[#2D2D35]/50 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#2D2D35]/50 rounded" />
        <div className="h-3 w-5/6 bg-[#2D2D35]/50 rounded" />
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        <div className="h-6 w-16 bg-[#2D2D35]/50 rounded-lg" />
        <div className="h-6 w-12 bg-[#2D2D35]/50 rounded-lg" />
        <div className="h-6 w-20 bg-[#2D2D35]/50 rounded-lg" />
      </div>
      <div className="flex items-center justify-between border-t border-[#2D2D35]/30 pt-4">
        <div className="h-3 w-24 bg-[#2D2D35]/50 rounded" />
        <div className="h-8 w-28 bg-[#2D2D35]/50 rounded-xl" />
      </div>
    </div>
  );
}

function JobExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load URL queries initially
  const initialSearch = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialLocation = searchParams.get("location") || "All";
  const initialSort = searchParams.get("sort") || "date";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(initialPage);

  const categories = [
    "All",
    "AI / Machine Learning",
    "Frontend",
    "Backend",
    "Full-Stack",
    "Infrastructure",
    "Design",
    "Mobile"
  ];

  const locations = [
    "All",
    "Remote",
    "San Francisco, CA",
    "Mountain View, CA",
    "Los Gatos, CA",
    "San Mateo, CA",
    "Hybrid"
  ];

  // Fetch all jobs using TanStack Query
  const { data: allJobs = [], isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/jobs`);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs from backend server");
      }
      return response.json();
    },
  });

  // Client-side filtering & sorting on the query cache
  const filteredJobs = allJobs.filter((job) => {
    // 1. Search Filter
    if (search.trim()) {
      const queryStr = search.toLowerCase();
      const titleMatch = job.title?.toLowerCase().includes(queryStr);
      const companyMatch = job.company?.toLowerCase().includes(queryStr);
      const descriptionMatch = job.description?.toLowerCase().includes(queryStr);
      const shortDescMatch = job.shortDescription?.toLowerCase().includes(queryStr);
      const tagsMatch = Array.isArray(job.tags) && job.tags.some(tag => tag.toLowerCase().includes(queryStr));

      if (!titleMatch && !companyMatch && !descriptionMatch && !shortDescMatch && !tagsMatch) {
        return false;
      }
    }

    // 2. Category Filter
    if (category && category !== "All") {
      if (job.category !== category) return false;
    }

    // 3. Location Filter
    if (location && location !== "All") {
      const jobLoc = job.location?.toLowerCase() || "";
      if (location === "Remote") {
        if (!jobLoc.includes("remote")) return false;
      } else if (location === "Hybrid") {
        if (!jobLoc.includes("hybrid")) return false;
      } else {
        if (!jobLoc.includes(location.toLowerCase())) return false;
      }
    }

    return true;
  });

  // Sort logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sort === "salary") {
      const getNumericSalary = (salStr) => {
        if (!salStr) return 0;
        const cleanStr = salStr.replace(/[^0-9]/g, "");
        return parseInt(cleanStr, 10) || 0;
      };
      return getNumericSalary(b.salary) - getNumericSalary(a.salary);
    } else {
      // Default: date (Newest Posted)
      const dateA = new Date(a.postedAt || 0).getTime();
      const dateB = new Date(b.postedAt || 0).getTime();
      return dateB - dateA;
    }
  });

  // Pagination config
  const limit = 8; // Displaying in 4-per-row grid fits 8 items nicely
  const totalJobs = sortedJobs.length;
  const totalPages = Math.ceil(totalJobs / limit);
  const startIndex = (page - 1) * limit;
  const paginatedJobs = sortedJobs.slice(startIndex, startIndex + limit);

  // Sync state to URL params silently
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category !== "All") params.set("category", category);
    if (location !== "All") params.set("location", location);
    if (sort !== "date") params.set("sort", sort);
    if (page > 1) params.set("page", page.toString());
    
    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  }, [category, location, sort, page, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white pt-10 pb-20 relative">
      {/* Background gradients */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#4F46E5]/4 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#2DD4BF]/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
            Explore Openings
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Find Your Next Venture
          </h1>
          <p className="text-base text-gray-400 max-w-2xl">
            Filter through our curated high-compatibility tech jobs matching your engineering stack.
          </p>
        </div>

        {/* Search & Filters Panel */}
        <form onSubmit={handleSearchSubmit} className="mb-10 p-6 rounded-2xl border border-[#2D2D35] bg-[#18181E]/60 backdrop-blur-md space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="relative lg:col-span-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search job title, company, or tags..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white placeholder-gray-500 focus:outline-none focus:border-[#4F46E5] transition-colors"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative lg:col-span-3">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white focus:outline-none focus:border-[#4F46E5] cursor-pointer appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="relative lg:col-span-3">
              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#2D2D35] bg-[#0A0A0F] text-white focus:outline-none focus:border-[#4F46E5] cursor-pointer appearance-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    Location: {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2D2D35]/50 pt-6">
            {/* Sort Toggle */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <FiFilter className="text-gray-400 h-4 w-4" />
              <span className="text-xs font-semibold text-gray-400">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-1.5 rounded-lg border border-[#2D2D35] bg-[#0A0A0F] text-xs text-white focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="date">Newest Posted</option>
                <option value="salary">Highest Salary</option>
              </select>
            </div>

            {/* Action buttons */}
            <div className="flex w-full sm:w-auto items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setLocation("All");
                  setSort("date");
                  setPage(1);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#2D2D35] bg-transparent text-sm font-semibold text-gray-400 hover:text-white hover:bg-[#2D2D35]/30 transition-all cursor-pointer text-center"
              >
                Reset Filters
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center"
              >
                Search Listings
              </button>
            </div>
          </div>
        </form>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-sm text-gray-400">
          <p>
            Showing <span className="text-white font-semibold">{paginatedJobs.length}</span> of{" "}
            <span className="text-white font-semibold">{totalJobs}</span> roles
          </p>
        </div>

        {/* Job Listings Grid (4 per row desktop layout) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
            <p className="text-lg font-bold">Failed to load job listings</p>
            <p className="text-sm mt-1">{error.message || "Please make sure the backend server is running."}</p>
          </div>
        ) : paginatedJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 rounded-2xl border border-[#2D2D35] bg-[#18181E]/40"
          >
            <FiSearch className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No listings found</h3>
            <p className="text-gray-400 mt-2 max-w-sm mx-auto">
              We couldn't find any jobs matching your search parameters. Try clearing your filters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {paginatedJobs.map((job) => (
              <motion.div
                key={job.id || job._id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  y: -6,
                  borderColor: "#4F46E5",
                  boxShadow: "0 10px 30px -15px rgba(79,70,229,0.3)"
                }}
                className="relative rounded-2xl border border-[#2D2D35] bg-[#18181E] p-5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Details */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4 mr-5">
                    <div className="flex items-center gap-3">
                      {job.imageUrl || job.logoUrl ? (
                        <img 
                          src={job.imageUrl || job.logoUrl} 
                          alt={job.title} 
                          className="h-10 w-10 rounded-xl object-cover shrink-0 border border-[#2D2D35]/30"
                        />
                      ) : (
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold text-sm shrink-0 ${job.logoBg || 'bg-[#2D2D35]/50 text-white'}`}>
                          {job.logo || job.title?.substring(0, 2).toUpperCase() || 'JB'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white leading-tight hover:text-[#2DD4BF] transition-colors truncate">
                          <Link href={`/jobs/${job.id || job._id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-xs font-semibold text-gray-400 truncate">{job.company}</p>
                      </div>
                    </div>

                    {/* <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#4F46E5]/10 to-[#2DD4BF]/10 border border-[#4F46E5]/30 px-2.5 py-0.5 text-[10px] font-bold text-white shrink-0 ">
                      <FiCpu className="text-[#2DD4BF] h-3 w-3 animate-pulse" />
                      <span>{job.matchScore || 85}% Match</span>
                    </div> */}
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                    {job.shortDescription || job.description}
                  </p>

                  <div className="grid grid-cols-1 gap-1.5 text-[11px] text-gray-400 mb-5">
                    <div className="flex items-center gap-1.5">
                      <FiMapPin className="text-gray-500 h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiDollarSign className="text-gray-500 h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock className="text-gray-500 h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{job.type}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {Array.isArray(job.tags) && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {job.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="rounded bg-[#22222A] border border-[#2D2D35] px-2 py-0.5 text-[10px] text-gray-300 font-medium truncate max-w-[80px]"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 3 && (
                        <span className="text-[10px] text-gray-500 self-center">+{job.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer action buttons */}
                <div className="flex items-center justify-between border-t border-[#2D2D35]/50 pt-3 mt-auto">
                  <Link
                    href={`/jobs/${job.id || job._id}`}
                    className="text-[11px] font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/jobs/${job.id || job._id}`}
                    className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#22222A] hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#2DD4BF] border border-[#2D2D35] hover:border-transparent px-3 py-1.5 text-[10px] font-bold text-white transition-all duration-300"
                  >
                    Apply with AI
                    <FiArrowRight className="h-2.5 w-2.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-2.5 rounded-xl border border-[#2D2D35] bg-[#18181E] text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`h-10 w-10 rounded-xl text-sm font-bold border transition-colors ${
                      page === pageNum
                        ? "bg-[#4F46E5] border-transparent text-white shadow-lg shadow-[#4F46E5]/20"
                        : "bg-[#18181E] border-[#2D2D35] text-gray-400 hover:text-white hover:border-gray-400"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="p-2.5 rounded-xl border border-[#2D2D35] bg-[#18181E] text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) for posting a new job */}
      <Link
        href="/jobs/new"
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-white shadow-lg shadow-[#4F46E5]/30 hover:scale-110 hover:rotate-90 active:scale-95 transition-all duration-300 cursor-pointer"
        title="Post a New Job"
      >
        <FiPlus className="h-6 w-6" />
      </Link>
    </div>
  );
}

export default function JobExplore() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-20 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-10 w-10 border-4 border-t-[#2DD4BF] border-[#2D2D35] rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm font-semibold">Loading job listings...</p>
        </div>
      </div>
    }>
      <JobExploreContent />
    </Suspense>
  );
}
