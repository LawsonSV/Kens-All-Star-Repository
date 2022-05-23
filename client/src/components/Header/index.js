import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
};

export default Header;
