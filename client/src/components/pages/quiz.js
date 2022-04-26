import React, {useEffect, useState} from 'react';
import { elements, choices, answers_sets } from './QuizData';
import Swal from 'sweetalert2';
import Axios from 'axios';

export default function Quiz(){

    const [questionSets, setQuestionSets] = useState([]);
    const [questionType, setQuestionType] = useState("Multiple Choice");

    const [answersList, setAnswersList] = useState([]);
    const separator = "`$`";
    
    var prnDt = "Today's " + new Date().toLocaleDateString('en-us', { weekday: 'long' }) + " Quiz";

    const [questionNo, setQuestionNo] = useState(0);
  
    function NextQuestion(){
        let number = questionNo+1
        setQuestionNo(number)
        var e = document.getElementById(choices[0].id);

    }

    function PrevQuestion(){
        let number = questionNo-1
        setQuestionNo(number)
    }

    function QuizQuestion(props){
        return(
        <div class="grid-questions">
            <div id="quiz-content0"><h1>Question {questionNo+1}</h1></div>
            <div id="quiz-content1">Question Type:{questionSets[questionNo]?.question_type}</div>
            <div id="quiz-content2">{questionSets[questionNo]?.question_content}</div>
            <div id="quiz-content3"><button>A. {SplitChoices(questionSets[questionNo]?.question_choices, 1)}</button></div>
            <div id="quiz-content3"><button>B. {SplitChoices(questionSets[questionNo]?.question_choices, 2)}</button></div>
            <div id="quiz-content3"><button>C. {SplitChoices(questionSets[questionNo]?.question_choices, 3)}</button></div>
            <div id="quiz-content3"><button>D. {SplitChoices(questionSets[questionNo]?.question_choices, 4)}</button></div>
            <div id="quiz-content4">Correct Answer:{questionSets[questionNo]?.correct_answer}</div>
            <br></br>
        
        </div>
        )
    }

    //Gather UserData
    useEffect(() =>{
        Axios.get('http://localhost:3001/api/admin/get_questions').then((response)=>{
          setQuestionSets(response.data);
          console.log(questionSets[0].question_choices)
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
        if(choices != null){
            switch(letter){
                case 1:
                    result = choices.split(separator)[1]
                    break
                case 2:
                    result = choices.split(separator)[2]
                    break
                case 3:
                    result = choices.split(separator)[3]
                    break
                case 4:
                    result = choices.split(separator)[4]
                    break
                default:
                    break

            }
    }
        // console.log(choices.split(". "))
        // console.log(choices.split(". ")[0].substring(0,choices.split(". ")[1].length-2));
        
        return result;
    }

    return(
        <div class="user-quiz">

            <h1>{prnDt}</h1>
            <QuizQuestion/>
            
            {questionNo >0 && questionNo+1!=questionSets.length?<div class="buttons-positioned">
                <button onClick={PrevQuestion}>Previous Question</button>
                <button onClick={NextQuestion}>Next Question</button>
            </div>: questionNo+1 == questionSets.length ?<div class="buttons-positioned">
                <button onClick={PrevQuestion}>Previous Question</button>
                <button onClick={NextQuestion}>Finish</button>
            </div>:<div class="button-next">
                <button onClick={NextQuestion}>Next Question</button></div>}
            {questionNo+1 + " of " + questionSets.length}
        </div>
        
    )

}
