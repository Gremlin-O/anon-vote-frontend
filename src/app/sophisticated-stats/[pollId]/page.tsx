"use client";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { getSophStats, GetSophStatsResponse } from "./getSophStats";
import { fetchPoll } from "@/app/poll/api/fetchPoll";
import { IPoll } from "@/components/Polls/api/models";
import Download from "@/assets/images/download.svg";
import { exportStats } from "./exportStats";

Chart.register(
  LinearScale,
  CategoryScale,
  LineController,
  LineElement,
  PointElement
);

const colors = [
  "rgb(42, 173, 231)",
  "rgb(156, 89, 209)",
  "rgb(87, 192, 75)",
  "rgb(231, 76, 60)",
  "rgb(241, 196, 15)",
  "rgb(26, 188, 156)",
  "rgb(155, 89, 182)",
  "rgb(52, 152, 219)",
  "rgb(46, 204, 113)",
  "rgb(230, 126, 34)",
];

const downloadCSV = (
  pollId: string,
  daysBefore: number,
  filename: string = "statistics.csv"
): void => {
  const link = document.createElement("a");
  link.href = `/api/polls/${pollId}/dailyStat/export/csv/`;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getStatDataForQuestion = (
  stat: GetSophStatsResponse,
  poll: IPoll,
  questionId: string
): ChartData<"line"> => {
  const answers = poll.queries.find((qst) => qst.id === questionId)?.answers;
  if (!answers?.length) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const labels = stat?.data?.map((item) => item.date) || [];

  const datasets = answers.map((answer, ind) => {
    const answersForQuestion =
      stat?.data?.map((statItem) => {
        const questionData = statItem.answers?.[questionId];
        return questionData?.[answer] || 0;
      }) || [];

    return {
      label: answer,
      data: answersForQuestion,
      borderColor:
        ind < 10
          ? colors[ind]
          : `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
    };
  });

  return {
    labels,
    datasets,
  };
};

const SophisticatedStats = () => {
  const params = useParams<{ pollId: string }>();
  const [stats, setStats] = useState<GetSophStatsResponse | null>(null);
  const [poll, setPoll] = useState<IPoll | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const [statData, pollData] = await Promise.all([
          getSophStats(params.pollId, 7),
          fetchPoll(params.pollId),
        ]);

        if (isMounted) {
          setStats(statData);
          setPoll(pollData);
          setIsReady(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [params.pollId]);

  // Создаем опции графика с увеличенным расстоянием между значениями Y
  const getChartOptions = useMemo(() => {
    return (data: ChartData<"line"> | null): ChartOptions<"line"> => {
      // Вычисляем максимальное значение для шкалы Y
      let maxValue = 0;
      if (data?.datasets?.length) {
        data.datasets.forEach((dataset) => {
          if (dataset.data && Array.isArray(dataset.data)) {
            const datasetMax = Math.max(...(dataset.data as number[]));
            if (datasetMax > maxValue) maxValue = datasetMax;
          }
        });
      }

      // Увеличиваем расстояние между значениями Y
      const stepSize = maxValue > 0 ? Math.ceil(maxValue / 5) : 1;

      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            // Увеличиваем расстояние между тиками
            ticks: {
              stepSize: stepSize, // Динамический шаг
              font: {
                size: 12,
              },
              padding: 10, // Добавляем отступ внутри тиков
              callback: function (value) {
                if (typeof value === "number") {
                  return value;
                }
                return "";
              },
            },
            // Увеличиваем отступы сверху и снизу
            grace: "15%", // Увеличено с 5% до 15%
            // Явно задаем границы для увеличения расстояния
            min: 0,
            suggestedMax: maxValue > 0 ? Math.ceil(maxValue * 1.2) : 10,
            // Увеличиваем расстояние от графика до оси
            offset: true,
            // Увеличиваем внутренние отступы
            afterFit: function (scale) {
              scale.width += 20; // Увеличиваем ширину оси
            },
          },
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              font: {
                size: 11,
              },
              padding: 5,
            },
            grid: {
              offset: true,
            },
          },
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
          point: {
            radius: 4,
            hoverRadius: 6,
          },
        },
        animation: {
          duration: 0,
        },
      };
    };
  }, []);

  if (!isReady || !stats || !poll) {
    return (
      <div className="max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px] md:ml-[40px]! md:mr-[10px] md:leading-10">
        <h1 className="text-primary text-[40px] mb-[20px] font-bold">
          Расширенная статистика
        </h1>
        <div className="text-primary">Загрузка данных...</div>
      </div>
    );
  }

  return (
    <div className="max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px] md:ml-[40px]! md:mr-[10px] md:leading-10">
      <h1 className="text-primary text-[40px] mb-[20px] font-bold">
        Расширенная статистика
      </h1>
      <div
        className="flex gap-[10px] border-bolder w-fit p-[10px] rounded-[20px] mb-[20px] cursor-pointer hover:scale-[1.02] duration-150 items-center"
        onClick={async () => {
          exportStats(params.pollId, 7).then(() => {
            downloadCSV(params.pollId, 7);
          });
        }}
      >
        <h2 className="text-primary font-bold text-[28px] md:text-[20px]">
          Скачать статистику
        </h2>
        <img src={Download.src} alt="" className="w-[40px]" />
      </div>
      <div className="space-y-[20px]">
        {poll.queries.map((qst) => {
          const chartData = getStatDataForQuestion(stats, poll, qst.id);

          const hasData = chartData.datasets?.some(
            (dataset) =>
              dataset.data &&
              dataset.data.length > 0 &&
              dataset.data.some((val: any) => val !== 0)
          );

          return (
            <div
              key={qst.id}
              className="border-bolder rounded-[20px] p-[20px] w-[60%] bg-amber-50 xl:w-[100%] bg-secondary"
            >
              <h2 className="text-primary mb-[10px] text-[24px] md:text-[16px]">
                {qst.text}
              </h2>
              <div className="min-h-[140px] h-[300px] relative">
                {" "}
                {/* Увеличиваем высоту контейнера */}
                {hasData ? (
                  <Line
                    data={chartData}
                    options={getChartOptions(chartData)}
                    key={`${qst.id}-${chartData.labels?.length || 0}`}
                    redraw={true}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-primary">
                    Нет данных для отображения
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SophisticatedStats;
