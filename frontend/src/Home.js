import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
      headerMargin: {
        marginTop: 0,
        marginBottom: 100,
        align: "center",
        display: "block"
      }
  });

export default function Home() {
    const history = useHistory();
    const classes = useStyles();


    return (
      <div className="body1">
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "80vh" }}>
        <Typography variant="h2" className={classes.headerMargin}>
            Structify
        </Typography>
            <Button onClick={() => history.push("/preferences")} variant="contained" color="primary">Enter Site</Button>
        </Grid>
      </div>
    )
}