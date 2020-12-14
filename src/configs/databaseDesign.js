export const user = {
  createdAt: Date.now(), // number
  updatedAt: Date.now(), // number
  username: 'Tri Rizeki Rifandani', // string
  email: 'rifandani@usako.net', // string
  emailVerified: false | true, // boolean => untuk badge

  // awal registrasi value nya === []
  postedProfiles: [
    'pgzqqeSGHvRvopxcfKquQFuIN2h1-profile1', // string => ref ke profile id yg di post
  ],
  postedRooms: [
    'pgzqqeSGHvRvopxcfKquQFuIN2h1-room1', // string => ref ke room id yg di post
  ],
},

// semua field required
const profile = {
  createdAt: Date.now(), // number
  updatedAt: Date.now(), // number
  postedBy: user, // object => ref ke user yg nge post

  zipCode: 76111, // number => buat ntar nge filter berdasarkan wilayah/lokasi
  age: 22, // number
  gender: 'pria' | 'wanita', // enum => jenis kelamin user
  budget: 100000, // number => batas kemampuan bayar untuk nge kos / sewa kamar per bulan
  moveDate: '25/05/1998', // string => tanggal kira2 kapan user tersebut ingin pindah kos/kontrakan
  occupation: 'mahasiswa', // string => pekerjaan
  isSmoker: false, // boolean => user perokok apa nggak
  ownAnimal: false, // boolean => bawa hewan peliharaan apa enggak
  phoneNumber: '+6282243199535', // string => phone number yg bisa buat di WA

  genderPref: 'pria' | 'wanita', // enum => mencari teman dengan jenis kelamin
  sharePref: 'satu kamar' | 'satu rumah', // enum => mencari teman satu kamar kah atau satu kontrakan

  desc: 'Saya adalah orang yang baik dan mudah diajak berkomunikasi', // penjelasan kelebihan/keuntungan satu roommate bersama user
  photoURL: 'https://firebasestorage.googleapis.com//users/userId/foto.png', // string => url link ke firestore
},

const rooms = {
  createdAt: Date.now(), // number
  updatedAt: Date.now(), // number
  postedBy: user, // object => ref ke user yg nge post


}
