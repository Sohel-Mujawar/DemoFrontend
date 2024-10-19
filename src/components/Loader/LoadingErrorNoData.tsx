import {LoadingErrorNoDataProps} from '@/types';

const LoadingErrorNoData: React.FC<LoadingErrorNoDataProps> = ({
  isLoading,
  isError,
  errorMessage,
  hasData,
  children,
}) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>{errorMessage || 'Error loading data. Please try again later.'}</div>
    );
  if (!hasData) return <div>No data available</div>;

  return <>{children}</>;
};

export default LoadingErrorNoData;
