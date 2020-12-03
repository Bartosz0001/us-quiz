import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Quiz from './components/pages/quiz';
import Results from './components/pages/results';

import Start from './components/pages/start';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Start} />
      <Route exact path='/quiz' component={Quiz} />
      <Route exact path='/results' component={Results} />
    </Switch>
  );
}

export default App;
