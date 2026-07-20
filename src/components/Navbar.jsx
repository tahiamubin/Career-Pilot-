"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiBriefcase, 
  FiUser, 
  FiPlusCircle, 
  FiGrid, 
  FiCpu, 
  FiMenu, 
  FiX, 
  FiChevronRight,
  FiLogOut
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  
  // Developer helper to toggle logged-in state easily for styling demo
  const [isDemoLoggedIn, setIsDemoLoggedIn] = useState(false);

  // Set initial demo state based on actual session if present
  useEffect(() => {
    if (session) {
      setIsDemoLoggedIn(true);
    }
  }, [session]);

  const isLoggedIn = isDemoLoggedIn || !!session;

  const loggedOutRoutes = [
    { name: "Home", path: "/" },
    { name: "Browse Jobs", path: "/jobs" },
    { name: "About", path: "/about" },
     { name: "Policy", path: "/policy" },
     { name: "Help", path: "/help" },
    { name: "Login", path: "/signin" },
    
    { name: "Signup", path: "/signup" },
   
  ];

  const loggedInRoutes = [
    { name: "Home", path: "/" },
    { name: "Browse Jobs", path: "/jobs" },
    { name: "Add Job", path: "/jobs/new", icon: <FiPlusCircle className="mr-1.5" /> },
    { name: "Manage Jobs", path: "/jobs/manage", icon: <FiGrid className="mr-1.5" /> },
    { name: "Dashboard", path: "/dashboard", icon: <FiUser className="mr-1.5" /> },
  ];

  const currentRoutes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  // Handle fake sign out for demo
  const handleLogout = async () => {
    if (session) {
      await authClient.signOut();
    }
    setIsDemoLoggedIn(false);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#2D2D35] bg-[#0A0A0F]/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0A0A0F]">
                  <FiCpu className="h-5 w-5 text-[#2DD4BF] transition-transform duration-500 group-hover:rotate-12" />
                </div>
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] opacity-35 blur-sm transition-opacity duration-300 group-hover:opacity-60" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Career<span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text text-transparent">Pilot</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {currentRoutes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`relative flex items-center text-sm font-medium transition-colors duration-200 py-1.5 px-3 rounded-lg ${
                    isActive 
                      ? "text-white bg-[#18181E] border border-[#2D2D35]" 
                      : "text-gray-400 hover:text-white hover:bg-[#18181E]/50"
                  }`}
                >
                  {route.icon}
                  {route.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions + Dev Mode Switch */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dev Mode Switcher */}
            <button
              onClick={() => setIsDemoLoggedIn(!isDemoLoggedIn)}
              title="Click to toggle between Logged In / Logged Out views"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2D2D35] bg-[#18181E] text-xs font-semibold text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <span className={`inline-block h-2 w-2 rounded-full ${isLoggedIn ? 'bg-[#2DD4BF] animate-pulse' : 'bg-red-500'}`} />
              <span>Simulate: {isLoggedIn ? "Logged In" : "Logged Out"}</span>
            </button>
            

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-[#2D2D35] bg-[#18181E] px-4 py-2 text-sm font-medium text-gray-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 cursor-pointer"
              >
                <FiLogOut className="h-4 w-4" />
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            {/* Dev Switch for mobile */}
            <button
              onClick={() => setIsDemoLoggedIn(!isDemoLoggedIn)}
              className="p-1.5 rounded-lg border border-[#2D2D35] bg-[#18181E] text-[10px] font-semibold text-gray-400"
            >
              <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${isLoggedIn ? 'bg-[#2DD4BF]' : 'bg-red-500'}`} />
              {isLoggedIn ? "In" : "Out"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl border border-[#2D2D35] bg-[#18181E] p-2 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#2D2D35] bg-[#0A0A0F]/95 backdrop-blur-lg"
          >
            <div className="space-y-1.5 px-4 py-4">
              {currentRoutes.map((route) => {
                const isActive = pathname === route.path;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#4F46E5]/10 to-[#2DD4BF]/10 border border-[#4F46E5]/30 text-white"
                        : "text-gray-400 hover:bg-[#18181E] hover:text-white"
                    }`}
                  >
                    {route.icon && <span className="mr-3">{route.icon}</span>}
                    {route.name}
                  </Link>
                );
              })}
              
              {isLoggedIn && (
                <div className="border-t border-[#2D2D35] my-4 pt-4">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-base font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                  >
                    <FiLogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
