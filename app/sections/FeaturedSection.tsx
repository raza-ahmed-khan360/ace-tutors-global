'use client'
import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    title: 'Experienced Tutoring',
    description:
      'Expert tutors with a proven track record of delivering top results—fast and effectively!',
    image: '/assets/experienced-tutors.svg',
  },
  {
    title: 'Reliability',
    description:
      'A safe learning space where kids thrive—trusted by parents for academic success!',
    image: '/assets/reliability.svg',
  },
  {
    title: 'Safe and Trusted',
    description:
      'Book a tutor easily and schedule classes at your convenience!',
    image: '/assets/safe-and-secure.svg',
  },
]

interface Feature {
  title: string
  description: string
  image: string
}

const FeatureItem: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => {
  const controls = useAnimation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [controls, inView])

  return (
    <motion.div
      id='features'
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="w-full max-w-xs flex flex-col items-center gap-6 text-center"
    >
      <Image
        src={feature.image}
        alt={feature.title}
        width={112}
        height={112}
        className="w-28 h-28 object-contain"
      />
      <h3 className="text-white tracking-tighter text-2xl md:text-3xl font-semibold font-['Plus_Jakarta_Sans']">
        {feature.title}
      </h3>
      <p className="text-white text-base md:text-lg font-normal font-['Poppins']">
        {feature.description}
      </p>
    </motion.div>
  )
}

const FeaturedSection: React.FC = () => {
  return (
    <div className="w-auto bg-indigo-950 flex flex-col items-center py-16 px-6 md:px-12 lg:px-12">
      <div className="flex flex-wrap justify-center items-center gap-12">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} index={index} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedSection
