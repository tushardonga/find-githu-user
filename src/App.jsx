import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.log("Error occurred while fetching search results:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter username or email"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((user) => (
            <div className="user" key={user.id}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <img src={user.avatar_url} alt="Avatar" />
                <span>{user.login}</span>
              </a>
              {user.email && <p>{user.email}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
