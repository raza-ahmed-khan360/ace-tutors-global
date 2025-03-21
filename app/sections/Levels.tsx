'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Levels: React.FC = () => {
  const levels = ['O & A Levels', 'IGCSE', 'EDEXCEL', 'PEARSON', 'IB']

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: 'easeOut' }} 
      className="w-full bg-indigo-950 flex flex-wrap justify-center items-center gap-6 py-3 px-4 md:px-10 lg:px-20"
    >
      {levels.map((level, index) => (
        <motion.div 
          key={index}
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.3 }} 
          className="text-transparent flex flex-auto text-xl md:text-2xl lg:text-3xl font-bold tracking-wide uppercase"
          style={{ WebkitTextStroke: '1.3px white' }} // Ensure outline effect
        >
          {level}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Levels
