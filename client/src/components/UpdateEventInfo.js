import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateEventInfo(props) {
  const [event, setEvent] = useState({
    title: '',
    isbn: '',
    author: '',
    description: '',
    published_date: '',
    publisher: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/${id}`)
      .then((res) => {
        setEvent({
          eventName: res.data.eventName,
          description: res.data.description,
          where: res.data.where,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateEventInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
        eventName: data.data.eventName,
        description: data.data.description,
        where: data.data.where,
    };


    axios
      .put(`http://localhost:8080/update-event/${id}`, data)
      .then((res) => {
        navigate(`/show-event/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateEventInfo!');
      });
  };

  return (
    <div className='UpdateEventInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Event List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Event</h1>
            <p className='lead text-center'>Update Event's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='eventName'>eventName</label>
              <input
                type='text'
                placeholder='Title of the Event'
                name='title'
                className='form-control'
                value={event.eventname}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                type='text'
                placeholder='Description of the Event'
                name='description'
                className='form-control'
                value={event.description}
                onChange={onChange}
              />
            </div>
            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEventInfo;