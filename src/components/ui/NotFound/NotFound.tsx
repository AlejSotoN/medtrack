import React from 'react';
import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  console.error("Route Error Caught:", error);
  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An unknown error occurred.';
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#e74c3c' }}>Oops!</h1>
      <p style={{ fontSize: '1.2em' }}>Sorry, an unexpected error has occurred.</p>
      {errorStatus && (
        <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
          Status: <span style={{ color: '#c0392b' }}>{errorStatus}</span>
        </p>
      )}
      <p style={{ fontStyle: 'italic', color: '#555' }}>"{errorMessage}"</p>
      <Link to="/dashboard" style={{
        display: 'inline-block',
        marginTop: '25px',
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease'
      }}>
        Go to Dashboard
      </Link>
    </div>
  );
}
