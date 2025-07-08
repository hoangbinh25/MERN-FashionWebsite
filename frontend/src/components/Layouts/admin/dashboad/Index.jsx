import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Index() {
  const barRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Destroy previous chart if exists
    let barChart, lineChart;
    if (barRef.current) {
      barChart = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Orders",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: "#6366f1",
            },
            {
              label: "Users",
              data: [8, 15, 6, 9, 4, 7],
              backgroundColor: "#f59e42",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: "top" } },
        },
      });
    }
    if (lineRef.current) {
      lineChart = new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue ($)",
              data: [1200, 1900, 3000, 500, 2000, 3000],
              borderColor: "#10b981",
              backgroundColor: "rgba(16,185,129,0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: "top" } },
        },
      });
    }
    return () => {
      barChart && barChart.destroy();
      lineChart && lineChart.destroy();
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Orders & Users (Bar Chart)</h2>
          <canvas ref={barRef} height={250}></canvas>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Revenue (Line Chart)</h2>
          <canvas ref={lineRef} height={250}></canvas>
        </div>
      </div>
    </>
  );
}