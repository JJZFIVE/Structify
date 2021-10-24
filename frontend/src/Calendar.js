import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,

} from '@devexpress/dx-react-scheduler-material-ui';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// 2nd parameter is monthIndex = month # - 1

/*
const appointments = [
    {
      title: 'Fuck Goldberg',
      startDate: new Date(2021, 9, 24, 9, 45),
      endDate: new Date(2021, 9, 24, 11, 15),
      priority: 3,
      location: 'Room 2',
    }, {
      title: 'Approve New Online Marketing Strategy',
      startDate: new Date(2021, 9, 25, 11, 10),
      endDate: new Date(2021, 9, 25, 12, 40),
      priority: 1,
      location: 'Room 1',
    },
  ];
  */

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.hardDict,

    };
    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      console.log(data);
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
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
            defaultCurrentDate="2021-10-24"
            defaultCurrentViewName="Week"
          />
          
          <EditingState
            onCommitChanges={this.commitChanges}
          />

        <IntegratedEditing />

          <DayView
            startDayHour={8}
            endDayHour={20}
          />
          <WeekView
            startDayHour={8}
            endDayHour={20}
          />

        <ConfirmationDialog />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>

      </Paper>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Button onClick={this.routingFunction} variant="outlined" style={{
        marginTop: 10,
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