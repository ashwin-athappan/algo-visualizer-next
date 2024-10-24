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