export default function CourseSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "International Curriculum Tutoring",
    "description": "Expert tutoring for O Levels, A Levels, IGCSE, and IB subjects",
    "provider": {
      "@type": "Organization",
      "name": "Ace Tutors Global",
      "sameAs": "https://www.acetutorsglobal.com"
    },
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "courseMode": "online",
        "educationalLevel": "O Levels, A Levels, IGCSE, IB"
      }
    ],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "Varies",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
