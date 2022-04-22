import React, {useEffect, useState} from 'react'
import Axios from 'axios'

export default function QuizList(){

    useEffect(() =>{
        Axios.get('http://localhost:3001/api/admin/get_questions').then((response)=>{
          setQuestionSets(response.data);
        //   console.log(response.data)
        })
      },[])
      
    const [questionSets, setQuestionSets] = useState([]);

    function DeleteQuestion(q_id){
        console.log(questionSets)
        Axios.delete(`http://localhost:3001/api/admin/delete_question/${q_id}`);
          const updatedQuestions = questionSets.filter(val => val.question_id != q_id);
          setQuestionSets([...updatedQuestions]);
        console.log(questionSets)
    }

    return(
        <div>
            {questionSets.map((val, index)=> 
        <div class="grid-questions">
            <div id="quiz-content0">Question {index+1}</div>
            <div id="quiz-content1">Question Type:{val.question_type}</div>
            <div id="quiz-content2">Question Content:{val.question_content}</div>
            <div id="quiz-content3">Question Choices:{val.question_choices}</div>
            <div id="quiz-content4">Correct Answer:{val.correct_answer}</div>
            <button class="quiz_editButton">Edit Question</button>
            <br></br>
            <button class="quiz_deleteButton" onClick={()=>{DeleteQuestion(val.question_id)}}>Delete Question</button>
        </div>
        )
        }
        </div>
    )
}