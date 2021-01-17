export const user = {
  createdAt: Date.now(), // number
  updatedAt: Date.now(), // number
  username: 'Tri Rizeki Rifandani', // string
  email: 'rifandani@usako.net', // string
  emailVerified: false, // boolean => untuk badge

  // awal registrasi value nya === []
  postedRoompies: [
    'BOvPqKhPqkaW2NPI0QRnZd5re953' // string => doc id postingan roompies
  ],
},

// semua field required
const roompies = {
  createdAt: Date.now(), // number
  updatedAt: Date.now(), // number
  postedBy: 'BOvPqKhPqkaW2NPI0QRnZd5re953', // string => doc id user yg nge post

  city: 'Kota Balikpapan', // string => select dari firestore collection "cities"
  age: 22, // number
  gender: 'Pria' | 'Wanita', // enum => jenis kelamin user
  budget: 100000, // number => batas kemampuan bayar untuk nge kos / sewa kamar per bulan
  moveDate: '21/02/2021', // string => tanggal kira2 kapan user tersebut ingin pindah kos/kontrakan
  occupation: 'Mahasiswa', // string => pekerjaan
  isSmoker: false, // boolean => user perokok apa nggak
  ownAnimal: false, // boolean => bawa hewan peliharaan apa enggak
  phoneNumber: '+6282243199535', // string => phone number yg bisa buat di WA

  genderPref: 'Pria' | 'Wanita', // enum => preferensi, mencari teman dengan jenis kelamin
  roomPref: 'satu kamar' | 'satu rumah', // enum => preferensi, mencari teman satu kamar kah atau satu rumah

  desc: 'Saya adalah orang yang baik dan mudah diajak berkomunikasi', // penjelasan kelebihan/keuntungan satu roommate bersama user + alamat rinci tempat pencarian
  photoURL: 'https://firebasestorage.googleapis.com//users/userId/foto.png', // string => url link ke storage
},

const chats = {
  idUserPengirim1: {
    idUserTujuan1: {
      text: 'isi pesan',
      createdAt: Date.now()
    },
    idUserTujuan2: {
      text: 'isi pesan',
      createdAt: Date.now()
    }
  },
  userIdPengirim2: {
    idUserTujuan1: {
      text: 'isi pesan',
      createdAt: Date.now()
    },
    idUserTujuan2: {
      text: 'isi pesan',
      createdAt: Date.now()
    }
  }
}