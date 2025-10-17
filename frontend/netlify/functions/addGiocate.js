import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NETLIFY_DATABASE_URL);

export const handler = async (event, context) => {
  const { user } = context.clientContext;

  // 1. Sicurezza: controlla utente
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Accesso non autorizzato' }),
    };
  }
  
  // 2. Controlla che il metodo sia POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ error: 'Metodo non consentito' }),
    };
  }

  try {
    // 3. Prendi i dati della giocata
    const betData = JSON.parse(event.body);

    // 4. Inserisci nel database (assicurati che i nomi colonne siano giusti)
    // Usiamo l'email dell'utente loggato come 'registrato_da'
    const result = await sql`
      INSERT INTO giocate (
        risultato, 
        quota, 
        importo, 
        vincita, 
        esito, 
        registrato_da 
      ) VALUES (
        ${betData.risultato},
        ${betData.quota},
        ${betData.importo},
        ${betData.vincita},
        ${betData.esito},
        ${user.email} 
      )
      RETURNING *
    `; // RETURNING * ci restituisce la riga appena creata

    return {
      statusCode: 201, // 201 Created
      body: JSON.stringify(result[0]), // Invia la nuova giocata al frontend
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};