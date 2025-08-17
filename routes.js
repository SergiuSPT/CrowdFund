import nextRoutes from 'next-routes';

const routes = nextRoutes();
routes.add('/campaigns/new', '/campaigns/new')
       .add('/campaigns/:address', '/campaigns/show')
        .add('/campaigns/:address/requests', 'campaigns/requests/index')
        .add('/campaigns/:address/requests/new', 'campaigns/requests/new')
export const { Router } = routes;
export const {Link} = routes;
export default routes;
