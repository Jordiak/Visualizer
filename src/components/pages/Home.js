import React from 'react';


const Home = () => {
    return(
        <div className='Home'>
            {/* <h1>HOME</h1> */}
            <label htmlFor='quantity'>Number of Items :</label>
            <input type={Int32Array} id='quantity' name='quantity' min={1} max={10}></input>
            <button className='btn'>Button</button>
        </div>
    );
}

export default Home;