"use client";

import React, {useEffect} from 'react';
import IOSSwitch from "@/app/_components/sorting/IOSSwitch/IOSSwitch";
import ControlPanel from "@/app/_components/sorting/ControlPannel/ControlPanel";

interface navbarProps {
    handleComparisonChange: (comparison: number) => void;
    handleStart: () => void;
    handleStop: () => void;
    handleRandomize: () => void;
    handleReset: () => void;
    isVisualizing: boolean;
    handleSpeedChange: (speed: number) => void;
    handleCountChange: (count: number) => void;
}

export default function Navbar(props: navbarProps) {

    const [comparison, setComparison] = React.useState(1);
    const [isVisualizing, setIsVisualizing] = React.useState(props.isVisualizing);

    useEffect(() => {
        setIsVisualizing(props.isVisualizing);
    }, [props.isVisualizing]);

    const handleComparisonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || typeof parseInt(e.target.value) !== 'number') {
            setComparison(1);
        } else {
            let integerValue = parseInt(e.target.value);
            if (integerValue > 4) {
                integerValue %= 10;
                if (integerValue > 4) {
                    setComparison(4);
                } else {
                    setComparison(integerValue);
                }
            } else if (integerValue < 1) {
                setComparison(1);
            } else {
                setComparison(integerValue);
            }
            props.handleComparisonChange(integerValue);
        }
    }

    const handleStart = () => {
        setIsVisualizing(true);
        props.handleStart();
    };


    return (
        <nav className="flex items-center py-5">
            <div className="text-2xl ml-5">
                <span className="font-bold p-2">Sorting</span>
                <span className="bg-[#4039ad] font-bold p-2 rounded">Visualizer</span>
            </div>
            <div className="flex justify-center items-center relative space-x-5 w-full">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative">
                        <input
                            id="comparison"
                            className="peer disabled:bg-gray-600 disabled:text-gray-600 w-full bg-transparent placeholder:text-white
                            text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none
                            focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            min={1}
                            disabled={isVisualizing}
                            max={4}
                            onChange={handleComparisonChange}
                            value={comparison}
                        />
                        <label
                            htmlFor="comparison"
                            className={`absolute cursor-text ${isVisualizing ? 'bg-gray-600' : 'bg-[#121419]'} 
                            px-1 left-2.5 top-2.5 text-white text-sm transition-all transform origin-left 
                            peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 
                            peer-focus:scale-90`}>
                            {`Comparison - ${comparison}`}
                        </label>
                    </div>
                </div>
                <button
                    className="bg-[#14A44D] px-3 py-2 rounded-md cursor-pointer hover:font-bold disabled:bg-gray-600 disabled:hover:font-normal"
                    onClick={handleStart}
                    disabled={isVisualizing}>
                    Visualize
                </button>
                <button
                    className="bg-[#3B71CA] px-3 py-2 rounded-md cursor-pointer hover:font-bold disabled:bg-gray-600 disabled:hover:font-normal"
                    onClick={props.handleReset}
                    disabled={isVisualizing}>
                    Reset
                </button>
                <button
                    className="border border-[#54B4D3] stroke-3 px-3 py-2 rounded-md cursor-pointer hover:bg-[#54B4D3] hover:font-bold disabled:border-gray-600 disabled:hover:font-normal"
                    onClick={props.handleRandomize}
                    disabled={isVisualizing}>
                    Randomize
                </button>
                <button
                    className="bg-[#DC3545] px-3 py-2 rounded-md cursor-pointer hover:font-bold disabled:bg-gray-600 disabled:hover:font-normal"
                    onClick={props.handleStop}
                    disabled={!isVisualizing}>
                    Stop
                </button>
                {/*<IOSSwitch />*/}
                <ControlPanel handleCountChange={props.handleCountChange} handleSpeedChange={props.handleSpeedChange}/>
            </div>
        </nav>
    );
}