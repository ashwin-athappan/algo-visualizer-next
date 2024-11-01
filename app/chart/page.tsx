"use client";

import React, {useEffect, useRef, useState} from 'react';

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
import {MergeSort} from "@/app/_utils/chart/algorithms/MergeSort";
import {sleep} from "@/app/_utils/sorting/helpers/helpers";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const ALGORITHMS = [BubbleSort, InsertionSort, MergeSort];

const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const generateRandomRGBColor = (): string => {
    const R = generateRandomNumber(0, 255);
    const G = generateRandomNumber(0, 255);
    const B = generateRandomNumber(0, 255);
    return `rgb(${R}, ${G}, ${B})`;
};

const generateRandomArray = (size: number): number[] => {
    const arr = [];
    for (let i = 0; i < size; i ++) {
        arr.push(generateRandomNumber(0, size));
    }
    return arr;
};

const createDataPoints = async (start: number, algorithm: number) => {
    console.log(start);
    const arr = generateRandomArray(start);
    const startTime = new Date().getTime();
    await ALGORITHMS[algorithm](arr);
    const endTime = new Date().getTime();

    return endTime - startTime;
};

const getAlgorithm = (algorithm: number): string => {
    switch (algorithm) {
        case 0:
            return "BubbleSort";
        case 1:
            return "InsertionSort";
        case 2:
            return "MergeSort";
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


export default function Chart() {

    const [runs, setRuns] = React.useState(5);
    const [chartData, setChartData] = React.useState<chartData>({
        labels: [],
        datasets: [],
    });
    const [algorithm, setAlgorithm] = useState<number>(0);
    const [iterations, setIterations] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [isPlotting, setIsPlotting] = useState<boolean>(false);

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Time Taken (ms)",
                },
                display: true,
            },
            x: {
                title: {
                    display: true,
                    text: "Input Size",
                },
                display: true,
            },
        },
    };

    const plot = async () => {
        console.log('Plotting');
        setIsPlotting(true);
        setIterations((prev) => {
            prev[algorithm] ++;
            return prev;
        });
        const generatedLabels: number[] = [];
        const generatedTimes: number[] = [];
        const generatedData: chartDisplayData[] = chartData.datasets;
        let start = 0;
        for (let i = 0; i < runs; i ++) {
            start += 500;
            generatedLabels.push(start);
            const time = await createDataPoints(start, algorithm);
            generatedTimes.push(time);
        }
        generatedData.push({
            axis: 'y',
            label: `${getAlgorithm(algorithm)} - ${iterations[algorithm]}`,
            data: generatedTimes,
            fill: true,
            borderColor: generateRandomRGBColor(),
            tension: 0.1,
        });
        console.log(generatedLabels);
        console.log(generatedData);
        setChartData({
            labels: generatedLabels,
            datasets: generatedData,
        })
        await sleep(1000);
        setIsPlotting(false);
    };

    useEffect(() => {
        console.log(chartData);
        // console.log('Chart Display');
        // const l: number[] = [];
        // const ds: number[][] = [];
        // let generatedData: chartDisplayData[] = [];
        // let start = 50;
        // for (let i = 0; i < 30; i++) {
        //     l.push(start);
        //     start += 500;
        // }
        // console.log(l);
        // let tmpDS = []
        // for (let size of l) {
        //     tmpDS.push(createDataPoints(size, 0));
        // }
        // ds.push(tmpDS);
        // tmpDS = [];
        // for (let size of l) {
        //     tmpDS.push(createDataPoints(size, 1));
        // }
        // ds.push(tmpDS);
        // tmpDS = [];
        // for (let size of l) {
        //     tmpDS.push(createDataPoints(size, 2));
        // }
        // ds.push(tmpDS);
        //
        // console.log(ds);
        // for (let i = 0; i < ds.length; i++) {
        //     generatedData.push({
        //         axis: 'y',
        //         label: `Algorithm - ${i + 1}`,
        //         data: ds[i],
        //         fill: true,
        //         borderColor: generateRandomRGBColor(),
        //         tension: 0.1,
        //     });
        // }
        // console.log(generatedData);
        // setLabel(l);
        // setData(generatedData);
    }, []);

    return (
        <>
            <Navbar setRuns={setRuns} setAlgorithm={setAlgorithm} plot={plot} isPlotting={isPlotting}/>
            <div className="flex justify-center items-center w-full bg-[#131419] mt-10">
                <div className="w-3/4">
                    <Line key={JSON.stringify(chartData)} data={chartData} options={options} className="bg-white w-full"/>
                </div>
            </div>
        </>
    );
}