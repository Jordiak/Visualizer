import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

export default function ScorePage(){

    const [scoreList, setScoreList] = useState([]);

     //get scorelist
     useEffect(() => {
        Axios.post('http://localhost:3001/api/scoreList/get').then((response)=>{
          setScoreList(response.data);
  
      });
    } , [])
    
    return(
        <div className="InformationBox1">
            
        </div>
    )
}