module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'roompy-roompies.appspot.com',
      'images.unsplash.com',
      'placeimg.com',
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // so that it also available on client-side
  // env: {
  //   FIRE_API_KEY: 'AIzaSyBf1dnAqc9N7EPGxXCtysVE-96oLcNNHIg',
  //   FIRE_AUTH_DOMAIN: 'roompy-roompies.firebaseapp.com',
  //   FIRE_PROJECT_ID: 'roompy-roompies',
  //   FIRE_STORAGE_BUCKET: 'roompy-roompies.appspot.com',
  //   FIRE_MESSAGING_SENDER_ID: '963030164384',
  //   FIRE_API_ID: '1:963030164384:web:85ab56de068fb7d44a7ac5',
  //   FIRE_MEASUREMENT_ID: 'G-VCE8864BGF',
  //   FIRE_DATABASE_URL: 'https://roompy-roompies-default-rtdb.firebaseio.com',
  // },
}
