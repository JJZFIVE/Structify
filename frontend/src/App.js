import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home.js';
import Calendar from './Calendar.js'
import Input1 from './Input1.js';
import Input2 from './Input2.js';

function App() {
  const [hardDict, setHardDict] = useState({});

  function hardDictCallback(data) {
    setHardDict(data);
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route exact path="/input1">
            <Input1 callbackFunc={hardDictCallback}/>
          </Route>
          <Route exact path="/input2">
            <Input2 hardDict={hardDict}/>
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
