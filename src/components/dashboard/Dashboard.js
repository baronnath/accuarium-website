import React, { useState, useEffect } from 'react';
import { 
  Box,
  Button,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import Alert from '../Alert';
import { Api } from '../../helpers/axios';
import translator from '../../translator/translator';
import {
  Chart,
  AreaSeries,
  ArgumentAxis,
  Tooltip,
  Title
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, Animation, Palette } from '@devexpress/dx-react-chart';
import { colors } from '../../theme';

const Dashboard = () => {

  const i18n = translator();
  const locale = i18n.locale;
  const api = new Api();

  const [users, setUsers] = useState(null);
  const [userData, setUserData] = useState(null);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
    open: false,
  });

  const limitDate = new Date();
  limitDate.setYear(limitDate.getFullYear() - 1);

  useEffect(() => {
    const users = api.getUsers()
      .then(res => {
        setUsers(res.data.users);
      })
      .catch(err => {
        handleError(err);   
      });
  },[]);

  useEffect(() => {
    if(users) {
      let data = initiateYear();
      users.map(u => {
        const createdAt = new Date(u.createdAt);
        const createdMonth = createdAt.toLocaleString(locale, { month: 'long' });
        if(createdAt >= limitDate) {
          data[createdMonth]++;
          // console.log(createdMonth, limitDate.getMonth() - createdMonth)
        }
      });

      // Build object with chart format
      const formatted = Object.keys(data).map((month) => {
        return {
          month: month.substring(0,3),
          users: data[month]
        };
      });

      setUserData(formatted);
    }
  },[users]);

  function initiateYear() {
    const date = new Date();
    date.setMonth(date.getMonth() - 11);
    let year = {};

    for (let i = 0; i < 12; i++) {
      let month = { [date.toLocaleString(locale, { month: 'long' })]: 0 };
      year = {...year, ...month};
      date.setMonth(date.getMonth() + 1);
    }
    return year;
  }

  function handleError(err) {
    setAlert(prevAlert => ({
      ...prevAlert,
      message: err.response.data ? err.response.data.message : i18n.t('networkError'),
      type: 'error',
      open: true,
    }));   
  }

  return (
    <>
      <Typography variant="h6" component="h1">
        {i18n.t('dashboard.dashboard')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{p: 2}}>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography noWrap variant="h3" component="h2">Users</Typography>
              <Typography noWrap>Total { users && users.length }</Typography>
            </Box>
            { userData &&
              <Chart
                data={userData}
              >
                <Palette scheme={[colors.primary.toUpperCase(), colors.secondary.toUpperCase()]}/>
                <ArgumentAxis tickFormat={(ax) => { console.log(ax); ax.substring(0,3)}}/>

                <AreaSeries valueField="users" argumentField="month" />
                <Animation />
                <Title
                  text="New users last year"
                />
                <EventTracker />
                <Tooltip />
              </Chart>
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;