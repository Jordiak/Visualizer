import React from 'react';


const Home = () => {
    const handleClick = (value) =>{
        var array = Array.from({length: value}, () => Math.floor(Math.random() * 50))
        console.log(array.join(",").toString());
    }

    return(
        <div className='Home'>
            {/* <h1>HOME</h1> */}
            <label htmlFor='quantity'>Number of Items :</label>
            <input type={Int32Array} id='quantity' name='quantity' min={1} max={10}></input>
            <button onClick={() =>handleClick(parseInt(document.getElementById("quantity").value))} className='btn'>Button</button>
        </div>
    );
}

export default Home;