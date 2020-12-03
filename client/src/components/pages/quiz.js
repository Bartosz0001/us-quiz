import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { API_URL } from '../../config';

import './quiz.scss';

const Quiz = () => {
    let [question, setQuestion] = useState({});
    let [time, setTime] = useState(30);
    let [intervalId, setIntervalId] = useState();
    let [chosenAnswer, chooseAnswer] = useState({whichChosen: '', answer: ''});
    let [isCorrect, checkIsCorrect] = useState(false);
    let [isWrong, checkIsWrong] = useState(false);
    let [reloads, reload] = useState(0);
    let history = useHistory();

    useEffect(() => {
        chooseAnswer({whichChosen: '', answer: ''});
        checkIsCorrect(false);
        setTime(30);

        fetch(`${API_URL}/questions`).then(
            res => res.json()
        ).then(
            data => {
                const rand = Math.floor(Math.random() * data.length);
                setQuestion(data[rand]);

                const countTime = setInterval(() => {
                    setTime(count => count - 1);
                }, 1000);

                setIntervalId(countTime);

                return () => clearInterval(countTime);
            }
        )
    }, [reloads]);

    useEffect(() => {
        if(chosenAnswer.answer !== '') {
            clearInterval(intervalId);
            const checking = setTimeout(() => {
                if(chosenAnswer.answer === question.ansCorrect) {
                    checkIsCorrect(true);
                    const waitToRedirect = setTimeout(() => {
                        reloads++;
                        reload(reloads);
                    }, 1000);
                    return () => clearTimeout(waitToRedirect);
                }
                else {
                    checkIsWrong(true);
                    const waitToRedirect = setTimeout(() => history.push('/results'), 1000);
                    return () => clearTimeout(waitToRedirect);
                }
            }, 2000);
            return () => clearTimeout(checking);
        }  
    }, [chosenAnswer]);

    useEffect(() => {
        if(time === 0) history.push('results');
    }, [time]);

    return (
        <div className='container'>
          <div className='timer'><h2 className='time'>{time}</h2></div>
          <div className='question'><h1 className='question-text'>{question.questionText}</h1></div>
          <div className='question-map'><img src={question.questionMap} alt='map' /></div>
          <div className='answers'>
            <div className='ans-box'>
                <button className={'ans-btn ' + 
                (chosenAnswer.whichChosen === 'ans1' ? 'chosen' : '') + 
                (isCorrect ? '_correct' : '') +
                (isWrong ? '_wrong' : '')} 
                onClick={() => chooseAnswer({whichChosen: 'ans1', answer: question.ans1})}>{question.ans1}
                </button>
            </div>
            <div className='ans-box'>
                <button className={'ans-btn ' + 
                (chosenAnswer.whichChosen === 'ans2' ? 'chosen' : '') + 
                (isCorrect ? '_correct' : '') +
                (isWrong ? '_wrong' : '')} 
                onClick={() => chooseAnswer({whichChosen: 'ans2', answer: question.ans2})}>{question.ans2}
                </button>
            </div>
            <div className='ans-box'>
                <button className={'ans-btn ' + 
                (chosenAnswer.whichChosen === 'ans3' ? 'chosen' : '') + 
                (isCorrect ? '_correct' : '') +
                (isWrong ? '_wrong' : '')} 
                onClick={() => chooseAnswer({whichChosen: 'ans3', answer: question.ans3})}>{question.ans3}
                </button>
            </div>
            <div className='ans-box'>
                <button className={'ans-btn ' + 
                (chosenAnswer.whichChosen === 'ans4' ? 'chosen' : '') + 
                (isCorrect ? '_correct' : '') +
                (isWrong ? '_wrong' : '')} 
                onClick={() => chooseAnswer({whichChosen: 'ans4', answer: question.ans4})}>{question.ans4}
                </button>
            </div>
          </div>
        </div>
    );  
};

export default Quiz;