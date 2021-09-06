import { Route, Switch } from "react-router-dom";
import { Entrance } from "../components/pages/Entrance";
import { Top } from "../components/pages/Top";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router = () => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Entrance />
        </Route>
        <Route exact path="/groups">
          <Top />
        </Route>
      </LoginUserProvider>
    </Switch>
  );
};
