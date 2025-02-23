import React, {useState} from 'react';
import plusIcon from '@/assets/FAQAccordion/icon-plus.svg';
import minusIcon from '@/assets/FAQAccordion/icon-minus.svg';

interface AccordionProps {
  title: string;
  description: string;
}

const FAQ: React.FC<AccordionProps> = ({
  title,
  description,
}: AccordionProps) => {
  const [isActive, setActive] = useState(false);
  const handleClick = () => setActive(!isActive);

  return (
    <div className="border-light-pink border-b py-6 last:border-b-0">
      <div className="flex items-center justify-between" onClick={handleClick}>
        <h2 className="text-dark-purple cursor-pointer text-lg font-semibold hover:text-[hsl(281,86%,55%)] md:text-xl">
          {title}
        </h2>
        <img
          src={isActive ? minusIcon : plusIcon}
          className="h-6 w-6 md:h-8 md:w-8"
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        <p className="text-[hsl(292, 16%, 49%)] text-[1.4rem] font-normal leading-8 md:text-[1.6rem]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FAQ;
