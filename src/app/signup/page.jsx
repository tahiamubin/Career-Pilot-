"use client";


import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi2";
import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    await authClient.signUp.email({
      ...user,
      plan: "free",
    });

    redirect("/");
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
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
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#2DD4BF] shadow-lg shadow-[#4F46E5]/20 mb-5">
              <HiSparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-white/40 text-sm">
              Start your career journey today
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={itemVariants}
            className="bg-[#18181E] rounded-2xl border border-white/5 p-6 shadow-2xl"
          >
            <Form onSubmit={onSubmit} className="w-full">
              <Fieldset className="w-full">
                <Fieldset.Legend className="text-white font-bold text-lg mb-1 text-center">
                  Signup
                </Fieldset.Legend>
                
                <div className="space-y-4">
                  {/* Name */}
                  <TextField isRequired name="name" className="w-full flex flex-col">
                    <Label className="text-sm font-medium text-white/70 block mb-1.5">
                      Full Name
                    </Label>
                    <Input
                      placeholder="John Doe"
                      classNames={{
                        input: "bg-[#22222A] text-white placeholder:text-white/30 text-sm h-12",
                        inputWrapper:
                          "flex items-center gap-3 bg-[#22222A] border border-[#2D2D35] hover:border-[#4F46E5] focus-within:border-[#4F46E5] rounded-xl h-12 px-4 transition-colors duration-200",
                      }}
                      startContent={<FiUser className="h-4 w-4 text-white/30 shrink-0" />}
                    />
                    <FieldError className="text-[#2DD4BF] text-xs mt-1" />
                  </TextField>

                 

                  {/* Email */}
                  <TextField isRequired name="email" type="email" className="w-full flex flex-col">
                    <Label className="text-sm font-medium text-white/70 block mb-1.5">
                      Email Address
                    </Label>
                    <Input
                      placeholder="john@example.com"
                      classNames={{
                        input: "bg-[#22222A] text-white placeholder:text-white/30 text-sm h-12",
                        inputWrapper:
                          "flex items-center gap-3 bg-[#22222A] border border-[#2D2D35] hover:border-[#4F46E5] focus-within:border-[#4F46E5] rounded-xl h-12 px-4 transition-colors duration-200",
                      }}
                      startContent={<FiMail className="h-4 w-4 text-white/30 shrink-0" />}
                    />
                    <FieldError className="text-[#2DD4BF] text-xs mt-1" />
                  </TextField>

                  {/* Password */}
                  <TextField isRequired name="password" type="password" className="w-full flex flex-col">
                    <Label className="text-sm font-medium text-white/70 block mb-1.5">
                      Password
                    </Label>
                    <Input
                      placeholder="Create a strong password"
                      classNames={{
                        input: "bg-[#22222A] text-white placeholder:text-white/30 text-sm h-12",
                        inputWrapper:
                          "flex items-center gap-3 bg-[#22222A] border border-[#2D2D35] hover:border-[#4F46E5] focus-within:border-[#4F46E5] rounded-xl h-12 px-4 transition-colors duration-200",
                      }}
                      startContent={<FiLock className="h-4 w-4 text-white/30 shrink-0" />}
                    />
                    <FieldError className="text-[#2DD4BF] text-xs mt-1" />
                  </TextField>

                
                </div>

                {/* Signup Button */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6"
                >
                  <Button
                    onClick={() => toast.success("Account created successfully!")}
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#4F46E5]/20 hover:shadow-xl hover:shadow-[#4F46E5]/30 transition-all duration-300 flex items-center justify-center"
                  >
                    Create Account
                  </Button>
                </motion.div>

                {/* Divider */}
                <div className="mt-6">
                  <div className="relative flex items-center gap-4">
                    <div className="flex-1 border-t border-[#2D2D35]" />
                    <span className="text-xs font-medium uppercase tracking-wider text-white/30 whitespace-nowrap">
                      Or continue with
                    </span>
                    <div className="flex-1 border-t border-[#2D2D35]" />
                  </div>

                  {/* Google Button */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4"
                  >
                    <Button
                      onClick={handleGoogle}
                      type="button"
                      className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#2D2D35]"
                    >
                      <FcGoogle className="h-5 w-5 shrink-0" />
                      Sign Up with Google
                    </Button>
                  </motion.div>
                </div>
              </Fieldset>
            </Form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}