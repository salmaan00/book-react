import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h2>WELCOME TO ADMIN DASH BOARD</h2>
      <div className="mt-4">
        <Link to="/register">
          <Button variant="primary" className="mx-2">Register</Button>
        </Link>
        <Link to="/login">
          <Button variant="secondary" className="mx-2">Login</Button>
        </Link>
      </div>
    </div>
  );
}
