import React from 'react';
import { NavLink } from 'react-router-dom';
import './start.scss';

const Results = (historyObj) => (
    <div className='container'>
    <h1 className='start-intro'>Quiz is end. You had {historyObj.location.state.count} correct answers. Try again!</h1>

        <NavLink to='/quiz' activeClassName='active'>
            <button className='start-btn'>START</button>
        </NavLink>
    </div>
);

export default Results;