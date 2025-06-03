import Link from 'next/link';
import React from 'react';

export default function TermsAndConditions() {
  const metadata = {
    title: 'Terms & Conditions | Ace Tutors Global',
    description:
      'Review the terms and conditions for booking tutoring sessions at Ace Tutors Global. Understand our policies on services, bookings, payments, and more.',
  };

  const phoneNumber = process.env.NEXT_PUBLIC_WA_NUMBER
  const mainHeading = 'Terms & Conditions';
  const content = [
    {
      h2: '1. Services Provided',
      p: 'We offer tutoring sessions in various subjects for students of different age groups and educational levels. Our tutors are carefully selected for their expertise and qualifications.',
    },
    {
      h2: '2. Booking and Payment',
      p: 'Sessions must be booked in advance through our communication channels. Payments are required before the tutoring session begins unless otherwise agreed. Accepted payment methods include Bank Transfers and Wise. Prices for sessions are as listed on our website or agreed upon in writing.',
    },
    {
      h2: '3. Rescheduling Policy',
      p: 'Rescheduling requests must be made at least 06 hours in advance.',
    },
    {
      h2: '4. Session Conduct',
      p: 'Students and tutors are expected to behave respectfully and professionally during sessions. Any form of harassment or inappropriate behavior will result in termination of services without refund.',
    },
    {
      h2: '5. Confidentiality and Privacy',
      p: 'We respect your privacy and handle all personal data in accordance with applicable data protection laws. Tutoring sessions and any shared information are confidential between the tutor and student.',
    },
    {
      h2: '6. Liability',
      p: 'While we strive to provide high-quality tutoring, we do not guarantee specific academic outcomes. Ace Tutors Global is not liable for any damages arising from the use or inability to use our services.',
    },
    {
      h2: '7. Intellectual Property',
      p: 'All materials provided during sessions remain the property of Ace Tutors Global or the tutor and are for personal educational use only. Unauthorized copying or distribution of materials is prohibited.',
    },
    {
      h2: '8. Termination',
      p: 'We reserve the right to terminate services to any client or tutor for violation of these terms or inappropriate behavior. Clients may terminate services at any time; refunds are subject to the cancellation policy.',
    },
    {
      h2: '9. Changes to Terms',
      p: 'We may update these terms from time to time. Clients will be notified of significant changes.',
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
    <article className="w-full min-h-screen flex flex-col justify-start items-center gap-16 bg-white py-16 px-6">
      <header>
        <h1 className="text-indigo-950 text-6xl font-bold font-['Plus_Jakarta_Sans'] leading-[69px] text-center">
          {mainHeading}
        </h1>
      </header>
      <section className="w-auto max-w-4xl text-indigo-950 text-xl font-normal font-['Poppins'] leading-8">
        <p className="mb-6">{metadata.description}</p>
        {content.map((section, index) => (
          <div key={index}>
            <h2 className="text-3xl font-bold mt-8 mb-4">{section.h2}</h2>
            <p className="mb-6">{section.p}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
