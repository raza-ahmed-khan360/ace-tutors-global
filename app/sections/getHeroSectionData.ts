import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export default async function getHeroSectionData() {
  return client.fetch(
    groq`*[_type == "heroSection"][0]{
      title,
      description,
      buttonText,
      video{asset->{url}},
      courses
    }`
  );
}
