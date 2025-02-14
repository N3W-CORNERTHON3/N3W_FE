import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Chart.js 설정
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ProgressChart = ({ checkedStates }) => {

    // 하루당 33.3333%로 계산 (목데이터터)
    const filledPercentage = checkedStates.filter(state => state).length * 33.3333; 
    
    // 목표 달성 여부 판단
    const isGoalAchieved = filledPercentage >= 99;
    
    // 차트 데이터 설정
    const data = {
        labels: ['1일 차', '2일 차', '3일차'],
        datasets: [
        {
            data: [filledPercentage, 100 - filledPercentage, 100 - filledPercentage], 
            backgroundColor: ['#5AB2FF', '#CAF4FF', '#CAF4FF'], 
            borderWidth: 0,
        },
        ],
    };

   // 차트 옵션 설정
    const options = {
        responsive: true,
        plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
        title: {
            display: isGoalAchieved, 
            text: '⭐목표 달성⭐',
            font: {
                size: 23,
                weight: 'bold',
            },
            color: 'black', 
        },
    },
    };

    return (
        <div style={{ width: '180px', height: '180px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default ProgressChart;
