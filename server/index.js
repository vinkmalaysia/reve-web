const express = require('express');
const compression = require('compression');
const next = require('next');
const helmet = require('helmet');

const routes = require('../src/routes');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });

const appHandler = routes.getRequestHandler(app);

// Custom express server
const server = express();

server.use(helmet());
server.use(compression());

app
  .prepare()
  .then(() => {
    server.all('*', appHandler);

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
