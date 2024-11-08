import {addStep, addFillStep, fillRange, appendPreviousSteps} from "@/app/_utils/sorting/algorithms/helpers";

function heapify(array: number[], n: number, i: number, arraySteps: number[][], colorSteps: number[][]) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
        addStep(array, [left], [3], arraySteps, colorSteps);
    }

    if (right < n) {
        addStep(array, [right], [3], arraySteps, colorSteps);
    }

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    addStep(array, [i, largest], [4, 4], arraySteps, colorSteps);

    if (largest != i) {
        let swap = array[i];
        array[i] = array[largest];
        array[largest] = swap;
        addStep(array, [i, largest], [4, 4], arraySteps, colorSteps);
        heapify(array, n, largest, arraySteps, colorSteps);
    }
}

function heapSortHelper(array: number[], n: number, arraySteps: number[][], colorSteps: number[][]) {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        fillRange(array, 0, Math.floor(n / 2) - 1, 1, arraySteps, colorSteps);
        heapify(array, n, i, arraySteps, colorSteps);
    }

    for (let i = n - 1; i > 0; i--) {
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        addStep(array, [0, i], [4, 4], arraySteps, colorSteps);
        heapify(array, i, 0, arraySteps, colorSteps);
    }
}

function HeapSort(array: number[], position: number, arraySteps: number[][], colorSteps: number[][]) {
    heapSortHelper(array, array.length, arraySteps, colorSteps);
    addFillStep(array, 2, arraySteps, colorSteps);
}

export default HeapSort;