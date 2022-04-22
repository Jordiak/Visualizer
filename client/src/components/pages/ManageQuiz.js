import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import MultipleChoiceComponent from './ManageQuizComponents/MultipleChoice';
export default function ManageQuiz(){

    const [questionSets, setQuestionSets] = useState([]);
    const [questionType, setQuestionType] = useState("Multiple Choice");

    const [questionContent, setQuestionContent] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    // const [choiceA, setChoiceA] = useState("");
    // const [choiceB, setChoiceB] = useState("");
    // const [choiceC, setChoiceC] = useState("");
    // const [choiceD, setChoiceD] = useState("");

    //Gather UserData
    useEffect(() =>{
        Axios.get('http://localhost:3001/api/admin/get_questions').then((response)=>{
          setQuestionSets(response.data);
        //   console.log(response.data)
        })
      },[])

    // function MultipleChoiceComponent(){
    //     const [choiceA, setChoiceA] = useState("");
    //     const [choiceB, setChoiceB] = useState("");
    //     const [choiceC, setChoiceC] = useState("");
    //     const [choiceD, setChoiceD] = useState("");
    //     return(
    //     <div>
    //             <label>Choices:</label>
    //             <br></br>
    //             <label>A.</label><input name="A" type="text" value={choiceA} onChange={(e) => {setChoiceA(e.target.value)}}></input>
    //             <br></br>
    //             <label>B.</label><input name="B" type="text" value={choiceB} onChange={(e) => {setChoiceB(e.target.value)}}></input>
    //             <br></br>
    //             <label>C.</label><input name="C" type="text" value={choiceC} onChange={(e) => {setChoiceC(e.target.value)}}></input>
    //             <br></br>
    //             <label>D.</label>                        <input type="text" placeholder="Choice D" value={choiceD} name="email" id="log_email" onChange={(e) => {
    //                       setChoiceD(e.target.value)
    //                     }} ></input>
    //             <br></br>
    //         <label>Correct Answer:</label><input value={correctAnswer} type="text" onChange={(e) => {setCorrectAnswer(e.target.value)}}></input>
    //     </div>
    //     )
    // }

    function AddQuestion(){
        Axios.post('http://localhost:3001/api/admin/insert_questions', {
            question_type: questionType,
            question_content: questionContent, 
            question_choices: "choiceA+choiceB+choiceC+choiceD",
            correct_answer: correctAnswer
        });
        setQuestionSets([
          ...questionSets,
          { question_type: questionType,
            question_content: questionContent, 
            question_choices: "choiceA+choiceB+choiceC+choiceD",
            correct_answer: correctAnswer
            },
        ])

    }

    function DeleteQuestion(q_id){
        console.log(questionSets)
        Axios.delete(`http://localhost:3001/api/admin/delete_question/${q_id}`);
          const updatedQuestions = questionSets.filter(val => val.question_id != q_id);
          setQuestionSets([...updatedQuestions]);
        console.log(questionSets)
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
            <label>Content:</label><input type="text" onChange={(e) => {setQuestionContent(e.target.value)}}></input>
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
        <br></br>
    </div>
    )

    
//     let choices = "A. BIll russel B. BIll Gates C. Steve Jobs D. Guido VAn Rossum";

// console.log(choices.split(". "))
// console.log(choices.split(". ")[3].substring(0,choices.split(". ")[1].length-2));
    
}