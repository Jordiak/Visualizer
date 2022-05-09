import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import { answers_sets } from './QuizData';
export default function ManageQuiz(){

    const [questionSets, setQuestionSets] = useState([]);
    const [questionType, setQuestionType] = useState("Multiple Choice");

    const [highestID, setHighestID] = useState(0)
    const [questionContent, setQuestionContent] = useState("")
    const [choiceA, setChoiceA] = useState("");
    const [choiceB, setChoiceB] = useState("");
    const [choiceC, setChoiceC] = useState("");
    const [choiceD, setChoiceD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const separator = "`$`";


    useEffect(() =>{
        Axios.get('http://localhost:3001/api/admin/get_questions').then((response)=>{
          setQuestionSets(response.data);
        //   console.log(response.data)
        })
      },[])
    
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/admin/quiz_id/get').then((response)=>{
            setHighestID(response.data[0].question_id);
        })

    },[])


    function AddQuestion(q_type){

        switch(q_type){
            case "Multiple Choice":
                Axios.post('http://localhost:3001/api/admin/insert_questions', {
                question_type: questionType,
                question_content: questionContent, 
                question_choices: separator+choiceA+separator+choiceB+separator+choiceC+separator+choiceD,
                correct_answer: correctAnswer
                });
                setQuestionSets([
                ...questionSets,
                { question_id: highestID+1,
                    question_type: questionType,
                    question_content: questionContent, 
                    question_choices:  separator+choiceA+separator+choiceB+separator+choiceC+separator+choiceD,
                    correct_answer: correctAnswer
                    },
                ])
                break;
            case "Fill in the Blank":
                Axios.post('http://localhost:3001/api/admin/insert_questions', {
                question_type: questionType,
                question_content: questionContent, 
                question_choices: "none",
                correct_answer: correctAnswer
                });
                setQuestionSets([
                ...questionSets,
                { question_id: highestID+1,
                    question_type: questionType,
                    question_content: questionContent, 
                    question_choices:  "none",
                    correct_answer: correctAnswer
                    },
                ])
                break;
            case "True or False":
                Axios.post('http://localhost:3001/api/admin/insert_questions', {
                question_type: questionType,
                question_content: questionContent, 
                question_choices: "true"+separator+"false",
                correct_answer: correctAnswer
                });
                setQuestionSets([
                ...questionSets,
                { question_id: highestID+1,
                    question_type: questionType,
                    question_content: questionContent, 
                    question_choices:  "true"+separator+"false",
                    correct_answer: correctAnswer
                    },
                ])
                break;
            default:
                break;
        }
        setQuestionContent("")
        setCorrectAnswer("")
        setChoiceA("")
        setChoiceB("")
        setChoiceC("")
        setChoiceD("")
        setHighestID(highestID+1)

        console.log(questionSets)

        let quest_content = document.getElementById("question_content");
        quest_content.value = "";

    }

    const [questionEditId, setQuestionEditId] = useState(-1) 
    const [editMode, setEditMode] = useState(false)
    const [tempQuestionContent, setTempQuestionContent] = useState("")
    const [tempChoiceA, setTempChoiceA] = useState("");
    const [tempChoiceB, setTempChoiceB] = useState("");
    const [tempChoiceC, setTempChoiceC] = useState("");
    const [tempChoiceD, setTempChoiceD] = useState("");
    const [tempCorrectAnswer, setTempCorrectAnswer] = useState("");
    const [tempQuestionType, setTempQuestionType] = useState("");

    function EditQuestion(q_id,q_content,choices,corr_answer,q_type){
        if(editMode){
            setEditMode(false)
            setQuestionEditId(-1)
            setTempChoiceA("")
            setTempChoiceB("")
            setTempChoiceC("")
            setTempChoiceD("")
        }
        else{
            setTempQuestionContent(q_content)
            if(q_type == "Multiple Choice")
            {
                setTempChoiceA(choices.split("`$`")[1])
                setTempChoiceB(choices.split("`$`")[2])
                setTempChoiceC(choices.split("`$`")[3])
                setTempChoiceD(choices.split("`$`")[4])
            }
            setTempCorrectAnswer(corr_answer)
            setTempQuestionType(q_type)

            setQuestionEditId(q_id)
            setEditMode(true)
        }
    }

    function UpdateQuestion(q_id){
        if(tempQuestionType == "Multiple Choice"){
            console.log("Question ID:"+q_id+" Type:"+tempQuestionType+
            " content:" +tempQuestionContent + " choices: " 
            + tempChoiceA+separator+tempChoiceB+separator+tempChoiceC+separator+tempChoiceD+separator
             + " answer:"+tempCorrectAnswer)

             setQuestionSets(questionSets.map((val) => {   //maps comment for updating
                return val.question_id == q_id?{question_id:q_id,
                    question_type:tempQuestionType,question_content:tempQuestionContent,
                    question_choices:tempChoiceA+separator+tempChoiceB+separator+tempChoiceC+
                    separator+tempChoiceD+separator,correct_answer:tempCorrectAnswer}:val
              }))

              Axios.put('http://localhost:3001/api/quiz_admin/update',{
                question_id: q_id,
                question_type: tempQuestionType,
                question_content: tempQuestionContent,
                question_choices: tempChoiceA+separator+tempChoiceB+separator+tempChoiceC+
                separator+tempChoiceD+separator,
                correct_answer:tempCorrectAnswer
              } )
        }
        else{
            console.log("Question ID:"+q_id+" Type:"+tempQuestionType+
            " content:" +tempQuestionContent + " choices: " 
            + "none" + " answer:"+tempCorrectAnswer)
            setQuestionSets(questionSets.map((val) => {   //maps comment for updating
                return val.question_id == q_id?{question_id:q_id,question_type:tempQuestionType,question_content:tempQuestionContent,question_choices:"none",correct_answer:tempCorrectAnswer}:val
              }))

              Axios.put('http://localhost:3001/api/quiz_admin/update',{
                question_id: q_id,
                question_type: tempQuestionType,
                question_content: tempQuestionContent,
                question_choices: "none",
                correct_answer:tempCorrectAnswer
              } )
        }
    }

    function DeleteQuestion(q_id){
        console.log(questionSets)
        Axios.delete(`http://localhost:3001/api/admin/delete_question/${q_id}`);
          const updatedQuestions = questionSets.filter(val => val.question_id != q_id);
          setQuestionSets([...updatedQuestions]);
        console.log(questionSets)

        if(questionSets.length == 1)
            Axios.delete(`http://localhost:3001/api/admin/truncate_question`);
    }

    function ChangeQuestionType(event){
        setQuestionType(event.target.value)
        switch(event.target.value)
        {
            case "Fill in the Blank":
                setCorrectAnswer("");
                break;
            case "Multiple Choice":
                setCorrectAnswer("");
                break;
            case "True or False":
                setCorrectAnswer("True");
                break;
            default:
                break;
        }
    }

    function ChangeCorrectAnswer(event){
        setCorrectAnswer(event.target.value)
    }


    return(
    <div>

        <div class="quiz-maker-container">
            <h1>Today's Quiz</h1>
            <h2>Question Number</h2>
            <br></br>
            <label>Type:</label>
            <select onChange={(event)=>ChangeQuestionType(event)} name="type" id="type">
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
            <option value="True or False">True or False</option>
            </select>
            <br></br>
            <label>Content:</label>
            <br></br>
            <textarea rows="4" id="question_content" cols="50" onChange={(e) => {setQuestionContent(e.target.value)}} name="comment"/>
                <br></br>
            {questionType == "Multiple Choice" ? <div>
            <label>Choices:</label>
                <br></br>
                <label>A.</label><input name="A" placeholder="Choice A" type="text" value={choiceA} onChange={(e) => {setChoiceA(e.target.value)}}></input>
                <br></br>
                <label>B.</label><input name="B" placeholder="Choice B" type="text" value={choiceB} onChange={(e) => {setChoiceB(e.target.value)}}></input>
                <br></br>
                <label>C.</label><input name="C" placeholder="Choice C" type="text" value={choiceC} onChange={(e) => {setChoiceC(e.target.value)}}></input>
                <br></br>
                <label>D.</label><input type="text" placeholder="Choice D" value={choiceD} name="email" id="log_email" onChange={(e) => {
                          setChoiceD(e.target.value)
                        }} ></input>
                <br></br>
            <label>Correct Answer:</label>
<div class="choices_admin_quiz">
        <input type="radio" value="A" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> <label>A</label>
        <input type="radio" value="B" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> <label>B</label>
        <input type="radio" value="C" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> <label>C</label>
        <input type="radio" value="D" name="choices_radio" onChange={(e)=>{setCorrectAnswer(e.target.value)}} /> <label>D</label>

</div>
            </div>
            : questionType == "Fill in the Blank" ?  <div><label>Correct Answer:</label>
            <input type="text"  onChange={(e) => {setCorrectAnswer(e.target.value)}}></input></div> : questionType == "True or False" ? 
            <div>
                <label>Correct Answer:</label>
                <select onChange={(event)=>ChangeCorrectAnswer(event)} name="type" id="type">
                <option value="True">True</option>
                <option value="False">False</option>
                </select>
            </div> :""}

            <br></br>
            <button onClick={()=>{(AddQuestion(questionType))}}>Add Question</button>

            
        </div>
        {questionSets.map((val, index)=> 
        <div class="grid-questions">
            <div id="quiz-content0"><h1>Question {index+1}</h1></div>
            <div id="quiz-content1">Question Type:{val.question_type}</div>
            <div id="quiz-content2">Question Content:{val.question_content}</div>
            <div id="quiz-content3">Question Choices:{val.question_choices}</div>
            <div id="quiz-content4">Correct Answer:{val.correct_answer}</div>


            <button class="quiz_editButton" onClick={()=>{EditQuestion(val.question_id, val.question_content, val.question_choices, val.correct_answer, val.question_type)}}>Edit Question</button>
            {editMode && questionEditId == val.question_id ? 
            <div>
                <div class="quiz-maker-container">
                    <h1>Today's Quiz</h1>
                    <h2>Question Number</h2>
                    <br></br>
                    <label>Type:</label>
                    <select onChange={(event)=>setTempQuestionType(event.target.value)} name="type" id="type">
                    <option selected={val.question_type == "Multiple Choice"} value="Multiple Choice">Multiple Choice</option>
                    <option selected={val.question_type == "Fill in the Blank"} value="Fill in the Blank">Fill in the Blank</option>
                    <option selected={val.question_type == "True or False"} value="True or False">True or False</option>
                    </select>
                    <br></br>
                    <label>Content:</label>
                    <br></br>
                    <textarea rows="4" id="question_content" value={tempQuestionContent} cols="50" onChange={(e) => {setTempQuestionContent(e.target.value)}} name="comment"/>
                        <br></br>
                    {tempQuestionType == "Multiple Choice" ? <div>
                    <label>Choices:</label>
                        <br></br>
                        <label>A.</label><input name="A" placeholder="Choice A" type="text" value={tempChoiceA} onChange={(e) => {setTempChoiceA(e.target.value)}}></input>
                        <br></br>
                        <label>B.</label><input name="B" placeholder="Choice B" type="text" value={tempChoiceB} onChange={(e) => {setTempChoiceB(e.target.value)}}></input>
                        <br></br>
                        <label>C.</label><input name="C" placeholder="Choice C" type="text" value={tempChoiceC} onChange={(e) => {setTempChoiceC(e.target.value)}}></input>
                        <br></br>
                        <label>D.</label><input type="text" placeholder="Choice D" value={tempChoiceD} name="email" id="log_email" onChange={(e) => {
                                setTempChoiceD(e.target.value)
                                }} ></input>
                        <br></br>

                    <label>Correct Answer:</label>
                        <div class="choices_admin_quiz">
                        {/* checked={val.correct_answer == "A"} */}
                            <input type="radio" value="A" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> <label>A</label>
                            <input type="radio" value="B" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> <label>B</label>
                            <input type="radio" value="C" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> <label>C</label>
                            <input type="radio" value="D" name="choices_radio" onChange={(e)=>{setTempCorrectAnswer(e.target.value)}} /> <label>D</label>
                        </div>
                    </div>

                    : tempQuestionType == "Fill in the Blank" ?  <div><label>Correct Answer:</label>
                    <input type="text" value={tempCorrectAnswer} onChange={(e) => {setTempCorrectAnswer(e.target.value)}}></input></div> 
                    : tempQuestionType == "True or False" ? 
                    <div>
                        <label>Correct Answer:</label>
                        <select onChange={(event)=>setTempCorrectAnswer(event.target.value)} name="type" id="type">
                        <option selected={val.correct_answer == "True"} value="True">True</option>
                        <option selected={val.correct_answer == "False"} value="False">False</option>
                        </select>
                    </div> :""}
                    <button onClick={()=>{UpdateQuestion(val.question_id)}}>Done</button>
            </div>
            </div> 
            : 
            <div>not-edit mode</div>}

            <button class="quiz_deleteButton" onClick={()=>{DeleteQuestion(val.question_id)}}>Delete Question</button>
        </div>
        )
        }
        <br></br>
    </div>
    )

    
}