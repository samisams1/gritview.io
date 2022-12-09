import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import history from "./containers/history";
import Course from "./containers/Course";
import Professor from "./containers/Professor";
// import Giveaway from "./containers/Giveaway";
import Legal from "./containers/Legal";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import About from "./containers/About";
import { ReactNotifications } from 'react-notifications-component'

const FirebaseAnalytics = () => {
  let location = useLocation();
  useEffect(() => {
    const analytics = window.firebase && window.firebase.analytics;
    if (typeof analytics === "function") {
      const page_path = location.pathname;
      analytics().setCurrentScreen(page_path);
      analytics().logEvent("page_view", { page_path });
    }
  }, [location]);
  return null;
};

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <FirebaseAnalytics />
        <ReactNotifications />
        <Switch>
          <Route path="/professor" component={Professor} />
          <Route path="/course" component={Course} />
          <Route path="/about" component={About} />
          <Route path="/termsofuse" component={Legal} />
          <Route path="/privacy" component={Legal} />
          {/* <Route path="/giveaway" component={Giveaway}/> */}
          <Route
            path="/article"
            component={() => {
              window.location.href =
                "https://www.linkedin.com/pulse/behind-scenes-developing-gritviewio-nathenael-dereb/?published=t";
              return null;
            }}
          />
          <Route path="/" component={Home} />
          <Route path="" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
