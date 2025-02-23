import React, {useState, useEffect} from 'react';
import {
  Navbar,
  Hero,
  FAQPage,
  Contact,
  Footer,
} from '@/components/LandingComponents';
const Banner = React.lazy(
  () => import('@/components/LandingComponents/Banner'),
);
import Products from '@/components/LandingComponents/Products';
import Trial from '@/components/LandingComponents/Trial';
import VisionMission from '@/components/LandingComponents/VisionMission';
import {Element} from 'react-scroll';
import '@/assets/css/loader.css';

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Element name="home">
        <Banner />
      </Element>
      <Element name="hero">
        <Hero />
      </Element>
      <Element name="hero">
        <Products />
      </Element>
      <VisionMission />
      <Element name="faq">
        <FAQPage />
      </Element>
      <Element name="testimonials">
        <Trial />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
      <Footer />

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
