// File: netlify/functions/check-mlbb.js (or api/check-mlbb.js for Vercel)

// These secrets are accessed via the Environment Variables you set on your hosting platform.
const API_HOST = process.env.RAPIDAPI_HOST;
const API_KEY = process.env.RAPIDAPI_KEY;

exports.handler = async (event) => {
  const id = event.queryStringParameters.id;
  const server = event.queryStringParameters.server;

  if (!id || !server) {
    return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Missing ID or Server in request' }) 
    };
  }

  try {
    // Construct the actual RapidAPI URL using the secure environment variables
    const url = `https://${API_HOST}/mobile-legends/${encodeURIComponent(id)}/${encodeURIComponent(server)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY, // The key is only used here on the server
      }
    });

    const data = await response.json();
    // Return the response directly to your frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('Proxy Server Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
