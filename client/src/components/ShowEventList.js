import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

function ShowEventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/get-events')
      .then((res) => {
        setEvents([events]);
      })
      .catch((err) => {
        console.log('Error from ShowEventList');
      });
  }, []);

  const eventList =
    events.length === 0
      ? 'there is no event record!'
      : events.map((event, k) => <EventCard event={event} key={k} />);


      console.log([events])

  return (
    <div className='ShowEventList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Event List</h2>
          </div>

          <div className='col-md-11'>
            <Link
              to='/create-event'
              className='btn btn-outline-warning float-right'
            >
              + Add New Event
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{eventList}</div>
      </div>
    </div>
  );
}

export default ShowEventList;
