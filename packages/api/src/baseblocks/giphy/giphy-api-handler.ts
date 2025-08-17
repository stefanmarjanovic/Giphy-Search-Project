import serverless from 'serverless-http';
import createApp from '../../util/express-app';
import 'dotenv/config';

const app = createApp();
export const handler = serverless(app);
console.log('Giphy API handler initialized');