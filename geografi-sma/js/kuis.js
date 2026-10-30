/* ==========================================================================
   LOGIKA KUIS — js/kuis.js
   Dipakai di: SEMUA halaman modul (materi/*.html)
   Guru TIDAK perlu mengubah file ini. Soal ditulis langsung di HTML modul.
   Rekap nilai ke Google Spreadsheet diatur di js/rekap.js.
   --------------------------------------------------------------------------
   STRUKTUR HTML YANG DIBACA FILE INI (lihat contoh di x-02-peta-sig.html):

   <section class="quiz" data-kuis="x-02">
     <fieldset class="quiz-question" data-answer="b">     ← huruf kunci jawaban
       <legend>1. Pertanyaan …</legend>
       <ul class="quiz-options">
         <li><label class="quiz-option">
               <input type="radio" name="x02-s1" value="a"> Pilihan A
             </label></li>
         …
       </ul>
       <p class="quiz-feedback">Pembahasan (opsional)</p>
     </fieldset>
     …
     <p class="quiz-warning">Masih ada soal yang belum dijawab.</p>
     <div class="quiz-actions">
       <button class="quiz-submit">Periksa Jawaban</button>
       <button class="quiz-reset" hidden>Ulangi</button>
     </div>
     <div class="quiz-result"><span class="quiz-score"></span><p class="quiz-message"></p></div>
   </section>

   Fitur:
   - Validasi: semua soal wajib dijawab sebelum diperiksa
   - Tanda benar/salah per pilihan + pembahasan per soal
   - Skor akhir (jumlah benar & nilai 0–100) + pesan motivasi
   - Tombol Ulangi (mengacak ulang urutan pilihan bila data-acak="ya")
   - Nilai terbaik disimpan di browser (localStorage)
   - Satu halaman boleh berisi lebih dari satu kuis
   - Pretest: tambahkan data-simpan="pertama" (yang disimpan hanya nilai percobaan pertama)
   - Posttest: tambahkan data-pembanding="kode-pretest" untuk menampilkan perbandingan nilai
   ========================================================================== */

(function () {
  "use strict";

  var KUNCI_NILAI = "geografi-nilai-kuis";

  // ===== EDIT DI SINI (opsional): pesan sesuai nilai =====
  var PESAN = [
    { min: 100, teks: "🏆 Sempurna! Kamu menguasai materi ini dengan sangat baik." },
    { min: 80,  teks: "🎉 Hebat! Pemahamanmu sudah baik. Baca pembahasan soal yang keliru." },
    { min: 60,  teks: "👍 Cukup baik. Pelajari lagi bagian yang belum kamu kuasai, lalu ulangi." },
    { min: 0,   teks: "📘 Jangan menyerah! Baca kembali materi dan rangkuman, lalu coba lagi." }
  ];

  /* ---------- Penyimpanan aman ---------- */
  function bacaNilai() {
    try { return JSON.parse(localStorage.getItem(KUNCI_NILAI)) || {}; } catch (e) { return {}; }
  }
  // pertama = true → hanya nilai percobaan pertama yang disimpan (dipakai untuk pretest)
  function simpanNilai(kode, nilai, pertama) {
    try {
      var data = bacaNilai();
      if (data[kode] === undefined || (!pertama && nilai > data[kode])) {
        data[kode] = nilai;
        localStorage.setItem(KUNCI_NILAI, JSON.stringify(data));
        return true; // rekor baru
      }
    } catch (e) {}
    return false;
  }

  function pesanUntuk(nilai) {
    for (var i = 0; i < PESAN.length; i++) {
      if (nilai >= PESAN[i].min) return PESAN[i].teks;
    }
    return "";
  }

  // Huruf pilihan dari value input ("b" → "B")
  function huruf(v) { return (v || "").toUpperCase(); }

  // Teks pilihan jawaban yang benar (tanpa spasi berlebih)
  function teksPilihan(soal, nilai) {
    var input = soal.querySelector('input[value="' + nilai + '"]');
    if (!input) return "";
    var label = input.closest(".quiz-option");
    return label ? label.textContent.replace(/\s+/g, " ").trim() : "";
  }

  // Mengacak urutan <li> pilihan (hanya jika data-acak="ya" pada .quiz)
  function acakPilihan(soal) {
    var ul = soal.querySelector(".quiz-options");
    if (!ul) return;
    var item = Array.prototype.slice.call(ul.children);
    for (var i = item.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = item[i]; item[i] = item[j]; item[j] = tmp;
    }
    item.forEach(function (li) { ul.appendChild(li); });
  }

  /* ---------- Menyiapkan satu kuis ---------- */
  function siapkanKuis(kuis, urutan) {
    var semuaSoal = Array.prototype.slice.call(kuis.querySelectorAll(".quiz-question"));
    var tombolPeriksa = kuis.querySelector(".quiz-submit");
    var tombolUlangi = kuis.querySelector(".quiz-reset");
    var peringatan = kuis.querySelector(".quiz-warning");
    var hasil = kuis.querySelector(".quiz-result");
    var skor = kuis.querySelector(".quiz-score");
    var pesan = kuis.querySelector(".quiz-message");
    var kode = kuis.getAttribute("data-kuis") ||
      document.body.getAttribute("data-modul") || ("kuis-" + urutan);
    var acak = kuis.getAttribute("data-acak") === "ya";
    var pertama = kuis.getAttribute("data-simpan") === "pertama";   // pretest
    var pembanding = kuis.getAttribute("data-pembanding");          // posttest → kode pretest

    if (!semuaSoal.length || !tombolPeriksa) return;

    // Kotak identitas siswa (hanya muncul bila rekap spreadsheet diaktifkan di js/rekap.js)
    var rekap = window.RekapNilai;
    if (rekap && rekap.aktif) rekap.pasangKotak(kuis);

    // Simpan teks pembahasan asli agar bisa dipakai ulang
    semuaSoal.forEach(function (soal, i) {
      var fb = soal.querySelector(".quiz-feedback");
      if (!fb) {
        fb = document.createElement("p");
        fb.className = "quiz-feedback";
        soal.appendChild(fb);
      }
      fb.setAttribute("data-asli", fb.innerHTML);
      fb.setAttribute("aria-live", "polite");
      soal.setAttribute("data-nomor", String(i + 1));
      if (!soal.getAttribute("data-answer")) {
        // Peringatan untuk guru jika kunci jawaban lupa diisi
        console.warn("[kuis.js] Soal nomor " + (i + 1) + " belum punya data-answer.");
      }
      if (acak) acakPilihan(soal);
    });

    // Sembunyikan peringatan begitu siswa memilih jawaban
    kuis.addEventListener("change", function (e) {
      if (e.target.type !== "radio") return;
      var soal = e.target.closest(".quiz-question");
      if (soal) soal.classList.remove("is-unanswered");
      if (peringatan && !kuis.querySelector(".quiz-question.is-unanswered")) {
        peringatan.classList.remove("is-visible");
      }
    });

    /* ----- Periksa jawaban ----- */
    tombolPeriksa.addEventListener("click", function () {
      // 1. Validasi: semua soal harus dijawab
      var belum = semuaSoal.filter(function (soal) {
        return !soal.querySelector('input[type="radio"]:checked');
      });
      semuaSoal.forEach(function (soal) {
        soal.classList.toggle("is-unanswered", belum.indexOf(soal) !== -1);
      });

      if (belum.length) {
        if (peringatan) {
          var nomor = belum.map(function (s) { return s.getAttribute("data-nomor"); });
          peringatan.textContent = "⚠️ Masih ada " + belum.length + " soal yang belum dijawab (nomor " +
            nomor.join(", ") + ").";
          peringatan.classList.add("is-visible");
        }
        belum[0].scrollIntoView({ behavior: "smooth", block: "center" });
        var radioAwal = belum[0].querySelector('input[type="radio"]');
        if (radioAwal) radioAwal.focus({ preventScroll: true });
        return;
      }
      if (peringatan) peringatan.classList.remove("is-visible");

      // Identitas wajib lengkap bila rekap ke spreadsheet aktif
      if (rekap && rekap.aktif && !rekap.siap(kuis)) {
        if (peringatan) {
          peringatan.textContent = "⚠️ Lengkapi nama, kelas, dan nomor absen agar nilaimu tercatat di rekap guru.";
          peringatan.classList.add("is-visible");
        }
        return;
      }

      // 2. Nilai setiap soal
      var benar = 0;
      semuaSoal.forEach(function (soal) {
        var kunci = (soal.getAttribute("data-answer") || "").toLowerCase().trim();
        var dipilih = soal.querySelector('input[type="radio"]:checked');
        var jawaban = dipilih ? dipilih.value.toLowerCase() : "";
        var tepat = jawaban === kunci;
        if (tepat) benar++;

        soal.querySelectorAll(".quiz-option").forEach(function (opsi) {
          var input = opsi.querySelector("input");
          input.disabled = true;
          opsi.classList.remove("is-correct", "is-wrong");
          if (input.value.toLowerCase() === kunci) opsi.classList.add("is-correct");
          else if (input.checked) opsi.classList.add("is-wrong");
        });

        var fb = soal.querySelector(".quiz-feedback");
        var asli = fb.getAttribute("data-asli");
        var label = document.createElement("strong");
        label.textContent = tepat
          ? "✓ Benar. "
          : "✗ Kurang tepat. Jawaban: " + huruf(kunci) + ". " + teksPilihan(soal, kunci) + ". ";
        fb.innerHTML = asli;               // pembahasan tulisan guru (HTML asli)
        fb.insertBefore(label, fb.firstChild);
        fb.classList.remove("correct", "wrong");
        fb.classList.add("is-visible", tepat ? "correct" : "wrong");
      });

      // 3. Skor akhir
      var total = semuaSoal.length;
      var nilai = Math.round((benar / total) * 100);
      var rekor = simpanNilai(kode, nilai, pertama);
      var terbaik = bacaNilai()[kode];

      skor.textContent = nilai;
      pesan.textContent = "";
      var baris1 = document.createElement("span");
      baris1.className = "quiz-detail";
      baris1.textContent = "Benar " + benar + " dari " + total + " soal.";
      var baris2 = document.createElement("span");
      baris2.textContent = pesanUntuk(nilai);
      var baris3 = document.createElement("small");
      baris3.className = "quiz-best";
      if (pertama) {
        baris2.textContent = "Ini nilai kemampuan awalmu. Sekarang pelajari materinya, lalu kerjakan posttest di akhir modul.";
        baris3.textContent = "Nilai pretest yang dicatat (percobaan pertama): " + terbaik;
      } else {
        baris3.textContent = rekor && nilai > 0 && terbaik === nilai
          ? "⭐ Nilai terbaikmu untuk latihan ini: " + terbaik
          : "Nilai terbaikmu sejauh ini: " + terbaik;
      }
      pesan.appendChild(baris1);
      pesan.appendChild(baris2);
      pesan.appendChild(baris3);

      // Perbandingan dengan pretest (hanya di posttest)
      if (pembanding) {
        var pre = bacaNilai()[pembanding];
        var banding = document.createElement("span");
        banding.className = "quiz-banding";
        if (pre === undefined) {
          banding.textContent = "Kamu belum mengerjakan pretest, jadi kemajuanmu belum bisa dibandingkan.";
        } else {
          var selisih = nilai - pre;
          banding.textContent = "Pretest " + pre + " → Posttest " + nilai + " · " +
            (selisih > 0 ? "naik " + selisih + " poin 📈" : (selisih === 0 ? "tetap" : "turun " + (-selisih) + " poin; pelajari lagi bagian yang keliru"));
        }
        pesan.appendChild(banding);
      }

      // Kirim ke rekap spreadsheet guru (js/rekap.js)
      if (rekap && rekap.aktif) {
        var status = document.createElement("span");
        pesan.appendChild(status);
        rekap.catat(kuis, {
          kode: kode,
          modul: kode.replace(/-pre$/, ""),
          jenis: pertama ? "Pretest" : (pembanding ? "Posttest" : "Latihan"),
          nilai: nilai, benar: benar, total: total
        }, status);
      }

      hasil.classList.add("is-visible");
      hasil.classList.toggle("is-perfect", nilai === 100);
      kuis.classList.add("is-checked");
      tombolPeriksa.hidden = true;
      if (tombolUlangi) tombolUlangi.hidden = false;

      hasil.setAttribute("tabindex", "-1");
      hasil.scrollIntoView({ behavior: "smooth", block: "center" });
      hasil.focus({ preventScroll: true });
    });

    /* ----- Ulangi ----- */
    if (tombolUlangi) {
      tombolUlangi.addEventListener("click", function () {
        semuaSoal.forEach(function (soal) {
          soal.classList.remove("is-unanswered");
          soal.querySelectorAll(".quiz-option").forEach(function (opsi) {
            var input = opsi.querySelector("input");
            input.checked = false;
            input.disabled = false;
            opsi.classList.remove("is-correct", "is-wrong");
          });
          var fb = soal.querySelector(".quiz-feedback");
          fb.innerHTML = fb.getAttribute("data-asli");
          fb.classList.remove("is-visible", "correct", "wrong");
          if (acak) acakPilihan(soal);
        });

        hasil.classList.remove("is-visible", "is-perfect");
        if (peringatan) peringatan.classList.remove("is-visible");
        kuis.classList.remove("is-checked");
        tombolUlangi.hidden = true;
        tombolPeriksa.hidden = false;

        kuis.scrollIntoView({ behavior: "smooth", block: "start" });
        var radioPertama = kuis.querySelector('input[type="radio"]');
        if (radioPertama) radioPertama.focus({ preventScroll: true });
      });
    }

    // Tampilkan nilai terbaik sebelumnya (jika ada) di bawah tombol
    var lama = bacaNilai()[kode];
    if (lama !== undefined) {
      var info = document.createElement("p");
      info.className = "quiz-previous";
      info.textContent = (pertama ? "Nilai pretest-mu (percobaan pertama): " : "Nilai terbaikmu sebelumnya: ") + lama;
      kuis.querySelector(".quiz-actions").insertAdjacentElement("afterend", info);
    }
  }

  function mulai() {
    document.querySelectorAll(".quiz").forEach(siapkanKuis);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulai);
  } else {
    mulai();
  }
})();
