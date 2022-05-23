import React from 'react';
import { useQuery } from '@apollo/client';

import AppointmentList from '../components/AppointmentList';
import AppointmentForm from '../components/AppointmentForm';

import { QUERY_APPOINTMENTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_APPOINTMENTS);
  const appointments = data?.appointments || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <AppointmentForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <AppointmentList
              appointments={appointments}
              title="Some Feed for appointment(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
