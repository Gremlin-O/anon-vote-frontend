'use client';
import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getSophStats, GetSophStatsResponse } from './getSophStats';
import { label } from 'motion/react-client';
import { fetchPoll } from '@/app/poll/api/fetchPoll';
import { IPoll } from '@/components/Polls/api/models';
import Download from '@/assets/images/download.svg';
import { exportStats } from './exportStats';

Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement);
const options: ChartOptions<'line'> = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
		},
	},
};
const colors = [
	'rgb(42, 173, 231)',
	'rgb(156, 89, 209)',
	'rgb(87, 192, 75)',
	'rgb(231, 76, 60)',
	'rgb(241, 196, 15)',
	'rgb(26, 188, 156)',
	'rgb(155, 89, 182)',
	'rgb(52, 152, 219)',
	'rgb(46, 204, 113)',
	'rgb(230, 126, 34)',
];

const downloadCSV = (pollId: string, daysBefore: number, filename: string = 'statistics.csv'): void => {
	const link = document.createElement('a');
	link.href = `/api/polls/${pollId}/dailyStat/export/csv/`;
	link.setAttribute('download', filename);

	// Добавляем ссылку в DOM и кликаем
	document.body.appendChild(link);
	link.click();

	// Убираем ссылку из DOM и освобождаем URL
	document.body.removeChild(link);
};

const getStatDataForQuestion = (
	stat: GetSophStatsResponse,
	poll: IPoll,
	questionId: string
): ChartData<'line'> => {
	const answers = poll.queries.find((qst) => qst.id === questionId)?.answers;
	if (!answers?.length) throw new Error('stat is wrong');

	return {
		labels: stat?.data.map((item) => item.date),
		datasets: answers.map((answer, ind) => {
			const answersForQuestion = stat?.data.map((statItem) => statItem.answers[questionId][answer]);
			return {
				label: answer,
				data: answersForQuestion,
				borderColor:
					ind < 10
						? colors[ind]
						: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
				tension: 0.1,
			};
		}),
	};
};

const SophisticatedStats = () => {
	const params = useParams<{ pollId: string }>();
	const [stats, setStats] = useState<GetSophStatsResponse>();
	const [poll, setPoll] = useState<IPoll>();
	useEffect(() => {
		getSophStats(params.pollId, 7).then((stat) => {
			setStats(stat);
		});
	}, [setStats, params.pollId]);
	useEffect(() => {
		fetchPoll(params.pollId).then((poll) => {
			setPoll(poll);
		});
	}, [setPoll, params.pollId]);

	const labels = stats?.data.map((item) => item.date);
	return (
		<div className='max-h-[100vh] flex flex-col ml-[150px] pt-[50px] bg-transparent xl:ml-[100px] md:ml-[40px]! md:mr-[10px] md:leading-10'>
			<h1 className='text-primary text-[40px] mb-[20px] font-bold'>Расширенная статистика</h1>
			<div
				className='flex gap-[10px] border-bolder w-fit p-[10px] rounded-[20px] mb-[20px] cursor-pointer hover:scale-[1.02] duration-150 items-center'
				onClick={async () => {
					exportStats(params.pollId, 7).then(() => {
						downloadCSV(params.pollId, 7);
					});
				}}
			>
				<h2 className='text-primary font-bold text-[28px] md:text-[20px]'>Скачать статистику</h2>
				<img src={Download.src} alt='' className='w-[40px]' />
			</div>
			<div className='space-y-[20px]'>
				{poll?.queries.map((qst) => {
					console.log(getStatDataForQuestion(stats!, poll, qst.id));
					return (
						<div
							key={qst.id}
							className='border-bolder rounded-[20px] p-[20px] w-[60%] bg-amber-50 xl:w-[100%] bg-secondary'
						>
							<h2 className='text-primary mb-[10px] text-[24px] md:text-[16px]'>{qst.text}</h2>
							{stats && <Line data={getStatDataForQuestion(stats, poll, qst.id)} options={options} />}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SophisticatedStats;
