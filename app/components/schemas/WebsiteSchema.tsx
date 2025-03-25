export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ace Tutors Global",
    "url": "https://www.acetutorsglobal.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.acetutorsglobal.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
