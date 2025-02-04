import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './componnents/Header'; // Import the Navbar component

// import './index.css'


function App() {
  const [message, setMessage] = useState('');
  const backendUrl = "https://super-shop-server-swo9.onrender.com"
  
  // https://super-shop-server-swo9.onrender.com
  useEffect(() => {
    axios.get(`${backendUrl}/api`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post(`${backendUrl}/send-email`, emailData);
      alert(response.data.message);
      console.error(response.data.message);
    } catch (error) {
      alert("Error sending email");
      console.error(error);
    }
  };





  return (
    <div className="App bg-black">
      <Header /> {/* Include the Navbar component */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-gray-800">loremsksdgbuaaj fwegffgu      jhgfggggggjjjjjjjjjjjjjjjjj</h1>
        <h1 className="text-3xl font-semibold text-gray-700 mt-4 bg-red-500">Client App</h1>
        <p className="text-xl text-gray-600 mt-2">
          Message from backend: <span className="text-blue-500">{message}</span>
        </p>
      </div>



      jobayed35-2948@diu.edu.bd
      <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Email</h2>
      <input
        type="email"
        name="to"
        placeholder="Recipient Email"
        value={emailData.to}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={emailData.subject}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <textarea
        name="text"
        placeholder="Message"
        value={emailData.text}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <button onClick={sendEmail} className="bg-blue-500 text-white p-2 rounded">
        Send Email
      </button>
    </div>



    </div>
  );
}

export default App;