import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const result = await axios('https://swapi.dev/api/people');
      setCharacters(result.data.results);
    };
    getResults();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Star War characters</h1>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Birth year</th>
            </tr>
          </thead>

          <tbody>
            {characters.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.birth_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
