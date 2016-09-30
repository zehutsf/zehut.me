import express from 'express';
import fetch from 'node-fetch';
import { getEvents } from './api/eventbrite';

const app = express();
app.set('port', (process.env.API_PORT || 3001));

app.get('/api/config', (req, rw) => {
  rw.json({
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    STRIPE_KEY: process.env.STRIPE_KEY
  });
});

app.get('/api/events', async (req, rw) => {
  try {
    const events = await getEvents();
    const dup = [...events, ...events, ...events];

    rw.json({ events: dup });
  } catch (err) {
    rw.json('Error');
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
