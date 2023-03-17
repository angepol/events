import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const EventCard = (props) => {
  const event = props.event;

  return (
    <div className='card-container'>
      <img
        src='https://hdqwalls.com/wallpapers/ocean-waves-at-sunset.jpg'
        alt='Events'
        height={200}
      />
      <div className='card-text'>
        <h2>
          <Link to={`/show-event/${event._id}`}>{event.eventName}</Link>
        </h2>
        <h3>{event.eventName}</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;