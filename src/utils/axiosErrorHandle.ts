import { toast } from 'react-toastify'

export default function axiosErrorHandle(err: any) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('Error response =>', err.response)
    toast.error(err.response.data.err.message)
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('Error request =>', err.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error message => ', err.message)
  }

  console.log('Error config =>', err.config)
}
