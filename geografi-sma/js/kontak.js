/* ==========================================================================
   FORMULIR KONTAK — js/kontak.js
   Dipakai di: kontak.html
   --------------------------------------------------------------------------
   Website ini statis (tanpa server), jadi formulir TIDAK mengirim pesan
   sendiri. Saat tombol "Kirim" ditekan, aplikasi email di HP/laptop siswa
   akan terbuka dengan isi pesan yang sudah terisi otomatis.
   Alamat email tujuan diambil dari atribut data-email pada <form> di kontak.html.
   ========================================================================== */

(function () {
  "use strict";

  function mulai() {
    var form = document.getElementById("form-kontak");
    if (!form) return;

    var status = document.getElementById("status-kontak");
    var tujuan = form.getAttribute("data-email") || "";

    function tampilkan(teks, jenis) {
      status.textContent = teks;
      status.className = "form-status is-visible " + (jenis || "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validasi bawaan browser (required, format email)
      if (!form.checkValidity()) {
        form.reportValidity();
        tampilkan("⚠️ Mohon lengkapi kolom yang wajib diisi.", "error");
        return;
      }

      var nama = form.nama.value.trim();
      var kelas = form.kelas.value.trim();
      var topik = form.topik.value;
      var pesan = form.pesan.value.trim();

      var subjek = "[Website Geografi] " + topik + " — " + nama;
      var isi =
        "Nama   : " + nama + "\n" +
        "Kelas  : " + (kelas || "-") + "\n" +
        "Topik  : " + topik + "\n\n" +
        pesan + "\n";

      var url = "mailto:" + encodeURIComponent(tujuan) +
        "?subject=" + encodeURIComponent(subjek) +
        "&body=" + encodeURIComponent(isi);

      window.location.href = url;
      tampilkan("✅ Aplikasi email akan terbuka. Periksa isinya, lalu tekan Kirim di aplikasi email. " +
        "Jika tidak terbuka, kirim pesan langsung ke " + tujuan + ".", "success");
    });

    form.addEventListener("reset", function () {
      status.className = "form-status";
      status.textContent = "";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulai);
  } else {
    mulai();
  }
})();
