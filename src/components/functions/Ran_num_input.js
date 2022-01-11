import React from 'react';
import { useState } from 'react';

const Ran_nums = () => {
    const [ran_numbers, setData] = useState("")

    const handleClick = (value) =>{
        if(Number.isNaN(value))
            setData("Enter numerical values only")
        else{
            var array = Array.from({length: value}, () => Math.floor(Math.random() * 50))
            var result = array.join(",").toString();
            if(value == "")
                setData("Enter the number of random numbers to be generated")
            else
                setData(result)
        }
    }

    return(
        <div className='Stack'>
            {/* <h1>HOME</h1> */}
            <label htmlFor='quantity'>Number of Items :</label>
            <input type="number" id='quantity' name='quantity' min={1} max={10}></input>
            <button onClick={() =>handleClick(parseInt(document.getElementById("quantity").value))} className='btn'>Enter</button>
             <label>Results:</label><input type="text" value={ran_numbers}></input>
        </div>
    );
}

export default Ran_nums;