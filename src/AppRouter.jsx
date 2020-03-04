import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { getBasename } from '@ice/stark-app';

function renderRoute(route) {
  const {
    redirect,
    path,
    exact,
    strict,
    component: RouteComponent,
    routes,
  } = route;
  if (redirect) {
    return <Redirect key={path} from={path} to={redirect} />;
  }
  return (
    <Route
      key={path}
      path={path}
      exact={exact}
      strict={strict}
      render={props => {
        return RouteComponent ? (
          <RouteComponent {...props}>
            {routes && renderRoutes(routes)}
          </RouteComponent>
        ) : null;
      }}
    />
  );
}

function renderRoutes(routes) {
  return routes ? (
    <Switch>{routes.map(route => renderRoute(route))}</Switch>
  ) : null;
}

function AppRouter(props) {
  const { routes } = props;
  return <Router basename={getBasename()}>{renderRoutes(routes)}</Router>;
}

export default AppRouter;
