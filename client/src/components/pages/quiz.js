import React, {useEffect, useState} from 'react';

export default function Quiz(){

    const [questionNo, setQuestionNo] = useState(0);
    const elements = ['question 1', 'question 2', 'question 3'];
    const choices = ["A. Python\nB. Java\nC. C#\nD. C++", "A. Python\nB. Java\nC. C#\nD. C++",
    "A. Python\nB. Java\nC. C#\nD. C++"]
    const answers_sets = ["A", "B", "B"]

    const items = []
  
    // for (const [index, value] of elements.entries()) {
    //   items.push(<div>
    //       <p>{index+1}.{value}</p>
    //       <strong>{choices[index]}</strong>
    //   </div>)
    // }

    function QuizQuestion(props){
        return(
        <div>
            {questionNo}.{elements[questionNo]}
        </div>
        )
    }

    return(
        <div>
            <QuizQuestion/>
            <button>Next Question</button>
        </div>
        
    )

}
