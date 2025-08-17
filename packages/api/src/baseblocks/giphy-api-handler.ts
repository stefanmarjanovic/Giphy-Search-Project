import serverless from 'serverless-http';
import createApp from '../util/express-app';

const app = createApp();
console.log('serverless handler app started') // debugging 
export const handler = serverless(app);

