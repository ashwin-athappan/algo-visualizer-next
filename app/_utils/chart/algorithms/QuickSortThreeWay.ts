let i = 0;
let j = 0;

const QuickSortThreeWay = (array: number[]) => {

};

const quickSortThreeWayHelper = (array: number[], l: number, r: number) => {
    if (r <= l)
        return;

    i = 0;
    j = 0;

    partition(array, l, r);

    quickSortThreeWayHelper(array, l, j);
    quickSortThreeWayHelper(array, i, r);
};

const partition = (a: number[], l: number, r: number) => {
    i = l - 1;
    j = r;
    let p = l - 1, q = r;
    let v = a[r];

    while (true) {
        while (a[++i] < v) ;
        
        while (v < a[--j])
            if (j == l)
                break;

        if (i >= j)
            break;

        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;

        if (a[i] == v) {
            p++;
            temp = a[i];
            a[i] = a[p];
            a[p] = temp;

        }

        if (a[j] == v) {
            q--;
            temp = a[q];
            a[q] = a[j];
            a[j] = temp;
        }
    }


    let temp = a[i];
    a[i] = a[r];
    a[r] = temp;
    
    j = i - 1;
    for (let k = l; k < p; k++, j--) {
        temp = a[k];
        a[k] = a[j];
        a[j] = temp;
    }
    
    i = i + 1;
    for (let k = r - 1; k > q; k--, i++) {
        temp = a[i];
        a[i] = a[k];
        a[k] = temp;
    }  
};

export {QuickSortThreeWay};