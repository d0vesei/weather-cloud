import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 


const WeatherChart = ({ weatherData }) => {
    const data = {
        labels: weatherData.map(data => data.terrestrialDate),
        datasets: [
            {
                label: 'Max. temperatura',
                data: weatherData.map(data => data.maxTemp),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Min. temperatura',
                data: weatherData.map(data => data.minTemp),
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, 
    };

    return (
        <div style={{ height: '300px', width: '100%' }}> 
            <Line data={data} options={options} />
        </div>
    );

};

export default WeatherChart;