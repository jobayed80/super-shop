import React, { useState , useEffect} from "react";
import { supabase } from "../lib/createClient";

import { Button, Card, Modal, Progress, Typography } from "antd";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const { Title, Paragraph } = Typography;

const passage = "The quick brown fox jumps over the lazy dog. It is a well-known pangram.";



const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("contact_messages").insert([
      { name: formData.name, email: formData.email, message: formData.message },
    ]);

    if (error) {
      setStatus("Error sending message.");
    } else {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };








  const [isRecording, setIsRecording] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scores, setScores] = useState({ fluency: 0, stress: 0, pronunciation: 0, speed: 0 });

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && isRecording) {
      calculateScores();
      setIsModalVisible(true);
      setIsRecording(false);
    }
  }, [listening]);

  const calculateScores = () => {
    const words = passage.toLowerCase().split(" ");
    const spokenWords = transcript.toLowerCase().split(" ");
    const matchedWords = spokenWords.filter((word) => words.includes(word)).length;

    const pronunciationScore = (matchedWords / words.length) * 90;
    const fluencyScore = (transcript.split(" ").length / words.length) * 90;
    const stressScore = Math.min(90, pronunciationScore + 5);
    const speedScore = Math.min(90, fluencyScore + 10);

    setScores({
      pronunciation: Math.round(pronunciationScore),
      fluency: Math.round(fluencyScore),
      stress: Math.round(stressScore),
      speed: Math.round(speedScore),
    });
  };

  const startRecording = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    setIsRecording(true);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-gray-200 to-gray-400 items-center justify-center mx-auto">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white  rounded-lg overflow-hidden">
        {/* Left Side - Contact Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            We would love to hear from you! Fill out the form below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {status && (
            <p className="text-center mt-4 text-green-500 font-semibold">
              {status}
            </p>
          )}
          <div className="mt-6 text-gray-700">
            <p>Or reach us at:</p>
            <p className="font-semibold">contact@galaxysupershop.com</p>
            <p>+8801717-134859</p>
            <p className="mt-4">Follow us on social media:</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Facebook
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                Twitter
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="hidden md:block">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.95373531531664!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d8a32f7f8c8!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1625070000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>



        <div style={{ maxWidth: 600, margin: "auto", textAlign: "center", padding: 20 }}>
      <Card>
        <Title level={4}>Read Aloud</Title>
        <Paragraph>{passage}</Paragraph>
        <Button type="primary" onClick={startRecording} disabled={isRecording}>
          {isRecording ? "Listening..." : "Start Speaking"}
        </Button>
        <Button onClick={stopRecording} disabled={!isRecording} style={{ marginLeft: 10 }}>
          Stop
        </Button>
      </Card>

      <Modal title="Your Score" visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
        <Paragraph><b>Transcript:</b> {transcript || "No speech detected"}</Paragraph>
        <Progress percent={scores.pronunciation} status="active" format={() => `Pronunciation: ${scores.pronunciation}/90`} />
        <Progress percent={scores.fluency} status="active" format={() => `Fluency: ${scores.fluency}/90`} />
        <Progress percent={scores.stress} status="active" format={() => `Stress: ${scores.stress}/90`} />
        <Progress percent={scores.speed} status="active" format={() => `Speed: ${scores.speed}/90`} />
      </Modal>
    </div>


    
      </div>
    </div>
  );
};

export default ContactUs;