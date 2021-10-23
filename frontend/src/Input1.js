import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateTimePicker from 'react-datetime-picker';

const useStyles = makeStyles({
    textField: {
      marginTop: 20,
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
    const [endDate, setEndDate] = useState(null);
    const [hardDict, setHardDict] = useState({});

    function onUpload() {
        const tempDict = {};
        tempDict["title"] = title;
        tempDict["startDate"] = startDate;
        tempDict["endDate"] = endDate;
        const newDict = copy(hardDict);
        newDict[Object.keys(hardDict).length] = tempDict;
        setHardDict(newDict);
        console.log(hardDict);
    }

    function copy(mainObj) {
        const objCopy = {}; // objCopy will store a copy of the mainObj
      
        for (let key in mainObj) {
          objCopy[key] = mainObj[key]; // copies each property to the objCopy object
        }
        return objCopy;
      }

    function onNext() {
        props.callbackFunc(hardDict);
        history.push("/input2"); 
    }

    return (
        <div>
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "80vh" }}>
          <Typography variant="h3" color="primary">
            Enter mandatory commitments
          </Typography>
          
          <br /> <br />
            
          <form noValidate autoComplete="off">
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
            <DateTimePicker
                className={classes.textField}
                onChange={setStartDate}
                value={startDate}
            />
            </div>
            <div>
            <DateTimePicker
                className={classes.textField}
                onChange={setEndDate}
                value={endDate}
            />
            </div>
        <Button onClick={onUpload} startIcon={<CloudUploadIcon />} variant="contained" color="primary">Upload Event</Button>
        <br /> <br />
        <Button onClick={onNext} variant="contained" color="secondary">Next</Button>
      </Grid>
        </div>
    )
}