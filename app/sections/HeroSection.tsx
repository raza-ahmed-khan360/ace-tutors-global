'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroSectionData {
  title?: string;
  description?: string;
  buttonText?: string;
  video?: { asset?: { url?: string } };
}

const HeroSection: React.FC<{ initialData?: HeroSectionData }> = ({ initialData = {} }) => {
  const { title, description, buttonText, video } = initialData || {};
  const videoUrl = video?.asset?.url;

  return (
    <div className="h-[660px] md:h-[600px] lg:h-[500px] flex items-center justify-center px-6 md:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto"
      >
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="w-full md:w-1/2 flex flex-col items-start gap-6 text-center md:text-left"
        >
          <motion.h1
            whileHover={{ scale: 1.02 }}
            className="text-indigo-950 text-4xl md:text-6xl font-['Plus_Jakarta_Sans'] font-bold leading-tight md:leading-[69px] tracking-tighter"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-indigo-950 font-['Poppins'] text-lg md:text-xl leading-7"
          >
            {description}
          </motion.p>
          <Link href="#form" className='w-full'>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-6 py-4 bg-indigo-950 font-['Poppins'] hover:bg-indigo-800 text-white text-lg font-semibold rounded-xl transition-all duration-300"
              >
                {buttonText}
              </motion.button>
            </div>
          </Link>
        </motion.div>

        {/* Right Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          {videoUrl && (
            <motion.video
              whileHover={{ scale: 1.02 }}
              className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg"
              autoPlay
              muted
              loop
              preload="yes"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
