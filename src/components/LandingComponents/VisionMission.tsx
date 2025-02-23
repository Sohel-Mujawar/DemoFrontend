import React from 'react';

const VisionMission: React.FC = () => {
  return (
    <section className="text-gray-600 body-font mx-0 md:mx-20 md:mt-32">
      <div className="container mx-auto flex flex-col-reverse items-center px-10 py-24 md:flex-row">
        <div className="m-5 flex w-full flex-col items-center bg-blue-100 py-8 text-center md:w-1/2 md:items-start md:px-8 md:text-left lg:flex-grow">
          <h2 className="text-2xl font-semibold text-black">Our Vision</h2>

          <p className="mb-8 mt-8 px-6 font-medium leading-relaxed text-slate-700 md:px-0 md:text-lg">
            We are committed to becoming a global leader in the health and
            wellness sector, empowering individuals to not only achieve
            financial independence but also experience deep personal
            fulfillment. Our vision is to cultivate a thriving, health-conscious
            community that is supported by a combination of innovative wellness
            products and a transformative business network that encourages
            growth, collaboration, and success.We aim to inspire individuals to
            take control of their health, unlock their full potential. Together,
            we can build a future where health and personal success are within
            reach for everyone, anywhere.
          </p>
        </div>
        <div className="m-5 flex w-full flex-col items-center bg-red-200 py-8 text-center md:w-1/2 md:items-start md:px-8 md:text-left lg:flex-grow">
          <h2 className="text-2xl font-semibold text-black">Our Mission</h2>

          <p className="mb-8 mt-8 px-6 font-medium leading-relaxed text-slate-700 md:px-0 md:text-lg">
            Our mission is to empower and inspire individuals to unlock their
            full personal and professional potential. By providing premium,
            nature-based wellness products that enhance physical, mental, and
            emotional well-being, we aim to make a meaningful difference in
            peoples lives. We are dedicated to fostering a vibrant community
            built on encouragement, trust, and collaboration, where every
            individual feels supported in their journey toward growth and
            achievement.Together, we strive to create a world where wellness and
            success go hand in hand, empowering everyone to live their best
            life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
