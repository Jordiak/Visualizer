import React from 'react';
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DataStructures1 from '../images/DataStructures1.png';
import Algorithms from '../images/Algorithms.png';

export default function Information(){
    return(
        <div className='Information'>
            <div className='InformationBox1'>
                <div className='leftInfo'>
                <h1 style={{color:'turquoise'}}>What are Data Structures?</h1><br/>
                Data structure is a storage that is used to store and organize data. It is a way of arranging data on a computer so that it can be accessed and updated efficiently.

                Depending on your requirement and project, it is important to choose the right data structure for your project.
                <br/><br/>

                <h1 style={{color:'turquoise'}}>Types of Data Structure</h1>
                Basically, data structures are divided into two categories:<br/><br/>

                <ul style={{marginLeft:'30px'}}>
                    <li><h2>Linear data structure</h2></li>
                    In linear data structures, the elements are arranged in sequence one after the other. Since elements are arranged in particular order, they are easy to implement.
                    However, when the complexity of the program increases, the linear data structures might not be the best choice because of operational complexities.
                    Some popular linear data structures are array, stack, queue and linked list.
                    <br/><br/>
                    <li><h2> Non-linear data structure</h2></li>
                    Unlike linear data structures, elements in non-linear data structures are not in any sequence. Instead they are arranged in a hierarchical manner where one element will be connected to one or more elements.
                    Non-linear data structures are further divided into graph and tree based data structures.

                    </ul>
                    <br/><h1 style={{color:'turquoise'}} >Why Use Data Structure?</h1>
                    Knowledge about data structures help you understand the working of each data structure. And, based on that you can select the right data structures for your project.

                    This helps you write memory and time efficient code.
               
                </div>
                <div className='rightInfo'>
                    <img src={DataStructures1} style={{width:'85%', height:'85%'}}></img>
                </div>

            </div>
            <div className='InformationDivider'>
            Algorithm Background Information
            </div>
            <div className='InformationBox2'>
                <div className='leftInfo'>
                <h1 style={{color:'turquoise'}}>What is an Algorithm?</h1><br/>

                    In computer programming terms, an algorithm is a set of well-defined instructions to solve a particular problem. It takes a set of input and produces a desired output. For example,

                    An algorithm to add two numbers:
                    <ul style={{marginLeft:'30px'}}>
                    <li>Take two number inputs</li>
                    <li>Add numbers using the + operator</li>
                    <li>Display the result</li>

                    </ul><br/>
                    <h1 style={{color:'turquoise'}}>Qualities of Good Algorithms</h1>
                    <ul style={{marginLeft:'30px'}}>
                        <li>Input and output should be defined precisely.</li>
                        <li>Each step in the algorithm should be clear and unambiguous.</li>
                        <li>Algorithms should be most effective among many different ways to solve a problem.</li>
                        <li>An algorithm shouldn't include computer code. Instead, the algorithm should be written in such a way that it can be used in different programming languages.</li>
                    </ul><br/>
                    <h1 style={{color:'turquoise'}}>Importance of Algorithms?</h1>
Algorithmic thinking, or the ability to define clear steps to solve a problem, is crucial in many different fields. Even if we’re not conscious of it, we use algorithms and algorithmic thinking all the time. Algorithmic thinking allows students to break down problems and conceptualize solutions in terms of discrete steps. Being able to understand and implement an algorithm requires students to practice structured thinking and reasoning abilities.
                <br/><br/><a href='https://www.programiz.com/dsa/algorithm' style={{color:'yellow'}} target={"_blank"}>Additional Information</a>
                </div>
                <div className='rightInfo' style={{alignContent:'center'}}>

                    <a href='https://www.educba.com/types-of-algorithms/' target={"_blank"}><img src={Algorithms} ></img></a>

                </div>

            </div>

        </div>
    )
}