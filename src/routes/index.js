import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { useSelector } from "react-redux";
import { RoutesPublic } from "./routes";

const Routes = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>
      <Switch>
        {RoutesPublic.map(({ path, Component }) => {
          return (
            <PublicRoutes
              key={path}
              path={path}
              exact
              component={Component}
              restricted={true}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default Routes;
