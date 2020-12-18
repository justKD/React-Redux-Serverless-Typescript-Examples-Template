/**
 * @file /src/client/App.tsx
 * @author Cadence Holmes
 * @copyright Cadence Holmes 2020
 * @fileoverview
 * Redux and serverless examples.
 */

import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from './redux/store';
import { AppSlice } from './redux/slices/AppSlice';

import './styles/main.scss';
import { AppContent } from './components/AppContent';

const useStyles = makeStyles(() =>
  createStyles({
    app: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 30,
    },
  })
);

export const App = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * Destructuring state from Redux.
   */
  const { greeting, deployed } = useSelector(
    (state: RootStateType) => state.AppSlice
  );

  /**
   * Destructuring reducer actions from Redux.
   */
  const { setGreeting, setDeployed } = AppSlice.actions;

  /**
   * Use Axios to make serverless backend calls.
   */
  const makeServerlessCall = React.useCallback(
    (url: string, callback: (response: any) => void) => {
      axios
        .get(url)
        .then((response) => callback(response))
        .catch((err) => {
          console.error(err);
        });
    },
    []
  );

  /**
   * Make serverless calls and update the Redux store with the responses.
   */
  const retrieveServerlessResponse = React.useCallback(() => {
    makeServerlessCall('/api/deployed', (response) => {
      dispatch(setDeployed(response.data));
    });

    makeServerlessCall('/api/greeting', (response) => {
      dispatch(setGreeting(response.data));
    });
  }, [dispatch, setGreeting, setDeployed, makeServerlessCall]);

  /**
   * Show a header in case the app is not deployed or taking a while to
   * receive responses.
   */
  const staticHeader = React.useMemo(() => {
    return 'Deploy to Vercel to see serverless response.';
  }, []);

  /**
   * Only attempt to retrieve the serverless responses when the component
   * is first rendered.
   */
  React.useEffect(() => {
    retrieveServerlessResponse();
  }, [retrieveServerlessResponse]);

  return (
    <div className={classes.app}>
      {(deployed === true && greeting) || staticHeader}
      <Router>
        <AppContent />
      </Router>
    </div>
  );
};
