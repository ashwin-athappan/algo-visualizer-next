import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface op {
    name: string;
    value: number;
}

interface dropdownProps {
    options: op[];
    selected: op;
    type: string;
    handleSelect: (pos: number) => void;
}

export default function Dropdown (props: dropdownProps) {

    const [selected, setSelected] = useState(props.selected.value);

    const handleSelect = (e: SelectChangeEvent<number>) => {
        let value = e.target.value;
        if (typeof value === 'string') {
            value = parseInt(value);
        }
        setSelected(value);
        props.handleSelect(value);
    };

    return (
        <FormControl className={`${props.type === "algorithm" ? "w-full" : "w-1/3"}`}>
            <InputLabel id={`algorithm-select-label-${props.type}`} className="text-white" htmlFor={`${props.type}-select`}>{props.type}</InputLabel>
            <Select
                labelId="algorithm-select-label"
                id="algorithm-select"
                className="text-white"
                value={selected}
                label={`${props.type}`}
                onChange={handleSelect}
                variant='standard'>
                {props.options.map((option, idx) => (
                    <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}