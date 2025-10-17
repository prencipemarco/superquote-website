import { useState } from 'react'

function BetForm({ onAddBet }) {
  // Rimosso 'registratoDa' dallo stato
  const [formData, setFormData] = useState({
    risultato: '',
    quota: '',
    importo: '',
    esito: 'In attesa',
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
    
    const quota = parseFloat(formData.quota)
    const importo = parseFloat(formData.importo)
    
    const newBetData = {
      ...formData,
      quota,
      importo,
      // Calcoliamo la vincita potenziale
      vincita: (quota * importo).toFixed(2),
      // id, data, e registrato_da verranno gestiti dal backend
    }

    // Chiama la funzione 'addBet' di App.jsx (che ora è asincrona)
    onAddBet(newBetData) 
    
    // Resetta il form
    setFormData({
      risultato: '',
      quota: '',
      importo: '',
      esito: 'In attesa',
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
        
        {/* IL CAMPO 'Registrato Da' È STATO RIMOSSO */}
        
        <button type="submit">Aggiungi Giocata</button>
      </form>
    </div>
  )
}

export default BetForm