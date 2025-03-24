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
import { headcount, rollCall } from "../../../apis/playground";
import { getToday } from "../../../apis/statistics";
import { Link } from "react-router-dom";

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
    childrenToday: 0,
    visitorsToday: 0,
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
    const fetchStats = async () => {
      const inPlayground = await headcount();
      const todaysStats = await getToday();

      // Simulate an API call
      // Replace this with call to dynamoDB
      const data = {
        totalPeople: inPlayground,
        childrenToday: todaysStats.totalChildren,
        visitorsToday: todaysStats.totalVisitors,
        weekly: 0,
        monthly: 0,
        categories: {
          Adults: todaysStats.totalVisitors,
          "Young Person": 0,
          Children: todaysStats.totalChildren,
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
          <Link to="/admin/roll-call">
            <div className="bg-sladeGreen text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">
                Total People in Playground
              </h3>
              <p className="text-3xl font-bold mt-2">
                {playgroundStats.totalPeople}
              </p>
            </div>
          </Link>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Children Today</h3>
            <p className="text-3xl font-bold mt-2">
              {playgroundStats.childrenToday}
            </p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Visitors/Volunteers Today</h3>
            <p className="text-3xl font-bold mt-2">
              {playgroundStats.visitorsToday}
            </p>
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
