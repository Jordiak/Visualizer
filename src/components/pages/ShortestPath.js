import React from 'react';
import PathfindingVisualizer from '../pathFindingVisualizer/PathfindingVisualizer'
import Collapsible from '../functions/Collapsible.js';

export default function ShortestPath(){
    return(
        <div className='ShortestPath'>
            <div className='left'>
                <PathfindingVisualizer />
            </div>
            <div className='right'>
            <Collapsible label="Dijkstra's Algorithm Information">
                        <h1>Dijkstra's Algorithm</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
            </Collapsible>
            <Collapsible label="A* Search Algorithm Information">
                        <h1>A* Search Algorithm</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
            </Collapsible>
            <Collapsible label="Breadth First Search Algorithm Information">
                        <h1>Breadth First Search Algorithm</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
            </Collapsible>
            <Collapsible label="Depth First Search Algorithm Information">
                        <h1>Depth First Search Algorithm</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                            deserunt mollit anim id est laborum.
                        </p>
            </Collapsible>
            </div>
        </div>
    );
}