import React from "react";
import "./NotFound.css";  // Add styling if you have a CSS file

function NotFound() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  );
}

// ✅ Add the default export here
export default NotFound;