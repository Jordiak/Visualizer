import React, {useEffect, useState} from 'react';
import { elements, choices, answers_sets } from './QuizData';
import Swal from 'sweetalert2';
import Axios from 'axios';

export default function Quiz(){

    const [questionSets, setQuestionSets] = useState([]);
    const [questionType, setQuestionType] = useState("Multiple Choice");

    const [answersList, setAnswersList] = useState([]);
    
    var prnDt = "Today's " + new Date().toLocaleDateString('en-us', { weekday: 'long' }) + " Quiz";

    // const [questionNo, setQuestionNo] = useState(0);
  
    // function NextQuestion(){
    //     let number = questionNo+1
    //     setQuestionNo(number)
    //     alert(String(choices[0]))
    //     var e = document.getElementById(choices[0].id);
    //     var strUser = e.value; // 2
    //     var strUser = e.options[e.selectedIndex].text; //test2
    // }

    // function QuizQuestion(props){
    //     return(
    //     <div>
    //         {choices[questionNo]}{questionNo+1}.{elements[questionNo]}
    //     </div>
    //     )
    // }

    //Gather UserData
    useEffect(() =>{
        Axios.get('http://localhost:3001/api/admin/get_questions').then((response)=>{
          setQuestionSets(response.data);
          
        //   console.log(response.data)
        })
      },[])
    
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/admin/quiz_id/get').then((response)=>{
            // alert(response.data[0].question_id)
            // alert(response.data && response.data.length == 0)   
            // try {
            //     console.log(response[0].question_id)
            // } catch (error) {
            //     // alert(response.data[0].question_id)   
            //     alert("Empty")
            // }
            // alert(response.data[0].question_id)
            // setHighestID(response.data[0].question_id);
        })

    },[])

    function SplitChoices(choices, letter){
        //1 = A   2 = B  3 = C  4 = D

        let result = "";

        switch(letter){
            case 1:
                result = choices.split(". ")[1].substring(0,choices.split(". ")[1].length-2)
                break
            case 2:
                result = choices.split(". ")[2].substring(0,choices.split(". ")[1].length-3)
                break
            case 3:
                result = choices.split(". ")[3].substring(0,choices.split(". ")[1].length-5)
                break
            case 4:
                result = choices.split(". ")[4].substring(0,choices.split(". ")[1].length)
                break
            default:
                break

        }
        // console.log(choices.split(". "))
        // console.log(choices.split(". ")[0].substring(0,choices.split(". ")[1].length-2));
        
        return result;
    }

    return(
        <div class="user-quiz">
            {/* <QuizQuestion/> */}
            <h1>{prnDt}</h1>
            {questionSets.map((val, index)=> 
        <div class="grid-questions">
            <div id="quiz-content0"><h1>Question {index+1}</h1></div>
            <div id="quiz-content1">Question Type:{val.question_type}</div>
            <div id="quiz-content2">{val.question_content}</div>
            <div id="quiz-content3"><button>A. {SplitChoices(val.question_choices, 1)}</button></div>
            <div id="quiz-content3"><button>B. {SplitChoices(val.question_choices, 2)}</button></div>
            <div id="quiz-content3"><button>C. {SplitChoices(val.question_choices, 3)}</button></div>
            <div id="quiz-content3"><button>D. {SplitChoices(val.question_choices, 4)}</button></div>
            <div id="quiz-content4">Correct Answer:{val.correct_answer}</div>
            <br></br>
            
        </div>
        )
        }
            {/* <button onClick={NextQuestion}>Next Question</button> */}
        </div>
        
    )

}
