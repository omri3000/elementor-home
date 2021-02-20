import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ compoent: Component, ...rest }) => {
  const isLogin = (props) => {
    console.log(localStorage.getItem("authToken"));
    if (localStorage.getItem("authToken")) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return <Route {...rest} render={isLogin} />;
};

export default PrivateRoute;
