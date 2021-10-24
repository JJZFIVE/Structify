import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
    textField: {
      marginTop: 20,
      marginBottom: 20,
      align: "center",
      display: "block"
    },
    topMargin: {
        marginTop: 20,
        marginBottom: 5,
        align: "center",
        display: "block"
      },
      bottomMargin: {
        marginTop: 5,
        marginBottom: 20,
        align: "center",
        display: "block"
      },
  })

export default function Input1(props) {
    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [hardDict, setHardDict] = useState({});
    const [hardList, setHardList] = useState([]);

    function onUpload() {
        const tempDict = {};
        tempDict["title"] = title;
        tempDict["startDate"] = startDate;
        tempDict["endDate"] = endDate;
        const newDict = copy(hardDict);
        newDict[Object.keys(hardDict).length] = tempDict;
        setHardDict(newDict);
        const hardListCopy = [...hardList];
        // Push new dict to list that's passed in props
        hardListCopy.push(tempDict);
        setHardList(hardListCopy);
        // Set values to null
        setTitle("");

        // Fetch the hardDict in POST Request

    }

    function copy(mainObj) {
        const objCopy = {}; // objCopy will store a copy of the mainObj
      
        for (let key in mainObj) {
          objCopy[key] = mainObj[key]; // copies each property to the objCopy object
        }
        return objCopy;
      }

    function onNext() {
        // Send the list, not the dictionary
        props.callbackFunc(hardList);
        history.push("/input2"); 
    }


    return (
        <div className="body2">
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
            <button onClick={() => console.log(hardList)}>asdf;asldfs</button>
          <Typography variant="h3">
            Enter Mandatory Events
          </Typography>
          
          <br /> <br />
          <form noValidate autoComplete="off">
              <Typography variant="h6" color="default">
                Enter Name of Event
              </Typography>
            <TextField 
              className={classes.textField}
              label="Name"
              variant="outlined"
              color="secondary"
              required
              value={title}
              onChange={(e) => {setTitle(e.target.value)}}
            />
          </form>

            <div>
            <Typography variant="h6" color="default" className={classes.topMargin}>
                Start Date and Time
              </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                value={startDate}
                onChange={setStartDate}
                />
            </MuiPickersUtilsProvider>
            </div>
            <div>
            <Typography variant="h6" color="default" className={classes.topMargin}>
                End Date and Time
              </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                className={classes.bottomMargin}
                value={endDate}
                onChange={setEndDate}
                />
            </MuiPickersUtilsProvider>
            </div>
            <br />
            
        <Button onClick={onUpload} startIcon={<CloudUploadIcon />} variant="contained" color="primary" >Upload Event</Button>
        <br />
        <Button onClick={onNext} variant="contained" className={classes.topMargin}>Next</Button>
        <br /> 
        <Button onClick={() => {history.push("/preferences")}} variant="contained" >Back</Button>
        
      </Grid>
        </div>
    )
}