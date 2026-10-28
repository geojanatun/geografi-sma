/* ==========================================================================
   PETA TITIK INTERAKTIF (UMUM) — js/peta-titik.js
   Dipakai di: modul yang punya <section class="peta-titik"> (mis. gunung api).
   Membutuhkan: Leaflet (js/vendor/leaflet), js/peta-dasar-data.js, js/peta-dasar.js.
   --------------------------------------------------------------------------
   Satu halaman boleh berisi lebih dari satu peta. Setiap peta:

   <section class="peta-titik" data-legenda='{"kunci":{"warna":"#c0392b","label":"Nama"}}'>
     <div class="peta-container" role="region" aria-label="..."></div>
     <div class="peta-toolbar"><button class="btn btn-outline peta-reset" hidden>…</button></div>
     <p class="box box-info peta-pesan" role="status" hidden></p>
     <table class="peta-tabel"> … baris <tr data-lat data-lng data-jenis> … </table>
   </section>

   ===== EDIT DI SINI: data titik ditulis di TABEL halaman modul, bukan di file ini.
   Urutan kolom tabel: Nama | Lokasi | Waktu/Catatan | Jenis | Keterangan
   Titik : <tr data-lat="-6.2" data-lng="106.8" data-jenis="...">
   Garis : <tr data-garis="5.0,108.0; -6.0,105.8" data-jenis="...">  (legenda: "garis":true)
   ========================================================================== */

(function () {
  "use strict";

  var WARNA_LAIN = "#6c757d";

  function siapkan(seksi) {
    var wadah = seksi.querySelector(".peta-container");
    var tabel = seksi.querySelector(".peta-tabel");
    var pesan = seksi.querySelector(".peta-pesan");
    var reset = seksi.querySelector(".peta-reset");
    if (!wadah || !tabel) return;

    if (typeof window.L === "undefined") {
      if (pesan) {
        pesan.textContent = "Peta interaktif tidak dapat dimuat. " +
          "Data lokasi tetap dapat dibaca pada tabel di bawah.";
        pesan.hidden = false;
      }
      return;
    }

    var JENIS = {};
    try { JENIS = JSON.parse(seksi.getAttribute("data-legenda") || "{}"); } catch (e) {}

    var L = window.L;
    seksi.classList.add("peta-aktif");

    var peta = L.map(wadah, { center: [-2.5, 118], zoom: 4, scrollWheelZoom: false });
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

    var semua = [];

    tabel.querySelectorAll("tbody tr").forEach(function (tr) {
      // Baris berupa GARIS (mis. ALKI, Garis Wallace): data-garis="lat,lng; lat,lng; ..."
      var garisData = tr.getAttribute("data-garis");
      var titikGaris = null;
      if (garisData) {
        titikGaris = garisData.split(";").map(function (p) {
          var xy = p.split(",");
          return [parseFloat(xy[0]), parseFloat(xy[1])];
        }).filter(function (p) { return !isNaN(p[0]) && !isNaN(p[1]); });
        if (titikGaris.length < 2) return;
      }
      var lat = titikGaris ? titikGaris[0][0] : parseFloat(tr.getAttribute("data-lat"));
      var lng = titikGaris ? titikGaris[0][1] : parseFloat(tr.getAttribute("data-lng"));
      if (isNaN(lat) || isNaN(lng)) return;

      var jenis = JENIS[tr.getAttribute("data-jenis")];
      var warna = jenis ? jenis.warna : WARNA_LAIN;
      var sel = tr.querySelectorAll("td");
      var nama = sel[0] ? sel[0].textContent.trim() : "";
      var lokasi = sel[1] ? sel[1].textContent.trim() : "";
      var waktu = sel[2] ? sel[2].textContent.trim() : "";
      var ket = sel[4] ? sel[4].textContent.trim() : "";

      var isi = document.createElement("div");
      isi.className = "popup-bencana";
      var j = document.createElement("strong"); j.textContent = nama;
      var m = document.createElement("span"); m.className = "popup-meta"; m.textContent = lokasi + (waktu ? " · " + waktu : "");
      var lb = document.createElement("span"); lb.className = "popup-jenis"; lb.style.backgroundColor = warna;
      lb.textContent = jenis ? jenis.label : "Lainnya";
      var d = document.createElement("p"); d.textContent = ket;
      var k = document.createElement("span"); k.className = "popup-koordinat";
      k.textContent = titikGaris ? "Garis (lintasan perkiraan)" :
        "Koordinat: " + Math.abs(lat).toFixed(2) + "° " + (lat < 0 ? "LS" : "LU") + ", " + Math.abs(lng).toFixed(2) + "° BT";
      [j, m, lb, d, k].forEach(function (el) { isi.appendChild(el); });

      var titik;
      if (titikGaris) {
        titik = L.polyline(titikGaris, {
          color: warna, weight: 4, opacity: 0.9, dashArray: (jenis && jenis.putus) ? "10 8" : null
        }).bindPopup(isi, { maxWidth: 280 }).bindTooltip(nama, { sticky: true }).addTo(peta);
      } else {
        titik = L.circleMarker([lat, lng], {
          radius: 9, color: "#ffffff", weight: 2, fillColor: warna, fillOpacity: 0.9
        }).bindPopup(isi, { maxWidth: 280 }).bindTooltip(nama).addTo(peta);
      }
      semua.push(titik);

      var tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className = "btn-lihat-peta";
      tombol.textContent = "📍 Lihat";
      tombol.setAttribute("aria-label", "Lihat " + nama + " di peta");
      tombol.addEventListener("click", function () {
        wadah.scrollIntoView({ behavior: "smooth", block: "center" });
        if (titikGaris) {
          peta.flyToBounds(titik.getBounds(), { padding: [40, 40], duration: 1 });
          titik.openPopup(titik.getCenter());
        } else {
          peta.flyTo([lat, lng], 8, { duration: 1 });
          titik.openPopup();
        }
      });
      var td = document.createElement("td");
      td.appendChild(tombol);
      tr.appendChild(td);
    });

    var kepala = tabel.querySelector("thead tr");
    if (kepala && semua.length) {
      var th = document.createElement("th");
      th.scope = "col";
      th.textContent = "Peta";
      kepala.appendChild(th);
    }

    if (semua.length) {
      peta.fitBounds(L.featureGroup(semua).getBounds(), { padding: [30, 30] });
    }

    var legenda = L.control({ position: "bottomright" });
    legenda.onAdd = function () {
      var div = L.DomUtil.create("div", "peta-legenda");
      var h = document.createElement("strong"); h.textContent = "Legenda"; div.appendChild(h);
      Object.keys(JENIS).forEach(function (kunci) {
        var item = document.createElement("div");
        var b = document.createElement("span");
        b.className = JENIS[kunci].garis ? "legenda-garis" : "legenda-simbol";
        b.style.backgroundColor = JENIS[kunci].warna;
        item.appendChild(b);
        item.appendChild(document.createTextNode(JENIS[kunci].label));
        div.appendChild(item);
      });
      return div;
    };
    legenda.addTo(peta);
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(peta);

    if (reset && semua.length) {
      reset.hidden = false;
      reset.addEventListener("click", function () {
        peta.closePopup();
        peta.flyToBounds(L.featureGroup(semua).getBounds(), { padding: [30, 30], duration: 1 });
      });
    }
  }

  function mulai() {
    document.querySelectorAll(".peta-titik").forEach(siapkan);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulai);
  } else {
    mulai();
  }
})();
