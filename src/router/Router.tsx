import { Route, Switch } from "react-router-dom";
import { Entrance } from "../components/pages/Entrance";
import { Group } from "../components/pages/Group";
import { Top } from "../components/pages/Top";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router = () => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/entrance">
          <Entrance />
        </Route>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="/groups/:group_id/events">
          <Group />
        </Route>
      </LoginUserProvider>
    </Switch>
  );
};
