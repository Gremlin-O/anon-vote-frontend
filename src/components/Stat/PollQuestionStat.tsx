import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IQuery } from "../Polls/api/models";
import { Bar } from "react-chartjs-2";
import { color } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IPollQuestionStat {
  questionText: string;
  data: Record<string, number>;
}

export const PollQuestionStat: FC<IPollQuestionStat> = ({
  data,
  questionText,
}) => {
  const labels = Object.keys(data);
  const chartHeight = Math.max(200, labels.length * 30); // 48px на строку (подбери под себя)

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false, // важно — чтобы высота контейнера применялась
    elements: {
      bar: { borderWidth: 2, borderRadius: 2, borderSkipped: false },
    },
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: questionText,
        color: "#7b1258",
        font: {
          size: 24,
          color: "rgba(123, 18, 88, 1)",
        },
      },
    },
    scales: { x: { beginAtZero: true }, y: { ticks: { font: { size: 14 } } } },
  };

  const dataset = {
    labels,
    datasets: [
      {
        label: "Statistics",
        data: labels.map((label) => data[label]),
        borderColor: "#7b1258",
        backgroundColor: "#bf6ca0",
        categoryPercentage: 0.6,
        barPercentage: 0.8,
      },
    ],
  };

  return (
    <div style={{ height: chartHeight }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};
