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
  const [hardDict, setHardDict] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [test, setTest] = useState([{
    title: 'Test',
      startDate: new Date(2021, 9, 24, 9, 45),
      endDate: new Date(2021, 9, 24, 11, 15),
      priority: 3,
      location: 'Room 2',
  }]);

  function hardDictCallback(data) {
    setHardDict(data);
    console.log(data);
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
            <Calendar hardDict={hardDict}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
