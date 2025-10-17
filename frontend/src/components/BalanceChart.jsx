function BalanceChart({ bets }) {
  // Calcoliamo il saldo in tempo reale
  const saldo = bets.reduce((acc, bet) => {
    if (bet.esito === 'Vinta') {
      // Se è vinta, aggiungo la vincita netta (vincita - importo)
      return acc + (parseFloat(bet.vincita) - parseFloat(bet.importo))
    } else if (bet.esito === 'Persa') {
      // Se è persa, tolgo l'importo
      return acc - parseFloat(bet.importo)
    }
    // Se è 'In attesa', il saldo non cambia
    return acc
  }, 0) // Il saldo iniziale è 0

  return (
    <div className="chart-container">
      <h2>Andamento Saldo</h2>
      <div className="saldo-display">
        Saldo Attuale: <strong>{saldo.toFixed(2)} €</strong>
      </div>
      <p>(Qui verrà mostrato il grafico)</p>
    </div>
  )
}

export default BalanceChart