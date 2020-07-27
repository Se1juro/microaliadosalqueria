import React from 'react';
import { Redirect } from 'react-router-dom';

export default function AuthLogin({ Component }) {
  if (!localStorage.getItem('token')) {
    return <Redirect to="/login"></Redirect>;
  }
  return <Component></Component>;
}
