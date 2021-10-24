import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default function Home() {
    const history = useHistory();

    return (
      <div>
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "80vh" }}>
            <Button onClick={() => history.push("/input1")} variant="contained" color="primary">Enter Site</Button>
        </Grid>
      </div>
    )
}