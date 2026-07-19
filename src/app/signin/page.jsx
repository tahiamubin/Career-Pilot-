"use client";


import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { FiMail, FiLock, FiArrowRight, FiCpu } from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function SignInPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user)

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    if (data) {
     router.push('/');
    }
    if (error) {
      toast.error("Sign in not successful");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0F]">
      {/* Background gradients */}
      <div className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[#4F46E5]/5 blur-3xl" />
      <div className="absolute -right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-[#2DD4BF]/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#4F46E5]/3 blur-3xl" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={containerVariants}
          className="w-full max-w-[420px]"
        >
          {/* Logo & Header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] shadow-lg shadow-[#4F46E5]/20 mb-5">
              <FiCpu className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-white/40 text-sm">
              Sign in to continue your career journey
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={itemVariants}
            className="bg-[#18181E] rounded-2xl border border-white/5 p-6 shadow-2xl"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <TextField isRequired name="email" type="email" className="w-full">
                  <Label className="text-sm font-medium text-white/70 block mb-1.5">
                    Email
                  </Label>
                  <Input
                    placeholder="john@example.com"
                    className="w-full h-12 px-4 rounded-xl bg-[#22222A] border-[#2D2D35] text-white placeholder:text-white/30 focus:border-[#4F46E5] transition-all duration-300 text-sm"
                    startContent={<FiMail className="h-4 w-4 text-white/30" />}
                  />
                  <FieldError className="text-[#2DD4BF] text-xs mt-1" />
                </TextField>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <TextField isRequired name="password" type="password" className="w-full">
                  <Label className="text-sm font-medium text-white/70 block mb-1.5">
                    Password
                  </Label>
                  <Input
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 rounded-xl bg-[#22222A] border-[#2D2D35] text-white placeholder:text-white/30 focus:border-[#4F46E5] transition-all duration-300 text-sm"
                    startContent={<FiLock className="h-4 w-4 text-white/30" />}
                  />
                  <FieldError className="text-[#2DD4BF] text-xs mt-1" />
                </TextField>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs text-white/30 hover:text-[#4F46E5] transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  radius="full"
                  className="w-full h-12 bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-white font-semibold text-sm shadow-lg shadow-[#4F46E5]/20 hover:shadow-xl hover:shadow-[#4F46E5]/30 transition-all duration-300"
                  endContent={
                    <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  }
                >
                  Sign In
                </Button>
              </motion.div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2D2D35]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#18181E] px-3 text-white/20">or</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-sm text-white/30">
                  Don't have an account?{" "}
                </span>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-[#4F46E5] hover:text-[#2DD4BF] transition-colors duration-200"
                >
                  Create one
                </Link>
              </div>
            </form>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-center text-[10px] text-white/20"
          >
            By continuing, you agree to our Terms of Service & Privacy Policy
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}