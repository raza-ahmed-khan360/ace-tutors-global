'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';

interface Testimonial {
  name: string;
  location: string;
  review: string;
  initials: string;
  rating: number;
}

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    client.fetch<Testimonial[]>(
      `*[_type == "testimonial"] | order(_createdAt desc){
        name,
        location,
        review,
        initials,
        rating
      }`
    ).then(setTestimonials);
  }, []);

  return (
    <div 
      id='testimonials'
      className="relative bg-indigo-950 py-20 overflow-hidden"
      style={{ backgroundImage: "url('/assets/Testimonials-bg.svg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Testimonial Heading */}
      <h2 className="text-center text-white text-4xl md:text-6xl font-['Plus_Jakarta_Sans'] tracking-tighter font-semibold mb-12">
        Students & Parents Testimonials
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
              <p className="text-white text-lg italic font-['Poppins'] text-center">{testimonial.review}</p>

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
                <div className="w-16 h-16 rounded-full flex items-center font-['Poppins'] justify-center border border-white text-white text-xl font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="text-white text-xl font-['Poppins'] font-bold">{testimonial.name}</h3>
                  <p className="text-white text-opacity-50 font-['Poppins'] text-sm">{testimonial.location}</p>
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
