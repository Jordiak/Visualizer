import React,{useEffect, useState} from 'react'
import Axios from 'axios'

export default function ManageQuiz(){

    const [questionSets, setQuestionSets] = useState([]);
    const [questionType, setQuestionType] = useState("Multiple Choice");

    //Gather UserData
    useEffect(() =>{
        Axios.get('http://localhost:3001/api/admin/get_questions').then((response)=>{
          setQuestionSets(response.data);
          console.log(response.data)
        })
      },[])

    function MultipleChoiceComponent(){
        return(
        <div>
                <label>Choices:</label>
                <br></br>
                <label>A.</label><input type="text"></input>
                <br></br>
                <label>B.</label><input type="text"></input>
                <br></br>
                <label>C.</label><input type="text"></input>
                <br></br>
                <label>D.</label><input type="text"></input>
                <br></br>
            <label>Correct Answer:</label><input type="text"></input>
        </div>
        )
    }

    function AddQuestion(){

    }

    function ChangeChoices(event){
        setQuestionType(event.target.value)
    }


    return(
    <div>

        <div class="quiz-maker-container">
            <h1>Today's Quiz</h1>
            <h2>Question Number</h2>
            <br></br>
            <label>Type:</label>
            <select onChange={(event)=>ChangeChoices(event)} name="type" id="type">
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
            <option value="True or False">True or False</option>
            </select>
            <br></br>
            <label>Content:</label><input type="text"></input>
                <br></br>
            {questionType == "Multiple Choice" ?  <MultipleChoiceComponent/>
            : questionType == "Fill in the Blank" ?  <div><label>Correct Answer:</label><input type="text"></input></div> : questionType == "True or False" ? 
            <div>
                <label>Correct Answer:</label>
                <select onChange={(event)=>ChangeChoices(event)} name="type" id="type">
                <option value="True">True</option>
                <option value="False">False</option>
                </select>
            </div> :""}

            <br></br>
            <button onClick={AddQuestion}>Add Question</button>

            
        </div>
        {questionSets.map((val, index)=> 
        <div class="grid-container">
            <div id="quiz-content0">Question {index+1}</div>
            <div id="quiz-content1">{val.question_type}</div>
            <div id="quiz-content2">{val.question_content}</div>
            <div id="quiz-content3">{val.question_choices}</div>
            <div id="quiz-content4">{val.correct_answer}</div>

        </div>
        )
        }
    </div>
    )
    
}