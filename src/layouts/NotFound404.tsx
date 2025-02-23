import React from 'react';

const NotFound404: React.FC = () => {
  return (
    <section className="dark:bg-gray-900 grid h-screen place-content-center bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="text-gray-900 mb-4 text-3xl font-bold tracking-tight dark:text-white md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg font-light">
            Sorry, we can&apos;t find that page&rsquo; You&apos;ll find lots to
            explore on the home page.{' '}
          </p>
          <a
            href="/"
            className="my-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary dark:focus:ring-primary"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound404;
