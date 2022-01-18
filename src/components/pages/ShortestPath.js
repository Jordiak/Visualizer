import React from 'react';
import PathfindingVisualizer from '../pathFindingVisualizer/PathfindingVisualizer'
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible';

export default function ShortestPath(){
    return(
        <div className='ShortestPath'>
            <div className='left-panel'>
            <SideCollapsible label = " ">
            <h1>Depth First Search</h1>
                        <p>The DFS algorithm is a recursive algorithm that uses the idea of backtracking. It involves exhaustive searches of all the nodes by going ahead, if possible, else by backtracking.
                        Here, the word backtrack means that when you are moving forward and there are no more nodes along the current path, you move backwards on the same path to find nodes to traverse. All the nodes will be visited on the current path till all the unvisited nodes have been traversed after which the next path will be selected. 

                        </p>
            </SideCollapsible>
            </div>
            <div className='left'>
                <PathfindingVisualizer />
            </div>
            <div className='right'>
            <Collapsible label="Dijkstra's Algorithm Information">
                        <h2>Dijkstra's Algorithm</h2>
                        <p>Dijkstra's algorithm allows us to find the shortest path between any two vertices of a graph.It differs from the minimum spanning tree because the shortest distance between two vertices might not include all the vertices of the graph.
                        </p>
            </Collapsible>
            <Collapsible label="Breadth First Search Algorithm Information">
                        <h2>Breadth First Search</h2>
                        <p> BFS is a traversing algorithm where you should start traversing from a selected node (source or starting node) and traverse the graph layerwise thus exploring the neighbour nodes (nodes which are directly connected to source node). You must then move towards the next-level neighbour nodes.
As the name BFS suggests, you are required to traverse the graph breadthwise as follows:
1.First move horizontally and visit all the nodes of the current layer2.Move to the next layer
                        </p>
            </Collapsible>
            <Collapsible label="Depth First Search Algorithm Information">
                        <h2>Depth First Search</h2>
                        <p>The DFS algorithm is a recursive algorithm that uses the idea of backtracking. It involves exhaustive searches of all the nodes by going ahead, if possible, else by backtracking.
                        Here, the word backtrack means that when you are moving forward and there are no more nodes along the current path, you move backwards on the same path to find nodes to traverse. All the nodes will be visited on the current path till all the unvisited nodes have been traversed after which the next path will be selected. 

                        </p>
                      
            </Collapsible>
            
            </div>
        </div>
    );
}