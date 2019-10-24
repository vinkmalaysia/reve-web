const nextRoutes = require('next-routes');
const routes = nextRoutes();

const routesConfig = [
  {
    page: 'index',
    pattern: '/',
  },
  {
    page: 'about',
    pattern: '/about',
  },
];

routesConfig.forEach(route => routes.add(route));

module.exports = routes;
