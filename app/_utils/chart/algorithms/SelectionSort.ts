const SelectionSort = (array: number[]) => {
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;

        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[min_idx]) {
                min_idx = j;
            }
        }

        let temp = array[i];
        array[i] = array[min_idx];
        array[min_idx] = temp;
    }
};

export {SelectionSort};