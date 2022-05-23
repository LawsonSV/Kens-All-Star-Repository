import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentList = ({
  appointments,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!appointments.length) {
    return <h3>No appointments Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {appointments &&
        appointments.map((appointment) => (
          <div key={appointment._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${appointment.appointmentAuthor}`}
                >
                  {appointment.appointmentAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this appointment on {appointment.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this appointment on {appointment.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{appointment.appointmentText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/appointments/${appointment._id}`}
            >
              Join the discussion on this appointment.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AppointmentList;
