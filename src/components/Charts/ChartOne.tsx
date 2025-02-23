/* eslint-disable */
import React, {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {useFetchAdminHome} from '@/lib/react-query/Admin/Home/adminHome';
import {ApexOptions} from 'apexcharts';

const ChartOne: React.FC = () => {
  const {data, isSuccess, isError, isPending} = useFetchAdminHome();
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Total Customers',
        data: [],
      },
    ],
    categories: [],
  });
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'year'>(
    'week',
  );

  // Function to generate all dates of the current week (Sunday to Saturday)
  const getCurrentWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Get the current day of the week (0-6)
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - dayOfWeek)); // Start of the week (Sunday)

    // Generate all the dates for the week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i); // Add days to get the full week
      weekDates.push(day.toISOString().split('T')[0] as never); // Store as yyyy-mm-dd
    }

    return weekDates;
  };

  // Function to generate all months of the current year (January to December)
  const getYearMonths = () => {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  };

  // Function to generate years for the past 7 years + current year
  const getPastYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 7; i >= 0; i--) {
      years.push((currentYear - i) as never);
    }
    return years;
  };

  // Function to filter and group the total customers by the selected period
  const filterDataByPeriod = (
    totalCustomers: any[],
    period: 'week' | 'month' | 'year',
  ) => {
    const now = new Date();
    let startDate: Date;

    if (period === 'week') {
      startDate = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the week (Sunday)
    } else if (period === 'month') {
      startDate = new Date(now.setDate(1)); // Start of the month
    } else {
      startDate = new Date(now.setMonth(0, 1)); // Start of the year
    }

    return totalCustomers.filter((customer) => {
      const customerDate = new Date(customer.createdAt);
      return customerDate >= startDate;
    });
  };

  useEffect(() => {
    if (isSuccess && data?.totalCustomers) {
      // Filter data by selected time period (week, month, year)
      const filteredData = filterDataByPeriod(data.totalCustomers, timePeriod);

      if (timePeriod === 'week') {
        // Generate all dates of the current week
        const weekDates = getCurrentWeekDates();

        // Group data by date for the current week
        const groupByDate = filteredData.reduce(
          (acc: Record<string, number>, customer) => {
            const date = new Date(customer.createdAt)
              .toISOString()
              .split('T')[0]; // yyyy-mm-dd
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          },
          {},
        );

        // Set the data for the chart (fill in missing dates with 0 customers)
        const customerCounts = weekDates.map((date) => groupByDate[date] || 0);

        // Update chart data
        setChartData({
          series: [
            {
              name: 'Total Customers',
              data: customerCounts as never,
            },
          ],
          categories: weekDates,
        });
      } else if (timePeriod === 'month') {
        // Generate all months of the current year
        const yearMonths = getYearMonths();

        // Group data by month for the current year
        const groupByMonth = filteredData.reduce(
          (acc: Record<string, number>, customer) => {
            const month = new Date(customer.createdAt).getMonth(); // Get the month (0-11)
            const monthName = yearMonths[month]; // Get the month name
            acc[monthName] = (acc[monthName] || 0) + 1;
            return acc;
          },
          {},
        );

        // Set the data for the chart (fill in missing months with 0 customers)
        const customerCounts = yearMonths.map(
          (month) => groupByMonth[month] || 0,
        );

        // Update chart data
        setChartData({
          series: [
            {
              name: 'Total Customers',
              data: customerCounts as never,
            },
          ],
          categories: yearMonths as never,
        });
      } else if (timePeriod === 'year') {
        // Generate the last 7 years + current year
        const years = getPastYears();

        // Group data by year
        const groupByYear = filteredData.reduce(
          (acc: Record<number, number>, customer) => {
            const year = new Date(customer.createdAt).getFullYear(); // Get the year
            acc[year] = (acc[year] || 0) + 1;
            return acc;
          },
          {},
        );

        // Set the data for the chart (fill in missing years with 0 customers)
        const customerCounts = years.map((year) => groupByYear[year] || 0);

        // Update chart data
        setChartData({
          series: [
            {
              name: 'Total Customers',
              data: customerCounts as never,
            },
          ],
          categories: years.map(String) as never,
        });
      }
    }
  }, [data, isSuccess, timePeriod]);

  const handlePeriodChange = (period: 'week' | 'month' | 'year') => {
    setTimePeriod(period);
  };

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false, // This hides the toolbar, including zoom options
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      title: {
        text: 'Joinings',
      },
    },
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading chart data.</div>;
  }

  return (
    <div className="col-span-12 bg-white px-5 pb-5 pt-7.5 shadow-default dark:bg-boxdark">
      <h4 className="mb-4 text-lg font-semibold">Total Joinings</h4>
      <div className="flex gap-3">
        <button
          className={`px-4 py-2 ${timePeriod === 'week' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handlePeriodChange('week')}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 ${timePeriod === 'month' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handlePeriodChange('month')}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 ${timePeriod === 'year' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handlePeriodChange('year')}
        >
          Year
        </button>
      </div>
      <ReactApexChart
        options={options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ChartOne;
