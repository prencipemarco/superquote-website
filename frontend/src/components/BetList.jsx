function BetList({ bets }) {
  if (bets.length === 0) {
    return <p>Nessuna giocata ancora registrata.</p>
  }

  // Mostriamo le giocate dalla più recente alla più vecchia
  const reversedBets = [...bets].reverse()

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
          {reversedBets.map((bet) => (
            <tr key={bet.id} className={`bet-row esito-${bet.esito.toLowerCase()}`}>
              <td>{bet.id}</td>
              <td>{bet.data}</td>
              <td>{bet.risultato}</td>
              <td>{bet.quota}</td>
              <td>{bet.importo.toFixed(2)} €</td>
              <td>{bet.vincita} €</td>
              <td>{bet.esito}</td>
              <td>{bet.registratoDa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BetList