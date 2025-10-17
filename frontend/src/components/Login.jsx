import { useState } from 'react'

// Riceve una funzione 'onLoginSuccess' come prop,
// che verrà chiamata quando il login è corretto.
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault() // Impedisce alla pagina di ricaricarsi
    
    // Ecco la tua logica di accesso
    if (username === 'admin' && password === 'sinuoso') {
      setError('')
      onLoginSuccess() // Chiamiamo la funzione del genitore (App.jsx)
    } else {
      setError('Credenziali non valide. Riprova.')
    }
  }

  return (
    <div className="login-container">
      <h2>Accesso SuperQuote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Utente:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Accedi</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login