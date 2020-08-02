import React from 'react';
import { Redirect } from 'react-router-dom';

export default function backLogin({ Component }) {
  if (localStorage.getItem('token')) {
    return <Redirect to="/"/>;
  }
  return <Component/>;
}
