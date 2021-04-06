import nc from 'next-connect'
import multer from 'multer'
// files
// import multipartFormParser from './multipart-form-parser';

const upload = multer()
const middleware = nc()

// middleware.use(multipartFormParser);
middleware.use(upload.single('dropzone'))

export default middleware
