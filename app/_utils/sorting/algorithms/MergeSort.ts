import {insertStep} from './helpers';

const mergeSort = (array: number[], position: number, arraySteps: number[][], colorSteps: number[][]) => {
    if (array.length === 1) return {array, colorSteps};
    let mid = Math.floor(array.length / 2);

    addSelectSteps(array, position, mid, arraySteps, colorSteps);

    const LD = mergeSort(array.slice(0, mid), position, arraySteps, colorSteps);

    const RD = mergeSort(array.slice(mid), position + mid, arraySteps, colorSteps);

    addSelectSteps(array, position + mid, mid, arraySteps, LD.colorSteps);

    let arrayNew = merge(LD.array, RD.array, position, arraySteps, colorSteps);
    arraySteps.push(arraySteps[arraySteps.length - 1].slice());
    colorSteps.push(
        colorSteps[colorSteps.length - 1]
            .slice()
            .fill(2, position, position + arrayNew.length)
    );
    return {
        array: arrayNew,
        colorSteps: colorSteps,
    };
};

const merge = (L: number[], R: number[], position: number, arraySteps: number[][], colorSteps: number[][]) => {
    let arrayNew: any[] = [];
    let A = 0;
    let B = 0;

    while (L.length > 0 && R.length > 0) {
        if (L[A] < R[B]) {
            arrayNew.push(L.shift());
            insertStep(arrayNew, position, arraySteps);
        } else {
            arrayNew.push(R.shift());
            insertStep(arrayNew, position, arraySteps);
        }
        updateColor(position, colorSteps, arrayNew.length - 1, [], []);
    }


    if (L.length !== 0 || R.length !== 0) {
        arrayNew = arrayNew.concat(L);
        arrayNew = arrayNew.concat(R);
        insertStep(arrayNew, position, arraySteps);
        updateColor(position, colorSteps, arrayNew.length, L, R);
    }

    return arrayNew;
};

const addSelectSteps = (array: number[], position: number, mid: number, arraySteps: number[][], colorSteps: number[][]) => {
    arraySteps.push(arraySteps[arraySteps.length - 1].slice());
    arraySteps.push(arraySteps[arraySteps.length - 1].slice());
    arraySteps.push(arraySteps[arraySteps.length - 1].slice());
    let newColorKey = colorSteps[colorSteps.length - 1].slice();

    newColorKey[mid] = 4;
    colorSteps.push(newColorKey);
    colorSteps.push(colorSteps[colorSteps.length - 1].slice().fill(0));
    colorSteps.push(colorSteps[colorSteps.length - 1].slice().fill(1, position, mid));
};

const updateColor = (position: number, colorSteps: number[][], start: number, L: number[], R: number[]) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    let end = position + start + L.length + R.length;
    start = start + position;

    if (end === start) {
        colorKey.fill(2, start, end + 1);
    } else {
        colorKey.fill(1, start, end);
    }
    colorSteps.push(colorKey);
};

export default mergeSort;