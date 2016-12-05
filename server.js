import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import { query } from './api/db';
import { getEvents } from './api/eventbrite';
import {
  createMonthlyContribution,
  createOneTimeContribution
} from './api/contribution';

const app = express();
app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());

app.get('/api/config', (req, rw) => {
  rw.json({
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    STRIPE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

app.get('/api/events', async (req, rw) => {
  try {
    const events = await getEvents();
    rw.json({ events });
  } catch (err) {
    rw.json('Error');
  }
});

app.post('/api/contribute', async (req, rw) => {
  const { token, amount, type } = req.body;

  if (!token) {
    rw.json({error: 'No token provided'});
  }

  const { id, email } = token;
  const contributionMethod = type === 'monthly' ? createMonthlyContribution : createOneTimeContribution;

  let contributionData;
  try {
    contributionData = await contributionMethod(id, email, amount);
  } catch (error) {
    return rw.json({ error: error.toString() });
  }

  let dbResult;
  try {
    contributionData.createdAt = (new Date()).getTime() / 1000;
    dbResult = await query('INSERT INTO contribution SET ?', contributionData);
  } catch (err) {
    // Ignore this local DB error, as the Stripe transaction itself has gone through.
    // This avoids presenting an error to the user.
    console.log('Error saving contribution entry', err.toString());
  }

  return rw.json({ success: true });
});

app.use(express.static(__dirname + '/client/build'));

app.get("*", (req, rw) => {
  rw.sendFile(__dirname + '/client/build/index.html');
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
