// Importiamo il driver di Neon
import { neon } from '@neondatabase/serverless';

// La stringa di connessione è presa in automatico
// dalle variabili d'ambiente di Netlify che hai impostato
const sql = neon(process.env.NETLIFY_DATABASE_URL);

// Questa è la funzione che Netlify eseguirà
export const handler = async (event, context) => {
  try {
    // Eseguiamo la query SQL sul database Neon
    const giocate = await sql`SELECT * FROM giocate ORDER BY data DESC`;
    
    // Restituiamo i dati in formato JSON
    return {
      statusCode: 200,
      body: JSON.stringify(giocate),
    };
  } catch (error) {
    // Gestiamo eventuali errori
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};