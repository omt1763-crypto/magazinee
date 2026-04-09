import Navbar from '@/components/Navbar';
import HeroCover from '@/components/HeroCover';
import TrendingBar from '@/components/TrendingBar';
import ArticleGrid from '@/components/ArticleGrid';
import MostPopularArticles from '@/components/MostPopularArticles';
import FeaturedMagazines from '@/components/FeaturedMagazines';
import NominateSection from '@/components/NominateSection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCover />
      <TrendingBar />
      <ArticleGrid />
      <MostPopularArticles />
      <FeaturedMagazines />
      <NominateSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
