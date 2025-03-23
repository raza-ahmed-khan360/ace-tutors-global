'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white py-12 px-6 md:px-12 lg:px-24 font-['Poppins']">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8">
        
        {/* Logo & Description */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="flex-1 max-w-xs"
        >
          <Image src="/assets/Logo-footer.svg" alt="Ace Tutors Global" width={200} height={152} priority />
          <p className="text-lg mt-4">
            Ace Tutors Global provides expert tutoring for O & A Levels, IGCSE, EDEXCEL, PEARSON, and IB. Our qualified tutors ensure top results with personalized learning.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 min-w-[180px]"
        >
          <h3 className="text-xl font-semibold mb-3 font-['Plus_Jakarta_Sans']">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: 'Home', href: '/' },
              { name: 'Features', href: '#features' },
              { name: 'Subjects', href: '#subjects' },
              { name: 'Testimonials', href: '#testimonials' },
              { name: 'FAQs', href: '#faqs' },
              { name: 'Privacy Policy', href: '/privacy-policy' },
              { name: 'Terms & Conditions', href: '/terms-and-conditions' },
            ].map((link, index) => (
              <li key={index}>
                <motion.div whileHover={{ scale: 1.1, color: "#A3BFFA" }} className="text-lg transition block">
                  <Link href={link.href}>
                    {link.name}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 min-w-[200px]"
        >
          <h3 className="text-xl font-semibold mb-3 font-['Plus_Jakarta_Sans']">We&apos;re here to help</h3>
          <Link href="mailto:info@acetutorsglobal.com" className="flex pt-3 items-center gap-3 hover:text-indigo-300 transition">
            <Image src="/assets/gmail.svg" alt="Email" width={50} height={50} />
            Contact Us
          </Link>
          <Link href="https://wa.me/+923141087568" className="flex items-center gap-3 pt-3 hover:text-green-400 transition mt-2">
            <Image src="/assets/whatsapp.svg" alt="WhatsApp" width={50} height={50} />
            Message us on WhatsApp
          </Link>
        </motion.div>

        {/* Social Media */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 min-w-[180px]"
        >
          <h3 className="text-xl font-semibold mb-3 font-['Plus_Jakarta_Sans']">Social Media</h3>
          <p className="text-lg mb-3 pt-3">Follow us for updates & study tips</p>
            <div className="flex gap-4 pt-3">
            {[
              { icon: 'x', url: 'https://twitter.com/' },
              { icon: 'fb', url: 'https://facebook.com/' },
              { icon: 'insta', url: 'https://instagram.com/' },
              { icon: 'in', url: 'https://linkedin.com/' },
            ].map(({ icon, url }, index) => (
              <motion.a 
                key={index} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }} 
                className="transition"
              >
                <Image src={`/assets/${icon}.svg`} alt={icon} width={50} height={50} />
              </motion.a>
            ))}
          </div>

        </motion.div>
      </div>

      {/* Copyright Text */}
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-lg mt-10 border-t border-white/20 pt-6"
      >
        © {new Date().getFullYear()} Ace Tutors Global. All rights reserved.
      </motion.p>
    </footer>
  );
};

export default Footer;
