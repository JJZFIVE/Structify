import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Paper, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import banner from './fulllogo.png';


const useStyles = makeStyles({
    textField: {
      marginTop: 20,
      marginBottom: 20,
      align: "center",
      display: "block"
    },
    topMargin: {
        marginTop: 80,
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
      },
      paper: {
        display: 'flex',
        '& > *': {
          margin: 1
        },
        backgroundColor: "#EAEAEA"
    },
  });

export default function Home() {
    const history = useHistory();
    const classes = useStyles();


    return (
      <div>
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "95vh" }}>
        <img src={banner}/>
        <br /> <br />
        <Container>
        <Paper className={classes.paper}>
        <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={12} lg={10} direction="column" alignItems="center" justifyContent="center">
            <Typography align="center" variant="h6" className={classes.textField}>
                Too many college students fall victim to the trap of having too much free time, so we've built a custom schedule generator to fix that.
                First, input mandatory events, like classes, to form a base for your schedule. 
                Then, add your hobbies, workouts, assignments, or anything else you want to do, and sit back as we  
                automatically Structify your free time.
                </Typography>
            </Grid>
        </Grid>
        </Paper>
        </Container>

        <Button onClick={() => history.push("/preferences")} variant="contained" color="primary" size="large" className={classes.topMargin}>Enter Site</Button>
        </Grid>
        

      </div>
    )
}