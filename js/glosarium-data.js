/* ==========================================================================
   DATA GLOSARIUM — js/glosarium-data.js
   Dipakai di: glosarium.html (dibaca oleh js/glosarium.js)
   --------------------------------------------------------------------------
   ===== EDIT DI SINI: CARA MENAMBAH ISTILAH =====
   1. Salin satu blok { ... }, lalu tempel di mana saja di dalam daftar.
      Urutan TIDAK perlu alfabetis — halaman akan mengurutkan otomatis.
   2. Isi tiga bagian:
        istilah  : nama istilah
        kategori : salah satu dari daftar KATEGORI di bawah (boleh menambah)
        definisi : penjelasan singkat (1–3 kalimat)
   3. Pastikan setiap blok diakhiri tanda koma ( }, ), kecuali boleh juga
      pada blok terakhir. Teks diapit tanda kutip ganda "...".
      Jika di dalam teks perlu tanda kutip, pakai kutip tunggal '...'.

   Contoh:
     {
       istilah: "Nama Istilah",
       kategori: "Konsep Geografi",
       definisi: "Penjelasan istilah."
     },
   ========================================================================== */

/* Daftar kategori (untuk lencana warna di halaman). Boleh ditambah. */
var KATEGORI_GLOSARIUM = [
  "Konsep Geografi",
  "Kartografi & SIG",
  "Litosfer",
  "Atmosfer",
  "Hidrosfer",
  "Biosfer",
  "Kebencanaan",
  "Kewilayahan",
  "Kependudukan",
  "Sumber Daya Alam"
];

var DATA_GLOSARIUM = [

  /* ---------- A ---------- */
  {
    istilah: "Abrasi",
    kategori: "Hidrosfer",
    definisi: "Pengikisan daerah pantai oleh tenaga gelombang dan arus laut. Abrasi dapat diperparah oleh rusaknya hutan mangrove dan terumbu karang."
  },
  {
    istilah: "Adaptasi Bencana",
    kategori: "Kebencanaan",
    definisi: "Upaya menyesuaikan diri terhadap ancaman bencana atau perubahan lingkungan agar dampaknya berkurang, misalnya membangun rumah panggung di daerah rawan banjir."
  },
  {
    istilah: "Akuifer",
    kategori: "Hidrosfer",
    definisi: "Lapisan batuan atau sedimen di bawah permukaan tanah yang mampu menyimpan dan meloloskan air tanah dalam jumlah cukup sehingga dapat dimanfaatkan."
  },
  {
    istilah: "Atmosfer",
    kategori: "Atmosfer",
    definisi: "Lapisan gas yang menyelubungi bumi. Berdasarkan suhunya, atmosfer terbagi atas troposfer, stratosfer, mesosfer, termosfer, dan eksosfer."
  },

  /* ---------- B ---------- */
  {
    istilah: "Bencana",
    kategori: "Kebencanaan",
    definisi: "Peristiwa yang mengancam dan mengganggu kehidupan masyarakat, disebabkan faktor alam, nonalam, maupun manusia, sehingga menimbulkan korban jiwa, kerusakan lingkungan, kerugian harta benda, dan dampak psikologis (UU No. 24 Tahun 2007)."
  },
  {
    istilah: "Biosfer",
    kategori: "Biosfer",
    definisi: "Lapisan kehidupan di bumi, yaitu tempat seluruh makhluk hidup berinteraksi dengan litosfer, hidrosfer, dan atmosfer."
  },

  /* ---------- C ---------- */
  {
    istilah: "Citra Satelit",
    kategori: "Kartografi & SIG",
    definisi: "Gambaran rekaman objek di permukaan bumi yang diperoleh oleh sensor yang dipasang pada satelit, misalnya citra Landsat atau Sentinel."
  },
  {
    istilah: "Curah Hujan",
    kategori: "Atmosfer",
    definisi: "Jumlah air hujan yang jatuh pada permukaan datar dalam periode tertentu, diukur dalam milimeter (mm). Curah hujan 1 mm berarti setiap 1 m² tertampung 1 liter air."
  },

  /* ---------- D ---------- */
  {
    istilah: "Daerah Aliran Sungai (DAS)",
    kategori: "Hidrosfer",
    definisi: "Wilayah daratan yang dibatasi oleh punggung bukit (igir), yang menampung air hujan lalu mengalirkannya melalui sungai utama ke laut atau danau."
  },
  {
    istilah: "Delta",
    kategori: "Hidrosfer",
    definisi: "Endapan sedimen di muara sungai yang terbentuk karena aliran sungai melambat saat bertemu laut atau danau yang tenang. Contoh: Delta Mahakam di Kalimantan Timur."
  },

  /* ---------- E ---------- */
  {
    istilah: "Eksogen (Tenaga Eksogen)",
    kategori: "Litosfer",
    definisi: "Tenaga yang berasal dari luar bumi (sinar matahari, air, angin, es, organisme) dan cenderung merombak bentuk muka bumi melalui pelapukan, erosi, dan sedimentasi."
  },
  {
    istilah: "Endogen (Tenaga Endogen)",
    kategori: "Litosfer",
    definisi: "Tenaga yang berasal dari dalam bumi dan cenderung membentuk relief muka bumi. Wujudnya berupa tektonisme, vulkanisme, dan seisme (gempa bumi)."
  },
  {
    istilah: "Episentrum",
    kategori: "Kebencanaan",
    definisi: "Titik di permukaan bumi yang terletak tepat di atas hiposentrum (pusat gempa di dalam bumi)."
  },
  {
    istilah: "Erosi",
    kategori: "Litosfer",
    definisi: "Proses pengikisan dan pengangkutan material tanah atau batuan oleh air, angin, es, atau gelombang laut."
  },

  /* ---------- F ---------- */
  {
    istilah: "Fotogrametri",
    kategori: "Kartografi & SIG",
    definisi: "Ilmu dan teknik memperoleh ukuran dan informasi objek dari foto, terutama foto udara, misalnya untuk membuat peta topografi."
  },

  /* ---------- G ---------- */
  {
    istilah: "Garis Kontur",
    kategori: "Kartografi & SIG",
    definisi: "Garis pada peta yang menghubungkan titik-titik dengan ketinggian sama. Garis kontur yang rapat menunjukkan lereng curam, yang renggang menunjukkan lereng landai."
  },
  {
    istilah: "Geosfer",
    kategori: "Konsep Geografi",
    definisi: "Lapisan-lapisan bumi yang menjadi objek material geografi, meliputi litosfer, pedosfer, atmosfer, hidrosfer, biosfer, dan antroposfer."
  },
  {
    istilah: "GPS (Global Positioning System)",
    kategori: "Kartografi & SIG",
    definisi: "Sistem navigasi berbasis satelit untuk menentukan posisi (lintang, bujur, dan ketinggian) suatu tempat di permukaan bumi secara cepat dan akurat."
  },

  /* ---------- H ---------- */
  {
    istilah: "Hidrosfer",
    kategori: "Hidrosfer",
    definisi: "Seluruh air di bumi dalam wujud cair, padat, maupun gas, meliputi air laut, sungai, danau, air tanah, es, dan uap air di atmosfer."
  },
  {
    istilah: "Hiposentrum",
    kategori: "Kebencanaan",
    definisi: "Titik pusat gempa di dalam bumi, yaitu tempat energi gempa pertama kali dilepaskan."
  },

  /* ---------- I ---------- */
  {
    istilah: "Iklim",
    kategori: "Atmosfer",
    definisi: "Rata-rata keadaan cuaca di wilayah yang luas dalam jangka waktu panjang (umumnya minimal 30 tahun). Berbeda dengan cuaca yang bersifat harian dan lokal."
  },
  {
    istilah: "Interaksi Keruangan",
    kategori: "Kewilayahan",
    definisi: "Hubungan timbal balik antarwilayah berupa pergerakan manusia, barang, dan informasi. Menurut Ullman dipengaruhi oleh komplementaritas wilayah, kesempatan antara, dan kemudahan perpindahan."
  },

  /* ---------- J ---------- */
  {
    istilah: "Jalur Cincin Api Pasifik",
    kategori: "Kebencanaan",
    definisi: "Sabuk gunung api dan zona gempa yang mengelilingi Samudra Pasifik akibat penunjaman lempeng. Sulawesi Utara dan Maluku termasuk jalur ini, sedangkan busur Sumatra–Jawa–Nusa Tenggara termasuk jalur Sirkum Mediterania."
  },

  /* ---------- K ---------- */
  {
    istilah: "Kartografi",
    kategori: "Kartografi & SIG",
    definisi: "Ilmu, seni, dan teknik membuat peta, mulai dari pengumpulan data, pengolahan, hingga penyajian peta."
  },
  {
    istilah: "Kerentanan",
    kategori: "Kebencanaan",
    definisi: "Kondisi masyarakat atau wilayah yang menurunkan kemampuannya menghadapi ancaman bencana, misalnya permukiman padat di bantaran sungai."
  },

  /* ---------- L ---------- */
  {
    istilah: "Lempeng Tektonik",
    kategori: "Litosfer",
    definisi: "Bagian litosfer yang besar dan kaku, bergerak di atas lapisan astenosfer. Indonesia terletak di pertemuan tiga lempeng utama: Eurasia, Indo-Australia, dan Pasifik."
  },
  {
    istilah: "Likuefaksi",
    kategori: "Kebencanaan",
    definisi: "Hilangnya kekuatan tanah yang jenuh air akibat guncangan gempa sehingga tanah berperilaku seperti cairan. Contoh: likuefaksi di Petobo dan Balaroa, Palu (2018)."
  },
  {
    istilah: "Litosfer",
    kategori: "Litosfer",
    definisi: "Lapisan kulit bumi paling luar yang tersusun atas batuan, meliputi kerak bumi dan bagian atas mantel, dengan ketebalan sekitar 100 km."
  },
  {
    istilah: "Lokasi Absolut",
    kategori: "Konsep Geografi",
    definisi: "Letak suatu tempat berdasarkan sistem koordinat garis lintang dan garis bujur. Sifatnya tetap, misalnya Indonesia terletak di 6° LU–11° LS dan 95° BT–141° BT."
  },
  {
    istilah: "Lokasi Relatif",
    kategori: "Konsep Geografi",
    definisi: "Letak suatu tempat berdasarkan hubungannya dengan tempat lain di sekitarnya. Sifatnya dapat berubah, misalnya desa yang menjadi ramai setelah dibangun jalan tol."
  },

  /* ---------- M ---------- */
  {
    istilah: "Magma",
    kategori: "Litosfer",
    definisi: "Batuan cair pijar bersuhu sangat tinggi di dalam bumi. Magma yang keluar ke permukaan bumi disebut lava."
  },
  {
    istilah: "Mitigasi",
    kategori: "Kebencanaan",
    definisi: "Serangkaian upaya untuk mengurangi risiko bencana, baik melalui pembangunan fisik (struktural) maupun penyadaran dan peningkatan kemampuan menghadapi ancaman bencana (nonstruktural)."
  },

  /* ---------- N ---------- */
  {
    istilah: "Negara Kepulauan",
    kategori: "Kewilayahan",
    definisi: "Negara yang seluruhnya terdiri atas satu atau lebih gugus kepulauan. Konsep ini berakar dari Deklarasi Djuanda 1957 dan diakui secara internasional melalui UNCLOS 1982."
  },

  /* ---------- O ---------- */
  {
    istilah: "Orografis (Hujan Orografis)",
    kategori: "Atmosfer",
    definisi: "Hujan yang terjadi karena udara lembap dipaksa naik mengikuti lereng pegunungan, mendingin, lalu berkondensasi. Lereng di baliknya (bayangan hujan) cenderung lebih kering."
  },

  /* ---------- P ---------- */
  {
    istilah: "Pendekatan Keruangan",
    kategori: "Konsep Geografi",
    definisi: "Pendekatan geografi yang mengkaji fenomena berdasarkan lokasi, persebaran, pola, dan interaksinya di dalam ruang."
  },
  {
    istilah: "Penginderaan Jauh",
    kategori: "Kartografi & SIG",
    definisi: "Ilmu dan seni memperoleh informasi tentang objek, daerah, atau gejala melalui analisis data yang diperoleh dengan alat tanpa kontak langsung dengan objek tersebut (Lillesand dan Kiefer)."
  },
  {
    istilah: "Peta",
    kategori: "Kartografi & SIG",
    definisi: "Gambaran permukaan bumi atau sebagiannya pada bidang datar yang diperkecil dengan skala tertentu dan dilengkapi simbol-simbol."
  },
  {
    istilah: "Piroklastik",
    kategori: "Kebencanaan",
    definisi: "Material padat hasil letusan gunung api, seperti abu, pasir, lapili, dan bom vulkanik. Awan panas (wedhus gembel) adalah campuran gas panas dan material piroklastik yang meluncur cepat menuruni lereng."
  },
  {
    istilah: "Proyeksi Peta",
    kategori: "Kartografi & SIG",
    definisi: "Cara memindahkan permukaan bumi yang lengkung ke bidang datar. Setiap proyeksi selalu menimbulkan distorsi pada luas, bentuk, jarak, atau arah."
  },

  /* ---------- R ---------- */
  {
    istilah: "Resolusi Spasial",
    kategori: "Kartografi & SIG",
    definisi: "Ukuran objek terkecil di permukaan bumi yang dapat direkam sensor, dinyatakan dalam ukuran piksel. Contoh: citra Landsat 8 memiliki resolusi spasial 30 meter."
  },
  {
    istilah: "Risiko Bencana",
    kategori: "Kebencanaan",
    definisi: "Potensi kerugian akibat bencana pada suatu wilayah dalam kurun waktu tertentu. Risiko makin besar bila ancaman dan kerentanan tinggi, dan makin kecil bila kapasitas masyarakat tinggi."
  },

  /* ---------- S ---------- */
  {
    istilah: "Sesar (Patahan)",
    kategori: "Litosfer",
    definisi: "Retakan pada batuan yang disertai pergeseran blok batuan di kedua sisinya. Contoh: Sesar Lembang di Jawa Barat dan Sesar Palu-Koro di Sulawesi Tengah."
  },
  {
    istilah: "Sistem Informasi Geografis (SIG)",
    kategori: "Kartografi & SIG",
    definisi: "Sistem berbasis komputer untuk memasukkan, menyimpan, mengelola, menganalisis, dan menampilkan data yang bereferensi geografis."
  },
  {
    istilah: "Skala Peta",
    kategori: "Kartografi & SIG",
    definisi: "Perbandingan jarak pada peta dengan jarak sebenarnya di lapangan. Skala 1 : 50.000 berarti 1 cm di peta sama dengan 50.000 cm (500 m) di lapangan."
  },
  {
    istilah: "Subduksi",
    kategori: "Litosfer",
    definisi: "Penunjaman lempeng samudra yang lebih berat ke bawah lempeng lain. Zona subduksi menghasilkan palung laut, busur gunung api, dan sering memicu gempa besar."
  },

  /* ---------- T ---------- */
  {
    istilah: "Tektonisme",
    kategori: "Litosfer",
    definisi: "Tenaga endogen yang mengubah letak atau bentuk lapisan batuan, baik secara horizontal maupun vertikal, melalui lipatan (folding) dan patahan (faulting)."
  },
  {
    istilah: "Topografi",
    kategori: "Kartografi & SIG",
    definisi: "Bentuk permukaan bumi beserta ketinggian dan reliefnya, seperti dataran, perbukitan, dan pegunungan."
  },
  {
    istilah: "Tsunami",
    kategori: "Kebencanaan",
    definisi: "Rangkaian gelombang laut besar akibat perpindahan massa air secara tiba-tiba, misalnya oleh gempa bawah laut, longsor bawah laut, atau letusan gunung api."
  },

  /* ---------- U ---------- */
  {
    istilah: "Urbanisasi",
    kategori: "Kewilayahan",
    definisi: "Proses bertambahnya proporsi penduduk perkotaan, baik karena perpindahan penduduk dari desa ke kota maupun karena perubahan wilayah desa menjadi bercirikan kota."
  },

  /* ---------- V ---------- */
  {
    istilah: "Vulkanisme",
    kategori: "Litosfer",
    definisi: "Peristiwa yang berhubungan dengan naiknya magma dari dalam bumi, baik yang membeku di dalam kerak (intrusi) maupun yang keluar ke permukaan (ekstrusi)."
  },

  /* ---------- W ---------- */
  {
    istilah: "Wilayah Formal",
    kategori: "Kewilayahan",
    definisi: "Wilayah yang ditandai oleh keseragaman karakteristik tertentu, baik fisik maupun sosial, misalnya wilayah iklim atau wilayah pertanian padi."
  },
  {
    istilah: "Wilayah Fungsional (Nodal)",
    kategori: "Kewilayahan",
    definisi: "Wilayah yang terbentuk karena hubungan fungsional antara pusat kegiatan (inti) dan daerah sekitarnya (hinterland), misalnya kota beserta daerah penyangganya."
  },

  /* ---------- Z ---------- */
  {
    istilah: "Zona Ekonomi Eksklusif (ZEE)",
    kategori: "Kewilayahan",
    definisi: "Zona laut di luar laut teritorial yang lebarnya hingga 200 mil laut dari garis pangkal. Di zona ini negara pantai memiliki hak berdaulat untuk mengeksplorasi dan memanfaatkan sumber daya alam."
  },

  /* ---------- Istilah tambahan: kependudukan & SDA ---------- */
  {
    istilah: "Angka Kelahiran Kasar (CBR)",
    kategori: "Kependudukan",
    definisi: "Jumlah kelahiran hidup per 1.000 penduduk dalam satu tahun. CBR = (jumlah kelahiran ÷ jumlah penduduk) × 1.000."
  },
  {
    istilah: "Angka Kematian Kasar (CDR)",
    kategori: "Kependudukan",
    definisi: "Jumlah kematian per 1.000 penduduk dalam satu tahun. CDR = (jumlah kematian ÷ jumlah penduduk) × 1.000."
  },
  {
    istilah: "Bonus Demografi",
    kategori: "Kependudukan",
    definisi: "Kondisi ketika proporsi penduduk usia produktif (15–64 tahun) jauh lebih besar daripada usia nonproduktif, sehingga rasio ketergantungan rendah."
  },
  {
    istilah: "Migrasi",
    kategori: "Kependudukan",
    definisi: "Perpindahan penduduk dari satu tempat ke tempat lain untuk menetap, baik antarnegara (imigrasi, emigrasi) maupun di dalam negeri (urbanisasi, transmigrasi)."
  },
  {
    istilah: "Piramida Penduduk",
    kategori: "Kependudukan",
    definisi: "Grafik batang horizontal yang menggambarkan komposisi penduduk menurut kelompok umur dan jenis kelamin; bentuknya ekspansif, stasioner, atau konstruktif."
  },
  {
    istilah: "Rasio Ketergantungan",
    kategori: "Kependudukan",
    definisi: "Perbandingan penduduk usia nonproduktif (0–14 tahun dan 65 tahun ke atas) dengan penduduk usia produktif (15–64 tahun), dikali 100."
  },
  {
    istilah: "Daya Dukung Lingkungan",
    kategori: "Sumber Daya Alam",
    definisi: "Kemampuan lingkungan hidup untuk mendukung kehidupan manusia dan makhluk hidup lain beserta keseimbangannya."
  },
  {
    istilah: "Hilirisasi",
    kategori: "Sumber Daya Alam",
    definisi: "Upaya mengolah bahan mentah, misalnya bahan tambang, di dalam negeri menjadi barang setengah jadi atau jadi agar nilai tambahnya meningkat sebelum diekspor."
  },
  {
    istilah: "Reklamasi Lahan Bekas Tambang",
    kategori: "Sumber Daya Alam",
    definisi: "Kegiatan menata, memulihkan, dan memperbaiki lahan bekas tambang agar dapat berfungsi kembali sesuai peruntukannya, misalnya dengan penanaman kembali."
  },
  {
    istilah: "Sumber Daya Alam (SDA)",
    kategori: "Sumber Daya Alam",
    definisi: "Segala sesuatu dari alam yang dapat dimanfaatkan manusia. Dibedakan menjadi SDA yang dapat diperbarui, tidak dapat diperbarui, dan tidak terbatas."
  }

];
