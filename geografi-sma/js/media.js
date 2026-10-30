/* ==========================================================================
   MEDIA PEMBELAJARAN — js/media.js
   Dipakai di: halaman modul yang memiliki video, animasi, atau alat interaktif.
   Guru TIDAK perlu mengubah file ini.
   --------------------------------------------------------------------------
   Isi:
   1. Video YouTube "ringan": gambar sampul dulu, video baru dimuat saat diklik
      <div class="video-lite" data-video-id="ID_YOUTUBE" data-judul="...">
   2. Tombol putar/jeda animasi (menghormati pengaturan "kurangi gerakan")
      <figure class="media anim"> ... <button class="anim-toggle"> ...
   3. Alat interaktif: <div class="widget" data-widget="skala|zona-waktu|suhu|muson">
   ========================================================================== */

(function () {
  "use strict";

  var kurangiGerak = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. VIDEO YOUTUBE RINGAN ---------- */
  function siapkanVideo(wadah) {
    var id = wadah.getAttribute("data-video-id");
    var judul = wadah.getAttribute("data-judul") || "Video pembelajaran";
    if (!id) return;

    var tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = "video-lite-btn";
    tombol.setAttribute("aria-label", "Putar video: " + judul);

    var img = document.createElement("img");
    img.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
    img.alt = "";
    img.loading = "lazy";
    img.width = 480;
    img.height = 360;
    // Jika sampul gagal dimuat (mis. offline), sembunyikan agar tidak tampil ikon rusak
    img.addEventListener("error", function () { img.style.display = "none"; });

    var ikon = document.createElement("span");
    ikon.className = "video-lite-play";
    ikon.setAttribute("aria-hidden", "true");
    ikon.textContent = "▶";

    tombol.appendChild(img);
    tombol.appendChild(ikon);
    wadah.insertBefore(tombol, wadah.firstChild);

    tombol.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = judul;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      wadah.replaceChild(iframe, tombol);
      iframe.focus();
    });
  }

  /* ---------- 2. KONTROL ANIMASI ---------- */
  function siapkanAnimasi(fig) {
    var tombol = fig.querySelector(".anim-toggle");
    var svg = fig.querySelector("svg");
    if (!tombol || !svg) return;

    function atur(jalan) {
      fig.classList.toggle("is-paused", !jalan);
      // Animasi SMIL (<animate>, <animateMotion>) dijeda lewat API SVG
      try {
        if (jalan) { svg.unpauseAnimations(); } else { svg.pauseAnimations(); }
      } catch (e) {}
      tombol.textContent = jalan ? "⏸ Jeda animasi" : "▶ Putar animasi";
      tombol.setAttribute("aria-pressed", jalan ? "false" : "true");
    }

    tombol.addEventListener("click", function () {
      atur(fig.classList.contains("is-paused"));
    });
    // Pengguna yang meminta "kurangi gerakan" mendapat animasi dalam keadaan jeda
    atur(!kurangiGerak);
  }

  /* ---------- 3. ALAT INTERAKTIF ---------- */
  // Kolom <input type="number"> selalu memakai titik sebagai pemisah desimal
  function angka(nilai) {
    return Number(String(nilai).trim().replace(",", "."));
  }
  function format(n, desimal) {
    return n.toLocaleString("id-ID", { maximumFractionDigits: desimal === undefined ? 2 : desimal });
  }

  var WIDGET = {

    // Kalkulator skala peta
    skala: function (w) {
      var jarak = w.querySelector("[name=jarak]");
      var skala = w.querySelector("[name=skala]");
      var hasil = w.querySelector(".widget-hasil");
      function hitung() {
        var j = angka(jarak.value), s = angka(skala.value);
        if (!(j > 0) || !(s > 0)) { hasil.textContent = "Isi kedua kolom dengan angka lebih dari 0."; return; }
        var cm = j * s;
        hasil.innerHTML = "";
        var b1 = document.createElement("span");
        b1.textContent = format(j) + " cm × " + format(s, 0) + " = " + format(cm, 0) + " cm";
        var b2 = document.createElement("strong");
        b2.textContent = "= " + format(cm / 100, 2) + " m = " + format(cm / 100000, 3) + " km";
        hasil.appendChild(b1);
        hasil.appendChild(document.createElement("br"));
        hasil.appendChild(b2);
      }
      jarak.addEventListener("input", hitung);
      skala.addEventListener("input", hitung);
      hitung();
    },

    // Perbandingan WIB, WITA, WIT
    "zona-waktu": function (w) {
      var slider = w.querySelector("[name=jam]");
      var keluaran = w.querySelectorAll("[data-selisih]");
      function dua(n) { return (n < 10 ? "0" : "") + n; }
      function hitung() {
        var jam = Number(slider.value);
        keluaran.forEach(function (el) {
          var j = (jam + Number(el.getAttribute("data-selisih"))) % 24;
          el.textContent = dua(j) + ".00";
        });
        slider.setAttribute("aria-valuetext", "Pukul " + dua(jam) + ".00 WIB");
      }
      slider.addEventListener("input", hitung);
      hitung();
    },

    // Suhu berdasarkan ketinggian (gradien 0,6 °C per 100 m)
    suhu: function (w) {
      var tA = w.querySelector("[name=suhu-a]");
      var hA = w.querySelector("[name=tinggi-a]");
      var hB = w.querySelector("[name=tinggi-b]");
      var hasil = w.querySelector(".widget-hasil");
      function hitung() {
        var t = angka(tA.value), a = angka(hA.value), b = angka(hB.value);
        if ([t, a, b].some(isNaN)) { hasil.textContent = "Isi semua kolom dengan angka."; return; }
        var selisih = (b - a) / 100 * 0.6;
        var tB = t - selisih;
        hasil.innerHTML = "";
        var s1 = document.createElement("span");
        s1.textContent = "Perubahan suhu = (" + format(b, 0) + " − " + format(a, 0) + ") ÷ 100 × 0,6 = " +
          format(selisih, 1) + " °C";
        var s2 = document.createElement("strong");
        s2.textContent = "Suhu di tempat B ≈ " + format(tB, 1) + " °C";
        hasil.appendChild(s1);
        hasil.appendChild(document.createElement("br"));
        hasil.appendChild(s2);
      }
      [tA, hA, hB].forEach(function (el) { el.addEventListener("input", hitung); });
      hitung();
    },

    // Tombol pilihan umum: <button data-pilih="a"> menampilkan elemen [data-tampil="a"]
    pilih: function (w) {
      var tombol = w.querySelectorAll("[data-pilih]");
      var panel = w.querySelectorAll("[data-tampil]");
      function tampil(k) {
        tombol.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-pilih") === k ? "true" : "false"); });
        panel.forEach(function (p) { p.hidden = p.getAttribute("data-tampil") !== k; });
      }
      tombol.forEach(function (b) { b.addEventListener("click", function () { tampil(b.getAttribute("data-pilih")); }); });
      tampil(w.getAttribute("data-aktif") || (tombol[0] && tombol[0].getAttribute("data-pilih")));
    },

    // Simulasi risiko bencana: Risiko = Ancaman × Kerentanan ÷ Kapasitas (skala 1–5)
    risiko: function (w) {
      var a = w.querySelector("[name=ancaman]"), k = w.querySelector("[name=kerentanan]"), c = w.querySelector("[name=kapasitas]");
      var hasil = w.querySelector(".widget-hasil"), isi = w.querySelector(".meter-isi");
      function hitung() {
        var A = Number(a.value), K = Number(k.value), C = Number(c.value);
        w.querySelector("[data-nilai=ancaman]").textContent = A;
        w.querySelector("[data-nilai=kerentanan]").textContent = K;
        w.querySelector("[data-nilai=kapasitas]").textContent = C;
        var R = A * K / C;
        var kat = R <= 3 ? "RENDAH" : (R <= 8 ? "SEDANG" : "TINGGI");
        var kelas = R <= 3 ? "rendah" : (R <= 8 ? "sedang" : "tinggi");
        hasil.innerHTML = "";
        var s1 = document.createElement("span");
        s1.textContent = "Risiko = " + A + " × " + K + " ÷ " + C + " = " + format(R, 1);
        var s2 = document.createElement("strong");
        s2.textContent = "Tingkat risiko: " + kat;
        hasil.appendChild(s1); hasil.appendChild(document.createElement("br")); hasil.appendChild(s2);
        isi.style.width = Math.min(100, R / 25 * 100) + "%";
        isi.className = "meter-isi meter-" + kelas;
      }
      [a, k, c].forEach(function (el) { el.addEventListener("input", hitung); });
      hitung();
    },

    // Kalkulator kependudukan: CBR, CDR, pertumbuhan alami & total
    penduduk: function (w) {
      var f = {};
      ["jumlah", "lahir", "mati", "datang", "pergi"].forEach(function (n) { f[n] = w.querySelector("[name=" + n + "]"); });
      var hasil = w.querySelector(".widget-hasil");
      function hitung() {
        var v = {};
        for (var n in f) { v[n] = angka(f[n].value); }
        if (!(v.jumlah > 0) || [v.lahir, v.mati, v.datang, v.pergi].some(isNaN)) {
          hasil.textContent = "Isi semua kolom; jumlah penduduk harus lebih dari 0."; return;
        }
        var cbr = v.lahir / v.jumlah * 1000, cdr = v.mati / v.jumlah * 1000;
        var alami = v.lahir - v.mati, total = alami + (v.datang - v.pergi);
        var kriteria = cbr > 30 ? "tinggi" : (cbr >= 20 ? "sedang" : "rendah");
        var baris = [
          ["CBR = " + format(v.lahir, 0) + " ÷ " + format(v.jumlah, 0) + " × 1.000 = ", format(cbr, 1) + "‰ (" + kriteria + ")"],
          ["CDR = " + format(v.mati, 0) + " ÷ " + format(v.jumlah, 0) + " × 1.000 = ", format(cdr, 1) + "‰"],
          ["Pertumbuhan alami (L − M) = ", format(alami, 0) + " jiwa"],
          ["Pertumbuhan total (L − M) + (I − E) = ", format(total, 0) + " jiwa"]
        ];
        hasil.innerHTML = "";
        baris.forEach(function (b, i) {
          if (i) hasil.appendChild(document.createElement("br"));
          hasil.appendChild(document.createTextNode(b[0]));
          var st = document.createElement("strong"); st.textContent = b[1]; hasil.appendChild(st);
        });
      }
      for (var n in f) { f[n].addEventListener("input", hitung); }
      hitung();
    },

    // Simulasi buffer: lingkaran radius di sekitar titik, menghitung desa di dalamnya
    buffer: function (w) {
      var slider = w.querySelector("[name=radius]");
      var lingkar = w.querySelector(".buffer-lingkar");
      var pusat = w.querySelector(".buffer-pusat");
      var desa = w.querySelectorAll(".desa");
      var hasil = w.querySelector(".widget-hasil");
      var skala = Number(w.getAttribute("data-px-per-km")) || 14;
      var cx = Number(pusat.getAttribute("cx")), cy = Number(pusat.getAttribute("cy"));
      function hitung() {
        var r = Number(slider.value);
        lingkar.setAttribute("r", r * skala);
        var dalam = [];
        desa.forEach(function (d) {
          var jarak = Math.hypot(Number(d.getAttribute("cx")) - cx, Number(d.getAttribute("cy")) - cy) / skala;
          var masuk = jarak <= r;
          d.classList.toggle("desa-terdampak", masuk);
          if (masuk) dalam.push(d.getAttribute("data-nama") + " (" + format(jarak, 1) + " km)");
        });
        w.querySelector("[data-nilai=radius]").textContent = r;
        hasil.innerHTML = "";
        var s1 = document.createElement("strong");
        s1.textContent = dalam.length + " dari " + desa.length + " desa berada di dalam radius " + r + " km.";
        hasil.appendChild(s1);
        if (dalam.length) {
          hasil.appendChild(document.createElement("br"));
          hasil.appendChild(document.createTextNode("Harus dievakuasi: " + dalam.join(", ")));
        }
      }
      slider.addEventListener("input", hitung);
      hitung();
    },

    // Kalkulator NDVI = (NIR − Merah) ÷ (NIR + Merah)
    ndvi: function (w) {
      var nir = w.querySelector("[name=nir]"), red = w.querySelector("[name=merah]");
      var hasil = w.querySelector(".widget-hasil"), kotak = w.querySelector(".ndvi-warna");
      function kategori(v) {
        if (v < 0) return ["air, awan, atau bayangan", "#3d8fd1"];
        if (v < 0.2) return ["lahan terbuka / permukiman", "#c8a27a"];
        if (v < 0.5) return ["vegetasi jarang (semak, sawah muda)", "#a3c76a"];
        return ["vegetasi rapat dan sehat (hutan)", "#2d6a4f"];
      }
      function hitung() {
        var N = Number(nir.value), R = Number(red.value);
        w.querySelector("[data-nilai=nir]").textContent = format(N, 2);
        w.querySelector("[data-nilai=merah]").textContent = format(R, 2);
        if (N + R === 0) { hasil.textContent = "NIR dan merah tidak boleh sama-sama 0."; return; }
        var v = (N - R) / (N + R), k = kategori(v);
        hasil.innerHTML = "";
        var s1 = document.createElement("span");
        s1.textContent = "NDVI = (" + format(N, 2) + " − " + format(R, 2) + ") ÷ (" + format(N, 2) + " + " + format(R, 2) + ") = " + format(v, 2);
        var s2 = document.createElement("strong"); s2.textContent = "Tafsiran: " + k[0];
        hasil.appendChild(s1); hasil.appendChild(document.createElement("br")); hasil.appendChild(s2);
        kotak.style.backgroundColor = k[1];
      }
      w.querySelectorAll("[data-preset]").forEach(function (b) {
        b.addEventListener("click", function () {
          var v = b.getAttribute("data-preset").split(",");
          nir.value = v[0]; red.value = v[1]; hitung();
        });
      });
      [nir, red].forEach(function (el) { el.addEventListener("input", hitung); });
      hitung();
    },

    // Titik henti (Reilly): DAB = dAB ÷ (1 + √(PB ÷ PA))
    reilly: function (w) {
      var pa = w.querySelector("[name=pa]"), pb = w.querySelector("[name=pb]"), d = w.querySelector("[name=jarak]");
      var hasil = w.querySelector(".widget-hasil"), titik = w.querySelector(".reilly-titik"), label = w.querySelector(".reilly-label");
      function hitung() {
        var A = angka(pa.value), B = angka(pb.value), D = angka(d.value);
        if (!(A > 0 && B > 0 && D > 0)) { hasil.textContent = "Isi semua kolom dengan angka lebih dari 0."; return; }
        var dab = D / (1 + Math.sqrt(B / A));
        hasil.innerHTML = "";
        var s1 = document.createElement("span");
        s1.textContent = "D(AB) = " + format(D) + " ÷ (1 + √(" + format(B, 0) + " ÷ " + format(A, 0) + ")) = " + format(dab, 2) + " km";
        var s2 = document.createElement("strong");
        s2.textContent = "Titik henti berada " + format(dab, 2) + " km dari kota A atau " + format(D - dab, 2) + " km dari kota B.";
        hasil.appendChild(s1); hasil.appendChild(document.createElement("br")); hasil.appendChild(s2);
        var x = 80 + (dab / D) * 400;
        titik.setAttribute("cx", x); label.setAttribute("x", x);
        label.textContent = "titik henti (" + format(dab, 1) + " km)";
      }
      [pa, pb, d].forEach(function (el) { el.addEventListener("input", hitung); });
      hitung();
    },

    // Model gravitasi: bandingkan interaksi kota A–B dan A–C
    gravitasi: function (w) {
      var f = {};
      ["pa", "pb", "dab", "pc", "dac"].forEach(function (n) { f[n] = w.querySelector("[name=" + n + "]"); });
      var hasil = w.querySelector(".widget-hasil");
      function hitung() {
        var v = {};
        for (var n in f) { v[n] = angka(f[n].value); }
        if (!(v.pa > 0 && v.pb > 0 && v.pc > 0 && v.dab > 0 && v.dac > 0)) { hasil.textContent = "Isi semua kolom dengan angka lebih dari 0."; return; }
        var iab = v.pa * v.pb / (v.dab * v.dab), iac = v.pa * v.pc / (v.dac * v.dac);
        hasil.innerHTML = "";
        [["I(A–B) = " + format(v.pa, 0) + " × " + format(v.pb, 0) + " ÷ " + format(v.dab, 0) + "² = ", format(iab, 0)],
         ["I(A–C) = " + format(v.pa, 0) + " × " + format(v.pc, 0) + " ÷ " + format(v.dac, 0) + "² = ", format(iac, 0)]].forEach(function (b, i) {
          if (i) hasil.appendChild(document.createElement("br"));
          hasil.appendChild(document.createTextNode(b[0]));
          var st = document.createElement("strong"); st.textContent = b[1]; hasil.appendChild(st);
        });
        hasil.appendChild(document.createElement("br"));
        var k = document.createElement("strong");
        k.textContent = iab === iac ? "Kekuatan interaksi keduanya sama." :
          (iab > iac ? "Interaksi A–B lebih kuat " : "Interaksi A–C lebih kuat ") + "(" + format(Math.max(iab, iac) / Math.min(iab, iac), 1) + " kali).";
        hasil.appendChild(k);
      }
      for (var n in f) { f[n].addEventListener("input", hitung); }
      hitung();
    },

    // Peralihan angin muson barat / timur
    muson: function (w) {
      var tombol = w.querySelectorAll("[data-muson]");
      function pilih(jenis) {
        w.setAttribute("data-aktif", jenis);
        tombol.forEach(function (b) {
          b.setAttribute("aria-pressed", b.getAttribute("data-muson") === jenis ? "true" : "false");
        });
      }
      tombol.forEach(function (b) {
        b.addEventListener("click", function () { pilih(b.getAttribute("data-muson")); });
      });
      pilih(w.getAttribute("data-aktif") || "barat");
    }
  };

  function mulai() {
    document.querySelectorAll(".video-lite").forEach(siapkanVideo);
    document.querySelectorAll(".anim").forEach(siapkanAnimasi);
    document.querySelectorAll(".widget[data-widget]").forEach(function (w) {
      var fungsi = WIDGET[w.getAttribute("data-widget")];
      if (fungsi) {
        w.classList.add("widget-aktif");
        fungsi(w);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulai);
  } else {
    mulai();
  }
})();
