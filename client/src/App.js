import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEvent from './components/CreateEvent';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<CreateEvent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;