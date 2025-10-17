import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './css/global.css' // Importiamo i nostri stili

// Dati finti per iniziare (puoi lasciarlo vuoto: [])
const DATI_INIZIALI = [
  {
    id: 1,
    data: '15/10/2025',
    risultato: 'Inter - Milan 1',
    quota: 2.1,
    importo: 10.0,
    vincita: '21.00',
    esito: 'Vinta',
    registratoDa: 'Marco',
  },
  {
    id: 2,
    data: '16/10/2025',
    risultato: 'Juve - Roma X',
    quota: 3.2,
    importo: 5.0,
    vincita: '16.00',
    esito: 'Persa',
    registratoDa: 'Amico',
  },
]

function App() {
  // Stato per il login
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Stato per il nostro "database" di giocate
  const [bets, setBets] = useState(DATI_INIZIALI)

  // Funzione da passare al componente Login
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  // Funzione per aggiungere una giocata (passata fino a BetForm)
  const addBet = (newBet) => {
    setBets((prevBets) => [...prevBets, newBet])
  }

  return (
    <div className="App">
      {/* Questo è il "rendering condizionale":
        - Se NON sei loggato, mostra il componente Login
        - Se SEI loggato, mostra il componente Dashboard
      */}
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLogin} />
      ) : (
        <Dashboard bets={bets} addBet={addBet} />
      )}
    </div>
  )
}

export default App