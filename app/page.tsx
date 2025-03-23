import FAQs from "./sections/FAQs";
import FeaturedSection from "./sections/FeaturedSection";
import HeroSection from "./sections/HeroSection";
import Levels from "./sections/Levels";
import SubjectSection from "./sections/SubjectSection";
import EnrollmentForm from "./sections/SubmissionaForm";
import Testimonials from "./sections/Testimonials";

export default function Home() {
  return (
    <div>
      <Levels />
      <HeroSection />
      <FeaturedSection />
      <SubjectSection />
      <Testimonials />
      <FAQs />
      <EnrollmentForm />
    </div>
  );
}
