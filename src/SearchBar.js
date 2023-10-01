import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ setCity, toggle }) => {
  const [location, setLocation] = useState("");

  // Set the location state to the value of the input field
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(location);
  };

  return (
    <div className="search-bar" autocomplete="off">
      <div className="omrs-input-group">
        <form onSubmit={handleSubmit} autocomplete="off"> 
          <label className="omrs-input-underlined">
            <input
              type="text"
              name="Location"
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
              style={{
                background: toggle
                  ? "rgba(73, 133, 224, 0.3)"
                  : "rgba(70, 70, 70, 0.3)",
              }}
            />
            <span className="omrs-input-label" autocomplete="off">Location e.g. Toronto</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 384 512"
            >
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
            </svg>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
