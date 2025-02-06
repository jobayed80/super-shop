import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DashboardCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className="rounded-lg"
      />
      <p className="mt-4 text-gray-600">
        Selected date: <span className="font-bold">{date.toDateString()}</span>
      </p>
    </div>
  );
};

export default DashboardCalendar;
