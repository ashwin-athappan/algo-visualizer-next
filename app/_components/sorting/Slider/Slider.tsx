import React from 'react';
import {Slider, Typography} from "@mui/material";

interface sliderProps {
    handleChange: (value: number) => void;
    type: string;
    minCount?: number;
    maxCount?: number;
}

function valuetext(value: number) {
    return `${value}`;
}

export default function DiscreteSlider({ handleChange, type, minCount, maxCount }: sliderProps) {
    const handleCountChange = (e: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        if (typeof value === 'number') {
            handleChange(value);
        } else {
            handleChange(value[0]);
        }
    };

    const handleSpeedChange = (e: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        if (typeof value === 'number') {
            handleChange(value);
        } else {
            handleChange(value[0]);
        }
    };

    return type === 'Count' ? (
        <div className="w-1/2 mr-5 flex flex-col items-center">
            <Typography id='discrete-slider' gutterBottom>
                Bar Count
            </Typography>
            <Slider
                defaultValue={10}
                getAriaValueText={valuetext}
                aria-labelledby='discrete-slider'
                valueLabelDisplay='auto'
                marks={true}
                onChangeCommitted={handleCountChange}
                step={5}
                min={minCount}
                max={maxCount}
            />
        </div>
    ) : (
        <div className="w-1/2 ml-5 flex flex-col items-center">
            <Typography id='discrete-slider' gutterBottom>
                Speed
            </Typography>
            <Slider
                defaultValue={1}
                getAriaValueText={valuetext}
                aria-labelledby='discrete-slider'
                valueLabelDisplay='auto'
                marks={true}
                onChangeCommitted={handleSpeedChange}
                step={1}
                min={1}
                max={5}
            />
        </div>
    );
}