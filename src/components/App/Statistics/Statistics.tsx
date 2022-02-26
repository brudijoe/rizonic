import { useState } from "react";
// Redux
import { useAppSelector } from "../../../redux/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  // !! Dataset for Customers should be Customers Count + Month
  const customersRedux = useAppSelector((state) => state.data.customers);
  const customerNumbers = customersRedux.length;
  const customerStatistics = [customerNumbers];
  customerStatistics.push(customerNumbers);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const [showStatistics, setshowStatistics] = useState(false);

  const [data, setData] = useState({
    labels,
    datasets: [],
  });

  const handleClickCustomers = () => {
    setshowStatistics(!showStatistics);
    setData({
      labels,
      datasets: [
        {
          label: "Customers",
          data: customerStatistics.map((customerEntry) => customerEntry),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Customer Statistics",
      },
    },
  };

  return (
    <div className="w-10/12 h-full min-h-screen bg-gray-600 p-3">
      <div className="flex flex-row justify-between p-3 mb-3 bg-gray-100 rounded border border-black">
        <h1 className="text-2xl font-bold">Statistics</h1>
      </div>

      <div className="flex flex-row justify-between p-3 mb-3 bg-gray-100 rounded border border-black">
        <button
          type="button"
          className="p-2 rounded bg-gray-200 border-black border hover:bg-gray-400"
          data-cy="statistics-customer-button"
          onClick={handleClickCustomers}
        >
          Customers
        </button>
        <button
          type="button"
          className="p-2 rounded bg-gray-200 border-black border hover:bg-gray-400"
          data-cy="statistics-project-button"
        >
          Projects
        </button>
        <button
          type="button"
          className="p-2 rounded bg-gray-200 border-black border hover:bg-gray-400"
          data-cy="statistics-deparment-button"
        >
          Departments
        </button>
        <button
          type="button"
          className="p-2 rounded bg-gray-200 border-black border hover:bg-gray-400"
          data-cy="statistics-employee-button"
        >
          Employees
        </button>
      </div>

      {showStatistics && (
        <div className="flex flex-row justify-between p-3 mb-3 bg-gray-100 rounded border border-black">
          <Line options={options} data={data} data-cy="line-statistic" />
        </div>
      )}
    </div>
  );
};

export default Statistics;
