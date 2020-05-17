import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class MainChart extends Component {
    render() {
        const {height}= this.props

        const data = (canvas) => {
            const ctx = canvas.getContext("2d");
            const _stroke = ctx.stroke;

            ctx.stroke = function () {
                ctx.save();
                ctx.shadowColor = "#4C4C4C";
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                _stroke.apply(this, arguments);
                ctx.restore();
            };

            return {
                labels: ["Time 1", "Time 2", "Time 3", "Time 4", "Time 5", "Time 6", "Time 7"],
                datasets: [
                    {
                        label: "Tag 1",
                        data: [5000, 6000, 3500, 4900, 3000, 5000, 2500],
                        borderColor: '#00BCD4',
                        borderWidth: 1,
                        pointBackgroundColor: "#00BCD4",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#00BCD4",
                        pointHoverBorderColor: "#fff",
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        fill: false
                    },
                    {
                        label: "Tag 2",
                        data: [2500, 3000, 5500, 3200, 5300, 4000, 3500],
                        borderColor: '#A3A0FB',
                        borderWidth: 1,
                        pointBackgroundColor: "#A3A0FB",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#A3A0FB",
                        pointHoverBorderColor: "#fff",
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        fill: false
                    }, {
                        label: "Tag 3",
                        data: [1500, 2000, 1200, 2400, 1600, 2200, 1800],
                        borderColor: '#00008f',
                        borderWidth: 1,
                        pointBackgroundColor: "#00008f",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#00008f",
                        pointHoverBorderColor: "#fff",
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        fill: false
                    }, {
                        label: "Tag 4",
                        data: [1000, 1500, 700, 3800, 1200, 1400, 1100],
                        borderColor: '#c200c2',
                        borderWidth: 1,
                        pointBackgroundColor: "#c200c2",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#c200c2",
                        pointHoverBorderColor: "#fff",
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        fill: false
                    }
                ]
            };
        };


        const options = {

            legend: {
                display: true
            },
            scales: {

                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMax: 8000,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    display: true,
                }]

            },
        };

        return (
            <Line data={data} height={height} options={options}/>
        );
    }
}

export default MainChart;
