import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NETLIFY_DATABASE_URL);

export const handler = async (event, context) => {
  const { user } = context.clientContext;

  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Accesso non autorizzato' }) };
  }
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Metodo non consentito' }) };
  }

  try {
    const betData = JSON.parse(event.body);

    const result = await sql`
      INSERT INTO giocate (
        risultato, quota, importo, vincita, esito, registrato_da
      ) VALUES (
        ${betData.risultato},
        ${betData.quota},
        ${betData.importo},
        ${betData.vincita},
        ${betData.esito},
        ${user.email}
      )
      RETURNING *
    `;

    return {
      statusCode: 201,
      body: JSON.stringify(result[0]),
    };

  } catch (error) {
    // --- MODIFICA CHIAVE ---
    // Stampiamo l'errore dettagliato nei log di Netlify
    console.error('ERRORE NELLA FUNZIONE addGiocata:', error);
    // -----------------------

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Errore interno del server.',
        details: error.message // Includiamo anche il messaggio per il frontend
      }),
    };
  }
};