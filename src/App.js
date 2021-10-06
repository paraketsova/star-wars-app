import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CharacterModal from './components/CharacterModal';

function App() {
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const getPage = async (i) => {
    const result = await axios('https://swapi.dev/api/people/?page=' + i);
    setCharacters(result.data.results);
    setCount(result.data.count);
    setPageNumber(i);
    setSelectedCharacter(null);
  };

  useEffect(() => {
    getPage(1);
  }, []);

  let maxPage = Math.ceil(count / 10);
  let pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i);
  }

  return (
    <div className="App">
      <header>
        <h1>Star War characters</h1>
      </header>

      <main>
        {characters.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Total characters: {count}</p>
            <p>Page number: {pageNumber}</p>

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
                  <tr key={item.url}>
                    <td className="character-name" onClick={() => setSelectedCharacter(item)}>
                      {item.name}
                    </td>
                    <td>{item.gender}</td>
                    <td>{item.birth_year}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul>
              {pages.map(i => (
                <li key={i}>
                  <button onClick={() => getPage(i)} className={i === pageNumber ? 'active' : ''}>{i}</button>
                </li>
              ))}
            </ul>

            {selectedCharacter !== null && (
              <CharacterModal data={selectedCharacter} closeFn={() => setSelectedCharacter(null)}/>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
