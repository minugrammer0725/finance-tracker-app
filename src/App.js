// router
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
// components
import Navbar from "./components/Navbar";
// hooks
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {!user ? <Login /> : <Redirect to="/" />}
            </Route>
            <Route path="/signup">
              {!user ? <Signup /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
