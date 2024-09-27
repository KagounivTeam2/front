import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import HabitView from './pages/HabitView';
import StatisticsView from './pages/StatisticsView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/habit" component={HabitView} />
        <Route path="/statistics" component={StatisticsView} />
      </Switch>
    </Router>
  );
}

export default App;
