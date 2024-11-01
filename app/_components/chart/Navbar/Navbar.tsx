import React from "react";
import ControlPanel from "@/app/_components/chart/ControlPanel/ControlPanel";

interface NavbarProps {
    setRuns: (runs: number) => void;
    setAlgorithm: (algorithm: number) => void;
    plot: () => void;
    isPlotting: boolean;
}

export default function Navbar({setRuns, setAlgorithm, plot, isPlotting}: NavbarProps) {

    return (
        <nav className="flex items-center py-5 bg-[#282829]">
            <div className="text-2xl ml-5">
                <span className="font-bold p-2">Sorting</span>
                <span className="bg-[#98f98f] text-black font-bold p-2 rounded">Chart</span>
            </div>
            <div className="flex justify-center items-center relative space-x-5 w-full">
                <ControlPanel handleRunsChange={setRuns} handleAlgorithmChange={setAlgorithm}/>
                <button
                    className="bg-[#14A44D] px-3 py-2 rounded-md cursor-pointer hover:text-black disabled:bg-gray-600 disabled:hover:font-normal"
                    onClick={plot}
                    disabled={isPlotting}>
                    Plot Chart
                </button>
                <button
                    className="bg-[#DC3545] px-3 py-2 rounded-md cursor-pointer hover:text-black disabled:bg-gray-600 disabled:hover:font-normal"
                    disabled={isPlotting}>
                    Clear Chart
                </button>
            </div>
        </nav>
    );
}