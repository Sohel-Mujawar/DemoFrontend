import {BiBrain, BiCalendar, BiCode, BiGift, BiMessage, BiPhone} from '@/icons';
import {motion} from 'framer-motion';
import React from 'react';

const featuresData = [
  {
    id: 1,
    icon: <BiCode className="text-purple mb-4 text-4xl" />,
    title: 'Custom Website Creation',
    description:
      'Set up and manage your website with ease, thanks to our user-friendly tools.',
  },
  {
    id: 2,
    icon: <BiCalendar className="text-purple mb-4 text-4xl" />,
    title: 'Automated Marketing Calendar',
    description:
      'Effortlessly schedule posts and manage your social media presence with our automated calendar.',
  },
  {
    id: 3,
    icon: <BiGift className="text-purple mb-4 text-4xl" />, // Ensure this icon is imported or defined
    title: 'Automated Birthday Greetings',
    description:
      'Automatically send customized messages for birthdays and anniversaries with our scheduling feature.',
  },
  {
    id: 4,
    icon: <BiMessage className="text-purple mb-4 text-4xl" />,
    title: 'Automatic Customer Engagement',
    description:
      'Automate customer engagement with personalized birthday and anniversary wishes.',
  },
  {
    id: 5,
    icon: <BiPhone className="text-purple mb-4 text-4xl" />,
    title: 'Missed Call Follow-Up',
    description:
      'Automatically follow up on missed calls by sharing your website link instantly.',
  },

  {
    id: 6,
    icon: <BiBrain className="text-purple mb-4 text-4xl" />,
    title: 'Professional Branding Templates',
    description:
      "Choose from a variety of high-quality templates to enhance your brand's identity.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-20 text-center">
          <h1 className="title-font text-purple mb-4 text-2xl font-semibold sm:text-3xl">
            Features Overview
          </h1>
          <p className="text-gray-500 mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">
            Discover the powerful features that make Promote India the perfect
            choice for your business.
          </p>
        </div>
        <motion.div
          initial={{opacity: 0, x: 150}}
          whileInView={{opacity: 1, x: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.7, delay: 0.1}}
          viewport={{once: false, amount: 0.2}}
          className="-m-4 flex flex-wrap"
        >
          {featuresData.map(({id, icon, title, description}) => (
            <div key={id} className="p-4 md:w-1/3">
              <div className="flex h-full flex-col items-center rounded p-8 shadow-sm">
                <div className="mb-6">{icon}</div>
                <h2 className="text-gray-900 mb-3 text-lg font-medium">
                  {title}
                </h2>
                <p className="text-center text-base leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
