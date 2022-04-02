import React, {useEffect, useState} from 'react';
import { elements, choices, answers_sets } from './QuizData';
import Swal from 'sweetalert2';

export default function Quiz(){

    const [questionNo, setQuestionNo] = useState(0);
  
    function NextQuestion(){
        let number = questionNo+1
        setQuestionNo(number)
        alert(String(choices[0]))
        var e = document.getElementById(choices[0].id);
        var strUser = e.value; // 2
        var strUser = e.options[e.selectedIndex].text; //test2
    }

    function QuizQuestion(props){
        return(
        <div>
            {choices[questionNo]}{questionNo+1}.{elements[questionNo]}
        </div>
        )
    }

    return(
        <div>
            <QuizQuestion/>
            <button onClick={NextQuestion}>Next Question</button>
        </div>
        
    )

}
