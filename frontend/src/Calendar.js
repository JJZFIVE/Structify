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

const appointments = [
    {
      title: 'TAMID GBM',
      startDate: new Date(2021, 9, 24, 17, 0),
      endDate: new Date(2021, 9, 24, 18, 0),
    }, {
      title: 'COMPSCI 101',
      startDate: new Date(2021, 9, 25, 10, 15),
      endDate: new Date(2021, 9, 25, 11, 30),
    },
    {
      title: 'EGR 201',
      startDate: new Date(2021, 9, 25, 12, 0),
      endDate: new Date(2021, 9, 25, 12, 50),
    },
    {
      title: 'PHILOSOPHY 101',
      startDate: new Date(2021, 9, 25, 13, 45),
      endDate: new Date(2021, 9, 25, 15, 0),
    },
    {
      title: 'TAMID Zoom',
      startDate: new Date(2021, 9, 26, 10, 0),
      endDate: new Date(2021, 9, 26, 11, 0),
    },
    {
      title: 'MATH 353',
      startDate: new Date(2021, 9, 26, 12, 0),
      endDate: new Date(2021, 9, 26, 13, 15),
    },
    {
      title: 'EGR 201 LAB',
      startDate: new Date(2021, 9, 26, 15, 45),
      endDate: new Date(2021, 9, 26, 17, 15),
    },
    {
      title: 'Duke Motorsports',
      startDate: new Date(2021, 9, 26, 20, 30),
      endDate: new Date(2021, 9, 26, 22, 30),
    },
    {
      title: 'COMPSCI 101',
      startDate: new Date(2021, 9, 27, 10, 15),
      endDate: new Date(2021, 9, 27, 11, 30),
    },
    {
      title: 'EGR 201',
      startDate: new Date(2021, 9, 27, 12, 0),
      endDate: new Date(2021, 9, 27, 12, 50),
    },
    {
      title: 'PHILOSOPHY 101',
      startDate: new Date(2021, 9, 27, 13, 45),
      endDate: new Date(2021, 9, 27, 15, 0),
    },
    {
      title: 'MATH 353',
      startDate: new Date(2021, 9, 28, 12, 0),
      endDate: new Date(2021, 9, 28, 13, 15),
    },
    {
      title: 'EGR 201 LAB',
      startDate: new Date(2021, 9, 28, 15, 45),
      endDate: new Date(2021, 9, 28, 17, 15),
    },
    {
      title: "Doctor's Appointment",
      startDate: new Date(2021, 9, 28, 18, 0),
      endDate: new Date(2021, 9, 28, 18, 30),
    },
    {
      title: 'COMPSCI 101',
      startDate: new Date(2021, 9, 29, 10, 15),
      endDate: new Date(2021, 9, 29, 11, 30),
    },
    {
      title: 'EGR 201',
      startDate: new Date(2021, 9, 29, 12, 0),
      endDate: new Date(2021, 9, 29, 12, 50),
    },
    {
      title: 'Halloween Party',
      startDate: new Date(2021, 9, 30, 12, 0),
      endDate: new Date(2021, 9, 30, 15, 0),
    },
    {
      title: 'Practice Coding',
      startDate: new Date(2021, 9, 26, 13, 30),
      endDate: new Date(2021, 9, 26, 14, 0),
    },
    {
      title: 'Practice Coding',
      startDate: new Date(2021, 9, 28, 14, 0),
      endDate: new Date(2021, 9, 28, 14, 30),
    },
    {
      title: 'Exercise',
      startDate: new Date(2021, 9, 25, 16, 0),
      endDate: new Date(2021, 9, 25, 17, 0),
    },
    {
      title: 'Exercise',
      startDate: new Date(2021, 9, 27, 16, 0),
      endDate: new Date(2021, 9, 27, 17, 0),
    },
    {
      title: 'Exercise',
      startDate: new Date(2021, 9, 29, 16, 0),
      endDate: new Date(2021, 9, 29, 17, 0),
    }

  ];

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log(appointments);

    this.state = {
      //data: this.props.hardDict,
      data: appointments
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
            startDayHour={10}
            endDayHour={20}
          />
          <WeekView
            startDayHour={10}
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