"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const phoneNumber = process.env.OWNER_WA_NUMBER 
// Navigation Data
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Subjects", href: "#subjects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: `https://wa.me/${phoneNumber}` },
  { name: "FAQs", href: "#faqs" },
];


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-10 bg-white py-6 px-6 md:px-16 lg:px-28">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            alt="logo"
            src="/assets/Logo-main.svg"
            width={100}
            height={64}
            className="w-28 h-auto md:w-36 lg:w-34"
          />
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-indigo-950 text-lg font-['Poppins'] lg:text-xl font-medium hover:text-indigo-700 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Enroll Now Button - Desktop */}
        <Link href={'#form'}>
        <button className="hidden md:flex px-5 py-3 font-['Poppins'] bg-indigo-950 text-white text-lg lg:text-xl font-semibold rounded-lg hover:bg-indigo-800 transition">
          Enroll Now
        </button>
        </Link>
        {/* Mobile Menu Button & Enroll Button */}
        <div className="md:hidden flex items-center gap-4">
          <button className="px-5 py-2 bg-indigo-950 font-['Poppins'] text-white text-lg font-semibold rounded-lg hover:bg-indigo-800 transition">
            Enroll
          </button>
          <button
            className="text-indigo-950 text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col items-center gap-6 mt-4 bg-white py-4 shadow-lg"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-indigo-950 text-lg font-['Poppins'] font-medium hover:text-indigo-700 transition"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
