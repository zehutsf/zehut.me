import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.set('port', (process.env.API_PORT || 3001));

const EVENTBRITE_API_URL = 'http://www.eventbriteapi.com/v3';
const EVENTBRITE_API_TOKEN = process.env.EVENTBRITE_OAUTH_TOKEN;
const EVENTBRITE_ORGANIZER_ID = process.env.EVENTBRITE_ORGANIZER_ID;
const EVENTBRITE_EVENTS_URL = `${EVENTBRITE_API_URL}/organizers/${EVENTBRITE_ORGANIZER_ID}/events?status=live&order_by=start_asc`;
const EVENTBRITE_HEADERS = {
  'Authorization': `Bearer ${EVENTBRITE_API_TOKEN}`
};

const createEventInfo = (eventJSON) => ({
  name: eventJSON.name.text,
  description: eventJSON.description.text,
  id: eventJSON.id,
  url: eventJSON.vanity_url || eventJSON.url,
  startDate: eventJSON.start.local,
  image: eventJSON.logo.url
});

app.get('/api/events', async (req, rw) => {
  try {
    const result = await fetch(EVENTBRITE_EVENTS_URL, { headers: EVENTBRITE_HEADERS });
    const data = await result.json();
    const events = data.events.map(createEventInfo);
    rw.json({ events });
  } catch (err) {
    rw.json('Error');
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
