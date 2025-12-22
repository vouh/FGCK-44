"use client";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function OverviewCharts() {
  // Example data, replace with real data from backend
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Page Views',
        data: [1200, 1900, 3000, 5000, 2300, 3400, 4200, 3900],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderRadius: 8,
      },
      {
        label: 'Users',
        data: [400, 600, 900, 1200, 800, 1100, 1300, 1200],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 8,
      },
    ],
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Site Analytics' },
    },
  };
  const pieData = {
    labels: ['Blog Reads', 'Sermon Views', 'Event Views'],
    datasets: [
      {
        label: 'Engagement',
        data: [120, 45, 30],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(251, 191, 36, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow p-6">
        <Bar data={barData} options={barOptions} height={300} />
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
        <Pie data={pieData} />
      </div>
    </div>
  );
}
