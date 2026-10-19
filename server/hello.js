
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Welcome to Campus Events'
    }));

  } else if (req.url === '/time') {
    res.writeHead(200);
    res.end(JSON.stringify({
      now: new Date().toISOString()
    }));

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({
      error: 'Not found'
    }));
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
