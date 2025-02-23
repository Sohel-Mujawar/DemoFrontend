import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa6';

// Example testimonials data
const testimonials = [
  {
    quote:
      'Promote India has revolutionized our marketing strategy. The automated features have saved us countless hours, and the branding templates are top-notch!',
    name: 'John Doe',
    position: 'Marketing Manager, ABC Corp',
    imgSrc: 'https://via.placeholder.com/150', // Placeholder image
    review: 'Exceptional Service!',
    reviewpara:
      'The automated features have saved us countless hours, and the branding templates are top-notch.',
  },
  {
    quote:
      'The customer engagement tools have been a game-changer for us. Our client retention has improved dramatically thanks to Promote India!',
    name: 'Jane Smith',
    position: 'Owner, XYZ Ltd',
    imgSrc: 'https://via.placeholder.com/150', // Placeholder image
    review: 'Game Changer!',
    reviewpara:
      'Our client retention has improved dramatically thanks to Promote India!',
  },
  {
    quote:
      'From easy website creation to effective social media management, Promote India has everything we need. Highly recommend it!',
    name: 'Alex Johnson',
    position: 'CEO, DEF Inc.',
    imgSrc: 'https://via.placeholder.com/150', // Placeholder image
    review: 'Highly Recommend!',
    reviewpara: 'Promote India has everything we need for effective marketing.',
  },
];

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1,
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1,
    );
  };

  return (
    <motion.div
      initial={{opacity: 0, x: -150}}
      whileInView={{opacity: 1, x: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.7, delay: 0.1}}
      viewport={{once: false, amount: 0.2}}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="title-font text-purple mb-4 text-2xl font-semibold sm:text-3xl">
            Testimonials
          </h1>
          <h1 className="text-gray-700 mb-4 text-4xl font-extrabold">
            Our Clients <span className="text-purple">Love Us.</span>
          </h1>
          <p className="text-gray-500 text-base font-normal">
            Discover how we’ve helped our clients achieve their goals and what
            they have to say about our services.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          <div className="flex items-center justify-center md:w-1/2">
            <img
              alt="testimonial"
              src={testimonials[currentSlide].imgSrc}
              className="rounded-lg object-cover shadow-lg md:h-full md:w-1/2"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <AnimatePresence>
              <motion.figure
                key={currentSlide}
                initial={{opacity: 0, x: 40}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -40}}
                transition={{duration: 0.5}}
                className="relative rounded-lg bg-white p-6 shadow-lg"
              >
                <h2 className="mb-2 text-xl font-bold">
                  {testimonials[currentSlide].review}
                </h2>
                <blockquote>
                  <p className="text-gray-600 mb-4 text-base">
                    {testimonials[currentSlide].reviewpara}
                  </p>
                </blockquote>
                <figcaption className="flex items-center space-x-4">
                  <img
                    className="border-gray-300 h-16 w-16 rounded-full border-2"
                    src={testimonials[currentSlide].imgSrc}
                    alt="profile picture"
                  />
                  <div className="text-left">
                    <h5 className="text-gray-900 text-lg font-semibold">
                      {testimonials[currentSlide].name}
                    </h5>
                    <p className="text-gray-500 text-sm">
                      {testimonials[currentSlide].position}
                    </p>
                  </div>
                </figcaption>
                <div className="flex justify-between pt-8">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="bg-gray-50 hover:bg-gray-200 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors"
                  >
                    <FaArrowLeft className="text-purple text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="bg-gray-50 hover:bg-gray-200 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors"
                  >
                    <FaArrowRight className="text-purple text-xl" />
                  </button>
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
