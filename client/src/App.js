import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './componnents/Header'; // Import the Navbar component
// import './index.css'


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
    <div className="App bg-black">
      <Header /> {/* Include the Navbar component */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-gray-800">sdskasdcjv</h1>
        <h1 className="text-3xl font-semibold text-gray-700 mt-4 bg-red-500">Client App</h1>
        <p className="text-xl text-gray-600 mt-2">
          Message from backend: <span className="text-blue-500">{message}</span>
        </p>
      </div>
    </div>
  );
}

export default App;