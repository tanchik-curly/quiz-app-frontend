import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import Quiz from "./pages/Quiz/index";
import Scores from "./pages/Quiz/scores";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
