import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Router>
  );
}

export default App;
