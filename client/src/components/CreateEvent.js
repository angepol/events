import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';


const CreateEvent = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        eventName: '',
        description: '',
        where: ''
    });

    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();


        axios
         .post('http://localhost:8080/add-event', event)
         .then((res) => {
            setEvent({
            eventName: '',
            description: '',
            where: ''
            });

            navigate('/');
         })
         .catch((err) => {
            console.log('Error in Create Event')
         });
    };

return (
<div className='CreateBook'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Event List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Event</h1>
            <p className='lead text-center'>Create new event</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of the Event'
                  name='eventName'
                  className='form-control'
                  value={event.eventName}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Where'
                  name='where'
                  className='form-control'
                  value={event.where}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Describe this event'
                  name='description'
                  className='form-control'
                  value={event.description}
                  onChange={onChange}
                />
              </div>
              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CreateEvent;

