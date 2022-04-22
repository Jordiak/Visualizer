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
            <h1>Today's Quiz</h1>

        <div>
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
        <div>
            <table>
                <tr colspan="2" rowspan="2">
                    <td>
                    Question {index+1}
                    </td>
                </tr>
                <tr>
                    <td>
                    {val.question_type}
                    </td>
                    <td>
                    {val.question_content} 
                    </td>
                </tr>
                <tr>
                    <td>{val.question_choices}</td>
                </tr>
            </table>
            {/* Question {index+1}
            {val.question_type}
            {val.question_content}
            {val.question_choices}
            {val.correct_answer} */}

        </div>)}
    </div>
    )
    
}