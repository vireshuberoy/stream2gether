import React from "react";
import VideoPlayer from "./Components/VideoPlayer";
import MainPage from "./Components/MainPage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <div>
          <Route path="/" component={MainPage} exact />
          <Route path="/room/:id" component={VideoPlayer} exact />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
