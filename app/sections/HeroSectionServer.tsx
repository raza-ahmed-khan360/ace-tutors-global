import getHeroSectionData from './getHeroSectionData';
import HeroSection from './HeroSection';

export default async function HeroSectionServer() {
  const initialData = await getHeroSectionData();
  return <HeroSection initialData={initialData} />;
}
