import React from 'react';
import Ran_nums from '../functions/Ran_num_input';
import { useState } from 'react';

export default function Stack(){

    const [int_array, setArray] = useState([])

    const loop_Values = () =>{
        var numbers = {random_numbers};
        var intArray = [];
        var i;
        try {
            console.log(numbers["random_numbers"].split(","));
            var strArray = numbers["random_numbers"].split(",");
            for(i = 0; i < strArray.length; i++) {
                intArray[i] = parseInt(strArray[i]);
            }
            setArray(intArray)
            console.log(intArray)

        } catch (error) {
            console.log("ran num has no value");
        }

    }

    const [random_numbers, setCount] = useState();
    const ran = random_numbers;
    return(
        <>
        <center><h1>STACK</h1></center>
        <Ran_nums setCount={setCount}/>
        String array:{ran}
        <br></br>
        Integer array:{int_array} (to be used in animating the stack)
        <center>
        <button onClick={() =>loop_Values()} className='btn'>Generate Stack</button>
             </center>

        <ul>
        {int_array.map((value, index) => {
            return <li key={index}>{value}</li>
        })}
        </ul>
        </>
    );
}