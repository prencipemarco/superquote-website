import { useState, useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bets, setBets] = useState([])
  
  // 1. Inizializza Identity all'avvio
  useEffect(() => {
    netlifyIdentity.init()
    
    // Controlla se c'è un utente già loggato
    const currentUser = netlifyIdentity.currentUser()
    if (currentUser) {
      setUser(currentUser)
    } else {
      setIsLoading(false) // Non c'è utente, smetti di caricare
    }

    // Funzioni per reagire ai cambi di stato
    const handleLogin = (user) => {
      setUser(user)
      netlifyIdentity.close() // Chiude il popup di login
    }
    const handleLogout = () => {
      setUser(null)
    }

    // Ascolta gli eventi di login e logout
    netlifyIdentity.on('login', handleLogin)
    netlifyIdentity.on('logout', handleLogout)
    
    // Pulisce gli ascoltatori quando il componente si smonta
    return () => {
      netlifyIdentity.off('login', handleLogin)
      netlifyIdentity.off('logout', handleLogout)
    }
  }, []) // L'array vuoto [] significa: esegui solo 1 volta all'avvio

  // 2. Carica i dati *solo se* l'utente è loggato
  useEffect(() => {
    if (user) {
      fetchGiocate()
    } else {
      setBets([]) // Svuota le giocate se l'utente fa logout
    }
  }, [user]) // Questo si ri-esegue ogni volta che 'user' cambia

  // Funzione per CARICARE le giocate
  const fetchGiocate = async () => {
    if (!user) return; 

    setIsLoading(true)
    try {
      const token = user.token.access_token;
      // Chiamata sicura con token
      const response = await fetch('/.netlify/functions/getGiocate', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        if (response.status === 401) netlifyIdentity.logout(); // Token scaduto? Logout
        throw new Error('Errore caricamento dati');
      }
      
      const data = await response.json();
      setBets(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  }

  // Funzione per AGGIUNGERE una giocata
  const addBet = async (newBet) => {
    if (!user) return; 
    
    try {
      const token = user.token.access_token;
      // Chiamata sicura con token
      const response = await fetch('/.netlify/functions/addGiocata', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBet) // newBet arriva da BetForm.jsx
      });

      if (!response.ok) {
        throw new Error('Errore nel salvataggio');
      }
      
      const savedBet = await response.json();
      
      // Aggiungi la nuova giocata (dal DB) in cima alla lista
      setBets((prevBets) => [savedBet, ...prevBets]);

    } catch (error) {
      console.error('Impossibile aggiungere la giocata:', error);
    }
  }

  // Gestori per i bottoni Login/Logout
  const handleLogin = () => netlifyIdentity.open() // Apre il popup
  const handleLogout = () => netlifyIdentity.logout()

  // 3. Render condizionale
  return (
    <div className="App">
      <header className="app-header">
        <h1>SuperQuote</h1>
        {user ? (
          <button onClick={handleLogout}>Logout ({user.email})</button>
        ) : (
          <button onClick={handleLogin}>Accedi</button>
        )}
      </header>

      {user ? (
        // UTENTE LOGGATO: Mostra il Dashboard
        <>
          {isLoading ? (
            <p>Caricamento giocate dal database...</p>
          ) : (
            <Dashboard bets={bets} addBet={addBet} user={user} />
          )}
        </>
      ) : (
        // UTENTE NON LOGGATO: Mostra un invito al login
        <div className="login-prompt">
          <h2>Benvenuto</h2>
          <p>Effettua l'accesso per visualizzare e registrare le giocate.</p>
          <button onClick={handleLogin}>Accedi</button>
        </div>
      )}
    </div>
  )
}
export default App