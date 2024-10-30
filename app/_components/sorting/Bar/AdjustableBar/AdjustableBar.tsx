import React from "react";

import {colors} from "@/app/_components/sorting/Bar/common";

interface adjustableBarProps {
    index: number;
    length: number;
    color: number;
    width: number;
}

export default function AdjustableBar(props: adjustableBarProps) {

    const {index, length, color, width} = props;

    let barStyle = {
        background: colors[color],
        height: length,
        marginTop: 300 - length,
        width: width
    };

    return (
        <div className={`h-[${length}px] bg-black`} style={barStyle}>
        </div>
    );
}