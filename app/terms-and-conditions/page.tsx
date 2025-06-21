import { client } from '@/sanity/lib/client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import React from 'react';
import Link from 'next/link';

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic my-4">{children}</blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-8">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 text-indigo-950">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 text-indigo-950">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-indigo-950">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => <code className="bg-gray-100 px-1 rounded text-sm">{children}</code>,
    link: ({ value, children }) => (
      <Link
        href={value?.href}
        target={value?.openInNewTab ? '_blank' : undefined}
        rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
        className="underline text-indigo-950 hover:text-indigo-800"
      >
        {children}
      </Link>
    ),
  },
};
export default async function TermsAndConditions() {
  const data = await client.fetch(
    `*[_type == "termsAndConditions"][0]{
      title,
      content
    }`
  );

  return (
    <article className="w-full min-h-screen flex flex-col justify-start items-center gap-16 bg-white py-16 px-6">
      <header>
        <h1 className="text-indigo-950 text-6xl font-bold font-['Plus_Jakarta_Sans'] leading-[69px] text-center">
          {data?.title}
        </h1>
      </header>
      <section className="w-auto max-w-4xl text-indigo-950 text-xl font-normal font-['Poppins'] leading-8">
        <PortableText value={data?.content} components={components} />
      </section>
    </article>
  );
}
