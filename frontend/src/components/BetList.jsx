function BetList({ bets }) {
  if (bets.length === 0) {
    return <p>Nessuna giocata ancora registrata.</p>
  }
  
  // Non serve più invertire l'array, la query SQL lo fa per noi
  
  return (
    <div className="list-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Risultato</th>
            <th>Quota</th>
            <th>Importo</th>
            <th>Vincita Pot.</th>
            <th>Esito</th>
            <th>Registrato da</th> 
          </tr>
        </thead>
        <tbody>
          {bets.map((bet) => (
            <tr key={bet.id} className={`bet-row esito-${bet.esito.toLowerCase()}`}>
              <td>{bet.id}</td>
              {/* Formattiamo la data che arriva da Postgres */}
              <td>{new Date(bet.data).toLocaleDateString()}</td>
              <td>{bet.risultato}</td>
              <td>{bet.quota}</td>
              <td>{parseFloat(bet.importo).toFixed(2)} €</td>
              <td>{parseFloat(bet.vincita).toFixed(2)} €</td>
              <td>{bet.esito}</td>
              {/* Leggiamo 'registrato_da' (con underscore) */}
              <td>{bet.registrato_da}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BetList