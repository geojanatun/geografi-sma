/* ==========================================================================
   LOGIKA GLOSARIUM — js/glosarium.js
   Dipakai di: glosarium.html
   Membutuhkan: js/glosarium-data.js (dimuat lebih dulu)
   --------------------------------------------------------------------------
   Fitur:
   - Pencarian real-time (nama istilah & isi definisi), hasil disorot
   - Filter huruf awal A–Z (huruf tanpa istilah otomatis nonaktif)
   - Pengelompokan & pengurutan alfabetis otomatis
   - Tautan langsung: glosarium.html?cari=mitigasi  atau  ?huruf=M
   Guru TIDAK perlu mengubah file ini. Tambah istilah di glosarium-data.js.
   ========================================================================== */

(function () {
  "use strict";

  var data = (typeof DATA_GLOSARIUM !== "undefined") ? DATA_GLOSARIUM.slice() : [];
  var kategoriList = (typeof KATEGORI_GLOSARIUM !== "undefined") ? KATEGORI_GLOSARIUM : [];

  var inputCari, wadahHuruf, wadahHasil, infoJumlah, pesanKosong, tombolReset;
  var hurufAktif = "SEMUA";
  var kataCari = "";

  /* ---------- Fungsi bantu ---------- */

  // Huruf awal istilah (mengabaikan tanda baca/angka di depan)
  function hurufAwal(teks) {
    var cocok = teks.toUpperCase().match(/[A-Z]/);
    return cocok ? cocok[0] : "#";
  }

  // Huruf kecil untuk pencocokan pencarian
  function normal(teks) {
    return teks.toLowerCase();
  }

  // Nomor kategori → dipakai untuk warna lencana (kat-0, kat-1, ...)
  function kelasKategori(nama) {
    var i = kategoriList.indexOf(nama);
    return "kat-" + (i >= 0 ? i % 8 : 7);
  }

  // Menulis teks ke elemen sambil menyorot kata yang dicari dengan <mark>
  // (aman: memakai text node, bukan innerHTML)
  function tulisDenganSorot(el, teks, kata) {
    el.textContent = "";
    if (!kata) {
      el.textContent = teks;
      return;
    }
    var kecil = normal(teks);
    var posisi = 0;
    var ketemu = kecil.indexOf(kata, posisi);
    while (ketemu !== -1) {
      if (ketemu > posisi) {
        el.appendChild(document.createTextNode(teks.slice(posisi, ketemu)));
      }
      var mark = document.createElement("mark");
      mark.textContent = teks.slice(ketemu, ketemu + kata.length);
      el.appendChild(mark);
      posisi = ketemu + kata.length;
      ketemu = kecil.indexOf(kata, posisi);
    }
    if (posisi < teks.length) {
      el.appendChild(document.createTextNode(teks.slice(posisi)));
    }
  }

  /* ---------- Tombol huruf A–Z ---------- */

  function buatTombolHuruf() {
    var tersedia = {};
    data.forEach(function (item) { tersedia[hurufAwal(item.istilah)] = true; });

    var daftar = ["SEMUA"].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    daftar.forEach(function (huruf) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = huruf === "SEMUA" ? "Semua" : huruf;
      btn.setAttribute("data-huruf", huruf);
      btn.setAttribute("aria-pressed", huruf === hurufAktif ? "true" : "false");
      if (huruf === "SEMUA") {
        btn.className = "huruf-semua";
        btn.setAttribute("aria-label", "Tampilkan semua huruf");
      } else {
        btn.setAttribute("aria-label", "Istilah berawalan huruf " + huruf);
        if (!tersedia[huruf]) {
          btn.disabled = true;
          btn.title = "Belum ada istilah berawalan " + huruf;
        }
      }
      btn.addEventListener("click", function () { pilihHuruf(huruf); });
      wadahHuruf.appendChild(btn);
    });
  }

  function pilihHuruf(huruf) {
    hurufAktif = huruf;
    var semuaTombol = wadahHuruf.querySelectorAll("button");
    semuaTombol.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-huruf") === huruf ? "true" : "false");
    });
    tampilkan();
  }

  /* ---------- Menampilkan daftar istilah ---------- */

  function tampilkan() {
    var hasil = data.filter(function (item) {
      var lolosHuruf = hurufAktif === "SEMUA" || hurufAwal(item.istilah) === hurufAktif;
      if (!lolosHuruf) return false;
      if (!kataCari) return true;
      return normal(item.istilah).indexOf(kataCari) !== -1 ||
             normal(item.definisi).indexOf(kataCari) !== -1 ||
             normal(item.kategori || "").indexOf(kataCari) !== -1;
    });

    // Kelompokkan per huruf awal
    var kelompok = {};
    hasil.forEach(function (item) {
      var h = hurufAwal(item.istilah);
      (kelompok[h] = kelompok[h] || []).push(item);
    });

    wadahHasil.textContent = "";
    Object.keys(kelompok).sort().forEach(function (huruf) {
      var judul = document.createElement("h2");
      judul.className = "glossary-letter";
      judul.id = "huruf-" + huruf;
      judul.textContent = huruf;
      wadahHasil.appendChild(judul);

      var dl = document.createElement("dl");
      dl.className = "glossary-list";

      kelompok[huruf].forEach(function (item) {
        var dt = document.createElement("dt");
        var nama = document.createElement("span");
        tulisDenganSorot(nama, item.istilah, kataCari);
        dt.appendChild(nama);
        if (item.kategori) {
          var lencana = document.createElement("span");
          lencana.className = "glossary-kategori " + kelasKategori(item.kategori);
          lencana.textContent = item.kategori;
          dt.appendChild(lencana);
        }
        var dd = document.createElement("dd");
        tulisDenganSorot(dd, item.definisi, kataCari);
        dl.appendChild(dt);
        dl.appendChild(dd);
      });

      wadahHasil.appendChild(dl);
    });

    // Info jumlah (dibacakan pembaca layar lewat aria-live)
    if (hasil.length === data.length) {
      infoJumlah.textContent = "Menampilkan semua " + data.length + " istilah.";
    } else {
      infoJumlah.textContent = "Menampilkan " + hasil.length + " dari " + data.length + " istilah.";
    }

    pesanKosong.classList.toggle("is-visible", hasil.length === 0);
    tombolReset.hidden = !(kataCari || hurufAktif !== "SEMUA");
  }

  function aturUlang() {
    inputCari.value = "";
    kataCari = "";
    pilihHuruf("SEMUA");
    inputCari.focus();
  }

  /* ---------- Mulai ---------- */

  function mulai() {
    inputCari = document.getElementById("cari-istilah");
    wadahHuruf = document.getElementById("filter-huruf");
    wadahHasil = document.getElementById("daftar-istilah");
    infoJumlah = document.getElementById("jumlah-istilah");
    pesanKosong = document.getElementById("istilah-kosong");
    tombolReset = document.getElementById("reset-glosarium");
    if (!inputCari || !wadahHuruf || !wadahHasil) return;

    // Urutkan alfabetis (aturan bahasa Indonesia)
    data.sort(function (a, b) {
      return a.istilah.localeCompare(b.istilah, "id", { sensitivity: "base" });
    });

    // Tampilkan alat pencarian (disembunyikan bila JS mati)
    var alat = document.getElementById("alat-glosarium");
    if (alat) alat.hidden = false;

    buatTombolHuruf();

    // Baca parameter URL: ?cari=... atau ?huruf=...
    var params = new URLSearchParams(window.location.search);
    if (params.get("cari")) {
      inputCari.value = params.get("cari");
      kataCari = normal(inputCari.value.trim());
    }
    var hurufURL = (params.get("huruf") || "").toUpperCase();
    if (/^[A-Z]$/.test(hurufURL)) {
      hurufAktif = hurufURL;
      wadahHuruf.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-huruf") === hurufURL ? "true" : "false");
      });
    }

    // Pencarian real-time
    inputCari.addEventListener("input", function () {
      kataCari = normal(inputCari.value.trim());
      tampilkan();
    });
    inputCari.addEventListener("keydown", function (e) {
      if (e.key === "Escape") aturUlang();
    });
    tombolReset.addEventListener("click", aturUlang);

    // Kotak cari di header (jika ada) ikut menyaring glosarium
    var cariHeader = document.getElementById("cari-modul");
    if (cariHeader) {
      cariHeader.placeholder = "Cari istilah…";
      cariHeader.addEventListener("input", function () {
        inputCari.value = cariHeader.value;
        kataCari = normal(cariHeader.value.trim());
        tampilkan();
      });
    }

    tampilkan();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulai);
  } else {
    mulai();
  }
})();
