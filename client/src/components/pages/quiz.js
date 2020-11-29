import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';

import './quiz.scss';

const Quiz = () => {
    const [question, setQuestion] = useState({});
    let [time, setTime] = useState(30);

    useEffect(() => {
        fetch(`${API_URL}/questions`).then(
            res => res.json()
        ).then(
            data => {
                const rand = Math.floor(Math.random() * data.length);
                setQuestion(data[rand]);

                const timer = setTimeout(() => {
                    console.log('Time\'s up!');
                }, 30000);

                const countTime = setInterval(() => {
                    if(time > 0) {
                        time--;
                        setTime(time);
                    }
                }, 1000);

                return () => {
                    clearTimeout(timer);
                    clearInterval(countTime);
                }
            }
        )
    }, []);

    return (
        <div className='container'>
          <div className='timer'><h2 className='time'>{time}</h2></div>
          <div className='question'><h1 className='question-text'>{question.questionText}</h1></div>
          <div className='question-map'><img src={question.questionMap} alt='map' /></div>
          <div className='answers'>
            <div className='ans-box'><button className='ans-btn'>{question.ans1}</button></div>
            <div className='ans-box'><button className='ans-btn'>{question.ans2}</button></div>
            <div className='ans-box'><button className='ans-btn'>{question.ans3}</button></div>
            <div className='ans-box'><button className='ans-btn'>{question.ans4}</button></div>
          </div>
        </div>
    );  
};

export default Quiz;