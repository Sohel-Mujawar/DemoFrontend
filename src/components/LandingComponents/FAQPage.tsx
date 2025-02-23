import starIcon from '@/assets/FAQAccordion/icon-star.svg';
import data from './data';
import FAQ from './FAQ';
import React from 'react';

const FAQPage: React.FC = () => {
  return (
    <div className="bg-light-pink font-work-sans flex min-h-screen flex-col items-center justify-center bg-contain bg-top bg-no-repeat px-8">
      <div className="mx-auto min-h-min w-full rounded-2xl bg-white p-8 pt-12 md:w-[77rem] md:p-16">
        <h1 className="mb-4 flex items-center text-2xl md:text-4xl">
          <img className="mr-4 md:mr-8" src={starIcon} alt="star icon" />
          FAQs
        </h1>
        {data.map((item) => (
          <FAQ
            key={item.question}
            title={item.question}
            description={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
