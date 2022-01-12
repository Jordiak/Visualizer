import React from 'react';
import { useState } from 'react';

const Ran_nums = ({setCount}) => {
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
            setCount(result)
        }
    }

    return(
        <div>
            <center>
            <label>Results:</label><input type="text" value={ran_numbers}></input>
            <br></br>
            <label htmlFor='quantity'>Number of Items :</label>
            <input type="number" id='quantity' name='quantity' min={1} max={10}></input>
            <br></br>
            <button onClick={() =>handleClick(parseInt(document.getElementById("quantity").value))} className='btn'>Enter</button>
             </center>
        </div>
    );
}

export default Ran_nums;