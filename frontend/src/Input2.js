import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
  });

export default function Input2(props) {
    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState(null);
    const [length, setLength] = useState();
    const [frequency, setFrequency] = useState();
    const [softDict, setSoftDict] = useState({});

    function onUpload() {
        const tempDict = {};
        tempDict["title"] = title;
        tempDict["length"] = length;
        tempDict["frequency"] = frequency;
        const newDict = copy(softDict);
        newDict[Object.keys(softDict).length] = tempDict;
        setSoftDict(newDict);
        console.log(softDict);

        // Fetch request
        const opts = {
          method: "POST",
          body: {"hardDict": props.hardDict, "softDict": softDict}
        }
        fetch(`/api/get-times`, opts).then(r => r.json()).then(r => console.log(r)).catch(error => console.log(error));
        
        // Set values to null
        setTitle("");
        setLength("");
        setFrequency("");
    }


    function copy(mainObj) {
        const objCopy = {}; // objCopy will store a copy of the mainObj
      
        for (let key in mainObj) {
          objCopy[key] = mainObj[key]; // copies each property to the objCopy object
        }
        return objCopy;
      }

    return (
        <div className="body1">
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
          <Typography variant="h3">
            Enter Optional Commitments
          </Typography>
          
          <br /> <br />
            
          <form noValidate autoComplete="off">
            <Typography variant="h6" color="default">
                Enter Name of Commitment
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
            <Typography variant="h6" color="default">
                Enter Length (in Minutes)
            </Typography>
            <TextField 
              className={classes.textField}
              label="Length"
              variant="outlined"
              color="secondary"
              required
              value={length}
              onChange={(e) => {setLength(e.target.value)}}
              />
              <Typography variant="h6" color="default">
                Enter Frequency (# per Week)
            </Typography>
              <TextField 
              className={classes.textField}
              label="Frequency"
              variant="outlined"
              color="secondary"
              required
              value={frequency}
              onChange={(e) => {setFrequency(e.target.value)}}
              />
          </form>

          
        <Button onClick={onUpload} startIcon={<CloudUploadIcon />} variant="contained" color="primary">Upload Event</Button>
        <br /> <br />
        <Button onClick={() => {history.push("/calendar")}} variant="contained">Next</Button>
        <br /> 
        <Button onClick={() => {history.push("/input1")}} variant="contained">Back</Button>
      </Grid>
        </div>
    )
}