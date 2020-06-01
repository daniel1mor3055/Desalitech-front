import React, {Component} from 'react';
import Chart from "react-apexcharts";
import PropTypes from "prop-types";


class MultiYChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    stacked: false,
                    toolbar: {
                        show: true,
                        offsetX: -30,
                        offsetY: 0,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        },
                        autoSelected: 'zoom'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [4, 4, 4]
                },
                xaxis: {
                    categories: [],
                },
                yaxis: [],
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: 'bottomLeft', // topRight, topLeft, bottomRight, bottomLeft
                        offsetY: -90,
                        offsetX: 0,
                    },
                },
                legend: {
                    horizontalAlign: 'center',
                    offsetX: 0,
                    onItemClick: {
                        toggleDataSeries: true
                    },
                }
            },
            series: []
        };
    }


    static getDerivedStateFromProps = (props, state) => {
        const {xData, data, yLabels, showYLabels, colors} = props;
        return {
            ...state,
            series: yLabels.map((yLabel, index) => (
                {
                    name: yLabel,
                    type: 'line',
                    data: data[index],
                }
            )),
            options: {
                ...state.options,
                colors: colors,
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
                            },
                            formatter: function (val, index) {
                                return val.toFixed(2);
                            },
                        },
                        tooltip: {
                            enabled: true
                        }
                    };
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
    xData: PropTypes.array.isRequired,
    data: PropTypes.arrayOf(PropTypes.array).isRequired, // [[data_of_y1],[data_of_y2],...]
    yLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.any).isRequired,
    showYLabels: PropTypes.bool,
};

export default MultiYChart;
