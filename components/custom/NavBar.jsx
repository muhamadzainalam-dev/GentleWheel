"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LuLoaderPinwheel } from "react-icons/lu";
import {
  SignUpButton,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoaded,
} from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Cars", href: "/#cars" },
  { name: "Testimonials ", href: "/#testimonials" },
  { name: "About", href: "/#about" },
  { name: "FAQ's", href: "/#faqs" },
  { name: "Contact", href: "/#contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed w-full bg-[#1C1F26] text-white shadow-md shadow-black/30 z-50">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-green-400">
          <span className="flex gap-2 items-center">
            GentleWheel
            <motion.div
              animate={{
                rotate: 360,
                scale: 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "center center", // ensures rotation around center
              }}
            >
              <div className="w-6 h-6 text-white flex items-center justify-center">
                <LuLoaderPinwheel className="w-full h-full" />
              </div>
            </motion.div>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <Button
                variant="link"
                className="text-white hover:text-green-400 transition"
              >
                {link.name}
              </Button>
            </Link>
          ))}
          {mounted && (
            <div className="ml-4 flex gap-2 items-center">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="outline"
                    className="text-white border-green-500 hover:bg-green-600"
                  >
                    Login
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button className="bg-[#4CAF50] hover:bg-[#45A047] text-white">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#2A2D34] px-4 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-white hover:text-green-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="outline"
              className="text-white border-green-500 hover:bg-green-600"
            >
              Login
            </Button>
            <Button className="bg-[#4CAF50] hover:bg-[#45A047] text-white">
              Sign Up
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
