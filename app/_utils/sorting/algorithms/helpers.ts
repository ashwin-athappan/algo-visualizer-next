export function swap(array: number[], indexA: number, indexB: number) {
    let temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
    return array;
}

export function insertStep(arrayNew: number[], position: number, arraySteps: number[][]) {
    let currentStep = arraySteps[arraySteps.length - 1].slice();
    currentStep.splice(position, arrayNew.length, ...arrayNew);
    arraySteps.push(currentStep);
}

export const addStep = (array: number[], positions: number[], colors: number[], arraySteps: number[][], colorSteps: number[][]) => {
    arraySteps.push(array.slice());
    let colorKey = new Array(array.length).fill(0);
    positions.forEach((position, index) => {
        colorKey[position] = colors[index];
    });
    colorSteps.push(colorKey);
};

export const addFillStep = (array: number[], color: number, arraySteps: number[][], colorSteps: number[][]) => {
    arraySteps.push(array.slice());
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    colorKey.fill(color);
    colorSteps.push(colorKey);
};

export const appendPreviousSteps = (array: number[], positions: number[], colors: number[], arraySteps: number[][], colorSteps: number[][]) => {
    arraySteps.push(array.slice());
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    positions.forEach((position, index) => {
        colorKey[position] = colors[index];
    });
    colorSteps.push(colorKey);
}

export const fillRange = (array: number[], start: number, end: number, color: number, arraySteps: number[][], colorSteps: number[][]) => {
    arraySteps.push(array.slice());
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    colorKey.fill(color, start, end);
    colorSteps.push(colorKey);
};