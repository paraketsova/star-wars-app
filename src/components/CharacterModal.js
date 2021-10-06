function CharacterModal({ data, closeFn }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth year</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair color</th>
            <th>Skin color</th>
            <th>Eye color</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>{data.name}</td>
            <td>{data.gender}</td>
            <td>{data.birth_year}</td>
            <td>{data.height}</td>
            <td>{data.mass}</td>
            <td>{data.hair_color}</td>
            <td>{data.skin_color}</td>
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
