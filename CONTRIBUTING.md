# Kontribusi ke Roompy

Kami menghargai semua masukan dari kalian. Kami ingin kontribusi kalian terjadi semudah mungkin, baik itu:

- Melaporkan issue 🙋‍♂️
- Diskusi kondisi code yang ada sekarang ✍ _(dalam artian apakah code tersebut sudah sesuai dengan design pattern ataukah masih berantakan)_
- Submitting fix 🔨
- Mencanangkan ide / fitur baru ⭐
- Menjadi maintainer 👑

## Bagaimana proses _development_ di Roompy ?

Semua perubahan terhadap `master` branch terjadi melalui Pull Requests (PR). PR merupakan cara terbaik untuk mengusulkan suatu perubahan. Kami secara aktif menyambut PR anda dan mengundang anda untuk mengirimkan PR secara langsung [disini](https://github.com/rifandani/roompy/pulls), dan setelah di review, PR tersebut dapat lgsg digabungkan ke dalam `master` branch.

## Menggunakan standar commit message

Project ini menggunakan [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard. Hal ini dilakukan agar setiap commit yang dilakukan oleh para contributor terstandarisasi. Library yang digunakan untuk mengimplementasikan hal tersebut adalah [commitizen](https://github.com/commitizen/cz-cli).

Ikuti langkah berikut untuk memastikan setiap commit message yang anda tulis terstandarisasi:

1. Pastikan console shell path anda berada di dalam root project dengan benar 1️⃣
2. Jalankan `yarn` atau `yarn install` atau `npm install` 2️⃣
3. Lakukan staging file2 yang ingin anda commit dengan menjalankan `git add [files]` atau `git add .` 3️⃣
4. Jalankan `yarn cm`. Ini akan memulai prompt interaktif yang akan menghasilkan commit message Anda 4️⃣:
   1. Pilih `type` dari perubahan.
   2. Tulis `scope`. Pilih antara `global` untuk perubahan project secara umum, `frontend` untuk perubahan khusus pada frontend, `backend` untuk perubahan khusus pada backend, `cypress` untuk perubahan pada cypress code.
   3. Tuliskan `subject` yaitu pesan berisi penjelasan yang pendek, namun informatif mengenai perubahan yang anda lakukan.
   4. Kalau hal diatas masih dirasa kurang, anda dapat menambahkan penjelasannya lebih jelasnya setelahnya. Kalau tidak anda bisa langsung klik `enter` untuk membiarkannya ksoong.
   5. `y/n` klik `y` = yes, jika ada perubahan sangat signifikan sehingga menyebabkan breaking changes (contoh: mengubah input props dari suatu component, mengubah struktur JSON dari API response), klik `n` jika tidak ada.
   6. `y/n` klik `y` jika perubahan ini berdampak pada open issue, dan jika iya maka anda akan diminta untuk memasukkan issue number yang merujuk pada issue tersebut. Jika tidak maka klik `n`.
5. Commit message anda sekarang telah berhasil terbuat 🎉. Anda dipersilahkan untuk push ke fork anda dan membuka PR baru 5️⃣

## Tutorial kontribusi

1. [Submit new issue](https://github.com/rifandani/roompy/issues)
2. Fork repository ini
3. Buat branch baru dari develop branch (jangan pernah bekerja di _master branch_), contoh:

   ```bash
    # ketika ingin menambah feature baru
    git checkout -b feat/redux
    # ketika ingin memperbaiki bug
    git checkout -b fix/dashboard
   ```

4. Install semua dependencies `yarn install`
5. Buat file `.env.local` di root folder:

   ```py
    # jwt secret
    MY_SECRET_KEY=''
    # firebase secret
    NEXT_PUBLIC_FIRE_API_KEY=''
    NEXT_PUBLIC_FIRE_AUTH_DOMAIN=''
    NEXT_PUBLIC_FIRE_PROJECT_ID=''
    NEXT_PUBLIC_FIRE_STORAGE_BUCKET=''
    NEXT_PUBLIC_FIRE_MESSAGING_SENDER_ID=''
    NEXT_PUBLIC_FIRE_APP_ID=''
    NEXT_PUBLIC_FIRE_MEASUREMENT_ID=''
    NEXT_PUBLIC_FIRE_DATABASE_URL=''
    # sentry
    NEXT_PUBLIC_SENTRY_DSN=''
    # firebase service account JSON link, uploaded to code hosting like gist
    SERVICE_ACCOUNT_LINK=''
    # midtrans secret
    MIDTRANS_MERCHANT_ID=''
    MIDTRANS_CLIENT_KEY=''
    MIDTRANS_SERVER_KEY=''
    # cypress secret
    CYPRESS_RECORD_KEY=''
   ```

6. Jalankan dev server `yarn dev`
7. Fix bugs atau implementasi new features
8. Commit changes dengan standar yang telah dijelaskan sebelumnya
9. Selalu tulis E2E/integration test untuk backend API routes dan frontend, jika anda membuat/mengubah sesuatu di dalam logic backend API / frontend
10. Pastikan tidak ada error ataupun warning ketika menjalankan perintah `yarn lint`
11. Push changes ke remote repo, dan buat pull request ke `develop` branch
12. Kalau memungkinkan gunakan [reference keywords](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-issues/linking-a-pull-request-to-an-issue) di description untuk mereferensikan ke issues yang bersangkutan dengan pull request yang telah anda buat

    ```json
    changed transform prop of the modal so it can render text properly

    fix #14 // reference ke issues #14
    ```

13. Tunggu review dan comment terhadap pull request yang telah kalian buat
14. ~~Selalu tulis unit test (coming soon)~~
