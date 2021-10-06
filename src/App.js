import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CharacterModal from './components/CharacterModal';

function App() {
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const getApiData = async (page, query = '') => {
    const result = await axios('https://swapi.dev/api/people/?page=' + page + '&search=' + query);
    setCharacters(result.data.results);
    setCount(result.data.count);
    setPageNumber(page);
    setSelectedCharacter(null);
  };

  const onFilterChange = event => {
    setFilterQuery(event.target.value);
  };

  const onFilterSubmit = event => {
    event.preventDefault();
    getApiData(1, filterQuery);
  };

  useEffect(() => {
    getApiData(1);
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
            <form onSubmit={onFilterSubmit}>
              <input type="search" value={filterQuery} onChange={onFilterChange} placeholder="Filter by name..."/>
              <button type="submit">Filter</button>
            </form>

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
                  <button onClick={() => getApiData(i)} className={i === pageNumber ? 'active' : ''}>{i}</button>
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
