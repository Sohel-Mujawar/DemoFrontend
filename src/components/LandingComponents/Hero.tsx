import hero from '@/assets/images/hero/hero.jpg';
import {motion} from 'framer-motion';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-gray-600 body-font md:mx-20 md:mt-49">
      <div className="container mx-auto flex flex-col-reverse items-center px-10 py-24 md:flex-row">
        <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:px-8 md:text-left lg:flex-grow">
          <h2 className="text-xl font-semibold text-blue-700">About Company</h2>
          <h1 className="title-font text-gray-900 mb-4 text-2xl font-medium md:text-4xl">
            Welcome to the TMS Success Family
          </h1>

          <p className="mb-8 text-lg leading-relaxed">
            At TMS Success, we take pride in reaching new milestones with our
            unique vision and unwavering enthusiasm. Under the dynamic
            leadership of our visionary team, we have built a strong presence in
            the competitive wellness and business market, consistently exceeding
            standards of excellence. Our mission is clear: to empower
            individuals to achieve financial freedom and personal success
            through TMS Success. Our inspiration and energy fuel our journey
            toward constant innovation and excellence.
            <p className="mb-8 mt-8 text-lg leading-relaxed">
              This enthusiasm empowers us to overcome challenges, foster
              positivity, and build confidence in every interaction. Dedicated
              and capable, we strive to serve our customers and partners with
              unmatched consistency and commitment. We have remained steadfast
              in upholding the values of trust, quality, and responsiveness. We
              take immense pride in managing our operations with resilience and
              maintaining the trust of our customers and distributors through
              exceptional performance. By becoming a part of the TMS Success
              family, you are stepping into a future of health, wealth, and
              unparalleled opportunities.
            </p>
            <p className="text-xl font-semibold">
              Together, let’s build a prosperous tomorrow.
            </p>
          </p>
        </div>
        <div className="mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg">
          <img
            className="rounded object-cover object-center drop-shadow-2xl"
            alt="hero"
            src={hero}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
