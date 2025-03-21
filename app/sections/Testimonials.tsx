'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: "Alexander B.",
    location: "United Kingdom",
    review: "Ace Tutors Global is amazing! My tutor was knowledgeable, supportive, and truly invested in my success. They tailored lessons to my learning style, made complex topics easy, and boosted my confidence. Highly recommended!",
    initials: "AB",
    rating: 5
  },
  {
    name: "Wania K",
    location: "Kingdom of Saudi Arabia",
    review: "Ace Tutors Global connected me with a passionate tutor who tailored lessons to my needs, made learning easier, and boosted my confidence. Their support and clear guidance transformed my understanding. Highly recommended for anyone striving for success!",
    initials: "WK",
    rating: 4
  },
  {
    name: "A. Qadir",
    location: "Dubai, U.A.E",
    review: "Ace Tutors Global provided exceptional support! My tutor’s patience, clarity, and dedication boosted my confidence and academic success. Highly recommended!",
    initials: "AQ",
    rating: 4
  },
  {
    name: "Roxanne A.",
    location: "United Kingdom",
    review: "Ace Tutors Global provided my child with a dedicated tutor who offered personalized support, patience, and clear guidance. I've seen a remarkable improvement and highly recommend them!",
    initials: "RA",
    rating: 5
  }
];

// Infinite scrolling animation
const scrollVariants = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      ease: "linear",
      duration: 80,
      repeat: Infinity,
    },
  },
};

function Testimonials() {
  return (
    <div 
      className="relative bg-indigo-950 py-20 overflow-hidden"
      style={{ backgroundImage: "url('/assets/Testimonials-bg.svg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Testimonial Heading */}
      <h2 className="text-center text-white text-5xl font-['Plus_Jakarta_Sans'] tracking-tighter font-semibold mb-10">
        Students and Parents Testimonials
      </h2>

      {/* Infinite Scrolling Testimonials */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          variants={scrollVariants}
          animate="animate"
          className="flex w-max gap-10"
        >
          {/* Duplicate testimonials to prevent blank space */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="w-[500px] p-5 bg-gradient-to-b from-indigo-900/20 to-white/10 rounded-2xl backdrop-blur-lg flex flex-col items-center gap-6 shadow-lg">
              <div className="text-white text-7xl font-bold">“</div>
              <p className="text-white text-lg italic text-center">{testimonial.review}</p>

              {/* Dynamic Star Ratings */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <Image
                    key={starIndex}
                    src={starIndex < testimonial.rating ? "/assets/filled-star.svg" : "/assets/empty-star.svg"}
                    alt="Star Rating"
                    width={24}
                    height={24}
                  />
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white text-white text-xl font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">{testimonial.name}</h3>
                  <p className="text-white text-opacity-50 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Testimonials;
