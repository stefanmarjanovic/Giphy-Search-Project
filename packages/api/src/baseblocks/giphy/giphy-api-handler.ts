import serverless from 'serverless-http';
import createApp from '../../util/express-app';

const app = createApp();
export const handler = serverless(app);