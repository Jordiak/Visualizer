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
            <TabPanel style={{padding:"10px"}}>
                    def insertionSort(alist):<br></br>
for i in range(1,len(alist)):<br></br>

#el current = alist[i]<br></br>

    #comparing the current element with the sorted portion and swapping<br></br>
    while i &gt; 0 and alist[i-1]&gt;current:<br></br>
        alist[i] = alist[i-1]<br></br>
        i = i-1<br></br>
       alist[i] = current<br></br>

    #print(alist)<br></br>

return alist
ement to be compared<br></br>
<p>
        Source:{' '}
        <a href="https://www.programiz.com/dsa/insertion-sort" target="_blank">
        programiz.com/dsa/insertion-sort
        </a>
      </p>
   
            </TabPanel>
            <TabPanel>

            </TabPanel>
            <TabPanel>
                <h2>

</h2>
            </TabPanel>
            <TabPanel>
                <h2>  </h2>
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