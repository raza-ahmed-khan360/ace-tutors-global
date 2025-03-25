'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const subjects = [
  { name: 'Business Studies', image: '/assets/business-studies.svg' },
  { name: 'Physics', image: '/assets/physics.svg' },
  { name: 'Biology', image: '/assets/biology.svg' },
  { name: 'Chemistry', image: '/assets/chemistry.svg' },
  { name: 'Computer Studies', image: '/assets/computer.svg' },
  { name: 'Mathematics', image: '/assets/math.svg' },
  { name: 'Additional Math', image: '/assets/add-math.svg' },
  { name: 'Statistics', image: '/assets/statistics.svg' },
  { name: 'Accounting', image: '/assets/accounting.svg' },
  { name: 'Economics', image: '/assets/economics.svg' },
  { name: 'English Literature', image: '/assets/english-lit.svg' },
  { name: 'English Language', image: '/assets/english-lang.svg' },
  { name: 'Sociology', image: '/assets/sociology.svg' },
  { name: 'Psychology', image: '/assets/psychology.svg' },
  { name: 'Environmental Management', image: '/assets/environment.svg' },
]

// Motion settings for infinite scrolling
const scrollVariants = (direction: 'left' | 'right') => ({
  animate: {
    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'], // Moves half the duplicated list
    transition: {
      ease: 'linear',
      duration: 50,
      repeat: Infinity,
    },
  },
})

const SubjectRow: React.FC<{ subjects: { name: string; image: string }[]; direction: 'left' | 'right' }> = ({ subjects, direction }) => {
  return (
    <div className="w-full overflow-hidden py-4 relative">
      <motion.div
        variants={scrollVariants(direction)}
        animate="animate"
        className="flex w-max"
      >
        {/* Duplicate subjects to eliminate blank space */}
        {[...subjects, ...subjects].map((subject, index) => (
          <div key={index} className="flex flex-col items-center gap-2 px-4 sm:px-6 md:px-8 lg:px-10">
            <Image src={subject.image} alt={subject.name} width={80} height={80} className="w-[50px] sm:w-[60px] md:w-[80px] lg:w-[100px] object-contain" />
            <h3 className="text-indigo-950 text-sm sm:text-base md:text-lg font-medium font-['Poppins'] whitespace-nowrap">
              {subject.name}
            </h3>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const SubjectSection: React.FC = () => {
  return (
    <div id='subjects' className="w-full bg-white flex flex-col  items-center py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
      <h2 className="text-indigo-950 text-4xl md:text-6xl font-bold pb-4 tracking-tighter font-['Plus_Jakarta_Sans'] text-center mb-6 sm:mb-8">
        Subjects
      </h2>

      {/* First Row - Scroll Left to Right */}
      <SubjectRow subjects={subjects.slice(0, 5)} direction="right" />

      {/* Middle Row - Scroll Right to Left */}
      <SubjectRow subjects={subjects.slice(5, 10)} direction="left" />

      {/* Last Row - Scroll Left to Right */}
      <SubjectRow subjects={subjects.slice(10)} direction="right" />
    </div>
  )
}

export default SubjectSection
