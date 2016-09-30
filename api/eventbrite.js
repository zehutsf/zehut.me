import fetch from 'node-fetch';
import moment from 'moment';

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
  displayDate: moment(eventJSON.start.local).format('MMMM Do'),
  image: eventJSON.logo.url
});

export const getEvents = async () => {
    const result = await fetch(EVENTBRITE_EVENTS_URL, { headers: EVENTBRITE_HEADERS });
    const data = await result.json();
    return data.events.map(createEventInfo);
};
