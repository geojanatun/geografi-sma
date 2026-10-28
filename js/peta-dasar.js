/* ==========================================================================
   PETA DASAR — js/peta-dasar.js
   Dipakai oleh: js/peta-bencana.js dan js/peta-titik.js
   Membutuhkan: js/vendor/leaflet/leaflet.js dan js/peta-dasar-data.js
   --------------------------------------------------------------------------
   Mengapa ada file ini?
   Server peta OpenStreetMap menolak permintaan dari halaman yang dibuka
   langsung dari komputer (alamat file:///...) dan kadang diblokir jaringan
   sekolah. Karena itu peta selalu memakai PETA DASAR SENDIRI (garis pantai
   dari Natural Earth) yang tersimpan di website ini, sehingga tetap tampil
   tanpa internet. Jika website dibuka online (GitHub Pages/Netlify),
   peta detail OpenStreetMap ditambahkan di atasnya.
   Guru TIDAK perlu mengubah file ini.
   ========================================================================== */

(function () {
  "use strict";

  function pasang(L, peta) {
    // Panel khusus di bawah lapisan ubin agar peta online menutupinya bila tersedia
    peta.createPane("petaDasar");
    peta.getPane("petaDasar").style.zIndex = 150;

    var dasar = null;
    if (window.PETA_DASAR_DATA) {
      dasar = L.geoJSON(window.PETA_DASAR_DATA, {
        pane: "petaDasar",
        interactive: false,
        style: function (f) {
          var indo = f.properties && f.properties.indonesia;
          return {
            color: indo ? "#4f7a57" : "#9c9480",
            weight: indo ? 1 : 0.8,
            fillColor: indo ? "#cfe6c4" : "#ebe5d6",
            fillOpacity: 1
          };
        },
        attribution: "Garis pantai: Natural Earth"
      }).addTo(peta);

      // Garis khatulistiwa sebagai acuan letak astronomis
      L.polyline([[0, 80], [0, 160]], {
        pane: "petaDasar", color: "#3d6f99", weight: 1, dashArray: "6 6", interactive: false
      }).addTo(peta);
      L.marker([0, 92.5], {
        pane: "petaDasar", interactive: false, keyboard: false,
        icon: L.divIcon({ className: "label-khatulistiwa", html: "Khatulistiwa 0°", iconSize: null })
      }).addTo(peta);
    }

    // Peta detail online hanya bila halaman dibuka lewat http/https dan ada internet
    var online = /^https?:$/.test(window.location.protocol) && navigator.onLine !== false;
    var lapisan = { "Peta dasar (tanpa internet)": dasar || L.layerGroup() };

    if (online) {
      var ubin = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Kontributor OpenStreetMap</a>'
      });
      var gagal = 0;
      ubin.on("tileerror", function () {
        gagal++;
        // Jika banyak ubin gagal (diblokir/jaringan lambat), cukup pakai peta dasar
        if (gagal === 4 && peta.hasLayer(ubin)) { peta.removeLayer(ubin); }
      });
      ubin.addTo(peta);
      lapisan = {
        "OpenStreetMap (online)": ubin,
        "Peta dasar (tanpa internet)": L.layerGroup()
      };
      L.control.layers(lapisan, null, { position: "topright", collapsed: true }).addTo(peta);
    }
  }

  window.PetaDasar = { pasang: pasang };
})();
