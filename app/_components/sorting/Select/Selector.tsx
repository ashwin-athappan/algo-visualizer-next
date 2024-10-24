"use client";

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";

interface selectorProps {
    handleAlgorithmChange: (algorithm: number) => void;
}

export default function Selector(props: selectorProps) {

    const [algorithm, setAlgorithm] = useState(0);

    const handleChange = (e: SelectChangeEvent<number>) => {
        let algo: number = 0;
        if (typeof e.target.value === 'string') {
            algo = parseInt(e.target.value);
        } else {
            algo = e.target.value;
        }
        setAlgorithm(algo);
        props.handleAlgorithmChange(algo);
    }

    return (
        <FormControl>
            <InputLabel id="algorithm-select-label" className="text-white" htmlFor="algorithm-select">Algorithm</InputLabel>
            <Select
                labelId="algorithm-select-label"
                id="algorithm-select"
                className="text-white"
                value={algorithm}
                label="Age"
                onChange={handleChange}
                variant='standard'>
                <MenuItem value={0}>Bubble Sort</MenuItem>
                <MenuItem value={1}>Insertion Sort</MenuItem>
                <MenuItem value={2}>Selection Sort</MenuItem>
                <MenuItem value={3}>Merge Sort</MenuItem>
                <MenuItem value={4}>Quick Sort</MenuItem>
                <MenuItem value={5}>Quick Sort Three Way</MenuItem>
            </Select>
        </FormControl>
    );
}