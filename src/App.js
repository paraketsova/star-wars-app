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
  const [loading, setLoading] = useState(false);

  const getApiData = async (page, query = filterQuery) => {
    setLoading(true);
    const result = await axios('https://swapi.dev/api/people/?page=' + page + '&search=' + query);
    setLoading(false);
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
    getApiData(1);
  };

  const resetFilter = () => {
    setFilterQuery('');
    getApiData(1, '');
  };

  useEffect(() => {
    getApiData(1);
  }, []); // eslint-disable-line

  let maxPage = Math.ceil(count / 10);
  let pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i);
  }

  return (
    <div className="App">
      <header>
        <img src="./title-logo.png" alt="STAR WARS characters"/>
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <form onSubmit={onFilterSubmit}>
              <input type="search" value={filterQuery} onChange={onFilterChange} placeholder="Filter by name..."/>
              <button type="submit">🔍</button>
            </form>

            {characters.length === 0 ? (
              <div className="empty-results">
                <p>Your search did not match any Star Wars characters.</p>
                <p>
                  You can try a different search query,
                  or <button onClick={resetFilter}>display all characters</button>
                </p>
              </div>
            ) : (
              <>
                <div className="counters">
                  <span>Total characters: {count}</span>
                  <span>Page: {pageNumber} of {maxPage}</span>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th className="col1">Name</th>
                      <th className="col2">Gender</th>
                      <th className="col3">Birth year</th>
                    </tr>
                  </thead>

                  <tbody>
                    {characters.map(item => (
                      <tr key={item.url}>
                        <td className="character-name" onClick={() => setSelectedCharacter(item)}>
                          {item.name}
                        </td>
                        <td className="col2">{item.gender}</td>
                        <td className="col3">{item.birth_year}</td>
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
          </>
        )}
      </main>
    </div>
  );
}

export default App;
