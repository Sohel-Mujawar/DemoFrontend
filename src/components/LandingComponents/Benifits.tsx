import {motion} from 'framer-motion';
import {
  FaBullhorn,
  FaDollarSign,
  FaUserFriends,
  FaClock,
  FaArrowUpRightDots,
  TbWorldWww,
} from '@/icons';
import React from 'react';

// Example benefits data with icons
const benefits = [
  {
    title: 'Cost-Effective Solutions',
    description:
      "Reduce costs compared to external services with our app's comprehensive marketing and branding tools. Get exceptional value for your investment with features that cater to all your needs.",
    icon: <FaDollarSign className="text-purple mb-4 text-3xl" />,
  },
  {
    title: 'Enhance Customer Engagement',
    description:
      'Automated features, like birthday and anniversary messages, help you build stronger relationships with customers. Increase engagement and foster loyalty with minimal effort.',
    icon: <FaUserFriends className="text-purple mb-4 text-3xl" />,
  },
  {
    title: 'Time and Resource Efficiency',
    description:
      'Automate time-consuming tasks such as scheduling posts, sending personalized messages, and creating branded content. Use our template library to quickly create professional marketing materials.',
    icon: <FaClock className="text-purple mb-4 text-3xl" />, // Add the appropriate icon
  },
  {
    title: 'Consistent Branding',
    description:
      'Manage your branding across various channels with a centralized platform. Access branded templates for social media, emails, and other marketing materials to ensure consistency and cohesiveness.',
    icon: <FaBullhorn className="text-purple mb-4 text-3xl" />, // Add the appropriate icon
  },
  {
    title: 'Enhanced Online Presence',
    description:
      'Create a professional online presence with a custom website for your business. Use the marketing calendar to plan and execute campaigns effectively, ensuring a strong and consistent online presence.',
    icon: <TbWorldWww className="text-purple mb-4 text-3xl" />, // Add the appropriate icon
  },
  {
    title: 'Simplified Marketing',
    description:
      'Benefit from a user-friendly interface that simplifies campaign creation and management. Access expert support and resources to maximize the effectiveness of our tools.',
    icon: <FaArrowUpRightDots className="text-purple mb-4 text-3xl" />, // Add the appropriate icon
  },
];

const Benefits: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="title-font text-purple mb-4 text-2xl font-semibold sm:text-3xl">
            Why Choose Promote India?
          </h1>
          <p className="text-gray-500 mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">
            Discover the key benefits of using Promote India and how it can
            transform your business.
          </p>
        </div>
        <motion.div
          initial={{opacity: 0, x: -150}}
          whileInView={{opacity: 1, x: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.7, delay: 0.1}}
          viewport={{once: false, amount: 0.2}}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex h-full flex-col items-center rounded p-8 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-center">
                {benefit.icon}
              </div>
              <h2 className="text-purple mb-3 text-lg font-medium">
                {benefit.title}
              </h2>
              <p className="text-gray-600 text-center text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Benefits;
