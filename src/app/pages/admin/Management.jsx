import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ManagementPage() {
  const [playgroundStats, setPlaygroundStats] = useState({
    totalPeople: 0,
    under18: 0,
    daily: 0,
    weekly: 0,
    monthly: 0,
    categories: {
      Adults: 0,
      Teens: 0,
      Children: 0,
    },
  });

  // Mock data for demonstration purposes
  useEffect(() => {
    const fetchStats = () => {
      // Simulate an API call
      // Replace this with call to dynamoDB
      const data = {
        totalPeople: 45,
        under18: 30,
        daily: 60,
        weekly: 300,
        monthly: 1200,
        categories: {
          Adults: 15,
          "Young Person": 20,
          Children: 10,
        },
      };
      setPlaygroundStats(data);
    };

    fetchStats();
  }, []);

  const categoryChartData = {
    labels: Object.keys(playgroundStats.categories),
    datasets: [
      {
        label: "Visitor Categories",
        data: Object.values(playgroundStats.categories),
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"],
        borderColor: ["#4CAF50", "#2196F3", "#FF9800"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className="min-h-[60vh] bg-gray-50 flex items-center justify-center py-8"
      style={{
        backgroundImage: "url(/management-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl">
        <h2 className="text-3xl font-semibold  text-gray-800 mb-6 text-center">
          Playground Management Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Statistics */}
          <div className="bg-sladeGreen text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">
              Total People in Playground
            </h3>
            <p className="text-3xl font-bold mt-2">
              {playgroundStats.totalPeople}
            </p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Visitors Under 18</h3>
            <p className="text-3xl font-bold mt-2">{playgroundStats.under18}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Visitors Today</h3>
            <p className="text-3xl font-bold mt-2">{playgroundStats.daily}</p>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Visitors This Month</h3>
            <p className="text-3xl font-bold mt-2">{playgroundStats.monthly}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Visitor Breakdown by Category
          </h3>
          <Bar
            data={categoryChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false, // Hide the legend
                },
                title: {
                  display: true,
                  text: "Visitor Categories",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                  color: "#333",
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false, // Hide x-axis grid lines for a cleaner look
                  },
                },
                y: {
                  grid: {
                    color: "#e5e7eb", // Light gray grid lines
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ManagementPage;
