'use client';
import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getSophStats, getSophStatsResponse } from './getSophStats';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data: ChartData<'line'> = {
	labels,
	datasets: [
		{
			label: 'My First Dataset',
			data: [65, 59, 80, 81, 56, 55, 40], // Example data
			borderColor: 'rgb(75, 192, 192)',
			backgroundColor: 'rgba(75, 192, 192, 0.5)',
			tension: 0.1, // Smooth the line
		},
		{
			label: 'My Second Dataset',
			data: [20, 40, 45, 60, 80, 70, 90],
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
			tension: 0.1,
		},
	],
};
Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement);
export const options: ChartOptions<'line'> = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Line Chart Example',
		},
	},
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};
const SophisticatedStats = () => {
	const params = useParams<{ pollId: string }>();
	const [stats, setStats] = useState<getSophStatsResponse>();
	useEffect(() => {
		getSophStats(params.pollId).then((stat) => {
			setStats(stat);
		});
	}, [setStats, params.pollId]);
	console.log(stats);
	return (
		<div className='max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px] md:ml-[40px]! md:mr-[10px]'>
			<h1 className='text-primary text-[40px] mb-[20px] font-bold'>Расширенная статистика</h1>
			<div className='border-bolder rounded-[20px] p-[20px] w-[60%] bg-amber-50 xl:w-[100%] bg-secondary'>
				<Line data={data} options={options} />
			</div>
		</div>
	);
};

export default SophisticatedStats;
