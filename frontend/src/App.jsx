import { useState, useEffect } from 'react' // Importa useEffect
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

// Abbiamo rimosso i DATI_INIZIALI
// const DATI_INIZIALI = [...]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Lo stato 'bets' ora parte da un array vuoto
  const [bets, setBets] = useState([])
  const [isLoading, setIsLoading] = useState(true) // Aggiungiamo uno stato di caricamento

  // Funzione per caricare i dati dalla nostra Netlify Function
  const fetchGiocate = async () => {
    setIsLoading(true)
    try {
      // Questo è l'endpoint della funzione che abbiamo creato
      const response = await fetch('/.netlify/functions/getGiocate');
      if (!response.ok) {
        throw new Error('Errore nel caricamento dati');
      }
      const data = await response.json();
      setBets(data); // Salviamo i dati dal DB nello stato
    } catch (error) {
      console.error(error);
      // Qui potresti mostrare un errore all'utente
    }
    setIsLoading(false)
  }

  // useEffect viene eseguito *dopo* il login
  useEffect(() => {
    if (isLoggedIn) {
      fetchGiocate()
    }
  }, [isLoggedIn]) // Si attiva quando 'isLoggedIn' cambia

  const handleLogin = () => {
    setIsLoggedIn(true)
    // fetchGiocate() viene già chiamato dall'useEffect
  }

  // Funzione per aggiungere una giocata
  // (Per ora aggiorna solo lo stato locale,
  // dovremmo creare un'altra funzione 'addGiocata' per salvarla su Neon)
  const addBet = (newBet) => {
    // TODO: Qui dovrai chiamare una nuova Netlify Function per INSERIRE la giocata
    // e poi ricaricare i dati o aggiungerla in locale.
    
    // Per ora, la aggiungiamo solo localmente per vederla subito
    setBets((prevBets) => [newBet, ...prevBets])
  }

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLogin} />
      ) : (
        <>
          {/* Mostra "Caricamento..." finché i dati non arrivano da Neon */}
          {isLoading ? (
            <p>Caricamento giocate dal database...</p>
          ) : (
            <Dashboard bets={bets} addBet={addBet} />
          )}
        </>
      )}
    </div>
  )
}

export default App