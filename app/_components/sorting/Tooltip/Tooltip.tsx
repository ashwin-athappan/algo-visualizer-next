import React from 'react';
import Typography from '@mui/material/Typography';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import {
    BubbleSortDescription,
    InsertionSortDescription,
    SelectionSortDescription,
    MergeSortDescription
} from "@/app/_components/sorting/Descriptions/Descriptions";

interface descriptionType {
    title: string;
    description: React.JSX.Element;
    worstCase: React.JSX.Element;
    avgCase: React.JSX.Element;
    bestCase: React.JSX.Element;
    space: React.JSX.Element;
}

const getTooltip = (algorithm: number) => {
    let description: descriptionType | undefined;
    switch (algorithm) {
        case 0:
            description = BubbleSortDescription;
            break;
        case 1:
            description = InsertionSortDescription;
            break;
        case 2:
            description = SelectionSortDescription;
            break;
        case 3:
            description = MergeSortDescription;
            break;
        default:
            break;
    }

    return (
        <div className="divide-y">
            <span color='inherit' className="text-xl font-bold">{description?.title}</span>
            <div className="text-justify">{description?.description}</div>
            <div className="m-2">
                <span className="font-bold">Time & Space Complexity</span>
                <div>Best Case: {description?.bestCase}</div>
                <span className="font-bold">Worst Time Complexity</span>
                <div>Worst Case: {description?.worstCase}</div>
                <span className="font-bold">Average Time Complexity</span>
                <div>Average Case: {description?.avgCase}</div>
                <span className="font-bold">Space Complexity</span>
                <div>Space: {description?.space}</div>
            </div>
        </div>
    );
};

function InfoTooltips(algorithm: number) {
    return (
        <div className="text-white text-lg w-[800px] rounded-xl">
            {getTooltip(algorithm)}
        </div>
    );
}

const NoMaxWidthTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
    },
});

export {
    InfoTooltips,
    NoMaxWidthTooltip
};