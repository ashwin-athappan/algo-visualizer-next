import React from "react";
import Dropdown from "@/app/_components/common/Dropdown/Dropdown";

interface controlPanelProps {
    handleRunsChange: (runs: number) => void;
    handleAlgorithmChange: (algorithm: number) => void;
}

export default function ControlPanel({handleRunsChange, handleAlgorithmChange}: controlPanelProps) {
    const runOptions = [
        {name: '5-runs', value: 5},
        {name: '10-runs', value: 10},
        {name: '15-runs', value: 15},
        {name: '20-runs', value: 20},
        {name: '25-runs', value: 25},
        {name: '30-runs', value: 30},
        {name: '35-runs', value: 35},
        {name: '40-runs', value: 40},
        {name: '45-runs', value: 45},
        {name: '50-runs', value: 50},
    ]

    const algorithmOptions = [
        {name: 'Bubble Sort', value: 0},
        {name: 'Insertion Sort', value: 1},
        {name: 'Selection Sort', value: 2},
        {name: 'Merge Sort', value: 3},
        {name: 'Quick Sort', value: 4},
        {name: 'Quick Sort Three Median', value: 5},
        {name: 'Heap Sort', value: 6},
    ]

    return (
        <div className='px-5 rounded-xl flex justify-center items-center'>
            <Dropdown options={runOptions} selected={runOptions[0]} type={'runs'}
                      handleSelect={handleRunsChange}/>

            <div className="mx-5 w-[250px]">
                <Dropdown options={algorithmOptions} selected={algorithmOptions[0]} type={'algorithm'}
                          handleSelect={handleAlgorithmChange}/>
            </div>
        </div>
    );
}