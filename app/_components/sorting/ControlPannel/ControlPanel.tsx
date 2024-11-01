import React from 'react';
import Dropdown from "@/app/_components/common/Dropdown/Dropdown";

interface controlPanelProps {
    handleCountChange: (count: number) => void;
    handleSpeedChange: (speed: number) => void;
}

export default function ControlPanel({handleCountChange, handleSpeedChange}: controlPanelProps) {

    const countOptions = [
        {name: '10', value: 10},
        {name: '20', value: 20},
        {name: '30', value: 30},
        {name: '40', value: 40},
        {name: '50', value: 50},
        {name: '100', value: 100},
        {name: '250', value: 250},
        {name: '500', value: 500},
    ];
    const speedOptions = [
        {name: '1x', value: 1},
        {name: '2x', value: 2},
        {name: '3x', value: 3},
        {name: '4x', value: 4},
        {name: '5x', value: 5},
        {name: '6x', value: 6},
        {name: '7x', value: 7},
        {name: '8x', value: 8},
        {name: '9x', value: 9},
        {name: '10x', value: 10},
    ]

    return (
        <div className='w-1/4 px-5 rounded-xl flex justify-center items-center'>
            <Dropdown options={countOptions} selected={countOptions[0]} type={'count'}
                      handleSelect={handleCountChange}/>
            <Dropdown options={speedOptions} selected={speedOptions[0]} type={'speed'}
                      handleSelect={handleSpeedChange}/>
        </div>
    );
}