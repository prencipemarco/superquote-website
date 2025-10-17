import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NETLIFY_DATABASE_URL);

export const handler = async (event, context) => {
  
  // 1. CONTROLLO DI SICUREZZA
  // Netlify decodifica il token e ci passa l'utente
  const { user } = context.clientContext;

  // 2. Se non c'è utente, blocca l'accesso
  if (!user) {
    return {
      statusCode: 401, // Unauthorized
      body: JSON.stringify({ error: 'Accesso non autorizzato' }),
    };
  }

  // 3. Se l'utente è autorizzato, procedi
  try {
    const giocate = await sql`
      SELECT * FROM giocate 
      ORDER BY data DESC, id DESC
    `;
    
    return {
      statusCode: 200,
      body: JSON.stringify(giocate),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};