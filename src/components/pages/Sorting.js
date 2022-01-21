import React, { Children } from 'react';

import Visualizer from './sortingVisualizer.jsx';
import './sorting.css';
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



export default function Sorting(){
    return (
        <div className='Sorting'>
            <div className='left-panel'>
            <SideCollapsible label = " ">
            <h1 style={{textAlign:"center"}}>Sorting Algorithms</h1><br/>
            <h3 style={{textAlign:"center"}}>Big O Time Complexity</h3><br/>
                      <table className='left-table'>
                          <tr>
                              <th>AGORITHM</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Bubble Sort</td>
                              <td>Ω(n)</td>
                              <td>O(n^2)</td>
                          </tr>
                          <tr>
                              <td>Quick Sort</td>
                              <td>Ω(n log(n))</td>
                              <td>O(n^2)</td>
                          </tr>
                          <tr>
                              <td>Merge Sort</td>
                              <td>Ω(n log(n))</td>
                              <td>O(n log(n))</td>
                          </tr>
                          <tr>
                              <td>Insertion Sort</td>
                              <td>Ω(n)</td>
                              <td>O(n^2)</td>
                          </tr>
                          <tr>
                              <td>Heap Sort</td>
                              <td>Ω(n log(n))</td>
                              <td>O(n log(n))</td>
                          </tr>
                          
                      </table>
            </SideCollapsible>
            <div className="TabBox">
            <Tabs style={{backgroundColor:" rgba(214, 2, 2, 0.2)" ,color:"white", textAlign:"justify", marginTop:"15px", borderRadius:"7px",width:"100%"}}>
                <TabList>
                    <Tab>Bubble</Tab>
                    <Tab>Insertion</Tab>
                    <Tab>Merge</Tab>
                    <Tab>Quick</Tab>
                    <Tab>Heap</Tab>
                </TabList>

            <TabPanel style={{padding:"10px"}}>
            <p>def bubbleSort(arr):<br/>
    n = len(arr)<br/>

    # Traverse through all array elements<br/>
    for i in range(n):<br/>

        # Last i elements are already in place<br/>
        for j in range(0, n-i-1):<br/>

            # traverse the array from 0 to n-i-1<br/>
            # Swap if the element found is greater<br/>
            # than the next element<br/>
            if arr[j]  arr[j+1] :<br/>
                arr[j], arr[j+1] = arr[j+1], arr[j]<br/>
        
      </p>
      <p>
        Source:{' '}
        <a href="https://en.wikipedia.org/wiki/Mario" target="_blank">
          Wikipedia
        </a>
      </p>
            </TabPanel>
            <TabPanel>
                <h2>
                    {/* <p>def insertionSort(alist):

for i in range(1,len(alist)):

    #element to be compared
    current = alist[i]

    #comparing the current element with the sorted portion and swapping
    while i>0 and alist[i-1]>current:
        alist[i] = alist[i-1]
        i = i-1
       alist[i] = current

    #print(alist)

return alist</p> */}
</h2>
            </TabPanel>
            <TabPanel>
                <h2>
                    {/* <p>def merge_sort(arr):
    # The last array split
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    # Perform merge_sort recursively on both halves
    left, right = merge_sort(arr[:mid]), merge_sort(arr[mid:])

    # Merge each side together
    return merge(left, right, arr.copy())


def merge(left, right, merged):

    left_cursor, right_cursor = 0, 0
    while left_cursor < len(left) and right_cursor < len(right):
      
        # Sort each one and place into the result
        if left[left_cursor] <= right[right_cursor]:
            merged[left_cursor+right_cursor]=left[left_cursor]
            left_cursor += 1
        else:
            merged[left_cursor + right_cursor] = right[right_cursor]
            right_cursor += 1
            
    for left_cursor in range(left_cursor, len(left)):
        merged[left_cursor + right_cursor] = left[left_cursor]
        
    for right_cursor in range(right_cursor, len(right)):
        merged[left_cursor + right_cursor] = right[right_cursor]

    return merged
    </p> */}
    </h2>
            </TabPanel>
            <TabPanel>
                <h2>
                {/* def partition(array, begin, end):
    pivot_idx = begin
    for i in xrange(begin+1, end+1):
        if array[i] <= array[begin]:
            pivot_idx += 1
            array[i], array[pivot_idx] = array[pivot_idx], array[i]
    array[pivot_idx], array[begin] = array[begin], array[pivot_idx]
    return pivot_idx

def quick_sort_recursion(array, begin, end):
    if begin >= end:
        return
    pivot_idx = partition(array, begin, end)
    quick_sort_recursion(array, begin, pivot_idx-1)
    quick_sort_recursion(array, pivot_idx+1, end)

def quick_sort(array, begin=0, end=None):
    if end is None:
        end = len(array) - 1
    
    return quick_sort_recursion(array, begin, end) */}
</h2>
            </TabPanel>
            <TabPanel>
                <h2>  {/*# To heapify subtree rooted at index i. 
# n is size of heap 
def heapify(arr, n, i): 
	largest = i # Initialize largest as root 
	l = 2 * i + 1	 # left = 2*i + 1 
	r = 2 * i + 2	 # right = 2*i + 2 

	# See if left child of root exists and is 
	# greater than root 
	if l < n and arr[i] < arr[l]: 
		largest = l 

	# See if right child of root exists and is 
	# greater than root 
	if r < n and arr[largest] < arr[r]: 
		largest = r 

	# Change root, if needed 
	if largest != i: 
		arr[i],arr[largest] = arr[largest],arr[i] # swap 

		# Heapify the root. 
		heapify(arr, n, largest) 

# The main function to sort an array of given size 
def heapSort(arr): 
	n = len(arr) 

	# Build a maxheap. 
	for i in range(n, -1, -1): 
		heapify(arr, n, i) 

	# One by one extract elements 
	for i in range(n-1, 0, -1): 
		arr[i], arr[0] = arr[0], arr[i] # swap 
		heapify(arr, i, 0) 

heapSort(arr)  */}</h2>
            </TabPanel>
        </Tabs>
            </div>
            
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