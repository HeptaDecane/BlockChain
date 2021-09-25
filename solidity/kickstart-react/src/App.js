import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {GlobalProvider} from "./GlobalContext"
import Nav from "./components/Nav";
import Home from "./components/Home";
import CreateCampaign from "./components/CreateCampaign";

function App() {
  return (
      <GlobalProvider>
          <Router>
              <Nav/>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/campaigns/new" component={CreateCampaign}/>
              </Switch>
          </Router>
      </GlobalProvider>
  );
}

export default App;
