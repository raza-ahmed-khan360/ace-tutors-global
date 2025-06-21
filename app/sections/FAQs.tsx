'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '@/sanity/lib/client';

const ITEMS_PER_PAGE = 5;

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFAQs = async () => {
      const data: FAQ[] = await client.fetch(
        `*[_type == "faq"]|order(_createdAt asc){
          _id,
          question,
          answer
        }`
      );
      setFaqs(data);
    };
    fetchFAQs();
  }, []);

  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleFAQs = faqs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div id='faqs' className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 text-indigo-950">
      <h2 className="text-center text-5xl font-bold font-['Plus_Jakarta_Sans'] mb-12">FAQs</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {visibleFAQs.map((faq, index) => (
          <div key={faq._id} className="bg-slate-50 p-6 rounded-xl shadow-md border border-indigo-200">
            <motion.button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
              className="flex justify-between items-center w-full text-left text-lg lg:text-xl font-semibold font-['Poppins']"
            >
              {faq.question}
              <span className="text-2xl">{expandedIndex === index ? '-' : '+'}</span>
            </motion.button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-lg font-['Poppins'] mt-4"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-3 text-lg font-['Poppins'] px-4 sm:px-6 md:px-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-indigo-950 font-medium text-white rounded-lg hover:bg-indigo-800"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-indigo-950'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-indigo-950 font-medium text-white rounded-lg hover:bg-indigo-800"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
