import React from 'react';

const BubbleSortDescription = {
    title: 'Bubble Sort',
    description: (
        <p>
            <a
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

export {
    BubbleSortDescription
}