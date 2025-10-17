import BalanceChart from './BalanceChart'
import BetForm from './BetForm'
import BetList from './BetList'

// Il Dashboard riceve i dati (bets) e le funzioni (addBet) dal suo genitore (App.jsx)
function Dashboard({ bets, addBet }) {
  return (
    <div className="dashboard-container">
      <h1>Dashboard SuperQuote</h1>
      
      {/* Modulo 1: Il Grafico (per ora solo un riepilogo) */}
      <BalanceChart bets={bets} />
      
      <hr />

      {/* Modulo 2: Il Form per aggiungere giocate */}
      <BetForm onAddBet={addBet} />
      
      <hr />

      {/* Modulo 3: La lista di tutte le giocate */}
      <h2>Giocate Recenti</h2>
      <BetList bets={bets} />
    </div>
  )
}

export default Dashboard