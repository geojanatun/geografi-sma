/* ==========================================================================
   SCRIPT UTAMA — js/main.js
   Dipakai di: SEMUA halaman (dimuat paling awal di akhir <body>)
   --------------------------------------------------------------------------
   DAFTAR ISI
   1. Daftar semua modul (DAFTAR_MODUL)  ← satu-satunya bagian yang perlu
                                            diedit guru saat menambah modul
   2. Fungsi bantu (penyimpanan, alamat file)
   3. Menu navigasi (tombol ☰ di HP)
   4. Mode gelap
   5. Pencarian (filter kartu di halaman kelas / saran modul di halaman lain)
   6. Progres belajar (Tandai Selesai)
   7. "Lanjutkan belajar" & tahun otomatis
   ========================================================================== */

(function () {
  "use strict";

  /* ==========================================================================
     1. DAFTAR SEMUA MODUL
     ===== EDIT DI SINI: tambahkan satu baris setiap kali membuat modul baru =====
     kode  : kode unik modul, SAMA dengan data-modul di kartu & file modul
     kelas : "x", "xi", atau "xii"
     judul : judul modul
     file  : nama file di folder materi/
     ikon  : emoji
     kata  : kata kunci tambahan untuk pencarian (boleh dikosongkan "")
     ========================================================================== */
  var DAFTAR_MODUL = [
    { kode: "x-01",  kelas: "x",   ikon: "🧭", judul: "Konsep Dasar dan Pendekatan Geografi",            file: "x-01-konsep-dasar.html",           kata: "objek ruang lingkup prinsip konsep esensial pendekatan keruangan ekologi kompleks wilayah" },
    { kode: "x-02",  kelas: "x",   ikon: "🗺️", judul: "Peta, Penginderaan Jauh, dan SIG",                file: "x-02-peta-sig.html",               kata: "skala legenda proyeksi citra satelit interpretasi sistem informasi geografis peta interaktif" },
    { kode: "x-03",  kelas: "x",   ikon: "🔬", judul: "Penelitian Geografi",                             file: "x-03-penelitian.html",             kata: "metode observasi wawancara angket data sampel populasi laporan" },
    { kode: "x-04",  kelas: "x",   ikon: "🌍", judul: "Bumi sebagai Ruang Kehidupan",                    file: "x-04-bumi-ruang-kehidupan.html",   kata: "tata surya rotasi revolusi struktur lapisan bumi geosfer" },
    { kode: "x-05",  kelas: "x",   ikon: "🌋", judul: "Dinamika Litosfer dan Dampaknya",                 file: "x-05-litosfer.html",               kata: "batuan tenaga endogen eksogen vulkanisme gempa tektonisme pelapukan erosi tanah" },
    { kode: "x-06",  kelas: "x",   ikon: "☁️", judul: "Dinamika Atmosfer dan Dampaknya",                 file: "x-06-atmosfer.html",               kata: "cuaca iklim suhu tekanan udara angin hujan klasifikasi iklim perubahan iklim" },
    { kode: "x-07",  kelas: "x",   ikon: "🌊", judul: "Dinamika Hidrosfer dan Dampaknya",                file: "x-07-hidrosfer.html",              kata: "siklus hidrologi sungai danau rawa air tanah laut DAS konservasi air" },

    { kode: "xi-01", kelas: "xi",  ikon: "📍", judul: "Posisi Strategis Indonesia",                      file: "xi-01-posisi-strategis.html",      kata: "letak astronomis geografis geologis wawasan nusantara ZEE ALKI UNCLOS" },
    { kode: "xi-02", kelas: "xi",  ikon: "🦜", judul: "Pola Keanekaragaman Hayati Indonesia dan Dunia",  file: "xi-02-keanekaragaman-hayati.html", kata: "flora fauna garis wallace weber endemik bioma persebaran pelestarian" },
    { kode: "xi-03", kelas: "xi",  ikon: "🚨", judul: "Mitigasi dan Adaptasi Kebencanaan",               file: "xi-03-mitigasi-adaptasi.html",     kata: "bencana risiko kerentanan kesiapsiagaan tsunami gempa banjir gunung api evakuasi" },
    { kode: "xi-04", kelas: "xi",  ikon: "🌱", judul: "Kebencanaan dan Lingkungan Hidup",                file: "xi-04-kebencanaan-lingkungan.html", kata: "kerusakan lingkungan pencemaran deforestasi pembangunan berkelanjutan SDGs AMDAL" },
    { kode: "xi-05", kelas: "xi",  ikon: "👥", judul: "Dinamika Kependudukan",                          file: "xi-05-kependudukan.html",          kata: "penduduk natalitas mortalitas migrasi CBR CDR piramida rasio ketergantungan bonus demografi" },
    { kode: "xi-06", kelas: "xi",  ikon: "⛏️", judul: "Potensi dan Pengelolaan Sumber Daya Alam Indonesia", file: "xi-06-sumber-daya-alam.html",   kata: "SDA tambang nikel timah batu bara hilirisasi reklamasi energi terbarukan" },

    { kode: "xii-01", kelas: "xii", ikon: "🛰️", judul: "Pemanfaatan Lanjutan Peta, Penginderaan Jauh, dan SIG", file: "xii-01-sig-lanjutan.html",    kata: "analisis spasial overlay buffer citra NDVI resolusi pemetaan peta tematik" },
    { kode: "xii-02", kelas: "xii", ikon: "🏗️", judul: "Kewilayahan dan Pembangunan",                    file: "xii-02-kewilayahan.html",          kata: "wilayah formal fungsional pusat pertumbuhan christaller reilly IPM gini" },
    { kode: "xii-03", kelas: "xii", ikon: "🏙️", judul: "Interaksi Desa-Kota dan Pemerataan Pembangunan", file: "xii-03-desa-kota.html",            kata: "urbanisasi interaksi keruangan desa kota ullman gravitasi agropolitan" },
    { kode: "xii-04", kelas: "xii", ikon: "🤝", judul: "Kerja Sama Antarwilayah",                        file: "xii-04-kerja-sama.html",           kata: "ASEAN MEA APEC kerja sama bilateral regional multilateral negara maju berkembang" }
  ];

  var NAMA_KELAS = { x: "Kelas X", xi: "Kelas XI", xii: "Kelas XII" };

  // Nama kunci penyimpanan di browser (jangan diubah setelah website dipakai siswa)
  var KUNCI_TEMA = "geografi-tema";
  var KUNCI_PROGRES = "geografi-progres";
  var KUNCI_TERAKHIR = "geografi-terakhir";

  // Agar file lain (mis. kuis.js) bisa membaca daftar modul
  window.GEOGRAFI = { modul: DAFTAR_MODUL, namaKelas: NAMA_KELAS };


  /* ==========================================================================
     2. FUNGSI BANTU
     ========================================================================== */

  // Penyimpanan aman (tidak error di mode privat / bila diblokir)
  function simpan(kunci, nilai) {
    try { localStorage.setItem(kunci, nilai); } catch (e) {}
  }
  function ambil(kunci) {
    try { return localStorage.getItem(kunci); } catch (e) { return null; }
  }

  // Alamat folder utama website, dihitung dari letak file main.js.
  // Berfungsi di komputer, GitHub Pages (subfolder), maupun Netlify.
  var BASE = (function () {
    var skrip = document.currentScript ||
      document.querySelector('script[src*="js/main.js"]');
    if (skrip && skrip.src) return skrip.src.replace(/js\/main\.js(\?.*)?$/, "");
    return "";
  })();

  function urlModul(m) { return BASE + "materi/" + m.file; }

  function bacaProgres() {
    try { return JSON.parse(ambil(KUNCI_PROGRES)) || {}; } catch (e) { return {}; }
  }
  function tulisProgres(data) { simpan(KUNCI_PROGRES, JSON.stringify(data)); }

  function cariModul(kode) {
    for (var i = 0; i < DAFTAR_MODUL.length; i++) {
      if (DAFTAR_MODUL[i].kode === kode) return DAFTAR_MODUL[i];
    }
    return null;
  }

  function normal(teks) { return (teks || "").toLowerCase().trim(); }


  /* ==========================================================================
     3. MENU NAVIGASI (HP)
     ========================================================================== */
  function aturMenu() {
    var tombol = document.querySelector(".nav-toggle");
    var menu = document.getElementById("menu-utama");
    if (!menu) return;

    // Tandai menu halaman aktif secara otomatis (jika belum ditandai di HTML)
    if (!menu.querySelector('[aria-current="page"]')) {
      var halaman = window.location.pathname.split("/").pop() || "index.html";
      // Halaman modul menyorot menu kelasnya, mis. <body data-kelas="x">
      var kelas = document.body.getAttribute("data-kelas");
      if (kelas) halaman = "kelas-" + kelas + ".html";
      menu.querySelectorAll("a").forEach(function (a) {
        var target = (a.getAttribute("href") || "").split("/").pop();
        if (target === halaman) a.setAttribute("aria-current", "page");
      });
    }

    if (!tombol) return;

    function tutup() {
      menu.classList.remove("is-open");
      tombol.setAttribute("aria-expanded", "false");
      tombol.setAttribute("aria-label", "Buka menu");
      tombol.textContent = "☰";
    }
    function buka() {
      menu.classList.add("is-open");
      tombol.setAttribute("aria-expanded", "true");
      tombol.setAttribute("aria-label", "Tutup menu");
      tombol.textContent = "✕";
    }

    tombol.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) tutup(); else buka();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        tutup();
        tombol.focus();
      }
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", tutup);
    });
  }


  /* ==========================================================================
     4. MODE GELAP
     Preferensi disimpan di localStorage. Jika belum pernah memilih,
     mengikuti pengaturan perangkat (kode kecil di <head> setiap halaman).
     ========================================================================== */
  function aturTema() {
    var tombol = document.querySelector(".theme-toggle");
    var html = document.documentElement;

    function perbaruiTombol() {
      if (!tombol) return;
      var gelap = html.getAttribute("data-theme") === "dark";
      tombol.textContent = gelap ? "☀️" : "🌙";
      tombol.setAttribute("aria-label", gelap ? "Aktifkan mode terang" : "Aktifkan mode gelap");
      tombol.setAttribute("aria-pressed", gelap ? "true" : "false");
    }

    perbaruiTombol();
    if (!tombol) return;

    tombol.addEventListener("click", function () {
      var gelap = html.getAttribute("data-theme") === "dark";
      html.setAttribute("data-theme", gelap ? "light" : "dark");
      simpan(KUNCI_TEMA, gelap ? "light" : "dark");
      perbaruiTombol();
    });
  }


  /* ==========================================================================
     5. PENCARIAN
     - Di halaman kelas (ada kartu .module-card): menyaring kartu langsung.
     - Di halaman lain: menampilkan saran modul dari DAFTAR_MODUL.
     - Di glosarium: diserahkan ke js/glosarium.js.
     ========================================================================== */
  function aturPencarian() {
    var input = document.getElementById("cari-modul");
    if (!input) return;

    // Glosarium punya pencarian sendiri
    if (document.getElementById("cari-istilah")) return;

    var kartu = document.querySelectorAll(".module-card");
    if (kartu.length) {
      input.placeholder = "Saring modul…";
      saringKartu(input, kartu);
    } else {
      input.placeholder = "Cari modul…";
      saranModul(input);
    }
  }

  // --- 5a. Menyaring kartu di halaman kelas ---
  function saringKartu(input, kartu) {
    var pesanKosong = document.querySelector(".no-results");
    var info = document.getElementById("info-pencarian");

    function saring() {
      var kata = normal(input.value);
      var tampil = 0;

      kartu.forEach(function (k) {
        var teks = normal(k.textContent + " " + (k.getAttribute("data-kata") || ""));
        var cocok = !kata || teks.indexOf(kata) !== -1;
        k.classList.toggle("is-hidden", !cocok);
        if (cocok) tampil++;
      });

      // Sembunyikan judul kelompok (mis. "Kelompok A") jika semua kartunya tersembunyi
      document.querySelectorAll("[data-kelompok]").forEach(function (grup) {
        var adaYangTampil = grup.querySelector(".module-card:not(.is-hidden)");
        grup.classList.toggle("is-hidden", !adaYangTampil);
      });

      if (pesanKosong) pesanKosong.classList.toggle("is-visible", tampil === 0);
      if (info) {
        info.textContent = kata
          ? tampil + " modul cocok dengan “" + input.value.trim() + "”."
          : "";
      }
    }

    input.addEventListener("input", saring);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; saring(); }
    });

    // Dukungan alamat seperti kelas-x.html?cari=peta
    var awal = new URLSearchParams(window.location.search).get("cari");
    if (awal) { input.value = awal; saring(); }
  }

  // --- 5b. Saran modul (halaman selain kelas) ---
  function saranModul(input) {
    var kotak = input.closest(".search-box");
    var daftar = document.createElement("ul");
    daftar.className = "search-results";
    daftar.id = "saran-modul";
    daftar.setAttribute("role", "listbox");
    daftar.hidden = true;
    kotak.appendChild(daftar);

    input.setAttribute("aria-controls", "saran-modul");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");

    function tutup() {
      daftar.hidden = true;
      input.setAttribute("aria-expanded", "false");
    }

    function tampilkan() {
      var kata = normal(input.value);
      daftar.textContent = "";
      if (!kata) { tutup(); return; }

      var hasil = DAFTAR_MODUL.filter(function (m) {
        var teks = normal(m.judul + " " + m.kata + " " + NAMA_KELAS[m.kelas]);
        return teks.indexOf(kata) !== -1;
      }).slice(0, 6);

      if (!hasil.length) {
        var kosong = document.createElement("li");
        kosong.className = "search-empty";
        kosong.textContent = "Modul tidak ditemukan. Coba cari di Glosarium.";
        daftar.appendChild(kosong);
      }

      hasil.forEach(function (m) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = urlModul(m);
        a.setAttribute("role", "option");
        var ikon = document.createElement("span");
        ikon.className = "search-icon";
        ikon.setAttribute("aria-hidden", "true");
        ikon.textContent = m.ikon;
        var teks = document.createElement("span");
        var judul = document.createElement("strong");
        judul.textContent = m.judul;
        var kelas = document.createElement("small");
        kelas.textContent = NAMA_KELAS[m.kelas];
        teks.appendChild(judul);
        teks.appendChild(kelas);
        a.appendChild(ikon);
        a.appendChild(teks);
        li.appendChild(a);
        daftar.appendChild(li);
      });

      daftar.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }

    input.addEventListener("input", tampilkan);
    input.addEventListener("focus", tampilkan);

    input.addEventListener("keydown", function (e) {
      var tautan = daftar.querySelectorAll("a");
      if (e.key === "Escape") { tutup(); }
      else if (e.key === "Enter" && tautan.length) { e.preventDefault(); window.location.href = tautan[0].href; }
      else if (e.key === "ArrowDown" && tautan.length) { e.preventDefault(); tautan[0].focus(); }
    });

    daftar.addEventListener("keydown", function (e) {
      var tautan = Array.prototype.slice.call(daftar.querySelectorAll("a"));
      var i = tautan.indexOf(document.activeElement);
      if (e.key === "ArrowDown" && i < tautan.length - 1) { e.preventDefault(); tautan[i + 1].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (i > 0) tautan[i - 1].focus(); else input.focus(); }
      else if (e.key === "Escape") { tutup(); input.focus(); }
    });

    // Tutup bila klik di luar kotak pencarian
    document.addEventListener("click", function (e) {
      if (!kotak.contains(e.target)) tutup();
    });
  }


  /* ==========================================================================
     6. PROGRES BELAJAR
     - Di halaman modul : tombol <button class="btn btn-done" data-modul="x-02">
     - Di halaman kelas : kartu <a class="module-card" data-modul="x-02"> diberi
                          tanda ✓, dan bilah [data-progres-kelas="x"] diisi.
     - Di beranda       : bilah progres per kelas dihitung dari DAFTAR_MODUL.
     Progres tersimpan di browser masing-masing siswa (localStorage).
     ========================================================================== */
  function aturProgres() {
    var progres = bacaProgres();

    // --- 6a. Tombol "Tandai Selesai" di halaman modul ---
    document.querySelectorAll(".btn-done[data-modul]").forEach(function (tombol) {
      var kode = tombol.getAttribute("data-modul");
      var status = document.getElementById("status-selesai");

      function perbarui() {
        var selesai = !!progres[kode];
        tombol.classList.toggle("is-done", selesai);
        tombol.setAttribute("aria-pressed", selesai ? "true" : "false");
        tombol.textContent = selesai ? "✓ Sudah Selesai" : "☐ Tandai Selesai";
        if (status) {
          status.textContent = selesai
            ? "Modul ini sudah kamu tandai selesai. Klik lagi untuk membatalkan."
            : "Sudah selesai membaca, berlatih, dan mengerjakan tugas? Tandai modul ini.";
        }
      }

      tombol.addEventListener("click", function () {
        progres = bacaProgres();
        if (progres[kode]) delete progres[kode]; else progres[kode] = true;
        tulisProgres(progres);
        perbarui();
      });
      perbarui();
    });

    // --- 6b. Tanda ✓ pada kartu modul ---
    document.querySelectorAll(".module-card[data-modul]").forEach(function (k) {
      k.classList.toggle("is-done", !!progres[k.getAttribute("data-modul")]);
    });

    // --- 6c. Bilah progres per kelas ---
    document.querySelectorAll("[data-progres-kelas]").forEach(function (wadah) {
      var kelas = wadah.getAttribute("data-progres-kelas");
      var kodeKelas;

      // Di halaman kelas: hitung dari kartu yang ada; di beranda: dari DAFTAR_MODUL
      var kartu = document.querySelectorAll('.module-card[data-modul^="' + kelas + '-"]');
      if (kartu.length) {
        kodeKelas = Array.prototype.map.call(kartu, function (k) { return k.getAttribute("data-modul"); });
      } else {
        kodeKelas = DAFTAR_MODUL.filter(function (m) { return m.kelas === kelas; })
          .map(function (m) { return m.kode; });
      }

      var total = kodeKelas.length;
      var selesai = kodeKelas.filter(function (kode) { return progres[kode]; }).length;
      var persen = total ? Math.round((selesai / total) * 100) : 0;

      var isi = wadah.querySelector(".progress-fill");
      var teks = wadah.querySelector("[data-progres-teks]");
      var bar = wadah.querySelector(".progress-bar");
      if (isi) isi.style.width = persen + "%";
      if (teks) teks.textContent = selesai + " / " + total + " modul (" + persen + "%)";
      if (bar) {
        bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-valuemin", "0");
        bar.setAttribute("aria-valuemax", "100");
        bar.setAttribute("aria-valuenow", String(persen));
        bar.setAttribute("aria-label", "Progres " + NAMA_KELAS[kelas]);
      }
    });

    // --- 6d. Tombol hapus progres (opsional): <button data-reset-progres="x"> ---
    document.querySelectorAll("[data-reset-progres]").forEach(function (tombol) {
      tombol.addEventListener("click", function () {
        var kelas = tombol.getAttribute("data-reset-progres");
        var label = kelas === "semua" ? "SEMUA kelas" : NAMA_KELAS[kelas];
        if (!window.confirm("Hapus tanda selesai untuk " + label + "?")) return;
        var p = bacaProgres();
        Object.keys(p).forEach(function (kode) {
          if (kelas === "semua" || kode.indexOf(kelas + "-") === 0) delete p[kode];
        });
        tulisProgres(p);
        window.location.reload();
      });
    });
  }


  /* ==========================================================================
     7. "LANJUTKAN BELAJAR" & TAHUN OTOMATIS
     ========================================================================== */
  function aturLainLain() {
    // Catat modul yang sedang dibuka (halaman modul punya <body data-modul="x-02">)
    var kodeHalaman = document.body.getAttribute("data-modul");
    if (kodeHalaman && cariModul(kodeHalaman)) simpan(KUNCI_TERAKHIR, kodeHalaman);

    // Tampilkan kotak "Lanjutkan belajar" di beranda
    var kotak = document.getElementById("lanjutkan-belajar");
    var terakhir = cariModul(ambil(KUNCI_TERAKHIR));
    if (kotak && terakhir) {
      var tautan = kotak.querySelector("a");
      var info = kotak.querySelector("[data-lanjutkan-info]");
      if (tautan) {
        tautan.href = urlModul(terakhir);
        tautan.textContent = terakhir.ikon + " " + terakhir.judul;
      }
      if (info) info.textContent = NAMA_KELAS[terakhir.kelas] + (bacaProgres()[terakhir.kode] ? " · ✓ sudah selesai" : "");
      kotak.hidden = false;
    }

    // Tahun di footer: <span class="tahun-sekarang"></span>
    var tahun = String(new Date().getFullYear());
    document.querySelectorAll(".tahun-sekarang").forEach(function (el) { el.textContent = tahun; });
  }


  /* ---------- Jalankan semua ---------- */
  function mulai() {
    aturMenu();
    aturTema();
    aturPencarian();
    aturProgres();
    aturLainLain();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulai);
  } else {
    mulai();
  }
})();

/* ==========================================================================
   MODEL 3D (GeoRuang 3D) — tombol "Tampilkan di halaman ini" di modul
   Model baru dimuat setelah tombol diklik agar halaman tetap ringan.
   ========================================================================== */
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    var tombol = e.target.closest && e.target.closest("[data-muat-3d]");
    if (!tombol) return;
    var bingkai = document.getElementById(tombol.getAttribute("aria-controls"));
    if (!bingkai) return;
    if (!bingkai.hidden) {                       // klik kedua: tutup model
      bingkai.hidden = true;
      bingkai.innerHTML = "";
      tombol.textContent = "▶ Tampilkan di halaman ini";
      tombol.setAttribute("aria-expanded", "false");
      return;
    }
    var judul = (tombol.closest(".model-3d").querySelector("h2") || {}).textContent || "Model 3D";
    var iframe = document.createElement("iframe");
    iframe.src = tombol.getAttribute("data-muat-3d");
    iframe.title = judul;
    iframe.loading = "lazy";
    iframe.setAttribute("allow", "fullscreen");
    iframe.setAttribute("allowfullscreen", "");
    bingkai.appendChild(iframe);
    bingkai.hidden = false;
    tombol.textContent = "✕ Tutup model";
    tombol.setAttribute("aria-expanded", "true");
    bingkai.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
