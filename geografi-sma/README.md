# 🌍 Website Materi Geografi SMA — Panduan untuk Guru

Panduan ini ditulis untuk **guru yang bukan programmer**. Ikuti langkahnya pelan-pelan dari atas ke bawah. Bapak/Ibu tidak perlu menginstal program rumit dan tidak perlu mengetik perintah apa pun di layar hitam (terminal).

Website ini **statis**, artinya isinya hanya berupa file HTML, CSS, dan JavaScript biasa. Karena itu website ini bisa di-hosting **gratis** di GitHub Pages atau Netlify.

---

## Daftar Isi

1. [Mengenal isi folder](#1-mengenal-isi-folder)
2. [Persiapan: program yang dibutuhkan](#2-persiapan-program-yang-dibutuhkan)
3. [Mencoba website di komputer sendiri](#3-mencoba-website-di-komputer-sendiri)
4. [Cara A — Unggah ke GitHub Pages](#4-cara-a--unggah-ke-github-pages)
5. [Cara B — Unggah ke Netlify](#5-cara-b--unggah-ke-netlify)
6. [Mengedit materi](#6-mengedit-materi)
7. [Menambah modul baru](#7-menambah-modul-baru)
8. [Memperbarui website setelah diedit](#8-memperbarui-website-setelah-diedit)
9. [Masalah yang sering terjadi](#9-masalah-yang-sering-terjadi)

---

## 1. Mengenal isi folder

```
/  (folder utama website)
├── index.html            ← Beranda
├── kelas-x.html          ← Daftar modul Kelas X (Fase E)
├── kelas-xi.html         ← Daftar modul Kelas XI (Fase F, 6 modul)
├── kelas-xii.html        ← Daftar modul Kelas XII (Fase F)
├── glosarium.html        ← Kamus istilah A–Z
├── lab-3d.html           ← Daftar 7 model 3D (GeoRuang 3D)
├── tentang.html          ← Halaman tentang website
├── kontak.html           ← Halaman kontak
├── README.md             ← Panduan ini
├── 3d/                   ← 7 model 3D interaktif (bumi, gunung-api, atmosfer, hidrosfer,
│                           keanekaragaman-hayati, gempa-tsunami, sig-lanjutan)
├── apps-script/
│   └── Rekap-Nilai.gs    ← Skrip untuk Google Spreadsheet (lihat 6.11)
├── css/
│   └── style.css         ← Semua tampilan (warna, huruf, tata letak)
├── js/
│   ├── main.js           ← Menu, mode gelap, pencarian, progres
│   ├── kuis.js           ← Logika pretest & posttest
│   ├── rekap.js          ← Kirim nilai ke Google Spreadsheet (isi URL_REKAP)
│   ├── glosarium-data.js ← DAFTAR ISTILAH glosarium (sering diedit)
│   ├── glosarium.js      ← Logika glosarium (tidak perlu diedit)
│   ├── peta-bencana.js   ← Logika peta bencana di modul Peta & SIG (tidak perlu diedit)
│   ├── peta-titik.js     ← Logika peta interaktif lain, mis. gunung api (tidak perlu diedit)
│   ├── peta-dasar.js     ← Peta dasar yang tetap tampil tanpa internet (tidak perlu diedit)
│   ├── peta-dasar-data.js← Data garis pantai Indonesia dari Natural Earth (tidak perlu diedit)
│   ├── vendor/leaflet/   ← Pustaka peta Leaflet 1.9.4, disimpan lokal (jangan diubah)
│   ├── media.js          ← Video, tombol animasi, kalkulator interaktif (tidak perlu diedit)
│   └── kontak.js         ← Logika formulir kontak (tidak perlu diedit)
├── materi/
│   ├── x-01-konsep-dasar.html
│   ├── x-02-peta-sig.html
│   ├── ...               ← satu file untuk setiap modul
│   └── xii-04-kerja-sama.html
└── assets/
    └── img/              ← tempat menyimpan gambar (baca README.md di dalamnya)
```

**Aturan penting tentang nama file:**

- Gunakan **huruf kecil semua**, tanpa spasi. Ganti spasi dengan tanda hubung (`-`).
  ✅ `peta-indonesia.jpg`  ❌ `Peta Indonesia.JPG`
- GitHub Pages membedakan huruf besar dan kecil. `Gambar.jpg` dan `gambar.jpg` dianggap dua file berbeda. Inilah penyebab paling umum gambar tidak muncul setelah diunggah.
- **Jangan memindahkan atau mengganti nama folder** `css`, `js`, `materi`, dan `assets`. Semua halaman saling terhubung lewat nama folder ini.

---

## 2. Persiapan: program yang dibutuhkan

| Kebutuhan | Rekomendasi (gratis) | Fungsi |
|---|---|---|
| Penyunting teks | **Visual Studio Code** (code.visualstudio.com) atau **Notepad++** | Membuka dan mengedit file HTML/JS |
| Browser | Google Chrome / Microsoft Edge / Firefox | Melihat hasil website |
| Akun hosting | GitHub (github.com) **atau** Netlify (netlify.com) | Tempat website online |

> ⚠️ **Jangan mengedit file HTML dengan Microsoft Word.** Word menambahkan format tersembunyi yang merusak file. Gunakan VS Code atau Notepad++.

**Tips VS Code untuk pemula:**
- Buka seluruh folder website: menu **File → Open Folder…**, lalu pilih folder utama website. Semua file akan tampil di panel kiri.
- Simpan perubahan dengan **Ctrl + S**.
- Cari tulisan tertentu di semua file dengan **Ctrl + Shift + F**. Ini berguna untuk menemukan semua penanda `EDIT DI SINI`.

---

## 3. Mencoba website di komputer sendiri

Sebelum mengunggah, cek dulu hasilnya di komputer:

1. Buka folder website di File Explorer.
2. Klik dua kali file **`index.html`**. Website akan terbuka di browser.
3. Coba klik menu, buka modul, kerjakan kuis, dan cari istilah di glosarium.
4. Setiap kali selesai mengedit file, simpan (Ctrl + S), lalu tekan **F5** di browser untuk memuat ulang.

> 💡 Peta interaktif tetap tampil **tanpa internet** karena memakai peta dasar garis pantai yang tersimpan di website. Setelah website online (GitHub Pages/Netlify), peta detail OpenStreetMap otomatis ditambahkan. Peta OpenStreetMap memang **tidak bisa** tampil jika file dibuka langsung dari komputer (alamat `file:///...`), karena server OpenStreetMap menolaknya. Itu sebabnya disediakan peta dasar lokal.

---

## 4. Cara A — Unggah ke GitHub Pages

Alamat website nantinya: `https://namapengguna.github.io/nama-repositori/`

### 4.1 Membuat akun GitHub

1. Buka **github.com**, klik **Sign up**.
2. Isi email, kata sandi, dan **username**. Username akan menjadi bagian alamat website, jadi pilih yang rapi, misalnya `geografi-mansatu`.
3. Verifikasi email Anda.

### 4.2 Membuat repositori (wadah file)

1. Setelah masuk, klik tombol **+** di pojok kanan atas → **New repository**.
2. **Repository name**: misalnya `geografi-sma`. Gunakan huruf kecil dan tanda hubung.
3. Pilih **Public**. GitHub Pages gratis hanya untuk repositori publik.
4. Centang **Add a README file**.
5. Klik **Create repository**.

### 4.3 Mengunggah file website

1. Di halaman repositori, klik **Add file → Upload files**.
2. Buka folder website di File Explorer, pilih **semua isi folder** (Ctrl + A), lalu **seret (drag)** ke kotak unggah di browser.
   - Seret **isi folder**, bukan folder utamanya. File `index.html` harus berada langsung di halaman depan repositori, tidak di dalam subfolder.
   - Folder `css`, `js`, `materi`, dan `assets` ikut terunggah beserta isinya.
3. Tunggu sampai semua file selesai terunggah.
4. Di bagian bawah, kotak **Commit changes**, tulis catatan singkat, misalnya `Unggah pertama website`.
5. Klik **Commit changes**.

> 💡 Jika Anda sudah mencentang "Add a README file" di langkah 4.2, GitHub akan menimpanya dengan README.md panduan ini. Itu tidak masalah.

### 4.4 Menyalakan GitHub Pages

1. Di repositori, klik tab **Settings** (ikon roda gigi).
2. Di menu kiri, klik **Pages**.
3. Di bagian **Build and deployment → Source**, pilih **Deploy from a branch**.
4. Di bagian **Branch**, pilih **main** dan folder **/ (root)**, lalu klik **Save**.
5. Tunggu 1–3 menit, lalu muat ulang halaman Settings → Pages. Akan muncul tulisan **"Your site is live at …"** beserta alamatnya.
6. Klik alamat itu. Website Anda sudah online. 🎉

---

## 5. Cara B — Unggah ke Netlify

Netlify adalah cara **paling cepat**: cukup seret folder ke browser. Alamat website nantinya: `https://nama-pilihan.netlify.app`

### 5.1 Unggah dengan seret-lepas (paling mudah)

1. Buka **app.netlify.com**, daftar atau masuk. Bisa memakai akun Google, GitHub, atau email.
2. Buka halaman **Sites** (atau **Projects**), lalu cari kotak bertuliskan kurang lebih *"drag and drop your site output folder here"*.
3. Seret **folder utama website**, yaitu folder yang berisi `index.html`, ke kotak tersebut.
   - Berbeda dengan GitHub: di Netlify yang diseret adalah **folder utamanya**.
4. Tunggu beberapa detik. Netlify akan memberi alamat acak, misalnya `https://melodic-kringle-12ab34.netlify.app`.

### 5.2 Mengganti nama alamat website

1. Buka situs Anda di Netlify → **Site configuration** (atau **Project configuration**).
2. Pada bagian **Site details / Site information**, klik **Change site name**.
3. Ketik nama baru, misalnya `geografi-man3`, lalu simpan.
4. Alamat website berubah menjadi `https://geografi-man3.netlify.app`.

### 5.3 (Opsional) Menghubungkan Netlify dengan GitHub

Jika website sudah ada di GitHub (Cara A), Anda bisa menghubungkannya ke Netlify. Setiap kali file di GitHub diubah, Netlify **memperbarui website secara otomatis**.

1. Di Netlify: **Add new site → Import an existing project → GitHub**.
2. Izinkan Netlify mengakses akun GitHub Anda, lalu pilih repositori `geografi-sma`.
3. Biarkan kolom **Build command** kosong dan **Publish directory** kosong atau berisi `/`. Website ini tidak perlu proses build.
4. Klik **Deploy**.

> Nama menu di GitHub dan Netlify kadang berubah sedikit karena tampilannya diperbarui. Jika tidak menemukan tombol yang persis sama, cari menu dengan arti yang mirip.

---

## 6. Mengedit materi

Semua bagian yang boleh diedit guru diberi penanda seperti ini:

```html
<!-- ===== EDIT DI SINI: judul tab & deskripsi untuk mesin pencari ===== -->
```

Tulisan di antara `<!--` dan `-->` adalah **komentar**. Komentar tidak tampil di website, hanya petunjuk untuk Anda. Cari penanda ini dengan **Ctrl + Shift + F** di VS Code, lalu ketik `EDIT DI SINI`.

### 6.1 Dasar mengedit HTML (cukup ini yang perlu diketahui)

HTML memakai **tag pembuka** dan **tag penutup**. Ubahlah hanya teks di antaranya:

```html
<h2>Judul Subbab</h2>          ← judul besar (subbab)
<h3>Judul Bagian Kecil</h3>     ← judul kecil
<p>Ini satu paragraf.</p>       ← paragraf
<strong>tebal</strong>          ← huruf tebal
<em>miring</em>                 ← huruf miring

<ul>                            ← daftar berpoin
  <li>Butir pertama</li>
  <li>Butir kedua</li>
</ul>

<ol>                            ← daftar bernomor
  <li>Langkah satu</li>
  <li>Langkah dua</li>
</ol>
```

**Tiga aturan emas:**
1. Setiap tag pembuka `<p>` harus punya pasangan penutup `</p>`.
2. Jangan menghapus tanda `<`, `>`, `"`, atau `/` secara tidak sengaja.
3. Jika tampilan tiba-tiba berantakan setelah diedit, tekan **Ctrl + Z** berkali-kali di VS Code untuk membatalkan perubahan.

### 6.2 Mengubah CP, TP, dan ATP

CP, TP, dan ATP di website ini bersumber dari **ATP Geografi TKA MAN 3 Bogor** (5 elemen, 20 pertemuan, 60 JP).

- **Halaman kelas** (`kelas-x.html`, dan seterusnya): kotak *Capaian Pembelajaran* berisi elemen dan daftar ATP yang dipelajari di kelas tersebut, beserta nomor modulnya.
- **Halaman modul**: kotak *Capaian & Tujuan Pembelajaran* berisi:
  - **Capaian Pembelajaran**: elemen, sub-elemen, dan kompetensi utama;
  - **Tujuan Pembelajaran (ATP)**: TP lengkap dengan label kode, misalnya <code>ATP 5.1</code>. Label bergaris tepi dengan tulisan "pendukung" berarti modul itu menjadi landasan bagi ATP tersebut;
  - **Indikator Ketercapaian Modul**: tujuan khusus yang lebih rinci untuk modul itu.
- **Halaman Tentang** memuat tabel pemetaan seluruh ATP (1.1–5.3) ke modul.

Jika ATP diperbarui, cari penanda `EDIT DI SINI: CP, TP, dan ATP` di setiap file, lalu ubah teksnya. Untuk menambah TP, salin satu baris `<li><span class="atp-kode">ATP 1.2</span> ...</li>` dan ganti kode serta isinya.

### 6.3 Menambah gambar

1. Simpan gambar di folder `assets/img/`. Gunakan nama huruf kecil tanpa spasi, misalnya `peta-lempeng.jpg`.
2. Perkecil ukuran file sebelum diunggah (idealnya di bawah 300 KB) agar website cepat dibuka di HP. Bisa memakai situs gratis seperti squoosh.app.
3. Tempel kode ini di file modul:

```html
<figure>
  <img src="../assets/img/peta-lempeng.jpg"
       alt="Peta pertemuan Lempeng Eurasia, Indo-Australia, dan Pasifik di Indonesia">
  <figcaption>Gambar 1. Pertemuan tiga lempeng utama di Indonesia</figcaption>
</figure>
```

- `../` artinya "naik satu folder". Ini dipakai karena file modul ada di dalam folder `materi/`.
- **`alt` wajib diisi** dengan deskripsi gambar, untuk siswa yang memakai pembaca layar dan untuk berjaga jika gambar gagal dimuat.
- Untuk gambar dari internet, pastikan boleh dipakai ulang dan cantumkan sumbernya di `figcaption`.

### 6.4 Menambah tabel

```html
<div class="table-wrap">
  <table>
    <caption>Judul tabel</caption>
    <thead>
      <tr><th>Kolom 1</th><th>Kolom 2</th></tr>
    </thead>
    <tbody>
      <tr><td>Isi</td><td>Isi</td></tr>
      <tr><td>Isi</td><td>Isi</td></tr>
    </tbody>
  </table>
</div>
```

Pembungkus `table-wrap` membuat tabel lebar bisa digeser ke samping di layar HP.

### 6.5 Menambah istilah glosarium

Buka **`js/glosarium-data.js`**, salin satu blok, lalu ubah isinya:

```js
  {
    istilah: "Isohiet",
    kategori: "Atmosfer",
    definisi: "Garis pada peta yang menghubungkan tempat-tempat dengan curah hujan sama."
  },
```

- Urutan tidak perlu alfabetis karena halaman mengurutkan otomatis.
- Jangan lupa **tanda koma** setelah `}`.
- Teks harus diapit tanda kutip ganda `"..."`. Jika di dalam teks butuh tanda kutip, pakai kutip tunggal `'...'`.
- Untuk menautkan istilah dari halaman modul, gunakan:
  `<a href="../glosarium.html?cari=isohiet">isohiet</a>`

### 6.6 Menambah titik di peta interaktif

Buka **`materi/x-02-peta-sig.html`**, cari tabel `id="tabel-bencana"`, lalu salin satu baris `<tr>`:

```html
<tr data-lat="-7.25" data-lng="112.75" data-jenis="hidrometeorologi">
  <td>Nama Peristiwa</td>
  <td>Lokasi</td>
  <td>Waktu</td>
  <td>Hidrometeorologi</td>
  <td>Keterangan singkat.</td>
</tr>
```

- **Cara mendapat koordinat:** buka Google Maps, klik kanan pada lokasi, lalu klik angka koordinat yang muncul (otomatis tersalin). Angka pertama untuk `data-lat`, angka kedua untuk `data-lng`.
- Lintang Selatan bernilai **negatif** (contoh: `-7.25`).
- `data-jenis` diisi salah satu dari: `geologi`, `vulkanik`, atau `hidrometeorologi`.

### 6.7 Mengganti soal pretest dan posttest (kuis)

Setiap modul memiliki dua kuis:

| Kuis | Letak | Jumlah soal | Pola `name` | Penanda |
|---|---|---|---|---|
| **Pretest** | Sebelum materi (`id="pretest"`) | 5 | `x02-p1` … `x02-p5` | `data-simpan="pertama"`: hanya nilai percobaan **pertama** yang disimpan |
| **Posttest** | Setelah rangkuman (`id="latihan"`) | 10 | `x02-s1` … `x02-s10` | `data-pembanding="x-02-pre"`: setelah diperiksa, muncul perbandingan *Pretest → Posttest* |

Bentuk setiap soal sama untuk pretest maupun posttest.

Setiap soal di bagian **Latihan Soal** berbentuk seperti ini (contoh soal posttest dari `materi/x-02-peta-sig.html`):

```html
<fieldset class="quiz-question" data-answer="b">
  <legend>1. Perbandingan jarak di peta dengan jarak sebenarnya disebut …</legend>
  <ul class="quiz-options">
    <li><label class="quiz-option"><input type="radio" name="x02-s1" value="a"> Legenda</label></li>
    <li><label class="quiz-option"><input type="radio" name="x02-s1" value="b"> Skala</label></li>
    <li><label class="quiz-option"><input type="radio" name="x02-s1" value="c"> Orientasi</label></li>
    <li><label class="quiz-option"><input type="radio" name="x02-s1" value="d"> Inset</label></li>
  </ul>
  <p class="quiz-feedback">Skala adalah perbandingan jarak di peta dengan jarak sebenarnya.</p>
</fieldset>
```

- **`data-answer`** diisi huruf kunci jawaban (`a`, `b`, `c`, atau `d`). Pilihan boleh lebih dari 4 (tambahkan `e`).
- **`name="x02-s1"`** harus **sama** untuk semua pilihan dalam satu soal, dan **berbeda** antarsoal. Pola yang dipakai: kode modul tanpa tanda hubung + nomor soal (`x02-s1`, `x02-s2`, …, `xi03-s1`, dan seterusnya).
- **`quiz-feedback`** berisi pembahasan. Isinya tampil setelah jawaban diperiksa. Boleh dikosongkan, tetapi sangat dianjurkan diisi.
- Usahakan letak jawaban benar **tersebar** (a, b, c, d), tidak selalu di huruf yang sama, agar siswa tidak menebak pola.
- Jumlah soal boleh ditambah atau dikurangi; skor 0–100 dihitung otomatis.
- Ingin urutan pilihan **diacak** setiap kali dibuka/diulang? Tambahkan `data-acak="ya"` pada `<section class="quiz" ...>`. Kunci jawaban tetap aman karena dinilai dari `value`, bukan posisi.
- Kotak hasil menampilkan nilai, jumlah benar, pesan motivasi, dan **nilai terbaik** siswa (tersimpan di browser siswa).
- Pesan motivasi bisa diubah di bagian `PESAN` paling atas `js/kuis.js` (opsional). Selebihnya file itu tidak perlu diubah.

> 📌 Secara bawaan, nilai hanya tersimpan di browser siswa. Agar terekap otomatis di Google Spreadsheet, ikuti **bagian 6.11**.

> 💡 Jika ada soal yang tidak pernah dinilai benar, periksa apakah `data-answer` sudah diisi dan cocok dengan salah satu `value`. Di Chrome, tekan **F12 → Console**: kuis akan menulis peringatan bila ada soal tanpa kunci jawaban.

### 6.8 Mengganti alamat email di halaman Kontak

Website statis tidak bisa mengirim email sendiri. Formulir di `kontak.html` akan **membuka aplikasi email** di HP/laptop siswa dengan pesan yang sudah terisi otomatis. Siswa tinggal menekan *Kirim*.

Alamat email saat ini adalah `janatunr@gmail.com`. Untuk menggantinya, buka `kontak.html`, cari alamat tersebut, lalu ganti **di semua tempat** (daftar kontak, atribut `data-email` pada formulir, dan pesan `noscript`). Alamat yang sama juga ada di `tentang.html`. Gunakan **Ctrl + H** (Cari dan Ganti) di VS Code agar sekaligus.

> 💡 Jika ingin pesan masuk langsung tanpa aplikasi email, Anda bisa memakai Google Form: buat formulirnya, lalu ganti bagian formulir dengan tautan ke Google Form tersebut.

### 6.9 Mengelola media pembelajaran (diagram, animasi, grafik, video, peta)

Setiap media di halaman modul dibungkus penanda seperti ini, sehingga mudah dicari, dipindah, atau dihapus:

```html
<!-- MEDIA-MULAI x-04-2 (diagram/animasi/grafik/video) -->
   ... isi media ...
<!-- MEDIA-SELESAI -->
```

- **Menghapus media:** hapus semua baris dari `MEDIA-MULAI` sampai `MEDIA-SELESAI`.
- **Mengganti video YouTube:** buka video di YouTube, salin kode setelah `watch?v=` (misalnya `QcKN-q_6yI4`), lalu ganti nilai `data-video-id="..."` serta judul dan nama kanal di bawahnya. Video baru dimuat saat siswa mengklik gambar sampulnya, sehingga halaman tetap ringan.
- **Animasi** bisa dijeda siswa lewat tombol *Jeda animasi*. Bagi siswa yang mengaktifkan pengaturan "kurangi gerakan" di perangkatnya, animasi otomatis dalam keadaan jeda.
- **Grafik dan diagram** dibuat langsung dengan kode SVG di halaman (bukan file gambar), sehingga tajam di semua layar dan ikut berubah warna saat mode gelap. Data grafik yang bertanda "data ilustrasi" bisa diganti dengan data asli dari BPS atau BMKG.
- **Peta interaktif lain** (gunung api, ALKI, Garis Wallace–Weber, sentra SDA) bekerja seperti peta bencana: datanya ada di tabel di bawah peta. Tambah **titik** dengan menyalin baris `<tr data-lat="..." data-lng="..." data-jenis="...">`. Untuk **garis** (seperti ALKI), pakai `<tr data-garis="lintang,bujur; lintang,bujur; ..." data-jenis="...">`, yaitu daftar titik belok yang dipisahkan titik koma.
- **Grafik interaktif dan kalkulator** (skala, zona waktu, suhu, risiko bencana, kependudukan, piramida penduduk, buffer gunung api, NDVI, titik henti Reilly, model gravitasi, pola Christaller, struktur kota, resolusi citra) menghitung otomatis dari angka yang diketik siswa. Nilai awalnya bisa diganti pada atribut `value="..."`.
- **Foto asli** (misalnya hasil kunjungan lapangan) bisa ditambahkan dengan cara pada bagian 6.3.

### 6.10 Mengganti warna website

Buka **`css/style.css`**, bagian **1. VARIABEL WARNA**:

```css
--biru-bumi: #1e6091;
--hijau-alam: #2d6a4f;
--oranye-aksen: #e76f51;
```

Ganti kode warnanya. Kode warna bisa dicari dengan mengetik "color picker" di Google. Seluruh website akan ikut berubah.

### 6.11 Merekap nilai pretest & posttest ke Google Spreadsheet

Jika diaktifkan, di atas setiap pretest dan posttest muncul kotak **Nama lengkap, Kelas, No. absen** (cukup diisi sekali, otomatis terisi di modul lain). Setiap kali siswa menekan **Periksa Jawaban**, nilainya langsung tercatat di Google Spreadsheet Ibu/Bapak.

Spreadsheet berisi dua lembar yang dibuat otomatis:

| Lembar | Isi |
|---|---|
| **Rekap Nilai** | Satu baris per siswa per modul: pretest (percobaan pertama), posttest terbaik, posttest terakhir, kenaikan nilai, jumlah percobaan. Diurutkan menurut kelas, no. absen, dan modul. |
| **Data Mentah** | Semua kiriman apa adanya, lengkap dengan waktu. Berguna bila ingin memeriksa riwayat. |

**Langkah pemasangan (± 10 menit, cukup sekali):**

> ✅ Untuk MAN 3 Bogor, spreadsheet **Rekap Nilai Geografi** (lembar Petunjuk, Rekap Nilai, Ringkasan, Data Mentah) dan dokumen **Kode Apps Script** sudah dibuat di Google Drive akun akademik, folder **Rekap Nilai Geografi**. Lewati langkah 1 dan mulai dari langkah 2 di spreadsheet itu.

1. Buka [sheets.new](https://sheets.new) dengan akun Google Anda, beri nama misalnya **Rekap Nilai Geografi**.
2. Klik menu **Ekstensi → Apps Script**. Hapus semua tulisan di `Code.gs`, lalu tempel **seluruh isi** file `apps-script/Rekap-Nilai.gs` dari folder website ini. Klik ikon **💾 Simpan**. Lalu pilih fungsi **ujiCoba** di bilah atas dan klik **▶ Jalankan** untuk memberi izin dan memastikan skrip terhubung.
3. Klik tombol biru **Deploy → Deployment baru**. Klik ikon ⚙️ di sebelah "Pilih jenis", pilih **Aplikasi web**, lalu atur:
   - **Jalankan sebagai:** Saya
   - **Yang memiliki akses:** Siapa saja
4. Klik **Deploy**, lalu **Otorisasi akses** → pilih akun Anda. Jika muncul "Google belum memverifikasi aplikasi ini", klik **Lanjutan → Buka … (tidak aman) → Izinkan**. Ini wajar karena skrip dibuat sendiri.
5. Salin **URL aplikasi web** (berakhiran `/exec`).
6. Buka file `js/rekap.js`, cari baris `var URL_REKAP = "";` dan tempel URL tadi di antara tanda petik:
   ```js
   var URL_REKAP = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
7. Unggah ulang `js/rekap.js` ke GitHub (lihat bagian 8). Selesai.

**Lembar Ringkasan** (jika memakai spreadsheet yang sudah disiapkan) menghitung otomatis rata-rata pretest, rata-rata posttest terbaik, kenaikan, dan jumlah siswa tuntas per modul. Ketik nama kelas di sel kuning untuk memfilter, dan ubah KKM sesuai madrasah.

**Cara menguji:** tempel URL `/exec` di browser; harus muncul tulisan "✅ Rekap nilai Geografi aktif". Lalu buka satu modul di website, isi identitas, kerjakan pretest, dan periksa spreadsheet.

> 🔒 **Keamanan dan privasi**
> - "Siapa saja" artinya siapa saja **bisa mengirim** nilai, bukan melihat. Spreadsheet tetap hanya bisa dibuka oleh Anda (dan orang yang Anda bagikan).
> - Ganti `KODE_RAHASIA` dengan kata lain di **dua tempat** (`js/rekap.js` dan Apps Script) agar kiriman iseng dari luar website ditolak.
> - Siswa mengetik namanya sendiri, jadi ingatkan agar menulis nama dan kelas dengan benar dan konsisten.

> 🛠️ **Jika Apps Script diubah**, klik **Deploy → Kelola deployment → ✏️ Edit → Versi: Versi baru → Deploy**. URL tetap sama, jadi `js/rekap.js` tidak perlu diubah.

> 📶 **Tanpa internet:** nilai disimpan dulu di browser siswa dan terkirim otomatis saat siswa membuka modul mana saja dengan internet.

Untuk mematikan rekap, kosongkan kembali `URL_REKAP` (`""`). Kotak identitas akan hilang dan kuis berjalan seperti biasa.

### 6.12 Model 3D (GeoRuang 3D)

Tujuh model 3D tersimpan di folder `3d/` dan tampil di tiga tempat:

| Model | File | Dipasang di modul |
|---|---|---|
| Bumi 3D | `3d/bumi.html` | X-04 Bumi sebagai Ruang Kehidupan |
| Gunung Api 3D | `3d/gunung-api.html` | X-05 Litosfer dan XI-03 Mitigasi |
| Atmosfer 3D | `3d/atmosfer.html` | X-06 Atmosfer |
| Hidrosfer 3D | `3d/hidrosfer.html` | X-07 Hidrosfer |
| Keanekaragaman Hayati 3D | `3d/keanekaragaman-hayati.html` | XI-02 Keanekaragaman Hayati |
| Gempa dan Tsunami 3D | `3d/gempa-tsunami.html` | XI-03 Mitigasi dan Adaptasi |
| SIG Lanjutan 3D | `3d/sig-lanjutan.html` | XII-01 SIG Lanjutan |

- Di setiap modul ada kartu **Model 3D Interaktif** (ditandai `MODEL3D-MULAI`) dengan tombol *Tampilkan di halaman ini* dan *Buka layar penuh*.
- Halaman **Lab 3D** (`lab-3d.html`, ada di menu) menampilkan ketujuh model.
- Pustaka three.js, d3-geo, dan topojson disimpan di `js/vendor/three` dan `js/vendor/d3`, jadi model tetap jalan walau CDN diblokir. Hanya huruf (Google Fonts) yang dimuat dari internet; tanpa internet, huruf bawaan perangkat dipakai.
- Saat mengunggah ke GitHub, pastikan folder **3d** dan **js/vendor** ikut terunggah (seret foldernya, lihat bagian 4).

---

## 7. Menambah modul baru

Contoh: menambah **Modul 7 untuk Kelas XI** berjudul *"Potensi Kemaritiman Indonesia"*.

### Langkah 1 — Salin file modul yang sudah ada

1. Di folder `materi/`, salin (copy-paste) satu file modul dari kelas yang sama, misalnya `xi-06-sumber-daya-alam.html`.
2. Ganti nama salinannya dengan pola **`kelas-nomor-judul-singkat.html`**:
   `xi-07-kemaritiman.html`

### Langkah 2 — Ubah isi file baru

Buka file baru itu, lalu cari setiap penanda `EDIT DI SINI` dan ubah:

1. **`<title>` dan `<meta name="description">`**: judul tab dan deskripsi modul.
2. **Breadcrumb**: nama modul di bagian `Beranda › Kelas XI › …`.
3. **Kode modul**: ganti menjadi kode unik, misalnya `xi-07`, di **dua tempat**: pada tag `<body data-modul="xi-07" data-kelas="xi">` dan pada tombol `Tandai Selesai` (`data-modul="xi-07"`). Kode ini dipakai fitur **Tandai Selesai** dan **progres**. Setiap modul **wajib** punya kode berbeda.
4. **Kotak CP & TP**, **Konten materi**, **Rangkuman**, **Pretest** (5 soal) sebelum materi, **Posttest** (10 soal), dan **Tugas Proyek**.
5. **Tombol navigasi bawah**: arahkan "Modul Sebelumnya" ke `xi-04-....html`. Karena ini modul terakhir, sembunyikan "Modul Berikutnya" sesuai komentar di file.

### Langkah 3 — Perbarui tautan di modul sebelumnya

Buka `xi-06-sumber-daya-alam.html`, lalu ubah tombol **"Modul Berikutnya"** agar mengarah ke `xi-07-kemaritiman.html`.

### Langkah 4 — Tambahkan kartu di halaman kelas

Buka **`kelas-xi.html`**, salin satu blok kartu modul, tempel di bawah kartu terakhir, lalu ubah isinya:

```html
<a href="materi/xi-07-kemaritiman.html" class="module-card" data-modul="xi-07">
  <span class="badge-done">✓ Selesai</span>
  <span class="card-icon" aria-hidden="true">⚓</span>
  <span class="card-number">Modul 7</span>
  <h3>Potensi Kemaritiman Indonesia</h3>
  <p>Ringkasan satu kalimat tentang isi modul.</p>
</a>
```

- `data-modul` di kartu **harus sama persis** dengan kode di file modulnya (`xi-07`).
- Pilih ikon emoji yang sesuai, misalnya 👥 🏙️ 🌾 🏭 ⛰️ 🌊 🌋 🗺️.

### Langkah 5 — Daftarkan modul di `js/main.js`

Buka **`js/main.js`**, cari bagian **1. DAFTAR SEMUA MODUL**, lalu tambahkan satu baris:

```js
    { kode: "xi-07", kelas: "xi", ikon: "⚓", judul: "Potensi Kemaritiman Indonesia", file: "xi-07-kemaritiman.html", kata: "laut perikanan pelabuhan maritim" },
```

Daftar ini dipakai untuk **kotak pencarian di header**, **progres per kelas di Beranda**, dan kotak **"Lanjutkan belajar"**. Perhatikan:
- Letakkan baris baru di dalam kurung siku `[ ... ]`, dan pastikan baris **sebelumnya** diakhiri tanda koma.
- `kode` harus sama dengan `data-modul` di kartu dan di file modul.
- `kata` berisi kata kunci tambahan agar modul mudah ditemukan lewat pencarian (boleh dikosongkan `""`).

Jangan lupa juga memperbarui jumlah modul yang tertulis di kartu kelas pada `index.html`, misalnya "7 modul". Angka ini hanya tampil sebentar sebelum diganti otomatis oleh progres.

### Langkah 6 — Cek di komputer, lalu unggah

Buka `kelas-xi.html` di browser dan pastikan kartu baru muncul serta bisa diklik. Setelah itu unggah ulang (lihat bagian 8).

---

## 8. Memperbarui website setelah diedit

### Jika memakai GitHub Pages

**Mengganti satu atau beberapa file:**
1. Buka repositori di github.com.
2. Masuk ke folder file yang ingin diganti (misalnya klik folder `materi`).
3. Klik **Add file → Upload files**, lalu seret file yang sudah diedit. File dengan nama sama akan **ditimpa** otomatis.
4. Klik **Commit changes**.
5. Tunggu 1–3 menit, lalu buka website dan tekan **Ctrl + F5** untuk melihat perubahan.

**Mengedit langsung di browser (untuk perubahan kecil):**
Klik file di GitHub → ikon **pensil ✏️** (Edit) → ubah teks → **Commit changes**.

> 💡 GitHub menyimpan **riwayat semua perubahan**. Jika terjadi kesalahan, versi lama masih bisa dilihat lewat tombol **History** pada file.

### Jika memakai Netlify (seret-lepas)

1. Buka situs Anda di Netlify → tab **Deploys**.
2. Seret ulang **seluruh folder website** yang sudah diedit ke kotak di bagian bawah halaman Deploys.
3. Dalam beberapa detik website sudah diperbarui, dengan alamat yang tetap sama.

> Jika Netlify sudah dihubungkan ke GitHub (bagian 5.3), cukup perbarui file di GitHub. Netlify akan mengikuti otomatis.

**Simpan selalu satu salinan folder website** di komputer atau Google Drive sebagai cadangan. Edit di salinan itu, lalu unggah.

---

## 9. Masalah yang sering terjadi

| Masalah | Penyebab umum | Solusi |
|---|---|---|
| Website tampil polos tanpa warna | File `css/style.css` tidak ikut terunggah, atau folder `css` salah tempat | Pastikan folder `css` sejajar dengan `index.html` |
| Halaman "404 – File not found" | Nama file atau tautan salah ketik, atau beda huruf besar/kecil | Samakan nama file di folder dengan nama di tautan `href="…"` |
| GitHub Pages menampilkan isi README, bukan beranda | `index.html` tersimpan di dalam subfolder | Unggah ulang **isi** folder sehingga `index.html` ada di halaman depan repositori |
| Gambar tidak muncul | Nama file beda huruf besar/kecil, atau lupa `../` di halaman modul | Gunakan nama huruf kecil, dan `../assets/img/...` untuk file di folder `materi/` |
| Perubahan belum terlihat | Browser masih menyimpan versi lama | Tekan **Ctrl + F5**, atau tunggu beberapa menit (GitHub Pages) |
| Peta hanya menampilkan tabel | File `js/vendor/leaflet/` atau `js/peta-dasar*.js` tidak ikut terunggah | Pastikan seluruh isi folder `js` terunggah |
| Peta tampil tanpa detail jalan/kota | Dibuka langsung dari komputer atau tanpa internet | Normal. Detail OpenStreetMap muncul setelah website online |
| Glosarium kosong | Ada tanda koma atau kutip yang hilang di `glosarium-data.js` | Cek blok yang terakhir diedit. VS Code menandai kesalahan dengan garis merah |
| Progres "Tandai Selesai" hilang | Progres disimpan di browser masing-masing siswa | Normal. Progres tidak terbawa antar-HP/browser, dan hilang jika riwayat browser dihapus |
| Kartu modul tidak menampilkan "✓ Selesai" | Kode `data-modul` di kartu dan di file modul berbeda | Samakan kodenya persis, misalnya `xi-07` |
| Modul baru tidak muncul di pencarian header | Belum didaftarkan di `DAFTAR_MODUL` pada `js/main.js` | Tambahkan barisnya (lihat bagian 7, Langkah 5) |
| Menu, mode gelap, dan pencarian tidak berfungsi sama sekali | Ada salah ketik (koma/kutip) di `js/main.js` | Cek baris terakhir yang diedit di `DAFTAR_MODUL` |

---

## Catatan Hak Cipta & Sumber

- Peta dasar © kontributor **OpenStreetMap** (saat online) dan garis pantai **Natural Earth** (domain publik). Pustaka peta: **Leaflet** (lisensi BSD-2), disimpan lokal di `js/vendor/leaflet/`.
- Isi **Capaian Pembelajaran** wajib diambil dari dokumen resmi terbaru.
- Cantumkan sumber untuk gambar, data, dan kutipan yang diambil dari pihak lain.

<!-- ===== EDIT DI SINI: nama guru, sekolah, dan kontak pengelola website ===== -->
**Pengelola:** Janatun Rahmilah — MAN 3 Bogor, Kabupaten Bogor, Jawa Barat — janatunr@gmail.com
