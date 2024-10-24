import React from 'react';
import Slider from '@/app/_components/sorting/Slider/Slider';

interface controlPanelProps {
    handleCountChange: (count: number) => void;
    handleSpeedChange: (speed: number) => void;
    minCount: number;
    maxCount: number;
}

export default function ControlPanel({ handleCountChange, handleSpeedChange, minCount, maxCount }: controlPanelProps) {
    return (
        <div className='flex justify-center'>
            <div className='bg-[#3A4042] py-5 px-10 w-1/2 mt-5 rounded-xl flex justify-between'>
                <Slider handleChange={handleCountChange} type={'Count'} minCount={minCount} maxCount={maxCount} />
                <Slider handleChange={handleSpeedChange} type={'Speed'} />
            </div>
        </div>
    );
}