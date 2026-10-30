# Folder Gambar (`assets/img/`)

Simpan semua gambar website di folder ini: peta, foto lapangan, diagram, dan ilustrasi.

## Aturan nama file

- Gunakan **huruf kecil semua** dan **tanda hubung** (`-`) sebagai pengganti spasi.
  - ✅ `x-05-lipatan-antiklin.jpg`
  - ❌ `Lipatan Antiklin.JPG`
- Awali nama dengan kode modul agar mudah dicari, misalnya `xi-03-jalur-evakuasi.png`.

## Ukuran dan format

- **JPG** untuk foto, **PNG** atau **SVG** untuk diagram dan peta dengan garis tegas, **WebP** jika ingin lebih ringan.
- Usahakan ukuran file **di bawah 300 KB** dan lebar maksimal **± 1.600 piksel** agar cepat dibuka di HP. Perkecil dengan situs gratis seperti squoosh.app.

## Cara memasang di halaman modul

File modul berada di folder `materi/`, jadi alamat gambar diawali `../`:

```html
<figure>
  <img src="../assets/img/x-05-lipatan-antiklin.jpg"
       alt="Lapisan batuan yang melengkung ke atas membentuk antiklin">
  <figcaption>Gambar 1. Lipatan antiklin (Sumber: dokumentasi pribadi)</figcaption>
</figure>
```

- **`alt` wajib diisi** dengan deskripsi gambar untuk aksesibilitas.
- Untuk gambar dari internet, pastikan lisensinya mengizinkan penggunaan ulang dan cantumkan sumbernya di `figcaption`.

(File README ini boleh dibiarkan; tidak akan tampil di website.)
