import React from 'react';
import Ran_nums from '../functions/Ran_num_input';
import { useState, useEffect } from 'react';

export default function Stack(){

    const intArray = [];
    useEffect(() => {
        // var i=0;
        var numbers = {random_numbers};
        var ran_numbers;
        var i;
        // if(numbers != "")
        try {
            console.log(numbers["random_numbers"].split(","));
            var strArray = numbers["random_numbers"].split(",");
            for(i = 0; i < strArray.length; i++) {
                intArray[i] = parseInt(strArray[i]);
            }
            console.log(intArray)
            // ran_numbers = numbers.split(",");   
        } catch (error) {
            console.log("ran num has no value");
        }

     });

    const [random_numbers, setCount] = useState();
    const ran = random_numbers;
    return(
        <>
        <center><h1>STACK</h1></center>
        <Ran_nums setCount={setCount}/>
        {ran}
        {intArray}
        </>
    );
}