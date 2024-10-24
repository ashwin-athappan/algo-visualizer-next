"use client";

import React, {Component} from 'react';

import Visualizer from "@/app/_components/sorting/Visualizer/Visualizer";
import Navbar from "@/app/_components/sorting/Navbar/Navbar";
import ControlPanel from "@/app/_components/sorting/ControlPannel/ControlPanel";

interface sortingState {
    delay: number;
    comparison: number;
    initialArray: number[];
    barCount: number;
    minCount: number;
    maxCount: number;
    isVisualizing: number;
    visualizeBigArray: boolean;
    children: React.Ref<Visualizer>[]
}

export default class Sorting extends Component {

    visCount = 0;

    constructor(props: any) {
        super(props);
    }

    state: sortingState = {
        delay: 500,
        comparison: 1,
        initialArray: [],
        barCount: 10,
        minCount: 10,
        maxCount: 25,
        isVisualizing: this.visCount,
        visualizeBigArray: false,
        children: [],
    };

    generateRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    generateChildRefs = () => {
        let children = [];
        for (let i = 0; i < this.state.comparison; i++) {
            children.push(React.createRef<Visualizer>());
        }
        return children;
    }

    componentWillMount() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(this.generateRandomNumber(50, 200));
        }
        let children = this.generateChildRefs();
        this.setState({initialArray: arr, children: children});
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<sortingState>, snapshot?: any) {
        if (prevState.comparison !== this.state.comparison) {
            let children = this.generateChildRefs();
            this.setState({children: children});
        }
        if (prevState.initialArray !== this.state.initialArray) {
            console.log('array changed');
        }
    }

    changeComparison = (comparison: number) => {
        let min = this.state.minCount;
        let max = this.state.maxCount;
        switch (comparison) {
            case 1:
            case 2:
                min = 10;
                max = 25;
                break;
            case 3:
            case 4:
                min = 10;
                max = 10;
                break;
        }
        ;
        this.setState({comparison: comparison, minCount: min, maxCount: max});
    };

    handleStart = () => {
        for (let i = 0; i < this.state.comparison; i++) {
            const child = this.state.children[i];
            if (child && 'current' in child && child.current) {
                child.current.start().then(() => console.log('started'));
            }
        }
    }

    handleReset = () => {
        for (let i = 0; i < this.state.comparison; i++) {
            const child = this.state.children[i];
            if (child && 'current' in child && child.current) {
                child.current.reset();
            }
        }
    }

    handleRandomize = () => {
        let arr = [];

        for (let i = 0; i < this.state.barCount; i++) {
            arr.push(this.generateRandomNumber(50, 200));
        }

        for (let i = 0; i < this.state.comparison; i++) {
            const child = this.state.children[i];
            if (child && 'current' in child && child.current) {
                child.current.generateBars(arr);
            }
        }
    }

    handleCountChange = (count: number) => {
        if (this.state.maxCount === 10) {
            console.log('max count is 10');
        } else {
            this.setState({barCount: count}, () => {
                this.handleRandomize();
            });
        }
    };

    handleSpeedChange = (speed: number) => {
        switch (speed) {
            case 1:
                speed = 500;
                break;
            case 2:
                speed = 400;
                break;
            case 3:
                speed = 300;
                break;
            case 4:
                speed = 200;
                break;
            case 5:
                speed = 100;
                break;
            default:
                speed = 100;
                break;
        }
        for (let i = 0; i < this.state.comparison; i++) {
            const child = this.state.children[i];
            if (child && 'current' in child && child.current) {
                child.current.setState({delay: speed});
            }
        }
    };

    handleChangeVisualizingState = (isIt: string) => {
        console.log(isIt);
        if (isIt === 'YES') {
            this.visCount++;
            this.setState({isVisualizing: this.visCount});
        } else {
            if (this.visCount > 0) {
                this.visCount--;
                this.setState({isVisualizing: this.visCount});
            }
        }
        console.log(this.visCount);
    };

    handleChangeVisualizeBigArray = () => {
        this.setState({visualizeBigArray: !this.state.visualizeBigArray});
    }

    render() {

        let visualizers = this.state.children.map((child, idx) => (
            <Visualizer key={idx} delay={this.state.delay} comparisons={this.state.comparison}
                        initialArray={this.state.initialArray} barCount={this.state.barCount}
                        handleChangeVisualizingState={this.handleChangeVisualizingState}
                        ref={child}/>
        ));

        return (
            <>
                <Navbar
                    isVisualizing={this.state.isVisualizing !== 0}
                    handleComparisonChange={this.changeComparison}
                    handleStart={this.handleStart}
                    handleRandomize={this.handleRandomize}
                    handleReset={this.handleReset}
                    handleChangeVisualizeBigArray={this.handleChangeVisualizeBigArray}
                />

                <div className="bg-[#121419]">
                    <ControlPanel
                        handleCountChange={this.handleCountChange}
                        handleSpeedChange={this.handleSpeedChange}
                        minCount={this.state.minCount}
                        maxCount={this.state.maxCount}/>

                    {this.state.comparison === 1 && (
                        visualizers.map(visualizer => visualizer)
                    )}

                    {this.state.comparison === 2 && (
                        <div className="grid grid-cols-1 grid-rows-2">
                            {visualizers.map(visualizer => visualizer)}
                        </div>
                    )}

                    {this.state.comparison === 3 && (
                        <div className="grid grid-cols-2 grid-rows-2">
                            {visualizers.map(visualizer => visualizer)}
                            <div className='m-0 p-10 flex flex-col justify-center items-center bg-[#121419]'>
                                <div
                                    className='barsDiv mt-10 flex justify-center items-center h-[200px] p-0 bg-[#818181] rounded-xl'>

                                </div>
                                <div className='line-break'/>
                            </div>
                        </div>
                    )}

                    {this.state.comparison === 4 && (
                        <div className="grid grid-cols-2 grid-rows-2">
                            {visualizers.map(visualizer => visualizer)}
                        </div>
                    )}
                </div>

            </>
        );
    }

}