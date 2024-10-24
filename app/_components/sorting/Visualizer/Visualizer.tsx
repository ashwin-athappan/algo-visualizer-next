"use client";

import React, {Component} from 'react';

// Algorithms
import BubbleSort from "@/app/_utils/sorting/algorithms/BubbleSort";
import SelectionSort from "@/app/_utils/sorting/algorithms/SelectionSort";
import InsertionSort from "@/app/_utils/sorting/algorithms/InsertionSort";
import MergeSort from "@/app/_utils/sorting/algorithms/MergeSort";
import QuickSort from "@/app/_utils/sorting/algorithms/QuickSort";
import {sleep} from "@/app/_utils/sorting/helpers/helpers";

import Bar from "@/app/_components/sorting/Bar/Bar";

// Icons
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import QuickSortThreeWay from "@/app/_utils/sorting/algorithms/QuickSortThreeWay";

// Elements
import Selector from "@/app/_components/sorting/Select/Selector";
import {InfoTooltips} from "@/app/_components/sorting/Tooltip/Tooltip";
import {Tooltip} from "@mui/material";

interface visualizerState {
    array: number[];
    sortSteps: number[][];
    colorKey: number[];
    colorSteps: number[][];
    currentStep: number;
    algorithm: number;
    isVisualizing: boolean;
    delay: number;
}

interface visualizerProps {
    delay: number;
    initialArray: number[];
    comparisons: number;
    barCount: number;
    handleChangeVisualizingState: (isVisualizing: string) => void;
}

export default class Visualizer extends Component<visualizerProps> {


    constructor(props: visualizerProps) {
        super(props);
    }

    state: visualizerState = {
        array: [],
        sortSteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        algorithm: 0,
        isVisualizing: false,
        delay: this.props.delay,
    };

    ALGORITHMS = [BubbleSort, InsertionSort, SelectionSort, MergeSort, QuickSort, QuickSortThreeWay];

    clearColorKey = () => {
        let blankKey = new Array(this.props.barCount).fill(0);
        this.setState({colorKey: blankKey, colorSteps: [blankKey]});
    };

    previousStep = () => {
        let currentStep = this.state.currentStep - 1;
        if (currentStep > 0) {
            this.setState({
                currentStep: currentStep,
                array: this.state.sortSteps[currentStep],
                colorKey: this.state.colorSteps[currentStep],
            });
        }
    };

    nextStep = () => {
        let currentStep = this.state.currentStep + 1;
        if (currentStep < this.state.sortSteps.length) {
            this.setState({
                currentStep: currentStep,
                array: this.state.sortSteps[currentStep],
                colorKey: this.state.colorSteps[currentStep],
            });
        }
    };

    reset = () => {
        this.clearColorKey();

        this.setState({
            array: this.state.array,
            sortSteps: [this.state.array],
            currentStep: 0,
        });

        this.generateBars();
    };

    randomize = (arr: number[]) => {
        this.clearColorKey();

        this.setState({
            array: arr,
            sortSteps: [arr],
            currentStep: 0,
        }, () => {
            this.generateBars();
            this.state.sortSteps;
        });
    }

    generateSteps = () => {
        let array = this.state.array.slice();
        let steps = this.state.sortSteps.slice();
        let colorSteps = this.state.colorSteps.slice();

        this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

        this.setState({
            sortSteps: steps,
            colorSteps: colorSteps,
        });
    };

    generateBars = (newArr: number[] = []) => {
        this.clearColorKey();

        let barCount = this.props.barCount;
        let arr = this.props.initialArray;

        if (newArr.length > 0) {
            arr = newArr;
        }

        this.setState(
            {
                array: arr,
                sortSteps: [arr],
                barCount: barCount,
                currentStep: 0,
            },
            () => {
                this.generateSteps();
            }
        );
    };

    displaySteps = async (steps: number[][], colorSteps: number[][]) => {
        for (let i = this.state.currentStep; i < steps.length; i++) {
            if (this.state.isVisualizing) {
                let currentStep = this.state.currentStep;
                this.setState({
                    array: steps[currentStep],
                    colorKey: colorSteps[currentStep],
                    currentStep: currentStep + 1,
                });
                await sleep(this.state.delay);
            }
        }
        this.setState({isVisualizing: false}, () => {
            this.props.handleChangeVisualizingState("NO");
        });

    }

    start = async () => {
        let steps = this.state.sortSteps.slice();
        let colorSteps = this.state.colorSteps.slice();
        this.setState({isVisualizing: true}, () => {
            this.props.handleChangeVisualizingState("YES");
            this.displaySteps(steps, colorSteps);
        });
    };

    pause = () => {
        console.log('pause');
        let isVisualizing = this.state.isVisualizing;
        this.setState({isVisualizing: !isVisualizing}, () => {
            this.props.handleChangeVisualizingState(!this.state.isVisualizing ? "NO" : "YES");
        });
    };

    changeArray = (index: number, value: number) => {
        let arr = this.state.array;
        arr[index] = value;
        this.setState(
            {
                array: arr,
                sortSteps: [arr],
                currentStep: 0,
            },
            () => {
                this.generateSteps();
            }
        );
    };

    changeAlgorithm = (algorithm: number) => {
        this.clearColorKey();
        this.setState({
            algorithm: algorithm,
            currentStep: 0,
            sortSteps: [this.state.sortSteps[0]],
        }, () => {
            this.generateBars();
        });
    }

    componentDidMount() {
        this.generateBars();
    };

    render() {
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center mt-5">
                    <Selector handleAlgorithmChange={this.changeAlgorithm}/>
                    <div className="flex justify-center items-center my-2">
                        <Tooltip title={InfoTooltips(this.state.algorithm)}>
                            <button className="bg-gray-600 px-5 py-3 rounded-md">INFO</button>
                        </Tooltip>
                    </div>
                </div>
                <div className='m-0 px-5 flex flex-col justify-center items-center bg-[#121419]'>
                    <div
                        className='barsDiv mt-15 flex justify-center items-center h-[200px] p-0 bg-[#818181] rounded-xl'>
                        {this.state.array.map((value: number, index: number) => (
                            <Bar
                                key={index}
                                index={index}
                                length={value}
                                color={this.state.colorKey[index]}
                                changeArray={this.changeArray}
                            />
                        ))}
                    </div>

                    <div id="control-panel" className="mt-20">
                        <SkipPreviousIcon
                            className="cursor-pointer"
                            onClick={this.previousStep}
                        />
                        {this.state.isVisualizing ? (
                            <PauseIcon
                                className="cursor-pointer"
                                onClick={this.pause}
                            />
                        ) : (
                            <PlayArrowIcon
                                className="cursor-pointer"
                                onClick={this.start}
                            />
                        )}
                        <SkipNextIcon
                            className="cursor-pointer"
                            onClick={this.nextStep}
                        />
                    </div>

                    <div className='line-break'/>
                </div>
            </div>
        );
    }
}