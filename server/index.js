import express from 'express';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const time = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${time}ms`);
  });

  next();
});

let events = [
  {
    id: 1,
    title: 'Welcome party for Erasmus students',
    description: 'Meet the other exchange students, eat pizza and get your welcome pack.',
    date: '2026-10-15T18:00',
    location: 'Main hall, building A',
    capacity: 120,
  },
  {
    id: 2,
    title: 'Hackathon: apps for the city',
    description: 'Build an app that makes life in Kraków easier. Teams of 3 to 5, prizes for the top three.',
    date: '2026-11-07T09:00',
    location: 'Lab 204',
    capacity: 40,
  },
  {
    id: 3,
    title: 'Board game night',
    description: 'Bring your favourite game or learn a new one. Beginners welcome.',
    date: '2026-10-22T19:00',
    location: 'Student club',
    capacity: 30,
  },
];
let nextId = 4;


function validateEvent(body) {
  if (typeof body.title !== 'string' || body.title.trim().length < 3) {
    return 'title must have at least 3 characters';
  }
  if (body.title.length > 120) {
    return 'title must have at most 120 characters';
  }
  if (typeof body.date !== 'string' || Number.isNaN(Date.parse(body.date))) {
    return 'date must be a valid date';
  }
  if (new Date(body.date) <= new Date()) {
    return 'date must be in the future';
  }
  if (!Number.isInteger(body.capacity) || body.capacity < 1) {
    return 'capacity must be a whole number greater than 0';
  }
  if (body.location != null &&
      (typeof body.location !== 'string' || body.location.length > 100)) {
    return 'location must have at most 100 characters';
  }
  if (body.description != null &&
      (typeof body.description !== 'string' || body.description.length > 1000)) {
    return 'description must have at most 1000 characters';
  }
  return null;
}


function toEvent(id, body) {
  return {
    id,
    title: body.title.trim(),
    description: body.description ?? '',
    date: body.date,
    location: body.location ?? '',
    capacity: body.capacity,
  };
}


app.get('/api/events', (req, res) => {
  const q = String(req.query.q ?? '').toLowerCase();
  const from = req.query.from;
  const sort = req.query.sort;

  let result = events.filter((e) =>
    e.title.toLowerCase().includes(q)
  );

  if (from) {
    result = result.filter((e) => e.date >= from);
  }

  if (sort === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    result.sort((a, b) => a.date.localeCompare(b.date));
  }

  res.json(result);
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find((e) => e.id === Number(req.params.id));
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

app.post('/api/events', (req, res) => {
  const error = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  const event = toEvent(nextId++, req.body);
  events.push(event);
  res.status(201).json(event);
});

app.put('/api/events/:id', (req, res) => {
  const index = events.findIndex((e) => e.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  const error = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  events[index] = toEvent(events[index].id, req.body);
  res.json(events[index]);
});

app.delete('/api/events/:id', (req, res) => {
  const before = events.length;
  events = events.filter((e) => e.id !== Number(req.params.id));
  if (events.length === before) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.status(204).end();
});

app.get('/api/stats', (req, res) => {
  const now = new Date();

  const futureEvents = events
    .filter(e => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const next = futureEvents[0];

  res.json({
    count: events.length,
    totalCapacity: events.reduce((sum, e) => sum + e.capacity, 0),
    nextEvent: next
      ? { id: next.id, title: next.title, date: next.date }
      : null
  });
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});