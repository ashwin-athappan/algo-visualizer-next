"use client";

import React, {Component} from 'react';

import Navbar from "@/app/_components/chart/Navbar/Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import {Line} from "react-chartjs-2";

// Algorithms
import {BubbleSort} from "@/app/_utils/chart/algorithms/BubbleSort";
import {InsertionSort} from "@/app/_utils/chart/algorithms/InsertionSort";
import {SelectionSort} from "@/app/_utils/chart/algorithms/SelectionSort";
import {MergeSort} from "@/app/_utils/chart/algorithms/MergeSort";
import {QuickSort} from "@/app/_utils/chart/algorithms/QuickSort";
import {QuickSortThreeWay} from "@/app/_utils/chart/algorithms/QuickSortThreeWay";
import {HeapSort} from "@/app/_utils/chart/algorithms/HeapSort";
import {sleep} from "@/app/_utils/sorting/helpers/helpers";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const ALGORITHMS = [BubbleSort, InsertionSort, SelectionSort, MergeSort, QuickSort, QuickSortThreeWay, HeapSort];

const ALGORITHM_RUN_DATA = [
    {
        algorithm: "BubbleSort",
        iteration: 0,
    },
    {
        algorithm: "InsertionSort",
        iteration: 0,
    },
    {
        algorithm: "SelectionSort",
        iteration: 0,
    },
    {
        algorithm: "MergeSort",
        iteration: 0,
    },
    {
        algorithm: "QuickSort",
        iteration: 0,
    },
    {
        algorithm: "QuickSortThreeMedian",
        iteration: 0,
    },
    {
        algorithm: "HeapSort",
        iteration: 0,
    }
];

const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const generateRandomRGBColor = (): string => {
    const R = generateRandomNumber(0, 255);
    const G = generateRandomNumber(0, 255);
    const B = generateRandomNumber(0, 255);
    return `rgb(${R}, ${G}, ${B})`;
};

const generateRandomArray = (size: number, algorithm: number, bestCaseFlag: boolean, worstCaseFlag: boolean): number[] => {
    const arr = [];

    switch (algorithm) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 5:
            if (bestCaseFlag) {
                for (let i = 0; i < size; i++) {
                    arr.push(i);
                }
                return arr;
            } else if (worstCaseFlag) {
                for (let i = size; i > 0; i--) {
                    arr.push(i);
                }
                return arr;
            } else {
                for (let i = 0; i < size; i++) {
                    arr.push(generateRandomNumber(0, size));
                }
            }
            break;
        default:
            for (let i = 0; i < size; i++) {
                arr.push(generateRandomNumber(0, size));
            }
            break;
    }
    return arr;
};

const getAlgorithm = (algorithm: number): string => {
    switch (algorithm) {
        case 0:
            return "BubbleSort";
        case 1:
            return "InsertionSort";
        case 2:
            return "SelectionSort";
        case 3:
            return "MergeSort";
        case 4:
            return "QuickSort";
        case 5:
            return "QuickSortThreeMedian";
        case 6:
            return "HeapSort";
        default:
            return "None";
    }
}

interface chartDisplayData {
    axis: string;
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
}

interface chartData {
    labels: number[];
    datasets: chartDisplayData[];
}

interface chartState {
    chartData: chartData;
    runs: number;
    algorithm: number;
    bestCaseFlag: boolean;
    worstCaseFlag: boolean;
    isPlotting: boolean;
}

export default class Chart extends Component {

    state: chartState = {
        chartData: {
            labels: [],
            datasets: []
        },
        runs: 5,
        algorithm: 0,
        bestCaseFlag: false,
        worstCaseFlag: false,
        isPlotting: false,
    };

    options = {
        animation: {
            duration: 0
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Array Size'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Time (ms)'
                }
            }
        }
    }

    setRuns = (runs: number) => {
        this.setState({...this.state, runs: runs});
    };

    setAlgorithm = (algorithm: number) => {
        this.setState({...this.state, algorithm: algorithm});
    };

    createDataPoints = async (start: number, algorithm: number, data: chartData, index: number) => {
        console.log(start);
        const arr = generateRandomArray(start, this.state.algorithm, this.state.bestCaseFlag, this.state.worstCaseFlag);
        console.log(arr);
        const startTime = performance.now();
        ALGORITHMS[algorithm](arr);
        const endTime = performance.now();
        data.datasets[index - 1].data.push(Math.round((endTime - startTime) * 100) / 100);

        console.log(data.datasets);

        this.setState({...this.state, chartData: data});

        await sleep(10);
    };

    plotBestCase = async () => {
        this.setState({
            ...this.state,
            bestCaseFlag: true,
            worstCaseFlag: false
        }, () => {
            this.plot();
        });
    };

    plotWorstCase = async () => {
        this.setState({
            ...this.state,
            bestCaseFlag: false,
            worstCaseFlag: true
        }, () => {
            this.plot();
        });
    };

    // when plotting I want the algorithm to be called for the number of runs
    // and the time taken for each run to be stored in the chartData state and displayed immediately
    plot = async () => {
        this.setState({...this.state, isPlotting: true});
        let start = 500;
        const data = this.state.chartData;
        data.labels = [];

        ALGORITHM_RUN_DATA[this.state.algorithm].iteration += 1;

        data.datasets.push({
            axis: 'x',
            label: `${getAlgorithm(this.state.algorithm)} ${ALGORITHM_RUN_DATA[this.state.algorithm].iteration}`,
            data: [],
            fill: false,
            borderColor: generateRandomRGBColor(),
            tension: 0.1
        });

        for (let i = 0; i < this.state.runs; i++) {
            data.labels.push(start);
            start += 500;
        }

        this.setState({...this.state, chartData: data});

        start = 500;

        for (let i = 0; i < this.state.runs; i++) {
            await this.createDataPoints(start, this.state.algorithm, data, data.datasets.length);
            start += 500;
        }

        this.setState({...this.state,
            bestCaseFlag: false,
            worstCaseFlag: false,
            isPlotting: false
        });
    }

    render() {
        return (
            <>
                <Navbar setRuns={this.setRuns} setAlgorithm={this.setAlgorithm} plot={this.plot}
                        plotBestCase={this.plotBestCase} plotWorstCase={this.plotWorstCase}
                        isPlotting={this.state.isPlotting}/>
                <div className="flex justify-center items-center w-full bg-[#131419] mt-10">
                    <div className="w-3/4">
                        <Line key={JSON.stringify(this.state.chartData)} data={this.state.chartData}
                              options={this.options}
                              className="bg-white w-full"/>
                    </div>
                </div>
            </>
        );
    }
}