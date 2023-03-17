import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEvent from './components/CreateEvent';
import ShowEventList from './components/ShowEventList';
import ShowEventDetails from './components/ShowEventDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowEventList />} />
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/update-event/:id' element={<UpdateEventInfo />} />
          <Route path='/get-event/:id' element={<ShowEventDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;


