'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "What subjects do we offer tutoring for?",
        answer: "We offer tutoring in a wide range of subjects, including English Language, English Literature, Mathematics, Physics, Chemistry, Biology, Computer Studies, Accounting, Economics, Business, Sociology, Psychology, Global Perspective, Environmental Management, Statistics, Additional Mathematics, General Science, Social Studies, and Arts."
    },
    {
        question: "What grade levels do we cater to?",
        answer: "Grade VI, VII, and VIII. O1, O2, and O3. AS and A2. IBHL and IBSL."
    },
    {
        question: "How are tutors selected?",
        answer: "Our tutors are highly qualified, with a strong academic background in their subject areas. We ensure that they are experienced in teaching and passionate about helping students succeed."
    },
    {
        question: "What is the teaching method?",
        answer: "Our teaching method is personalized and adaptive to each student’s learning style. We focus on building a solid foundation and encouraging critical thinking, problem-solving, and confidence in the subject matter."
    },
    {
        question: "How does the tutoring process work?",
        answer: "Tutoring is done on a One-to-One basis. We assess each student’s needs and create a customized learning plan to help them achieve their academic goals."
    },
    {
        question: "Are online tutoring sessions available?",
        answer: "Yes, we offer online One-to-One tutoring sessions via Google Classroom or Zoom. Our online services are just as effective as in-person sessions and are designed to offer flexibility to students."
    },
    {
        question: "How do we track progress?",
        answer: "We maintain open communication with parents to ensure the best outcomes for students. Parents receive regular updates on their child's progress, including important feedback or areas for improvement. We also keep parents informed of all communications between the tutor and the student regarding homework, class performance, or any challenges."
    },
    {
        question: "What are the fees for tutoring?",
        answer: "Our fees vary depending on the subject, grade level, and the number of classes per week. We offer different packages to suit various budgets. Please contact us for more detailed pricing information."
    },
    {
        question: "What happens if a child misses a session?",
        answer: "We understand that schedules can sometimes conflict. If a student misses a session, we offer make-up sessions based on tutor availability. However, please notify us in advance if you anticipate a cancellation."
    },
    {
        question: "Is there a trial session available?",
        answer: "Yes, we offer a trial session for new students to ensure they’re comfortable with the tutor and teaching style. This is an opportunity to see if our approach aligns with the student’s needs."
    },
    {
        question: "How do we ensure your child’s success?",
        answer: "Success is a priority for us, and we work closely with each student to create a plan that focuses on their specific needs. We also encourage active communication with parents to ensure continuous improvement."
    },
    {
        question: "What is our policy on fees?",
        answer: "Our fees are charged on a monthly basis and cover the assigned number of tutoring sessions for that month. The number of sessions is determined based on the plan you choose, and payment is due at the start of each month. If additional sessions are needed beyond the assigned number, we will discuss any extra charges with you beforehand."
    },
    {
        question: "How can I register for tutoring?",
        answer: "You can register by visiting our website or by leaving a message over WhatsApp to schedule an initial consultation. We’ll discuss your child’s needs and match them with a tutor as quickly as possible."
    },
    {
        question: "Is there a minimum commitment for tutoring?",
        answer: "We don’t require a long-term commitment, but we recommend a time frame in which the tutor will be able to cover the topics along with past papers practice. Some students prefer ongoing tutoring, while others may need help for a specific period, like exam preparation."
    },
    {
        question: "Do we offer tutoring for special needs students?",
        answer: "Yes, we have tutors trained to work with students who have learning disabilities or special needs. We personalize our approach to meet each student's individual requirements."
    },
    {
        question: "How do you communicate with the tutor?",
        answer: "We encourage open communication between parents, students, and tutors. As a parent, you would be included in a WhatsApp group specifically for student-teacher-parent communication."
    },
    {
        question: "Do we provide homework help?",
        answer: "Yes, we offer homework help to ensure students understand the concepts behind their assignments. We focus on helping them learn the material rather than just completing tasks."
    }
];

const ITEMS_PER_PAGE = 5;

export default function FAQs() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleFAQs = faqs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div id='faqs' className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 text-indigo-950">
            <h2 className="text-center text-5xl font-bold font-['Plus_Jakarta_Sans'] mb-12">FAQs</h2>
            <div className="max-w-4xl mx-auto space-y-6">
                {visibleFAQs.map((faq, index) => (
                    <div key={index} className="bg-slate-50 p-6 rounded-xl shadow-md border border-indigo-200">
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
