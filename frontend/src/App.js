import React, {useState} from 'react';
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
  const [hardDict, setHardDict] = useState({
    0: 
    {
      title: 'TAMID GBM',
      startDate: new Date(2021, 9, 24, 17, 0),
      endDate: new Date(2021, 9, 24, 18, 0),
    }, 
    1: {
      title: 'COMPSCI 101',
      startDate: new Date(2021, 9, 25, 10, 15),
      endDate: new Date(2021, 9, 25, 11, 30),
    },
    2: {
      title: 'EGR 201',
      startDate: new Date(2021, 9, 25, 12, 0),
      endDate: new Date(2021, 9, 25, 12, 50),
    },
    3: {
      title: 'PHILOSOPHY 101',
      startDate: new Date(2021, 9, 25, 13, 45),
      endDate: new Date(2021, 9, 25, 15, 0),
    },
    4: {
      title: 'TAMID Zoom',
      startDate: new Date(2021, 9, 26, 10, 0),
      endDate: new Date(2021, 9, 26, 11, 0),
    },
    5: {
      title: 'MATH 353',
      startDate: new Date(2021, 9, 26, 12, 0),
      endDate: new Date(2021, 9, 26, 13, 15),
    },
    6: {
      title: 'EGR 201 LAB',
      startDate: new Date(2021, 9, 26, 15, 45),
      endDate: new Date(2021, 9, 26, 17, 15),
    },
    7: {
      title: 'Duke Motorsports',
      startDate: new Date(2021, 9, 26, 20, 30),
      endDate: new Date(2021, 9, 26, 22, 30),
    },
    8: {
      title: 'COMPSCI 101',
      startDate: new Date(2021, 9, 27, 10, 15),
      endDate: new Date(2021, 9, 27, 11, 30),
    },
    9: {
      title: 'EGR 201',
      startDate: new Date(2021, 9, 27, 12, 0),
      endDate: new Date(2021, 9, 27, 12, 50),
    },
    10: {
      title: 'PHILOSOPHY 101',
      startDate: new Date(2021, 9, 27, 13, 45),
      endDate: new Date(2021, 9, 27, 15, 0),
    },
    11: {
      title: 'MATH 353',
      startDate: new Date(2021, 9, 28, 12, 0),
      endDate: new Date(2021, 9, 28, 13, 15),
    },
    12: {
      title: 'EGR 201 LAB',
      startDate: new Date(2021, 9, 28, 15, 45),
      endDate: new Date(2021, 9, 28, 17, 15),
    },
    13: {
      title: "Doctor's Appointment",
      startDate: new Date(2021, 9, 28, 18, 0),
      endDate: new Date(2021, 9, 28, 18, 30),
    },
    14: {
      title: 'COMPSCI 101',
      startDate: new Date(2021, 9, 29, 10, 15),
      endDate: new Date(2021, 9, 29, 11, 30),
    },
    15: {
      title: 'EGR 201',
      startDate: new Date(2021, 9, 29, 12, 0),
      endDate: new Date(2021, 9, 29, 12, 50),
    },
    16: {
      title: 'Halloween Party',
      startDate: new Date(2021, 9, 30, 12, 0),
      endDate: new Date(2021, 9, 30, 15, 0),
    }
  });
  const [hardList, setHardList] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [test, setTest] = useState([{
    title: 'Test',
      startDate: new Date(2021, 9, 24, 9, 45),
      endDate: new Date(2021, 9, 24, 11, 15),
      priority: 3,
      location: 'Room 2',
  }]);
  const [addSoftList, setAddSoftList] = useState([]);

  function hardListCallback(data) {
    setHardList(data);
    console.log(data);
  }

  function hardDictCallback(data) {
    setHardDict(data);
    console.log(data);
  }

  function preferenceCallback(data) {
    setPreferences(data);
  }

  function addSoftListCallback(data) {
    setAddSoftList(data);
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
            <Input1 callbackFuncList={hardListCallback}/>
          </Route>
          <Route exact path="/input2">
            <Input2 hardDict={hardDict} callbackFuncAddSoftList={addSoftListCallback}/>
          </Route>
          <Route exact path="/calendar">
            <Calendar hardList={hardList} softList={addSoftList}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
