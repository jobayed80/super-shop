import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollToTop = () => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true); // Start with Bottom visible

  useEffect(() => {
    const handleScroll = () => {
      // When scrolling down more than 200px
      if (window.scrollY > 200) {
        setShowTop(true); // Show "Top" icon
        setShowBottom(false); // Hide "Bottom" icon
      } else {
        setShowTop(false); // Hide "Top" icon
        setShowBottom(true); // Show "Bottom" icon
      }

      // If at the bottom of the page, show "Bottom" icon
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setShowTop(false); // Hide "Top" icon
        setShowBottom(true); // Show "Bottom" icon
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {/* Show "Top" icon when scrolled down more than 200px */}
      {showTop && (
        <div onClick={scrollTop} style={iconStyle}>
          <FaArrowUp size={25} />
        </div>
      )}
      {/* Show "Bottom" icon when at the top or bottom of the page */}
      {showBottom && (
        <div onClick={scrollBottom} style={iconStyle}>
          <FaArrowDown size={25} />
        </div>
      )}
    </div>
  );
};

// 🔹 Reusable Icon Style
const iconStyle = {
  cursor: "pointer",
  background: "#007bff",
  color: "#fff",
  padding: "10px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
};

export default ScrollToTop;
