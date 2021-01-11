import nc from 'next-connect';
import multipartFormParser from './multipart-form-parser';

const middleware = nc();

middleware.use(multipartFormParser);

export default middleware;
