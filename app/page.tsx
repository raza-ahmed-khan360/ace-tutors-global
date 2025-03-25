import FAQs from "./sections/FAQs";
import FeaturedSection from "./sections/FeaturedSection";
import HeroSection from "./sections/HeroSection";
import Levels from "./sections/Levels";
import SubjectSection from "./sections/SubjectSection";
import EnrollmentForm from "./sections/SubmissionaForm";
import Testimonials from "./sections/Testimonials";
import { Metadata } from 'next'
import JsonLd from './components/JsonLd'
import WebsiteSchema from './components/schemas/WebsiteSchema';
import CourseSchema from './components/schemas/CourseSchema';
import FAQSchema from './components/schemas/FAQSchema';

export const metadata: Metadata = {
  title: 'Ace Tutors Global - Expert Online Tutoring for International Curricula',
  description: 'Get professional online tutoring for O Levels, A Levels, IGCSE, IB and more. Personalized learning experience with expert tutors, flexible schedules, and proven results.',
  alternates: {
    canonical: 'https://www.acetutorsglobal.com'
  },
  keywords: [
    'online tutoring',
    'O Levels tutoring',
    'A Levels tutoring',
    'IGCSE tutoring',
    'IB tutoring',
    'professional tutors',
    'online education',
    'international curriculum'
  ]
}

export default function Home() {
  return (
    <main>
      <JsonLd />
      <WebsiteSchema />
      <CourseSchema />
      <FAQSchema />
      <Levels />
      <HeroSection />
      <FeaturedSection />
      <SubjectSection />
      <Testimonials />
      <FAQs />
      <EnrollmentForm />
    </main>
  );
}
