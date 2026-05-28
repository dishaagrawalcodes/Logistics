import Hero from "../components/hero";
import LatestCreations from "../components/Vision";
import Markets from "../components/Markets";
import OurSolutions from "../components/OurSolutions";
import WhereWeOperate from "../components/WhereWeOperate";
import WhyChooseUs from "../components/WhyChooseUs";
import NewsletterSection from "../components/NewsletterSection";
import Testimonial from "../components/Testimonia";
const Home = () => {
  return (
    <>
      <Hero />
      <Markets />
      <OurSolutions/>
      <WhyChooseUs/>
      <LatestCreations/>
      <WhereWeOperate/>
      <Testimonial/>
      <NewsletterSection/>
    </>
  );
};

export default Home;
