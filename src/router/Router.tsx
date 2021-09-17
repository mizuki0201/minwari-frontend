import { Route, Switch } from "react-router-dom";
import { Entrance } from "../components/pages/Entrance";
import { EventsIndex } from "../components/pages/EventsIndex";
import { ExpenceIndex } from "../components/pages/ExpenceIndex";
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
        <Route exact path="/groups/:group_id/events">
          <EventsIndex />
        </Route>
        <Route exact path="/groups/:group_id/events/:event_id">
          <ExpenceIndex />
        </Route>
        <Route>
          <Top />
        </Route>
      </LoginUserProvider>
    </Switch>
  );
};
