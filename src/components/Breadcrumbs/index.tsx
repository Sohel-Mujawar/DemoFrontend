import React from 'react';
import {useLocation} from '@tanstack/react-router';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean); // Get path segments, filtering out empty ones

  // Capitalize the first letter of each segment for display
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {capitalize(pathSegments[pathSegments.length - 1] || 'Dashboard')}
      </h2>

      {/* <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = '/' + pathSegments.slice(0, index + 1).join('/'); // Construct the path for the link
            const isLastSegment = index === pathSegments.length - 1;
            return (
              <li
                key={index}
                className={
                  isLastSegment ? 'font-medium text-primary' : 'font-medium'
                }
              >
                {isLastSegment ? (
                  capitalize(segment)
                ) : (
                  <Link className="font-medium" to={path}>
                    {capitalize(segment)} /
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav> */}
    </div>
  );
};

export default Breadcrumb;
