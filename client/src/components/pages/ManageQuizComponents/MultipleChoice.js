import React,{useEffect, useState} from 'react'


export default function MultipleChoiceComponent(){

    const [choiceA, setChoiceA] = useState("");
    const [choiceB, setChoiceB] = useState("");
    const [choiceC, setChoiceC] = useState("");
    const [choiceD, setChoiceD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    return(
    <div>
            <label>Choices:</label>
            <br></br>
            <label>A.</label><input name="A" type="text" value={choiceA} onChange={(e) => {setChoiceA(e.target.value)}}></input>
            <br></br>
            <label>B.</label><input name="B" type="text" value={choiceB} onChange={(e) => {setChoiceB(e.target.value)}}></input>
            <br></br>
            <label>C.</label><input name="C" type="text" value={choiceC} onChange={(e) => {setChoiceC(e.target.value)}}></input>
            <br></br>
            <label>D.</label>                        <input type="text" placeholder="Choice D" value={choiceD} name="email" id="log_email" onChange={(e) => {
                      setChoiceD(e.target.value)
                    }} ></input>
            <br></br>
        <label>Correct Answer:</label><input value={correctAnswer} type="text" onChange={(e) => {setCorrectAnswer(e.target.value)}}></input>
    </div>
    )
}