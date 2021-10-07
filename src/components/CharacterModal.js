function CharacterModal({ data, closeFn }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>{data.name}</h1>

        <table className="modal-table">
          <tbody>
            <tr>
              <th>Gender</th>
              <td>{data.gender}</td>
            </tr>
            <tr>
              <th>Birth year</th>
              <td>{data.birth_year}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{data.height}</td>
            </tr>
            <tr>
              <th>Mass</th>
              <td>{data.mass}</td>
            </tr>
            <tr>
              <th>Hair color</th>
              <td>{data.hair_color}</td>
            </tr>
            <tr>
              <th>Skin color</th>
              <td>{data.skin_color}</td>
            </tr>
            <tr>
              <th>Eye color</th>
              <td>{data.eye_color}</td>
            </tr>
          </tbody>
        </table>

        <button className="close-btn" onClick={closeFn}>Close</button>
      </div>
    </div>
  )
}

export default CharacterModal;
