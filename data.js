const BULAN = ["Mei", "Jun", "Jul", "Agu", "Sep", "Okt"];
const JENIS = ["Plastik", "Kertas", "Logam", "Kaca", "Organik"];
const WILAYAH = ["RW 01", "RW 02", "RW 03", "RW 04"];

const DASAR = { Plastik: 120, Kertas: 90, Logam: 45, Kaca: 30, Organik: 160 };
const FAKTOR_RW = [1, 0.85, 1.2, 0.7];
const FAKTOR_BULAN = [1, 1.06, 1.03, 1.14, 1.2, 1.31];

const DATA = [];

BULAN.forEach(function (bulan, b) {
  WILAYAH.forEach(function (rw, w) {
    JENIS.forEach(function (jenis, j) {
      const variasi = (((b * 7 + w * 3 + j * 5) % 9) - 4) / 50;
      const kg = Math.round(DASAR[jenis] * FAKTOR_RW[w] * FAKTOR_BULAN[b] * (1 + variasi));
      DATA.push({ bulan: bulan, rw: rw, jenis: jenis, kg: kg });
    });
  });
});
