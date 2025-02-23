import React from 'react';
import banner from '@/assets/images/banner/banner.png';
import {Suspense} from 'react';
import Loader from '../common/Loader';

const Banner: React.FC = () => {
  return (
    <div>
      {' '}
      <section id="home">
        <div className="grid gap-4 md:mt-20">
          <div>
            <Suspense fallback={<Loader />}>
              <img className="h-auto max-w-full" src={banner} alt="poster" />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Banner;
