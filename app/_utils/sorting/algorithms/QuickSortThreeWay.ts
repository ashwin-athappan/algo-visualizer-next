import { addStep, addFillStep, appendPreviousSteps, fillRange } from './helpers';

let i, j;

const quickSortThreeWay = (array: number[], position: number, arraySteps: number[][], colorSteps: number[][]) => {
    quickSortThreeWayHelper(array, 0, array.length - 1, arraySteps, colorSteps);
    addFillStep(array, 2, arraySteps, colorSteps);
};

function quickSortThreeWayHelper(array: number[], l: number, r: number, arraySteps: number[][], colorSteps: number[][]) {
    if (r <= l)
        return;

    i = 0;
    j = 0;

    addStep(array, [l, r], [3, 3], arraySteps, colorSteps);

    partition(array, l, r, arraySteps, colorSteps);

    appendPreviousSteps(array, [i, j], [2, 2], arraySteps, colorSteps);

    fillRange(array, l, i, 1, arraySteps, colorSteps);
    quickSortThreeWayHelper(array, l, j, arraySteps, colorSteps);
    fillRange(array, l, i, 2, arraySteps, colorSteps);
    fillRange(array, i, r, 1, arraySteps, colorSteps);
    quickSortThreeWayHelper(array, i, r, arraySteps, colorSteps);
    fillRange(array, i, r, 2, arraySteps, colorSteps);
}

function partition(array: number[], l: number, r: number, arraySteps: number[][], colorSteps: number[][]) {

    i = l - 1;
    j = r;

    let p = l - 1, q = r;
    let v = array[r];
    let newColorKey;
    while (true) {
        while (array[++i] < v) ;

        appendPreviousSteps(array, [r, j], [1, 3], arraySteps, colorSteps);
        while (v < array[--j]) {
            appendPreviousSteps(array, [r, j], [1, 1], arraySteps, colorSteps);
            if (j == l) {
                appendPreviousSteps(array, [j], [3], arraySteps, colorSteps);
                break;
            }
        }

        if (i >= j) {
            appendPreviousSteps(array, [i, j], [3, 1], arraySteps, colorSteps);
            break;
        }

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        appendPreviousSteps(array, [i, j], [1, 1], arraySteps, colorSteps);


        if (array[i] == v) {
            appendPreviousSteps(array, [i, r], [4, 1, 3], arraySteps, colorSteps);
            p++;
            appendPreviousSteps(array, [r, p], [1, 3], arraySteps, colorSteps);
            temp = array[i];
            array[i] = array[p];
            array[p] = temp;

            appendPreviousSteps(array, [i, p], [2, 2], arraySteps, colorSteps);
        }

        if (array[j] == v) {
            appendPreviousSteps(array, [r, j], [1, 3], arraySteps, colorSteps);
            q--;
            appendPreviousSteps(array, [r, q], [1, 3], arraySteps, colorSteps);

            temp = array[q];
            array[q] = array[j];
            array[j] = temp;
            appendPreviousSteps(array, [q, j], [2, 2], arraySteps, colorSteps);
        }
    }

    let temp = array[i];
    array[i] = array[r];
    appendPreviousSteps(array, [i, r], [1, 1], arraySteps, colorSteps);
    array[r] = temp;
    appendPreviousSteps(array, [r, i], [1, 1], arraySteps, colorSteps);

    j = i - 1;
    for (let k = l; k < p; k++, j--) {
        temp = array[k];
        array[k] = array[j];
        appendPreviousSteps(array, [k, j], [1, 1], arraySteps, colorSteps);
        array[j] = temp;
        appendPreviousSteps(array, [k, j], [2, 2], arraySteps, colorSteps);
    }

    i = i + 1;
    for (let k = r - 1; k > q; k--, i++) {
        temp = array[i];
        appendPreviousSteps(array, [i], [3], arraySteps, colorSteps);
        array[i] = array[k];
        array[k] = temp;
        fillRange(array, i, k, 1, arraySteps, colorSteps);
    }
}

export default quickSortThreeWay;