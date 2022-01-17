import React from 'react';

import Visualizer from './sortingVisualizer.jsx';
import './sorting.css';
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible.js';



export default function Sorting(){
    return (
        <div className='Sorting'>
            <div className='left-panel'>
            <SideCollapsible label = " ">
            <h1>Depth First Search</h1>
                        <p>The DFS algorithm is a recursive algorithm that uses the idea of backtracking. It involves exhaustive searches of all the nodes by going ahead, if possible, else by backtracking.
                        Here, the word backtrack means that when you are moving forward and there are no more nodes along the current path, you move backwards on the same path to find nodes to traverse. All the nodes will be visited on the current path till all the unvisited nodes have been traversed after which the next path will be selected. 

                        </p>
            </SideCollapsible>
            </div>
                <div className='left'>
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