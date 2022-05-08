import React,{useEffect, useState} from 'react'
import Axios from 'axios'
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
            // alert(response.data[0].question_id)
            // alert(response.data && response.data.length == 0)   
            // try {
            //     console.log(response[0].question_id)
            // } catch (error) {
            //     // alert(response.data[0].question_id)   
            //     alert("Empty")
            // }
            // alert(response.data[0].question_id)
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
        // alert(highestID)
        console.log(questionSets)

        let quest_content = document.getElementById("question_content");
        quest_content.value = "";

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
            <label>Correct Answer:</label><input value={correctAnswer} type="text" onChange={(e) => {setCorrectAnswer(e.target.value)}}></input>
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
            {/* <button class="quiz_editButton">Edit Question</button> */}
            <br></br>
            <button class="quiz_deleteButton" onClick={()=>{DeleteQuestion(val.question_id)}}>Delete Question</button>
        </div>
        )
        }
        <br></br>
    </div>
    )

    
}