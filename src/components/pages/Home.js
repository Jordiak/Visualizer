import React from 'react';


const Home = () => {
    const handleClick = () =>{
        var array = Array.from({length: 10}, () => Math.floor(Math.random() * 50))
        console.log(array.join(",").toString());
    }

    return(
        <div className='Home'>
            {/* <h1>HOME</h1> */}
            <label htmlFor='quantity'>Number of Items :</label>
            <input type={Int32Array} id='quantity' name='quantity' min={1} max={10}></input>
            <button onClick={handleClick} className='btn'>Button</button>
        </div>
    );
}

export default Home;