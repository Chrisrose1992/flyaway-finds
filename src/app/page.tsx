import SearchForm from '@/components/SearchForm';
import WhyBookWithUs from '@/components/WhyBookWithUs';
import PromoBanner from '@/components/PromoBanner';
import PopularPackages from '@/components/PopularPackages';
import NewsletterSignup from '@/components/NewsletterSignup';
import DestinationHighlights from "@/components/DestinationHighlights";
import HolidayCategories from '@/components/HolidayCategories';
import AppPromo from '@/components/AppPromo';
import RecommendedHotels from '@/components/RecommendedHotels';

export default async function Home () {
  return (
      <>
        <SearchForm />
        <PromoBanner />
        <PopularPackages />
        <WhyBookWithUs />
        <RecommendedHotels />
        <DestinationHighlights />
        <HolidayCategories />
        <AppPromo />
      </>
  );
}