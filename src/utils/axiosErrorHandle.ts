import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export default function axiosErrorHandle(err: AxiosError): void {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.info('Error response =>', err.response)
    toast.error(err.response.data?.message)
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.info('Error request =>', err.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.info('Error message => ', err.message)
  }

  console.info('Error config =>', err.config)
}
