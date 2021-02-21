import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ comp: Component, ...rest }) => {
  const isLogin = (props) => {
    if (localStorage.getItem("authToken")) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return <Route {...rest} render={isLogin} />;
};

export default PrivateRoute;
