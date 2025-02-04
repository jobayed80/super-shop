import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const backendUrl = 'http://localhost:8000'; // Hardcoded variable

  useEffect(() => {
    axios.get(`${backendUrl}/api`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>sdskasdcjv</h1>
      
      <h1>Client App</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default App; 