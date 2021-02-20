import { useState } from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivateScreen from "./components/privateScreen/PrivateScreen";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const DEFAULT_USER = {
  name: "",
  email: "",
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
