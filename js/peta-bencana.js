/* ==========================================================================
   PETA INTERAKTIF LOKASI BENCANA — js/peta-bencana.js
   Dipakai di: materi/x-02-peta-sig.html
   Membutuhkan: Leaflet (js/vendor/leaflet), js/peta-dasar-data.js, js/peta-dasar.js
   --------------------------------------------------------------------------
   CARA KERJA (penting untuk guru):
   Data titik bencana TIDAK ditulis di file ini.
   Data dibaca dari TABEL di halaman HTML (id="tabel-bencana").
   Jadi untuk menambah/mengubah titik, cukup edit baris tabel di HTML —
   tabel itu juga tetap tampil sebagai cadangan bila JavaScript mati.

   Setiap baris tabel butuh 3 atribut:
     data-lat   = lintang  (angka desimal, LS bernilai negatif)
     data-lng   = bujur    (angka desimal, BT bernilai positif)
     data-jenis = geologi | vulkanik | hidrometeorologi
   ========================================================================== */

(function () {
  "use strict";

  // ===== EDIT DI SINI: warna & nama tiap jenis bencana =====
  var JENIS = {
    geologi:          { warna: "#c0392b", label: "Geologi (gempa, tsunami)" },
    vulkanik:         { warna: "#e76f51", label: "Vulkanik (erupsi)" },
    hidrometeorologi: { warna: "#1e6091", label: "Hidrometeorologi (banjir, longsor, karhutla)" }
  };
  var WARNA_LAIN = "#6c757d"; // dipakai jika data-jenis tidak dikenal

  // ID elemen di halaman HTML
  var ID_PETA = "peta-bencana";
  var ID_TABEL = "tabel-bencana";
  var ID_SEKSI = "peta-interaktif";
  var ID_PESAN = "peta-pesan";

  function tampilkanPesan(teks) {
    var pesan = document.getElementById(ID_PESAN);
    if (pesan) {
      pesan.textContent = teks;
      pesan.hidden = false;
    }
  }

  function inisialisasi() {
    var seksi = document.getElementById(ID_SEKSI);
    var wadahPeta = document.getElementById(ID_PETA);
    var tabel = document.getElementById(ID_TABEL);
    if (!seksi || !wadahPeta || !tabel) return;

    // Jika Leaflet gagal dimuat (misalnya tidak ada internet), tabel tetap tampil.
    if (typeof window.L === "undefined") {
      tampilkanPesan(
        "Peta interaktif tidak dapat dimuat. " +
        "Data lokasi tetap dapat dibaca pada tabel di bawah."
      );
      return;
    }

    var L = window.L;

    // Aktifkan tampilan peta
    seksi.classList.add("peta-aktif");

    // Pusat awal: kira-kira tengah Indonesia
    var peta = L.map(wadahPeta, {
      center: [-2.5, 118],
      zoom: 4,
      scrollWheelZoom: false // agar halaman tidak "tersangkut" saat digulir
    });

    // Aktifkan zoom dengan roda tetikus hanya setelah peta diklik
    peta.on("click", function () { peta.scrollWheelZoom.enable(); });
    peta.on("mouseout", function () { peta.scrollWheelZoom.disable(); });

    // Peta dasar: garis pantai lokal (selalu tampil) + OpenStreetMap bila online. Lihat js/peta-dasar.js
    if (window.PetaDasar) {
      window.PetaDasar.pasang(L, peta);
    } else {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Kontributor OpenStreetMap</a>'
      }).addTo(peta);
    }

    var semuaTitik = [];
    var baris = tabel.querySelectorAll("tbody tr");

    baris.forEach(function (tr) {
      var lat = parseFloat(tr.getAttribute("data-lat"));
      var lng = parseFloat(tr.getAttribute("data-lng"));
      if (isNaN(lat) || isNaN(lng)) return; // lewati baris tanpa koordinat

      var jenis = JENIS[tr.getAttribute("data-jenis")];
      var warna = jenis ? jenis.warna : WARNA_LAIN;
      var sel = tr.querySelectorAll("td");

      // Urutan kolom tabel: Peristiwa | Lokasi | Waktu | Jenis | Keterangan
      var peristiwa = sel[0] ? sel[0].textContent.trim() : "";
      var lokasi = sel[1] ? sel[1].textContent.trim() : "";
      var waktu = sel[2] ? sel[2].textContent.trim() : "";
      var keterangan = sel[4] ? sel[4].textContent.trim() : "";

      // Susun isi popup dengan aman (textContent, bukan innerHTML)
      var isi = document.createElement("div");
      isi.className = "popup-bencana";
      var judul = document.createElement("strong");
      judul.textContent = peristiwa;
      var meta = document.createElement("span");
      meta.className = "popup-meta";
      meta.textContent = lokasi + " · " + waktu;
      var label = document.createElement("span");
      label.className = "popup-jenis";
      label.style.backgroundColor = warna;
      label.textContent = jenis ? jenis.label : "Lainnya";
      var desk = document.createElement("p");
      desk.textContent = keterangan;
      var koordinat = document.createElement("span");
      koordinat.className = "popup-koordinat";
      koordinat.textContent =
        "Koordinat: " + Math.abs(lat).toFixed(2) + "° " + (lat < 0 ? "LS" : "LU") +
        ", " + Math.abs(lng).toFixed(2) + "° BT";
      isi.appendChild(judul);
      isi.appendChild(meta);
      isi.appendChild(label);
      isi.appendChild(desk);
      isi.appendChild(koordinat);

      var titik = L.circleMarker([lat, lng], {
        radius: 9,
        color: "#ffffff",
        weight: 2,
        fillColor: warna,
        fillOpacity: 0.9
      })
        .bindPopup(isi, { maxWidth: 280 })
        .bindTooltip(peristiwa)
        .addTo(peta);

      semuaTitik.push(titik);

      // Tambahkan tombol "Lihat di peta" pada baris tabel
      var tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className = "btn-lihat-peta";
      tombol.textContent = "📍 Lihat";
      tombol.setAttribute("aria-label", "Lihat " + peristiwa + " di peta");
      tombol.addEventListener("click", function () {
        wadahPeta.scrollIntoView({ behavior: "smooth", block: "center" });
        peta.flyTo([lat, lng], 8, { duration: 1 });
        titik.openPopup();
      });
      var selAksi = document.createElement("td");
      selAksi.appendChild(tombol);
      tr.appendChild(selAksi);
    });

    // Tambahkan judul kolom untuk tombol
    var kepala = tabel.querySelector("thead tr");
    if (kepala && semuaTitik.length) {
      var th = document.createElement("th");
      th.scope = "col";
      th.textContent = "Peta";
      kepala.appendChild(th);
    }

    // Sesuaikan tampilan agar semua titik terlihat
    if (semuaTitik.length) {
      peta.fitBounds(L.featureGroup(semuaTitik).getBounds(), { padding: [30, 30] });
    }

    // Legenda (komponen wajib peta!)
    var legenda = L.control({ position: "bottomright" });
    legenda.onAdd = function () {
      var div = L.DomUtil.create("div", "peta-legenda");
      var h = document.createElement("strong");
      h.textContent = "Legenda";
      div.appendChild(h);
      Object.keys(JENIS).forEach(function (kunci) {
        var item = document.createElement("div");
        var bulat = document.createElement("span");
        bulat.className = "legenda-simbol";
        bulat.style.backgroundColor = JENIS[kunci].warna;
        item.appendChild(bulat);
        item.appendChild(document.createTextNode(JENIS[kunci].label));
        div.appendChild(item);
      });
      return div;
    };
    legenda.addTo(peta);

    // Skala peta (komponen wajib peta!)
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(peta);

    // Tombol "Tampilkan semua"
    var tombolReset = document.getElementById("peta-reset");
    if (tombolReset && semuaTitik.length) {
      tombolReset.hidden = false;
      tombolReset.addEventListener("click", function () {
        peta.closePopup();
        peta.flyToBounds(L.featureGroup(semuaTitik).getBounds(), { padding: [30, 30], duration: 1 });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inisialisasi);
  } else {
    inisialisasi();
  }
})();
