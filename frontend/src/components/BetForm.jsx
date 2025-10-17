import { useState } from 'react'

function BetForm({ onAddBet }) {
  // Usiamo uno stato unico per tutti i campi del form
  const [formData, setFormData] = useState({
    risultato: '',
    quota: '',
    importo: '',
    esito: 'In attesa', // Valore predefinito
    registratoDa: 'Marco', // Valore predefinito
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Calcoliamo i campi mancanti
    const quota = parseFloat(formData.quota)
    const importo = parseFloat(formData.importo)
    const vincita = (quota * importo).toFixed(2)
    
    const newBet = {
      ...formData,
      quota,
      importo,
      vincita,
      id: Date.now(), // ID unico basato sul timestamp
      data: new Date().toLocaleDateString(), // Data di oggi
    }

    onAddBet(newBet) // Passiamo la nuova giocata al genitore (App.jsx)
    
    // Reset del form (tranne 'registratoDa' ed 'esito')
    setFormData({
      ...formData,
      risultato: '',
      quota: '',
      importo: '',
    })
  }

  return (
    <div className="form-container">
      <h2>Registra Nuova Giocata</h2>
      <form onSubmit={handleSubmit} className="bet-form">
        <input
          type="text"
          name="risultato"
          placeholder="Risultato (es. X Primo Tempo)"
          value={formData.risultato}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quota"
          placeholder="Quota (es. 1.85)"
          value={formData.quota}
          onChange={handleChange}
          step="0.01"
          required
        />
        <input
          type="number"
          name="importo"
          placeholder="Importo (€)"
          value={formData.importo}
          onChange={handleChange}
          step="0.01"
          required
        />
        <select name="esito" value={formData.esito} onChange={handleChange}>
          <option value="In attesa">In attesa</option>
          <option value="Vinta">Vinta</option>
          <option value="Persa">Persa</option>
        </select>
        <select name="registratoDa" value={formData.registratoDa} onChange={handleChange}>
          <option value="Marco">Marco</option>
          <option value="Amico">Amico</option>
        </select>
        <button type="submit">Aggiungi Giocata</button>
      </form>
    </div>
  )
}

export default BetForm