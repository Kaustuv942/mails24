import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignInPage from "./components/LoginPage/SignInPage";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import ComposePage from "./components/ComposePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [person, setPerson] = useState({});

  const handleLogIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handlePerson = (obj) => {
    setPerson(obj);
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogIn={handleLogIn}
          person={person}
          handlePerson={handlePerson}
        />
        <Switch>
          <Route path="/" exact>
            <HomePage isLoggedIn={isLoggedIn} handleLogIn={handleLogIn} />
          </Route>
          <Route exact path="/history">
            <HistoryPage isLoggedIn={isLoggedIn} handleLogIn={handleLogIn} />
          </Route>
          <Route exact path="/compose">
            <ComposePage isLoggedIn={isLoggedIn} handleLogIn={handleLogIn} />
          </Route>
          <Route exact path="/sign-up">
            <SignInPage
              isLoggedIn={isLoggedIn}
              handleLogIn={handleLogIn}
              person={person}
              handlePerson={handlePerson}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
