import React from 'react';

interface dropdownProps {
    options: string[];
    selected: string;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>, pos: number) => void;
}

export default function Dropdown (props: dropdownProps) {

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

    };

    return (
        <div className="">
            <select onChange={}>
                {props.options.map((option, idx) => (
                    <option key={option} value={idx}>{option}</option>
                ))}
            </select>
        </div>
    );
}