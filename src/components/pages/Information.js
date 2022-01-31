import React from 'react';
import Collapsible from '../functions/Collapsible.js';
import SideCollapsible from '../functions/SideCollapsible';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DataStructures1 from '../images/dt.PNG';
import Algorithms from '../images/Algortihms.png';
import girl1 from '../images/girl1.gif';
import girl2 from '../images/girl2.gif';
import speechbubble from '../images/speechbubble.gif';


export default function Information(){
    return(
        <div className='Information'>
            <div className='InformationBox1'>
                <div className='leftInfo'>
                <h1 style={{color:'turquoise'}}>What are Data Structures?</h1><br/>
                Data structure is a storage that is used to <font size='+3' style={{color:'gold'}}>store and organize data</font>. It is a way of arranging data on a computer so that it can be accessed and updated <font size='+2' style={{color:'coral'}}>efficiently</font>.

                Depending on your requirement and project, it is important to choose the right data structure for your project.
                <br/><br/>

                <h1 style={{color:'turquoise'}}>Types of Data Structure</h1>
                <br/>

                <ul style={{marginLeft:'30px'}}>
                    <li><h2 >Linear data structure</h2></li>
                    In linear data structures, the elements are arranged in sequence one after the other. Since elements are <font size='+2' style={{color:'pink'}}>arranged</font> in particular order, they are easy to implement.
                    However, when the complexity of the program increases, the linear data structures might not be the best choice because of operational complexities.
                    Some popular linear data structures are array, stack, queue and linked list.
                    <br/>
                    <li><h2> Non-linear data structure</h2></li>
                    Unlike linear data structures, elements in non-linear data structures are not in any sequence. Instead they are arranged in a <font size='+2.7' style={{color:'rgb(252,190,17)'}} >hierarchical manner</font> where one element will be connected to one or more elements.
                    Non-linear data structures are further divided into graph and tree based data structures.

                    </ul>
                    <br/><h1 style={{color:'turquoise'}} >Why Use Data Structure?</h1>
                    Knowledge about data structures help you understand the working of each data structure. And, based on that you can select the right data structures for your project.

                    This helps you <font size='+2' style={{color:'gold'}}>write memory and time efficient code</font>.
               
                </div>
                <div className='rightInfo' >
                <a href='https://www.javatpoint.com/data-structure-introduction' target={"_blank"}><img src={DataStructures1} style={{width:'100%', height:'120%'}}></img></a>
                    <img src={speechbubble} style={{width:'80%', height:'80%', paddingLeft:'20%',marginTop:'-20px'}}></img>
                    <img src={girl1} style={{width:'50%', height:'50%', paddingLeft:'20%',marginTop:'-50px',transform:'scaleX(-1)'}}></img>
                   


                </div>

            </div>
            <div className='InformationDivider'>
            Algorithm Background Information
            </div>
            <div className='InformationBox2'>
                <div className='leftInfo'>
                <h1 style={{color:'turquoise'}}>What is an Algorithm?</h1><br/>

                    In computer programming terms, an algorithm is a set of <font size='+2' style={{color:'rgb(253,146,68)'}}>well-defined instructions</font> to solve a particular problem. It takes a set of input and produces a desired output. For example,

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
                    <h1 style={{color:'turquoise'}}>Importance of Algorithms</h1>
                    Algorithmic thinking, or the ability to define clear steps to solve a problem, is crucial in many different fields. Even if we’re not conscious of it, we use algorithms and algorithmic thinking all the time. Algorithmic thinking <font size='+2' style={{color:'gold'}}>allows students to break down problems and conceptualize solutions</font> in terms of discrete steps. Being able to understand and implement an algorithm requires students to practice structured thinking and reasoning abilities.
                <br/><br/><a href='https://www.programiz.com/dsa/algorithm' style={{color:'yellow'}} target={"_blank"}>Additional Information</a>
                </div>
                <div className='rightInfo' style={{alignContent:'center'}}>

                    <a href='https://www.educba.com/types-of-algorithms/' target={"_blank"}><img src={Algorithms} style={{width:'100%', height:'110%'}} ></img></a>
                    <img src={speechbubble} style={{width:'70%', height:'70%', paddingLeft:'10%',float:'right'}}></img>
                    <img src={girl2} style={{width:'70%', height:'70%', paddingLeft:'40px',marginTop:'-70px',transform:'scaleX(-1)',float:'left'}}></img>
                    

                </div>

            </div>

        </div>
    )
}