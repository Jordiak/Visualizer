import React, {useEffect, useState, useRef, useReducer} from 'react';
import { elements, choices, answers_sets } from './QuizData';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactSession from 'react-client-session/dist/ReactSession';

export default function Quiz(){
    let history = useHistory();

    function enterLogin(){
        history.push("/login-form");
    }

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [questionSets, setQuestionSets] = useState([]);
    const answers = useRef({});
    const [currentBlankAnswer, setCurrentBlankAnswer] = useState("");
    const separator = "`$`";
    
    var prnDt = "Today's " + new Date().toLocaleDateString('en-us', { weekday: 'long' }) + " Quiz";

    const [questionNo, setQuestionNo] = useState(0);
  
    function NextQuestion(){
        let number = questionNo+1
        setQuestionNo(number)
        setCurrentBlankAnswer(answers.current[parseInt(questionNo+1)]);
    }

    function PrevQuestion(){
        let number = questionNo-1
        setQuestionNo(number)
        setCurrentBlankAnswer(answers.current[parseInt(questionNo-1)]);
    }

    function FillAnswer(answer){
        answers.current[parseInt(questionNo)] = answer
    }

    function SelectAnswer(answer){
        answers.current[parseInt(questionNo)] = answer
        forceUpdate()
        console.log(answers.current)
    }

    function FinishQuiz(){

        Swal.fire({
            icon: 'error',
            title: 'Logged out'
        })

        Swal.fire({
            title: 'Submit Answers?',
            text: "Your scores will be updated upon submission.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'No',
            cancelButtonText:'Yes'
        }).then((result) => {
            if (!result.isConfirmed) {
                let score = 0;

                for(let i=0;i<questionSets.length;i++){
                    if(questionSets[i].correct_answer == answers.current[i])
                        score++;
                }
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
                var timeSQL = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                var dateTimeSQL = date+' '+timeSQL;
        
                Axios.post('http://localhost:3001/api/quiz_finish', {
                    Reg_email: "usernamex",
                    User_score: score, 
                    Q_total: questionSets.length,
                    Q_taken: dateTimeSQL
                });

                Swal.fire(
                    'Success!',
                    'Quiz score recorded!  ' +"Result:"+score +"/" +questionSets.length,
                    'success')
            }
        })
        // alert(score)

    
    }

    function QuizQuestion(props){
        return(
        <div class="grid-questions">
            <div id="quiz-content0">Question {questionNo+1}</div>
            {questionSets[questionNo]?.question_type == "Multiple Choice" ?
            <div>
                <div id="quiz-content1">Question Type:{questionSets[questionNo]?.question_type}</div>
                <div id="quiz-content2">{questionSets[questionNo]?.question_content}</div>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "A" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("A")}} >A. {SplitChoices(questionSets[questionNo]?.question_choices, 1)}</button></div>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "B" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("B")}}>B. {SplitChoices(questionSets[questionNo]?.question_choices, 2)}</button></div>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "C" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("C")}}>C. {SplitChoices(questionSets[questionNo]?.question_choices, 3)}</button></div>
                <div id="quiz-content3"><button id={answers.current[questionNo] == "D" ? "selected_button" : "quiz-contentx"} onClick={()=>{SelectAnswer("D")}}>D. {SplitChoices(questionSets[questionNo]?.question_choices, 4)}</button></div>
                <div id="quiz-content4">Correct Answer:{questionSets[questionNo]?.correct_answer}</div>
                <br></br>
            </div> : questionSets[questionNo]?.question_type == "True or False" ? 
            <div>
                <div id="quiz-content1">Question Type:{questionSets[questionNo]?.question_type}</div>
                <div id="quiz-content2">{questionSets[questionNo]?.question_content}</div>
                <div id="quiz-content3"><button onClick={()=>{SelectAnswer("True")}} id={answers.current[questionNo] == "True" ? "selected_button_tf" : "true_button"}>True</button></div>
                <div id="quiz-content3"><button onClick={()=>{SelectAnswer("False")}} id={answers.current[questionNo] == "False" ? "selected_button_tf" : "false_button"}>False</button></div>
                <div id="quiz-content4">Correct Answer:{questionSets[questionNo]?.correct_answer}</div>
            </div> 

            : questionSets[questionNo]?.question_type == "Fill in the Blank" ? 
            <div > 
                <div id="quiz-content1">Question Type:{questionSets[questionNo]?.question_type}</div>
                <div id="quiz-content2">{questionSets[questionNo]?.question_content}</div> 
                <div id="fillDiv">Answer:  <input id="fillInput" type="text" placeholder={currentBlankAnswer} onChange={(e) => {FillAnswer(e.target.value)}}></input></div>
                <div id="quiz-content4">Correct Answer:{questionSets[questionNo]?.correct_answer}</div>
            </div>


           : ""}

        
        </div>
        )
    }

    //Gather quiz questions
    useEffect(() =>{
        Axios.get('http://localhost:3001/api/admin/get_questions').then((response)=>{
          setQuestionSets(response.data);
        //   console.log(questionSets[0].question_choices)
        //   console.log(response.data)
        console.log(response.data)

        for (let i=0;i<response.data.length;i++){//Creation of answer holder
            answers.current[i] = null
        }

        // alert(response.data.length)
        // console.log(answers.current)
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
        <div className="user-quiz">
            <h1 id="quizSign">{prnDt}</h1>

        <div>

{ReactSession.get("email") != undefined ? 
            //Logged in
          <div className="quizInnerDiv">
            
            <QuizQuestion/>
            
            {questionNo+1 == 1 && questionNo+1 == questionSets.length ? <div class="button-next">
                <button id="buttonQuizz" onClick={NextQuestion}>Finish</button></div>:questionNo >0 && questionNo+1!=questionSets.length?<div class="buttons-positioned">
                <button id="buttonQuizz" onClick={PrevQuestion}>Previous Question</button>
                <button id="buttonQuizz" onClick={NextQuestion}>Next Question</button>
            </div>: questionNo+1 == questionSets.length ?<div class="buttons-positioned">
                <button id="buttonQuizz" onClick={PrevQuestion}>Previous Question</button>
                <button id="buttonQuizz" onClick={FinishQuiz}>Finish</button>
            </div>:<div class="button-next">
                <button id="buttonQuizz" onClick={NextQuestion}>Next Question</button></div>}
            {questionNo+1 + " of " + questionSets.length}
            </div>
            
                    :// :Not logged in

            <div>
                <h1>Please register or sign in to continue.</h1>
                <center><button onClick={enterLogin}>Login</button></center>
            </div>}

            
        </div>

        </div>
        
    )

}
