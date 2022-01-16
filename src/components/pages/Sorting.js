import React from 'react';

import Visualizer from './sortingVisualizer.jsx';
import './sorting.css';
import Collapsible from '../functions/Collapsible.js';



export default function Sorting(){
    return (
        <div className='Sorting'>
                <div className="left">
                    <Visualizer />
                </div>
                <div className='right'>
                    <Collapsible label="Bubble Sort Information">
                        <h1>Bubble Sort</h1>
                        <p>Bubble sort is a sorting algorithm that compares two adjacent elements and swaps them until they are not in the intended order.
Just like the movement of air bubbles in the water that rise up to the surface, each element of the array move to the end in each iteration. 
Therefore, it is called a bubble sort.
                        </p>
                    </Collapsible>
                    <Collapsible label="Insertion Sort Information">
                        <h1>Insertion Sort</h1>
                        <p>
                        Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. 
                        Values from the unsorted part are picked and placed at the correct position in the sorted part.
                        </p>
                    </Collapsible>
                    <Collapsible label="Merge Sort Information">
                        <h1>Merge Sort</h1>
                        <p>
                        Like QuickSort, Merge Sort is a Divide and Conquer algorithm. 
                        It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
                        </p>
                    </Collapsible>
                    <Collapsible label="Quick Sort Information">
                        <h1>Quick Sort</h1>
                        <p>
                        QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. 
                        </p>
                    </Collapsible>
                    <Collapsible label="Heap Sort Information">
                        <h1>Heap Sort</h1>
                        <p>Heap sort is a comparison-based sorting technique based on Binary Heap data structure. 
                            It is similar to selection sort where we first find the minimum element and place the minimum element at the beginning. 
         
                        </p>
                    </Collapsible>
                </div>
        </div>
      );
} 