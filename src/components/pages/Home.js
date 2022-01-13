import React from 'react';
import Typewriter from 'typewriter-effect';

export default function Home(){
    return(
        <div className='Home'>
            <h4>
                <Typewriter
                    onInit={(Typewriter) => {
                        Typewriter
                        .typeString("Welcome to DSA Visualizer!")
                        .pauseFor(2000)
                        .deleteAll()
                        .typeString("Select an algorithm or data structure.")
                        .start();
                        
                    }}
                />
            </h4>
        </div>
        
        
    );
} 