import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const Quiz = () => {
    const [question, setQuestion] = useState({});
    useEffect(() => {
        fetch(`${API_URL}/questions`).then(
            res => res.json()
        ).then(
            data => {
                const rand = Math.floor(Math.random() * data.length);
                setQuestion(data[rand]);
                console.log(data[rand]);
            }
        )
    }, []);

    return (
        <div className='container'>
          <div className='question'>{question.questionText}</div>
          <div className='question-map'><img src={question.questionMap} alt='map' /></div>
          <div className='answers'>
            <div className='ans-box'>{question.ans1}</div>
            <div className='ans-box'>{question.ans2}</div>
            <div className='ans-box'>{question.ans3}</div>
            <div className='ans-box'>{question.ans4}</div>
          </div>
        </div>
    );  
};

export default Quiz;