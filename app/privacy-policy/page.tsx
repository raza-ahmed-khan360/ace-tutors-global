import Link from 'next/link';

export default function PrivacyPolicy() {
  const metadata = {
    title: 'Privacy Policy - Ace Tutors Global',
    description:
      'Learn how Ace Tutors Global collects, uses, and safeguards your personal information when you use our online tutoring services.',
  };

  const phoneNumber = process.env.NEXT_PUBLIC_WA_NUMBER;
  const mainHeading = 'Privacy Policy';
  const content = [
    {
      h2: '1. Information We Collect',
      p: 'We may collect the following information:',
      list: [
        'Personal Identification Information: Name, email address, phone number, date of birth, and other contact details.',
        'Payment Information: No Billing details such as credit card or other payment method information are collected, payments are directly made into bank account or wise.',
        'Usage Data: Details about how you use our website or platform, including session times and interactions.',
        'Communication Data: Messages or communications between you and our tutors or support team.',
      ],
    },
    {
      h2: '2. How We Use Your Information',
      p: 'Your information is used to:',
      list: [
        'Provide, operate, and maintain our tutoring services.',
        'Manage your account and process payments.',
        'Communicate with you regarding your sessions, updates, or support requests.',
        'Improve our platform and services based on user feedback and data analysis.',
        'Comply with legal obligations.',
      ],
    },
    {
      h2: '3. Sharing Your Information',
      p: 'We do not sell or rent your personal data to third parties. We may share information with:',
      list: [
        'Tutors providing services to you, only as necessary to facilitate your tutoring sessions.',
        'Payment processors to complete financial transactions.',
        'Service providers who assist in operating our platform under confidentiality agreements.',
        'Legal authorities if required by law or to protect our rights.',
      ],
    },
    {
      h2: '4. Data Security',
      p: 'We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.',
    },
    {
      h2: '5. Cookies and Tracking Technologies',
      p: 'Our website may use cookies and similar technologies to enhance user experience, analyze site traffic, and provide personalized content. You can manage cookie preferences through your browser settings.',
    },
    {
      h2: '6. Your Rights',
      p: 'Depending on your jurisdiction, you may have rights regarding your personal data, including:',
      list: [
        'Accessing the information we hold about you.',
        'Requesting correction or deletion of your data.',
        'Opting out of marketing communications.',
        'Restricting or objecting to certain data processing.',
      ],
    },
    {
      h2: '7. Data Retention',
      p: 'We retain your personal data only as long as necessary to provide services, comply with legal obligations, or resolve disputes.',
    },
    {
      h2: "8. Children's Privacy",
      p: "Our services are not intended for children under [13/16] years old. We do not knowingly collect personal information from minors without parental consent.",
    },
    {
      h2: '9. Changes to This Privacy Policy',
      p: 'We may update this policy occasionally. We will notify you of significant changes via email or on our website.',
    },
    {
      h2: '10. Contact Information',
      p: (
        <address className="not-italic">
          <div>
            Email:{' '}
            <Link className="underline" href="mailto:info@acetutorsglobal.com">
              info@acetutorsglobal.com
            </Link>
          </div>
          <div>
            Email:{' '}
            <Link className="underline" href="mailto:acetutorsglobal@gmail.com">
              acetutorsglobal@gmail.com
            </Link>
          </div>
          <div>
            Whatsapp:{' '}
            <Link
              className="underline"
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </Link>
          </div>
        </address>
      ),
    },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center gap-16 bg-white py-16 px-6">
      <header className="text-center">
        <h1 className="text-indigo-950 text-6xl font-bold font-['Plus_Jakarta_Sans'] leading-[69px]">
          {mainHeading}
        </h1>
        <p className="mt-4 max-w-3xl text-indigo-950 text-xl font-normal font-['Poppins'] leading-8">
          {metadata.description}
        </p>
      </header>
      <section className="mt-8 max-w-4xl text-indigo-950 text-lg font-normal font-['Poppins'] leading-8">
        {content.map((section, index) => (
          <div key={index}>
            <h2 className="text-3xl font-bold mt-8 mb-4">{section.h2}</h2>
            <p className="mb-6">{section.p}</p>
            {section.list && (
              <ul className="list-disc ml-5 mt-2">
                {section.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
