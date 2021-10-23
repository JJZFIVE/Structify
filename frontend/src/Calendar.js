import * as React from 'react';

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


const appointments = [
    {
      title: 'Fuck Goldberg',
      startDate: new Date(2018, 6, 23, 9, 45),
      endDate: new Date(2018, 6, 23, 11, 15),
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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };
  }

  render() {
    const { data } = this.state;

    return (
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
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />

          <Toolbar />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}
