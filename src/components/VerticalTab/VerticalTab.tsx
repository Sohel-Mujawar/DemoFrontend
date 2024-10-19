import React, {useEffect, useState} from 'react';
import {VerticalTabPropsTypes} from '@/types';

const VerticalTab: React.FC<VerticalTabPropsTypes> = ({
  tabData,
  setJsxElement,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string>(
    tabData[0]?.categories[0]?.accessor || '',
  );

  const handleComponentSelection = (accessor: string) => {
    setSelectedComponent(accessor);
  };

  useEffect(() => {
    const componentToRender = tabData.flatMap((tab) =>
      tab.categories
        .filter((category) => category.accessor === selectedComponent)
        .map((category) => category.component),
    );

    if (componentToRender.length > 0) {
      setJsxElement(componentToRender[0]);
    }
  }, [selectedComponent, setJsxElement, tabData]);

  return (
    <div className="min-h-125 w-60 rounded-sm border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark">
      {tabData.map((tab, tabIndex) => (
        <div key={tabIndex}>
          <div className="align-center flex justify-between p-2">
            <p className="font-medium">{tab.name}</p>
            {/* <FaAngleDown /> */}
          </div>
          <div>
            {tab.categories.map((category, categoryIndex) => (
              <li
                key={categoryIndex}
                className="cursor-pointer list-none p-2 pl-6"
                onClick={() => handleComponentSelection(category.accessor)}
              >
                {category.name}
              </li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTab;
