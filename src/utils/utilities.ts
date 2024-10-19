export const formatDate = (dateString: string) => {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Format the date to YYYY-MM-DD
  return date.toISOString().split('T')[0].toString(); // Returns 'YYYY-MM-DD'
};

export const getYearAndMonth = (timestamp: string) => {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Extract the month and year
  const month = date.getMonth() + 1; // Ensure two digits for the month
  const year = date.getUTCFullYear();

  // Concatenate and return the year and month
  console.log(`${year}-${month}`);
  return `${year}-${month}`;
};

export const sum = (value1: string, value2: string) => {
  const largeValue = Math.max(parseInt(value1), parseInt(value2));
  const smallValue = Math.min(parseInt(value1), parseInt(value2));

  return largeValue - smallValue;
};

export const incrementUntilTarget = (start: number, target: number) => {
  let currentValue = start;
  const resultArray = [];

  while (currentValue <= target) {
    resultArray.push(currentValue);
    currentValue++;
  }

  return resultArray;
};
