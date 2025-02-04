import { useEffect } from "react";

const Notifications = ({ message, type, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the notification after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-100" : "bg-yellow-100";
  const textColor = type === "success" ? "text-green-700" : "text-yellow-700";
  const borderColor = type === "success" ? "border-green-400" : "border-yellow-400";


  return (
    <div
      className={`fixed bottom-4 left-4 p-4 rounded-lg border ${bgColor} ${textColor} ${borderColor} shadow-lg z-50`}
    >
      {message}
    </div>
  )
}

export default Notifications