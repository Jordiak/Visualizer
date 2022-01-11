import React from 'react';

export default function Home(){
    return(
        <div className='Home'>
            {/* <h1>HOME</h1> */}

            <label htmlFor='quantity'>Quantity :</label>
            <input type={Int32Array} id='quantity' name='quantity' min={1} max={10}></input>
        </div>
    );
}