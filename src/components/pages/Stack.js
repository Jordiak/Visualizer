import React from 'react';
import Ran_nums from '../functions/Ran_num_input';
import { useState } from 'react';

export default function Stack(){
    const [random_numbers, setCount] = useState();
    return(
        <>
        <center><h1>STACK</h1></center>
        <Ran_nums setCount={setCount}/>
        {random_numbers}

        </>
    );
}