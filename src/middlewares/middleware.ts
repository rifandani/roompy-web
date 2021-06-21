import nc from 'next-connect'
import multer from 'multer'

const upload = multer()
const middleware = nc()

middleware.use(upload.single('dropzone'))

export default middleware
