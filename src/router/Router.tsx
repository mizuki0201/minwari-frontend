import { Route, Switch } from "react-router-dom";
import { Entrance } from "../components/pages/Entrance";
import { EventsIndex } from "../components/pages/EventsIndex";
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
          <EventsIndex />
        </Route>
      </LoginUserProvider>
    </Switch>
  );
};
