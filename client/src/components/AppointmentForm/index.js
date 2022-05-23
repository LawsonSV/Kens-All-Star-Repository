import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_APPOINTMENT } from '../../utils/mutations';
import { QUERY_APPOINTMENTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const AppointmentForm = () => {
  const [appointmentText, setAppointmentText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addAppointment, { error }] = useMutation(ADD_APPOINTMENT, {
    update(cache, { data: { addAppointment } }) {
      try {
        const { appointments } = cache.readQuery({ query: QUERY_APPOINTMENTS });

        cache.writeQuery({
          query: QUERY_APPOINTMENTS,
          data: { appointments: [addAppointment, ...appointments] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, appointments: [...me.appointments, addAppointment] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addAppointment({
        variables: {
          appointmentText,
          appointmentAuthor: Auth.getProfile().data.username,
        },
      });

      setAppointmentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'appointmentText' && value.length <= 280) {
      setAppointmentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Schedule a move!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="appointmentText"
                placeholder="Here's a new appointment..."
                value={appointmentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Request Date
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to schedule a move. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default AppointmentForm;
