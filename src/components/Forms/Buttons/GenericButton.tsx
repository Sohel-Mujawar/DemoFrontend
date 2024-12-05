import React from 'react';

interface GenericButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`hover:bg-primary-dark mx-1 rounded bg-primary px-8 py-2 text-white transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default GenericButton;
