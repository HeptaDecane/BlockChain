import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {GlobalProvider} from "./GlobalContext"

function App() {
  return (
      <GlobalProvider>
          <Router>
            <Switch>
              <Route exact path="/"/>
            </Switch>
          </Router>
      </GlobalProvider>
  );
}

export default App;
