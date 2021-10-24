import React, {useEffect, useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home.js';
import Calendar from './Calendar.js'
import Input1 from './Input1.js';
import Input2 from './Input2.js';
import Preferences from './Preferences.js';

function App() {
  const [hardDict, setHardDict] = useState({});
  const [preferences, setPreferences] = useState({});

  function hardDictCallback(data) {
    setHardDict(data);
  }

  function preferenceCallback(data) {
    setPreferences(data);
  }

  return (
    <div className="body">
      <Router>
        <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          <Route exact path="/preferences">
              <Preferences callbackFunc={preferenceCallback}/>
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
