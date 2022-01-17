import React from 'react';
import Collapsible from '../functions/Collapsible.js';
import Dsa from './Dsa.js';
import SideCollapsible from '../functions/SideCollapsible.js';

export default function DataStructures(){
    return(
        <div className='DataStructures'>
            <div className='left-panel'>
            <SideCollapsible label = " ">
            <h1>Depth First Search</h1>
                        <p>The DFS algorithm is a recursive algorithm that uses the idea of backtracking. It involves exhaustive searches of all the nodes by going ahead, if possible, else by backtracking.
                        Here, the word backtrack means that when you are moving forward and there are no more nodes along the current path, you move backwards on the same path to find nodes to traverse. All the nodes will be visited on the current path till all the unvisited nodes have been traversed after which the next path will be selected. 

                        </p>
            </SideCollapsible>
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