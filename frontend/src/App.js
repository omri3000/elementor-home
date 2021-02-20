import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivateScreen from "./components/privateScreen/PrivateScreen";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Container>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
          </Container>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
