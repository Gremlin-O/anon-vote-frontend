import React, { FC, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useMobile } from "@/shared/utils/useMobile";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels,
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
  const values = labels.map((label) => data[label]);
  const isMobile = useMobile();
  const rowHeight = 50;
  const rowGap = 20;

  return isMobile ? (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#7b1258",
          marginBottom: 12,
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        {questionText}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: rowGap }}>
        {labels.map((label, idx) => {
          const dataset: ChartData<"bar", number[], string> = {
            labels: [""],
            datasets: [
              {
                label: "",
                data: [values[idx]],
                borderColor: "#7b1258",
                backgroundColor: "#bf6ca0",
                borderRadius: 4,
                barPercentage: 1,
                categoryPercentage: 1,
              },
            ],
          };

          const options: ChartOptions<"bar"> = {
            indexAxis: "x",
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
              datalabels: {
                anchor: "end",
                align: "end",
                formatter: (value: number) => value,
                color: "#7b1258",
                font: { weight: "bold" },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: { display: false },
                grid: { display: false },
              },
              y: { ticks: { display: false }, grid: { display: false } },
            },
          };

          return (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(160px, 280px) 1fr",
                gap: 12,
                alignItems: "center",
                height: rowHeight,
                minWidth: 400,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.3,
                  color: "#333",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {label}
              </div>

              <div style={{ height: rowHeight }}>
                <Bar data={dataset} options={options} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div style={{ height: chartHeight }}>
      <Bar options={options} data={dataset} />
    </div>
  );
};
