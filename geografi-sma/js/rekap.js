/* ==========================================================================
   REKAP NILAI KE GOOGLE SPREADSHEET — js/rekap.js
   Dipakai di: SEMUA halaman modul (dimuat sebelum js/kuis.js)
   --------------------------------------------------------------------------
   Cara kerja:
   1. Siswa mengisi Nama, Kelas, dan No. Absen sekali saja (tersimpan di browser).
   2. Setiap kali pretest/posttest diperiksa, nilainya dikirim ke Google Apps Script
      milik guru, lalu dicatat di Google Spreadsheet.
   3. Jika internet terputus, data disimpan dulu di browser dan dikirim ulang
      otomatis saat halaman modul dibuka lagi.

   Panduan lengkap memasang spreadsheet: README.md bagian 6.11
   dan file apps-script/Rekap-Nilai.gs
   ========================================================================== */

(function () {
  "use strict";

  /* ===== EDIT DI SINI: tempel URL Web App dari Google Apps Script =====
     Contoh: "https://script.google.com/macros/s/AKfycb..../exec"
     Biarkan kosong ("") jika rekap ke spreadsheet belum dipakai;
     kotak identitas siswa tidak akan ditampilkan. */
  var URL_REKAP = "";

  /* ===== EDIT DI SINI (opsional): kode rahasia sederhana =====
     Harus SAMA dengan KODE_RAHASIA di Apps Script. Mencegah kiriman iseng
     dari luar website (bukan pengaman tingkat tinggi). */
  var KODE_RAHASIA = "geografi-man3bogor";

  var KUNCI_SISWA = "geografi-siswa";
  var KUNCI_ANTREAN = "geografi-antrean-rekap";
  var KUNCI_PERCOBAAN = "geografi-percobaan";

  function baca(kunci, awal) {
    try { return JSON.parse(localStorage.getItem(kunci)) || awal; } catch (e) { return awal; }
  }
  function tulis(kunci, nilai) {
    try { localStorage.setItem(kunci, JSON.stringify(nilai)); } catch (e) {}
  }

  var aktif = /^https:\/\/script\.google\.com\//.test(URL_REKAP);

  /* ---------- Identitas siswa ---------- */
  function identitas() { return baca(KUNCI_SISWA, {}); }

  // Kotak isian identitas di atas setiap kuis
  function pasangKotak(kuis) {
    if (!aktif || kuis.querySelector(".rekap-identitas")) return;
    var id = identitas();
    var u = "rk-" + Math.random().toString(36).slice(2, 7);
    var kotak = document.createElement("div");
    kotak.className = "rekap-identitas";
    kotak.innerHTML =
      '<p class="rekap-judul">📋 Identitas (nilai dikirim ke rekap guru)</p>' +
      '<div class="rekap-baris">' +
      '<div><label for="' + u + '-n">Nama lengkap</label><input type="text" id="' + u + '-n" name="rekap-nama" maxlength="60" autocomplete="name"></div>' +
      '<div><label for="' + u + '-k">Kelas</label><input type="text" id="' + u + '-k" name="rekap-kelas" maxlength="15" placeholder="mis. XI-2"></div>' +
      '<div><label for="' + u + '-a">No. absen</label><input type="number" id="' + u + '-a" name="rekap-absen" min="1" max="60" inputmode="numeric"></div>' +
      "</div>";
    kotak.querySelector("[name=rekap-nama]").value = id.nama || "";
    kotak.querySelector("[name=rekap-kelas]").value = id.kelas || "";
    kotak.querySelector("[name=rekap-absen]").value = id.absen || "";
    kotak.addEventListener("input", function () {
      var baru = ambilDari(kotak);
      tulis(KUNCI_SISWA, baru);
      kotak.classList.remove("is-kurang");
      // samakan isian di kuis lain pada halaman yang sama
      document.querySelectorAll(".rekap-identitas").forEach(function (k) {
        if (k === kotak) return;
        k.querySelector("[name=rekap-nama]").value = baru.nama;
        k.querySelector("[name=rekap-kelas]").value = baru.kelas;
        k.querySelector("[name=rekap-absen]").value = baru.absen;
      });
    });
    var acuan = kuis.querySelector(".quiz-question");
    acuan.parentNode.insertBefore(kotak, acuan);
  }

  function ambilDari(kotak) {
    return {
      nama: kotak.querySelector("[name=rekap-nama]").value.replace(/\s+/g, " ").trim(),
      kelas: kotak.querySelector("[name=rekap-kelas]").value.trim().replace(/[\s_]+/g, "-").toUpperCase(),
      absen: kotak.querySelector("[name=rekap-absen]").value.trim()
    };
  }

  // Dipanggil sebelum menilai: true jika identitas lengkap (atau rekap tidak aktif)
  function siap(kuis) {
    if (!aktif) return true;
    var kotak = kuis.querySelector(".rekap-identitas");
    if (!kotak) return true;
    var id = ambilDari(kotak);
    var kurang = !id.nama || !id.kelas || !id.absen;
    kotak.classList.toggle("is-kurang", kurang);
    if (kurang) {
      kotak.scrollIntoView({ behavior: "smooth", block: "center" });
      var isian = [].slice.call(kotak.querySelectorAll("input")).filter(function (i) { return !i.value.trim(); })[0];
      if (isian) isian.focus({ preventScroll: true });
    }
    return !kurang;
  }

  /* ---------- Pengiriman ---------- */
  function kirimSatu(data) {
    return fetch(URL_REKAP, {
      method: "POST",
      mode: "no-cors",                       // Apps Script tidak mengirim header CORS
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
  }

  function kirimAntrean(selesai) {
    var antrean = baca(KUNCI_ANTREAN, []);
    if (!aktif || !antrean.length) { if (selesai) selesai(true); return; }
    var data = antrean[0];
    kirimSatu(data).then(function () {
      var sisa = baca(KUNCI_ANTREAN, []).filter(function (d) { return d.idKirim !== data.idKirim; });
      tulis(KUNCI_ANTREAN, sisa);
      kirimAntrean(selesai);
    }).catch(function () { if (selesai) selesai(false); });
  }

  // Dipanggil kuis.js setelah nilai keluar
  function catat(kuis, info, statusEl) {
    if (!aktif) return;
    var kotak = kuis.querySelector(".rekap-identitas");
    var id = kotak ? ambilDari(kotak) : identitas();
    var percobaan = baca(KUNCI_PERCOBAAN, {});
    percobaan[info.kode] = (percobaan[info.kode] || 0) + 1;
    tulis(KUNCI_PERCOBAAN, percobaan);
    var h1 = document.querySelector("h1");
    var data = {
      kode: KODE_RAHASIA,
      idKirim: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      waktu: new Date().toISOString(),
      nama: id.nama, kelas: id.kelas, absen: id.absen,
      modul: info.modul,
      judul: h1 ? h1.textContent.replace(/^[^\wÀ-ž]+/, "").trim() : document.title,
      jenis: info.jenis,
      nilai: info.nilai, benar: info.benar, total: info.total,
      percobaan: percobaan[info.kode]
    };
    var antrean = baca(KUNCI_ANTREAN, []);
    antrean.push(data);
    tulis(KUNCI_ANTREAN, antrean.slice(-100));
    if (statusEl) { statusEl.className = "rekap-status"; statusEl.textContent = "⏳ Mengirim nilai ke rekap guru…"; }
    kirimAntrean(function (ok) {
      if (!statusEl) return;
      statusEl.className = "rekap-status " + (ok ? "is-ok" : "is-gagal");
      statusEl.textContent = ok
        ? "✅ Nilai terkirim ke rekap guru atas nama " + id.nama + " (" + id.kelas + "/" + id.absen + ")."
        : "⚠️ Belum terkirim karena tidak ada internet. Nilai akan dikirim otomatis saat modul dibuka lagi dengan internet.";
    });
  }

  // Kirim sisa antrean saat halaman dibuka
  if (aktif) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { kirimAntrean(); });
    else kirimAntrean();
  }

  window.RekapNilai = { aktif: aktif, pasangKotak: pasangKotak, siap: siap, catat: catat };
})();
