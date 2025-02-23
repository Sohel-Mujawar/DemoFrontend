import {CheckIcon} from '@/assets';
import {motion} from 'framer-motion';
import React from 'react';
import {FaArrowRightLong} from 'react-icons/fa6';
import {IoClose} from 'react-icons/io5';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    features: [
      {included: true, text: 'Branding Frames'},
      {included: true, text: 'Ready-Made Templates'},
      {included: false, text: 'Website'},
      {included: false, text: 'Block Ads'},
      {included: false, text: 'Watermark Remover'},
      {included: false, text: 'Self File Upload'},
      {included: false, text: 'Missed Call Website Sending'},
      {included: true, text: 'Anniversary Wishes: Up to 5'},
      {included: true, text: 'Birthday Wishes: Up to 5'},
      {included: true, text: 'Schedule Post: 2 Days'},
      {included: true, text: 'Contacts Per Group: up to 200'},
      {included: false, text: 'New Groups'},
    ],
  },
  {
    name: 'Basic',
    price: '₹1199',
    period: '/year',
    features: [
      {included: true, text: 'Branding Frames'},
      {included: true, text: 'Ready-Made Templates'},
      {included: true, text: 'Website'},
      {included: true, text: 'Block Ads'},
      {included: false, text: 'Watermark Remover'},
      {included: true, text: 'Self File Upload'},
      {included: true, text: 'Missed Call Website Sending'},
      {included: true, text: 'Anniversary Wishes: Up to 25'},
      {included: true, text: 'Birthday Wishes: Up to 25'},
      {included: true, text: 'Schedule Post: 7 Days'},
      {included: true, text: 'Contacts Per Group: up to 400'},
      {included: true, text: 'New Groups: +2'},
    ],
  },
  {
    name: 'Advanced',
    price: '₹1999',
    period: '/year',
    features: [
      {included: true, text: 'Branding Frames'},
      {included: true, text: 'Ready-Made Templates'},
      {included: true, text: 'Website'},
      {included: true, text: 'Block Ads'},
      {included: true, text: 'Watermark Remover'},
      {included: true, text: 'Self File Upload'},
      {included: true, text: 'Missed Call Website Sending'},
      {included: true, text: 'Anniversary Wishes: Up to 150'},
      {included: true, text: 'Birthday Wishes: Up to 150'},
      {included: true, text: 'Schedule Post: 15 Days'},
      {included: true, text: 'Contacts Per Group: up to 800'},
      {included: true, text: 'New Groups: +5'},
    ],
  },
  {
    name: 'Premium',
    price: '₹2999',
    period: '/year',
    features: [
      {included: true, text: 'Branding Frames'},
      {included: true, text: 'Ready-Made Templates'},
      {included: true, text: 'Website'},
      {included: true, text: 'Block Ads'},
      {included: true, text: 'Watermark Remover'},
      {included: true, text: 'Self File Upload'},
      {included: true, text: 'Missed Call Website Sending'},
      {included: true, text: 'Anniversary Wishes: Up to 500'},
      {included: true, text: 'Birthday Wishes: 500'},
      {included: true, text: 'Schedule Post: 30 Days'},
      {included: true, text: 'Contacts Per Group: up to 1200'},
      {included: true, text: 'New Groups: +10'},
    ],
  },
];

const PlanCard = ({
  name,
  price,
  period,
  features,
}: {
  name: string;
  price: string;
  period: string;
  features: {included: boolean; text: string}[];
}) => (
  <motion.div
    initial={{opacity: 0, x: 150}}
    whileInView={{opacity: 1, x: 0}}
    exit={{opacity: 0}}
    transition={{duration: 0.7, delay: 0.1}}
    viewport={{once: false, amount: 0.2}}
    className="text-gray-900 border-gray-100 mx-auto flex max-w-lg flex-col rounded-lg border bg-white px-9 py-6 text-center shadow"
  >
    <h3 className="text-purplehover mb-4 text-2xl font-semibold">{name}</h3>
    <div className="my-8 flex items-baseline justify-center">
      <span className="text-purple mr-2 text-5xl font-extrabold">{price}</span>
      <span className="text-gray-500 dark:text-gray-400">{period}</span>
    </div>
    <ul role="list" className="mb-8 space-y-4 text-left">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-3">
          {feature.included ? (
            <CheckIcon />
          ) : (
            <IoClose className="text-red-500" />
          )}
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
    <a
      href="#"
      className="bg-purple hover:bg-purplehover dark:bg-purple dark:hover:bg-purplehover inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white"
    >
      Get started
      <FaArrowRightLong className="ml-3" />
    </a>
  </motion.div>
);

const Pricing: React.FC = () => (
  <div className="bg-white">
    <div className="max-w-screen mx-auto px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
        <h1 className="title-font text-purple mb-4 text-2xl font-semibold sm:text-3xl">
          Pricing
        </h1>
        <p className="text-gray-500 mx-auto text-base leading-relaxed">
          Choose a plan that fits your budget and business needs. Affordable
          options with the features to help you grow.
        </p>
      </div>
      <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-4 lg:space-y-0 xl:gap-0">
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </div>
  </div>
);

export default Pricing;
