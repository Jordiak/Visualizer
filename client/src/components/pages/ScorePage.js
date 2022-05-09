import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

export default function ScorePage(){

    const [scoreList, setScoreList] = useState([]);

     //get scorelist
     useEffect(() => {
        Axios.get('http://localhost:3001/api/scoreList/get').then((response)=>{
          setScoreList(response.data);
  
      });
    } , [])

    
    
    return(
        <div className="InformationBox1">
            <div className="cardholder">
            {
                scoreList.map((item)=>{
                    return (
                     <div className="card">
                        {item.useremail_reg}
                        <br/>
                        {item.user_score}
                        <br/>
                        {item.questions_total}
                        <br/>
                        {item.quiz_taken}
                     </div>
                )})
            }
            </div>
        </div>
    )
}