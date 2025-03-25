export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What subjects do you offer tutoring for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer tutoring in English, Mathematics, Sciences, Business Studies, Economics, and more for international curricula."
        }
      },
      {
        "@type": "Question",
        "name": "What grade levels do you cater to?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cater to O Levels, A Levels, IGCSE, IB, and other international curriculum students."
        }
      }
      // Add more FAQ items as needed
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
