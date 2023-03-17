import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowEventDetails(props) {
  const [event, setEvent] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowEventDetails');
      });
  }, [id]);


  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/delete-event/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowEventDetails_deleteClick');
      });
  };

  const EventItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Title</td>
            <td>{event.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>title</td>
            <td>{event.title}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>title</td>
            <td>{event.title}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Publisher</td>
            <td>{event.title}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Published Date</td>Event
            <td>{event.title}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Description</td>
            <td>{event.title}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Event List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Event's Record</h1>
            <p className='lead text-center'>View Event's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{EventItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(event._id);
              }}
            >
              Delete Event
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/update-book/${event._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowEventDetails;