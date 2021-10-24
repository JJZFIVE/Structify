import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const appointments = [
    {
      title: 'Fuck Goldberg',
      startDate: new Date(2021, 10, 24, 9, 45),
      endDate: new Date(2021, 10, 27, 11, 15),
      priority: 3,
      location: 'Room 2',
    }, {
      title: 'Approve New Online Marketing Strategy',
      startDate: new Date(2018, 6, 26, 12, 0),
      endDate: new Date(2018, 6, 26, 14, 0),
      priority: 1,
      location: 'Room 1',
    },
  ];

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };
  }

  routingFunction = e => {
    this.props.history.push("/");
}

  render() {
    const { data } = this.state;

    return (
    <div>
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate="2018-07-25"
            defaultCurrentViewName="Week"
          />

          <DayView
            startDayHour={8}
            endDayHour={20}
          />
          <WeekView
            startDayHour={8}
            endDayHour={20}
          />

          <Toolbar />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>

      </Paper>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Button onClick={this.routingFunction} variant="outlined" style={{
        marginTop: 20,
        marginBottom: 5,
        align: "center",
        display: "block"
      }}>Go Back</Button>
      </Grid>
      </div>
    );
  }
}

export default withRouter(Calendar);