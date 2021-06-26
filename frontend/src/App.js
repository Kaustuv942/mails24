import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from './components/Home/Home Jsx/Home';
import {Compose} from './components/Compose/Compose Jsx/Compose'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/compose' component={Compose} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
