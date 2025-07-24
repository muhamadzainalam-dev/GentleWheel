"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-[#1C1F26] flex justify-center items-center h-screen px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm bg-[#2A2D34] p-8 py-14 rounded-2xl shadow-xl shadow-black/40 border border-[#3C3F46]"
      >
        <motion.h2
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-semibold text-white text-center mb-6"
        >
          {isLogin ? "Login" : "Sign Up"}
        </motion.h2>

        <div className="text-center mb-4">
          <Button
            variant="link"
            className="text-gray-400 text-sm hover:text-green-400"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Button>
        </div>

        <motion.form
          key={isLogin ? "loginForm" : "signupForm"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4 text-white"
        >
          {!isLogin && (
            <div className="space-y-2" >
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="bg-[#1E2127] border border-[#3C3F46] text-white placeholder-gray-400 focus:border-green-500"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="bg-[#1E2127] border border-[#3C3F46] text-white placeholder-gray-400 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="bg-[#1E2127] border border-[#3C3F46] text-white placeholder-gray-400 focus:border-green-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#4CAF50] hover:bg-[#45A047] text-white font-semibold py-2 rounded-md shadow-md shadow-green-800 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
}
