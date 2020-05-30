import React, {Component} from 'react';
import Chart from "react-apexcharts";
import PropTypes from "prop-types";


class MultiYChart extends Component {
    state = {
        options: {
            chart: {
                stacked: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [4, 4, 4]
            },
            title: {
                text: '',
                align: 'center',
                offsetX: 0
            },
            xaxis: {
                categories: [],
            },
            yaxis: [],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                },
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            }
        },
        series: []
    };

    static getDerivedStateFromProps = (props, state) => {
        const {title, xData, data, yLabels, showYLabels, colors} = props;
        return {
            series: yLabels.map((yLabel, index) => (
                {
                    name: yLabel,
                    type: 'line',
                    data: data[index],
                }
            )),
            options: {
                ...state.options,
                title: {
                    ...state.options.title,
                    text: title
                },
                xaxis: {
                    ...state.options.xaxis,
                    categories: xData
                },
                yaxis: yLabels.map((yLabel, index) => {
                    return {
                        seriesName: yLabel,
                        opposite: true,
                        axisTicks: {
                            show: showYLabels
                        },
                        axisBorders: {
                            show: true,
                            color: colors[index]
                        },
                        labels: {
                            style: {
                                colors: colors[index]
                            }
                        },
                        title: {
                            text: yLabel,
                            style: {
                                color: colors[index]
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    }
                }),
            }
        };
    };

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                height={'450'}
                width={'100%'}/>
        );
    }
}

MultiYChart.propTypes = {
    title: PropTypes.string.isRequired,
    xData: PropTypes.array.isRequired,
    data: PropTypes.arrayOf(PropTypes.array).isRequired, // [[data_of_y1],[data_of_y2],...]
    yLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.any).isRequired,
    showYLabels: PropTypes.bool,

};

export default MultiYChart;
