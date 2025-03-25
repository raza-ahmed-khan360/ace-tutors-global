export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Ace Tutors Global",
    "description": "Professional online tutoring services for O Levels, A Levels, IGCSE and other international curricula",
    "url": "https://www.acetutorsglobal.com",
    "logo": "https://www.acetutorsglobal.com/assets/Logo-main.svg",
    "sameAs": [
      "https://facebook.com/acetutorsglobal",
      "https://twitter.com/acetutorsglobal",
      "https://instagram.com/acetutorsglobal",
      "https://linkedin.com/company/acetutorsglobal"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "offers": {
      "@type": "Offer",
      "category": "Educational Services",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD"
      }
    },
    "service": {
      "@type": "Service",
      "serviceType": "Online Tutoring",
      "provider": {
        "@type": "Organization",
        "name": "Ace Tutors Global"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Global"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.acetutorsglobal.com"
    },
    "teachingStaff": {
      "@type": "Person",
      "name": "Expert Tutors",
      "description": "Qualified and experienced tutors for international curricula"
    },
    "alumni": {
      "@type": "Person",
      "description": "Successful students across global examination boards"
    },
    "foundingDate": "2020",
    "keywords": "online tutoring, O Levels, A Levels, IGCSE, IB",
    "awards": "Top rated online tutoring service"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
