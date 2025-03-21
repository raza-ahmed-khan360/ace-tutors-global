'use client'
import React from 'react'
import { motion } from 'framer-motion'

// Data Array
const heroData = [
  {
    title: "Ace Your Exams with Expert Tutoring!",
    description:
      "Personalized lessons, expert guidance, and proven strategies to help you achieve top grades. Learn at your own pace with flexible schedules and interactive sessions!",
    buttonText: "Book a FREE Demo!",
    videoSrc: "/assets/video.mp4",
    courses: ["O & A Levels", "IGCSE", "EDEXCEL", "PEARSON", "IB"],
  }
];

const HeroSection: React.FC = () => {
  const { title, description, buttonText, videoSrc, courses } = heroData[0];

  return (
    <div className="h-screen flex items-center justify-center px-6 md:px-10 overflow-hidden">
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
            className="text-indigo-950 text-4xl md:text-6xl font-bold leading-tight md:leading-[69px] tracking-tighter"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }} 
            className="text-indigo-950 text-lg md:text-xl leading-7"
          >
            {description}
          </motion.p>
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            {/* Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="w-full md:w-auto px-6 py-4 bg-indigo-950 hover:bg-indigo-800 text-white text-lg font-semibold rounded-xl transition-all duration-300"
            >
              {buttonText}
            </motion.button>
            
            {/* Course List */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }} 
              className="text-indigo-950 text-lg md:text-xl leading-7"
            >
              <span className="font-bold text-2xl">📚 </span>
              <span>Expert Tutoring for </span>
              <span className="font-bold block">
                {courses.join(' | ')}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Video */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }} 
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.video 
            whileHover={{ scale: 1.02 }} 
            className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg"
            autoPlay
            muted
            loop
            preload="yes"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
