import React from 'react';
import Collapsible from '../functions/Collapsible.js';
import Dsa from './Dsa.js';
import SideCollapsible from '../functions/SideCollapsible.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function DataStructures(){
    return(
        <div className='DataStructures'>
            <div className='left-panel'>
            <SideCollapsible label = " ">
            <h1 style={{textAlign:"center"}}>Time Complexity</h1><br/>
            <h4 style={{textAlign:"center"}}>Doubly Linked List</h4><br/>
                      <table className='left-table'>
                          <tr>
                              <th>OPERATIONS</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Access</td>
                              <td>Θ(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Search</td>
                              <td>O(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Insertion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          <tr>
                              <td>Deletion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          
                          
                      </table><br/>
                      <h4 style={{textAlign:"center"}}>Queue</h4><br/>
                      <table className='left-table'>
                          <tr>
                              <th>OPERATIONS</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Access</td>
                              <td>Θ(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Search</td>
                              <td>O(n)</td>
                              <td>O(n)</td>
                          </tr>
                          <tr>
                              <td>Insertion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          <tr>
                              <td>Deletion</td>
                              <td>O(1)</td>
                              <td>O(1)</td>
                          </tr>
                          
                          
                      </table><br/>
                      <h4 style={{textAlign:"center"}}>Binary Tree</h4><br/>
                      <table className='left-table' >
                          <tr>
                              <th>OPERATIONS</th>
                              <th>BEST</th>
                              <th>WORST</th>
                          </tr>
                          <tr>
                              <td>Access</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          <tr>
                              <td>Search</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          <tr>
                              <td>Insertion</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          <tr>
                              <td>Deletion</td>
                              <td>Θ(log(n))</td>
                              <td>Θ(log(n))</td>
                          </tr>
                          
                          
                      </table>
            </SideCollapsible>

            <div className="TabBox">
            <Tabs style={{alignContent:"center",backgroundColor:" rgba(214, 2, 2, 0.2)" ,color:"white", textAlign:"justify", marginTop:"15px", borderRadius:"7px",width:"100%"}}>
                <TabList>
                    <Tab>Linked List</Tab>
                    <Tab>Queue</Tab>
                    <Tab>Priority Queue</Tab>
                    <Tab>Tree</Tab>
                
                </TabList>

            <TabPanel style={{padding:"10px"}}>
            <p>
        <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, [ma.ɾʲi.o]</i>) (<i>English:
        /ˈmɑːrioʊ/; Italian: [ˈmaːrjo]</i>) is a fictional character in the Mario video
        game franchise, owned by Nintendo and created by Japanese video game designer
        Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist
        of the series, Mario has appeared in over 200 video games since his creation.
        Depicted as a short, pudgy, Italian plumber who resides in the Mushroom
        Kingdom, his adventures generally center upon rescuing Princess Peach from the
        Koopa villain Bowser. His younger brother and sidekick is Luigi.
      </p>
      <p>
        Source:{' '}
        <a href="https://en.wikipedia.org/wiki/Mario" target="_blank">
          Wikipedia
        </a>
      </p>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            
        </Tabs>
            </div>
          

            </div>
            <div className='DSleft'>
                <Dsa />
            </div>
            <div className='DSright'>
            <Collapsible label="Linked List">
                        <h1>Linked List</h1>
                        <p>A linked list is a linear data structure that includes a series of connected nodes. Here, each node stores the data and the address of the next node.Linked lists can be of multiple types: singly, doubly, and circular linked list.
                        </p>
                        <h1>Applications</h1>
                        <p><ol><li>Dynamic memory allocation</li><li>Implemented in stack and queue</li><li>In undo functionality of softwares</li><li>Hash tables, Graphs</li></ol></p>
            </Collapsible>
            <Collapsible label="Queue">
                        <h1>Queue</h1>
                        <p> A queue is a useful data structure in programming. It is similar to the ticket queue outside a cinema hall, where the first person entering the queue is the first person who gets the ticket.Queue follows the First In First Out (FIFO) rule - the item that goes in first is the item that comes out first.
                        </p>
                        <h1>Priority Queue</h1>
                        <p>A priority queue is a special type of queue in which each element is associated with a priority value. And, elements are served on the basis of their priority. That is, higher priority elements are served first.However, if elements with the same priority occur, they are served according to their order in the queue.</p>
            </Collapsible>
            <Collapsible label="Tree">
                        <h1>Tree</h1>
                        <p>A tree is a nonlinear hierarchical data structure that consists of nodes connected by edges.Different tree data structures allow quicker and easier access to the data as it is a non-linear data structure.
                        </p>
                        <h1>Applications</h1>
                        <p>
<ol><li> Binary Search Trees(BSTs) are used to quickly check whether an element is present in a set or not.</li>
<li> Heap is a kind of tree that is used for heap sort.</li>
<li> A modified version of a tree called Tries is used in modern routers to store routing information.</li>
<li> Most popular databases use B-Trees and T-Trees, which are variants of the tree structure we learned above to store their data</li>
<li> Compilers use a syntax tree to validate the syntax of every program you write.</li>
</ol>
                        </p>
                       
            </Collapsible>
            </div>
        </div>
    );
}