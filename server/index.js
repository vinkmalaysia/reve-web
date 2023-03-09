const express = require('express');
const compression = require('compression');
const next = require('next');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;

// TODO Fix broken server script
const app = next({ dev });

// Custom express server
const server = express();

server.use(helmet({
  contentSecurityPolicy: false,
}));
server.use(compression());

app
  .prepare()
  .then(() => {
    server.all('*', app.getRequestHandler());

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
