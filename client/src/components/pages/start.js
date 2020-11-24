import React from 'react';
import { NavLink } from 'react-router-dom';
import './start.scss';

const Start = () => (
    <div className='container'>
        <h1 className='start-intro'>Welcome to US Quiz! Click Start to begin.</h1>

        <NavLink to='/quiz' activeClassName='active'>
            <button className='start-btn'>START</button>
        </NavLink>
    </div>
);

export default Start;