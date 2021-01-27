/**
 * @file /src/client/App.tsx
 * @author Cadence Holmes
 * @copyright Cadence Holmes 2020
 * @fileoverview
 * Redux, RxJS, React Router, Material-UI examples.
 */

import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { fromEvent } from 'rxjs';

import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../redux/store';
import { AppContentSlice } from '../redux/slices/AppContentSlice';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import pixelheart from '../assets/pixel-heart.png';
import '../styles/animations/jello.scss';
import '../styles/animations/shake.scss';
import { animate } from '../../util/animate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      paddingTop: 50,
      width: 300,
      [theme.breakpoints.down('sm')]: {
        width: 200,
      },
    },
  })
);

export const AppContent = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  /**
   * Destructuring state from Redux.
   */
  const { sigValue } = useSelector(
    (state: RootStateType) => state.AppContentSlice
  );

  /**
   * Destructuring reducer actions from Redux.
   */
  const { setSigValue } = AppContentSlice.actions;

  /**
   * React refs for accessing the image nodes.
   */
  const staticImageRef = React.useRef<HTMLImageElement>(null);
  const randomImageRef = React.useRef<HTMLImageElement>(null);

  /**
   * This allows us to update which tab is visibly active.
   */
  const [routePathIndex, setRoutePathIndex] = React.useState(0);

  /**
   * While React Router will handle the actual route changes, we
   * do need tabs to update the local index state. This also changes the
   * `sigValue` so Unsplash will load a new random image every time
   * we go to that tab.
   */
  const handleTabChange = React.useCallback(
    (_: React.ChangeEvent<Record<string, any>>, index: number) => {
      setRoutePathIndex(index);
      if (index) dispatch(setSigValue(sigValue + 1));
    },
    [dispatch, setSigValue, sigValue]
  );

  /**
   * Displaying a static image found in local assets.
   */
  const StaticImage = React.useMemo(() => {
    return (
      <img
        ref={staticImageRef}
        className={classes.image}
        src={pixelheart}
        alt={''}
      />
    );
  }, [classes.image]);

  /**
   * Retrieving and displaying a random image from Unsplash.
   * Note the `sig=sigValue`. This is required if you want to have multiple
   * random Unsplash images displayed at once. Each `sig` value should be
   * a unique value.
   */
  const RandomUnsplashImage = React.useMemo(() => {
    return (
      <img
        ref={randomImageRef}
        className={classes.image}
        src={`https://source.unsplash.com/random?sig=${sigValue}`}
        alt={''}
      />
    );
  }, [classes.image, sigValue]);

  /**
   * Describing routes for react-router.
   */
  const routes = React.useMemo(() => {
    return [
      {
        path: '/',
        label: 'Display Static Image',
        component: StaticImage,
      },
      {
        path: '/randomImage',
        label: 'Display Unsplash Image',
        component: RandomUnsplashImage,
      },
    ];
  }, [RandomUnsplashImage, StaticImage]);

  /**
   * Tabs are mapped from `routes` and will select which route component to render.
   * The root node for each tab is a React Router `<Link />` component, and the
   * `to` prop is used to set the url path.
   */
  const TabsDisplay = React.useMemo(() => {
    return (
      <Paper square elevation={4} style={{ marginTop: 50 }}>
        <Tabs value={routePathIndex} onChange={handleTabChange}>
          {routes.map((route, index) => {
            return (
              <Tab
                key={index}
                label={route.label}
                component={Link}
                to={route.path}
              />
            );
          })}
        </Tabs>
      </Paper>
    );
  }, [handleTabChange, routePathIndex, routes]);

  const Message = React.useMemo(() => {
    return (
      <div style={{ marginTop: 30 }}>
        {'Click the image to see an animation.'}
      </div>
    );
  }, []);

  /**
   * These are the actual components that will be rendered when a `Tab` is selected.
   * The components found in the `routes` object are mapped to React Router `<Route />`
   * components and `<Switch />`.
   */
  const RouteContent = React.useMemo(() => {
    return (
      <Switch>
        {routes.map((route, index) => (
          <Route
            exact
            key={index}
            path={route.path}
            children={route.component}
          />
        ))}
      </Switch>
    );
  }, [routes]);

  /**
   * Images will animate on click.
   * This hook has no dependency array and will run every render cycle.
   */
  React.useEffect(() => {
    const staticImage = staticImageRef.current;
    const staticImage$ = staticImage && fromEvent(staticImage, 'click');

    const randomImage = randomImageRef.current;
    const randomImage$ = randomImage && fromEvent(randomImage, 'click');

    staticImage$?.pipe().subscribe({
      next: () => animate(staticImage, 'shake'),
    });

    randomImage$?.pipe().subscribe({
      next: () => animate(randomImage, 'jello'),
    });
  });

  /**
   * Handle setting the tab indicator if the page is refreshed or the
   * secondary route path is accessed directly.
   * This hook has an empty dependency array and will run only on the
   * components first render cycle.
   */
  React.useEffect(() => {
    if (location.pathname !== '/') setRoutePathIndex(1);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <React.Fragment>
      {TabsDisplay}
      {Message}
      {RouteContent}
    </React.Fragment>
  );
};
