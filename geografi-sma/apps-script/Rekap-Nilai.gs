/* ==========================================================================
   REKAP NILAI PRETEST & POSTTEST — Google Apps Script
   Website Geografi SMA/MA · MAN 3 Bogor
   --------------------------------------------------------------------------
   File ini TIDAK dipakai oleh website secara langsung. Salin seluruh isinya ke
   Google Spreadsheet: Ekstensi → Apps Script. Langkah lengkap: README.md bagian 6.11.

   Skrip ini mengisi dua lembar (dibuat otomatis bila belum ada):
   1. "Rekap Nilai"  → satu baris per siswa per modul: pretest (percobaan pertama),
                       posttest terbaik, posttest terakhir, kenaikan, jumlah percobaan.
   2. "Data Mentah"  → semua kiriman apa adanya (setiap kali siswa memeriksa jawaban).
   Lembar "Ringkasan" berisi rumus rata-rata per modul dan tidak diubah oleh skrip.
   ========================================================================== */

// ===== EDIT DI SINI: harus SAMA dengan KODE_RAHASIA di js/rekap.js =====
var KODE_RAHASIA = "geografi-man3bogor";

// ===== ID spreadsheet tujuan =====
// Sudah diisi untuk spreadsheet "Rekap Nilai Geografi" di Google Drive akun madrasah.
// Jika skrip dipasang lewat menu Ekstensi → Apps Script di spreadsheet itu, ID ini tidak wajib.
// Ganti hanya jika ingin mencatat ke spreadsheet lain (ID = kode panjang di alamat spreadsheet).
var ID_SPREADSHEET = "1OZOltcDusMzaiLqlhRgRBt_vYlcuGfPFzR9tAGlNVO0";

var LEMBAR_REKAP = "Rekap Nilai";
var LEMBAR_MENTAH = "Data Mentah";

var KOLOM_MENTAH = ["Waktu diterima", "Kelas", "No. Absen", "Nama", "Kode Modul", "Judul Modul",
  "Jenis", "Nilai", "Benar", "Jumlah Soal", "Percobaan ke-", "Waktu di perangkat siswa", "ID Kiriman"];
var KOLOM_REKAP = ["Kunci", "Kelas", "No. Absen", "Nama", "Kode Modul", "Judul Modul",
  "Pretest (pertama)", "Posttest terbaik", "Posttest terakhir", "Kenaikan (terbaik − pretest)",
  "Jumlah percobaan posttest", "Terakhir diperbarui"];

/* Menerima kiriman nilai dari website */
function doPost(e) {
  var kunci = LockService.getScriptLock();
  kunci.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.kode !== KODE_RAHASIA) return jawab({ ok: false, pesan: "kode salah" });

    var data = bersihkan(d);
    if (!data) return jawab({ ok: false, pesan: "data tidak lengkap" });

    var ss = bukaSpreadsheet();
    var mentah = siapkanLembar(ss, LEMBAR_MENTAH, KOLOM_MENTAH);

    // Abaikan kiriman ganda (dikirim ulang dari antrean)
    var akhir = mentah.getLastRow();
    if (akhir > 1) {
      var mulai = Math.max(2, akhir - 300);
      var id = mentah.getRange(mulai, 13, akhir - mulai + 1, 1).getValues();
      for (var i = 0; i < id.length; i++) {
        if (id[i][0] === data.idKirim) return jawab({ ok: true, pesan: "sudah tercatat" });
      }
    }

    var sekarang = new Date();
    mentah.appendRow([sekarang, data.kelas, data.absen, data.nama, data.modul, data.judul,
      data.jenis, data.nilai, data.benar, data.total, data.percobaan, data.waktu, data.idKirim]);

    perbaruiRekap(ss, data, sekarang);
    return jawab({ ok: true });
  } catch (err) {
    return jawab({ ok: false, pesan: String(err) });
  } finally {
    kunci.releaseLock();
  }
}

/* Spreadsheet yang terikat dengan skrip, atau yang ditunjuk ID_SPREADSHEET */
function bukaSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(ID_SPREADSHEET);
}

/* Jalankan sekali dari editor (pilih fungsi ini lalu klik ▶ Jalankan) untuk memberi izin
   dan memastikan skrip dapat menulis ke spreadsheet. Baris uji langsung dihapus lagi. */
function ujiCoba() {
  var ss = bukaSpreadsheet();
  var lembar = siapkanLembar(ss, LEMBAR_MENTAH, KOLOM_MENTAH);
  lembar.appendRow(["UJI COBA"]);
  lembar.deleteRow(lembar.getLastRow());
  Logger.log("✅ Berhasil terhubung ke: " + ss.getName());
}

/* Membuka URL Web App di browser hanya untuk mengecek bahwa skrip aktif */
function doGet() {
  return ContentService.createTextOutput("✅ Rekap nilai Geografi aktif. Alamat ini ditempel di js/rekap.js.");
}

/* Satu baris per siswa per modul */
function perbaruiRekap(ss, d, waktu) {
  var lembar = siapkanLembar(ss, LEMBAR_REKAP, KOLOM_REKAP);
  var k = [d.kelas, d.absen, d.nama.toLowerCase(), d.modul].join("|");
  var baris = -1;
  var n = lembar.getLastRow() - 1;
  if (n > 0) {
    var kunci = lembar.getRange(2, 1, n, 1).getValues();
    for (var i = 0; i < kunci.length; i++) {
      if (kunci[i][0] === k) { baris = i + 2; break; }
    }
  }
  var lama = baris > 0 ? lembar.getRange(baris, 1, 1, KOLOM_REKAP.length).getValues()[0]
                       : [k, d.kelas, d.absen, d.nama, d.modul, d.judul, "", "", "", "", 0, ""];
  if (d.jenis === "Pretest") {
    if (lama[6] === "") lama[6] = d.nilai;            // hanya percobaan pertama
  } else {
    lama[7] = lama[7] === "" ? d.nilai : Math.max(Number(lama[7]), d.nilai);
    lama[8] = d.nilai;
    lama[10] = Number(lama[10] || 0) + 1;
  }
  lama[3] = d.nama;                                   // ejaan nama terbaru
  lama[5] = d.judul;
  lama[9] = (lama[6] !== "" && lama[7] !== "") ? Number(lama[7]) - Number(lama[6]) : "";
  lama[11] = waktu;
  if (baris > 0) {
    lembar.getRange(baris, 1, 1, lama.length).setValues([lama]);
  } else {
    lembar.appendRow(lama);
    // urutkan menurut kelas, no. absen, lalu modul
    var jml = lembar.getLastRow() - 1;
    if (jml > 1) lembar.getRange(2, 1, jml, KOLOM_REKAP.length).sort([{ column: 2 }, { column: 3 }, { column: 5 }]);
  }
}

/* Membuat lembar beserta judul kolom bila belum ada */
function siapkanLembar(ss, nama, kolom) {
  var lembar = ss.getSheetByName(nama);
  if (!lembar) {
    lembar = ss.insertSheet(nama);
    lembar.getRange(1, 1, 1, kolom.length).setValues([kolom])
      .setFontWeight("bold").setBackground("#1e6091").setFontColor("#ffffff");
    lembar.setFrozenRows(1);
    if (nama === LEMBAR_REKAP) lembar.hideColumns(1);   // kolom kunci disembunyikan
  }
  return lembar;
}

/* Validasi & mencegah isian berbahaya (rumus) masuk ke spreadsheet */
function bersihkan(d) {
  function teks(v, max) {
    v = String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, max);
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  }
  var nilai = Number(d.nilai);
  var data = {
    idKirim: teks(d.idKirim, 40), waktu: teks(d.waktu, 30),
    nama: teks(d.nama, 60), kelas: teks(d.kelas, 15).toUpperCase(), absen: Number(d.absen),
    modul: teks(d.modul, 10), judul: teks(d.judul, 120),
    jenis: ["Pretest", "Posttest", "Latihan"].indexOf(d.jenis) >= 0 ? d.jenis : "Latihan",
    nilai: nilai, benar: Number(d.benar), total: Number(d.total), percobaan: Number(d.percobaan) || 1
  };
  if (!data.nama || !data.kelas || !(data.absen > 0) || !/^(x|xi|xii)-\d{2}$/i.test(data.modul)) return null;
  if (!(nilai >= 0 && nilai <= 100)) return null;
  return data;
}

function jawab(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
