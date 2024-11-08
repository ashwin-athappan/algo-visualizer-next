import React from 'react';

const BubbleSortDescription = {
    title: 'Bubble Sort',
    description: (
        <p>
            <a className="text-blue-500"
               href="https://en.wikipedia.org/wiki/Bubble_sort"
               target="_blank"
               rel="noopener noreferrer"
            >
                Bubble Sort
            </a>{' '}
            is a simple sorting algorithm that repeatedly steps through the
            list, compares adjacent elements and swaps them if they are in the
            wrong order.The pass through the list is repeated until the list
            is sorted. The algorithm, which is a comparison sort, is named for
            the way smaller or larger elements "bubble" to the top of the
            list. Although the algorithm is simple, it is too slow and
            impractical for most problems
        </p>
    ),
    worstCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    avgCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    bestCase: <span>O(n)</span>,
    space: <span>O(1)</span>
};

const InsertionSortDescription = {
    title: 'Insertion Sort',
    description: (
        <p>
            <a className="text-blue-500"
               href="https://en.wikipedia.org/wiki/Insertion_sort"
               target="_blank"
               rel="noopener noreferrer"
            >
                Insertion Sort
            </a>{' '}
            is a simple sorting algorithm that builds the final sorted array
            (or list) one item at a time by comparisons. It is much less efficient
            on large lists than more advanced algorithms such as quicksort, heapsort,
            or merge sort. However, insertion sort provides several advantages:
            <ol>
                <li>Simple implementation: Jon Bentley shows a version that is three lines in C-like pseudo-code, and
                    five lines when optimized.
                </li>
                <li>Efficient for (quite) small data sets, much like other quadratic (i.e., O(n<sup>2</sup>)) sorting algorithms
                </li>
                <li>More efficient in practice than most other simple quadratic algorithms such as selection sort or
                    bubble sort
                </li>
            </ol>
        </p>
    ),
    worstCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    avgCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    bestCase: <span>O(n)</span>,
    space: <span>O(1)</span>
};

const SelectionSortDescription = {
    title: 'Selection Sort',
    description: (
        <p>
            <a className="text-blue-500"
               href="https://en.wikipedia.org/wiki/Selection_sort"
               target="_blank"
               rel="noopener noreferrer"
            >
                Selection Sort
            </a>{' '}
            is an in-place comparison sorting algorithm. It has an O(n2) time complexity,
            which makes it inefficient on large lists, and generally performs worse than
            the similar insertion sort. Selection sort is noted for its simplicity and has
            performance advantages over more complicated algorithms in certain situations,
            particularly where auxiliary memory is limited.
        </p>
    ),

    worstCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    avgCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    bestCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    space: <span>O(1)</span>
};

const MergeSortDescription = {
    title: 'Merge Sort',
    description: (
        <p>
            <a className="text-blue-500"
               href="https://en.wikipedia.org/wiki/Merge_sort"
               target="_blank"
               rel="noopener noreferrer"
            >
                Insertion Sort
            </a>{' '}
            is an efficient, general-purpose, and comparison-based sorting algorithm. Most
            implementations produce a stable sort, which means that the relative order of equal
            elements is the same in the input and output. Merge sort is a divide-and-conquer algorithm.
            <ol className="pl-5 list-disc">
                <li>Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).</li>
                <li>Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.</li>
            </ol>
        </p>
    ),

    worstCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    avgCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    bestCase: (
        <span>
      O(n<sup>2</sup>)
    </span>
    ),
    space: <span>O(1)</span>
};

export {
    BubbleSortDescription,
    InsertionSortDescription,
    SelectionSortDescription,
    MergeSortDescription
}