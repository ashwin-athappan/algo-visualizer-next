import React from "react";
import ControlPanel from "@/app/_components/chart/ControlPanel/ControlPanel";

interface NavbarProps {
    setRuns: (runs: number) => void;
    setAlgorithm: (algorithm: number) => void;
    plot: () => void;
    clear: () => void;
    plotBestCase: () => void;
    plotWorstCase: () => void;
    isPlotting: boolean;
}

function Navbar({
                    setRuns,
                    setAlgorithm,
                    plot,
                    clear,
                    plotBestCase,
                    plotWorstCase,
                    isPlotting
                }: NavbarProps) {

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
                    onClick={clear}
                    disabled={isPlotting}>
                    Clear Chart
                </button>
                <button
                    className="bg-[#0d6efd] px-3 py-2 rounded-md cursor-pointer hover:text-black disabled:bg-gray-600 disabled:hover:font-normal"
                    onClick={plotBestCase}
                    disabled={isPlotting}>
                    Plot Best Case
                </button>
                <button
                    className="bg-[#fd7e14] px-3 py-2 rounded-md cursor-pointer hover:text-black disabled:bg-gray-600 disabled:hover:font-normal"
                    onClick={plotWorstCase}
                    disabled={isPlotting}>
                    Plot Worst Case
                </button>
            </div>
        </nav>
    );
}

export default Navbar;