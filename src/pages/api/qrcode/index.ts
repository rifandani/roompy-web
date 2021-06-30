import QRCode from 'qrcode'
// files
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withYupConnect from 'middlewares/withYupConnect'
import { qrcodeApiSchema, TQrcodeApi } from 'utils/yup/apiSchema'

export default nc
  .use(withCors(['GET', 'POST']))
  // yup middleware
  .use(withYupConnect(qrcodeApiSchema))
  .get('/api/qrcode', async (_, res) => {
    // generate QRcode
    const url = 'https://roompy.vercel.app'
    const qrcodeUrl = await QRCode.toDataURL(url)

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({
      error: false,
      url: qrcodeUrl,
    })
  })
  .post('/api/qrcode', async (req, res) => {
    // desctructure req.body
    const { url } = req.body as TQrcodeApi

    // generate qrcode based on url
    const qrcodeUrl = await QRCode.toDataURL(url)

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({
      error: false,
      url: qrcodeUrl,
    })
  })
