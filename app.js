const state = { rw: "all", jenis: "all" };

const elRw = document.getElementById("f-rw");
const elJenis = document.getElementById("f-jenis");

function fmt(n) {
  return Number(n).toLocaleString("id-ID", { maximumFractionDigits: 1 });
}

function isiPilihan(el, semua, daftar) {
  el.innerHTML = '<option value="all">' + semua + "</option>" +
    daftar.map(function (d) { return '<option value="' + d + '">' + d + "</option>"; }).join("");
}

function saring() {
  return DATA.filter(function (d) {
    return (state.rw === "all" || d.rw === state.rw) &&
           (state.jenis === "all" || d.jenis === state.jenis);
  });
}

function jumlah(rows) {
  return rows.reduce(function (s, r) { return s + r.kg; }, 0);
}

function perBulan(rows) {
  return BULAN.map(function (b) {
    return jumlah(rows.filter(function (r) { return r.bulan === b; }));
  });
}

function perJenis(rows) {
  return JENIS.map(function (j) {
    return jumlah(rows.filter(function (r) { return r.jenis === j; }));
  });
}

function renderKpi(rows) {
  const bulanan = perBulan(rows);
  const total = jumlah(rows);
  const rata = total / BULAN.length;
  const akhir = bulanan[bulanan.length - 1];
  const sebelum = bulanan[bulanan.length - 2];
  const persen = ((akhir - sebelum) / sebelum) * 100;
  const arah = persen >= 0 ? "naik" : "turun";
  const tanda = persen >= 0 ? "▲" : "▼";

  const jenis = perJenis(rows);
  const idx = jenis.indexOf(Math.max.apply(null, jenis));

  document.getElementById("kpi").innerHTML =
    kartu("Total setoran", fmt(total) + " kg", "Mei–Oktober 2026") +
    kartu("Rata-rata per bulan", fmt(rata) + " kg", "Dari 6 bulan terakhir") +
    kartu("Bulan ini vs bulan lalu",
      '<span class="' + arah + '">' + tanda + " " + fmt(Math.abs(persen)) + "%</span>",
      "Setoran Oktober " + arah + " dibanding September") +
    kartu("Jenis terbanyak", JENIS[idx], fmt(jenis[idx]) + " kg");
}

function kartu(label, nilai, ket) {
  return '<div class="kpi"><div class="label">' + label + '</div><div class="nilai">' +
    nilai + '</div><div class="ket">' + ket + "</div></div>";
}

function skalaMaks(maks) {
  const langkah = Math.pow(10, Math.floor(Math.log10(maks)));
  return Math.ceil(maks / langkah) * langkah;
}

function renderLine(rows) {
  const data = perBulan(rows);
  const W = 520, H = 280, kiri = 56, kanan = 16, atas = 16, bawah = 36;
  const maks = skalaMaks(Math.max.apply(null, data));
  const lebar = W - kiri - kanan;
  const tinggi = H - atas - bawah;

  const x = function (i) { return kiri + (lebar / (data.length - 1)) * i; };
  const y = function (v) { return atas + tinggi - (v / maks) * tinggi; };

  let svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Grafik garis total setoran per bulan: ' +
    BULAN.map(function (b, i) { return b + " " + fmt(data[i]) + " kg"; }).join(", ") + '">';

  for (let t = 0; t <= 4; t++) {
    const nilai = (maks / 4) * t;
    svg += '<line class="sumbu" x1="' + kiri + '" x2="' + (W - kanan) + '" y1="' + y(nilai) + '" y2="' + y(nilai) + '"/>' +
      '<text x="' + (kiri - 8) + '" y="' + (y(nilai) + 4) + '" text-anchor="end">' + fmt(nilai) + "</text>";
  }

  svg += '<polyline class="garis" points="' +
    data.map(function (v, i) { return x(i) + "," + y(v); }).join(" ") + '"/>';

  data.forEach(function (v, i) {
    svg += '<circle class="titik" cx="' + x(i) + '" cy="' + y(v) + '" r="5"><title>' +
      BULAN[i] + ": " + fmt(v) + " kg</title></circle>" +
      '<text x="' + x(i) + '" y="' + (H - 12) + '" text-anchor="middle">' + BULAN[i] + "</text>";
  });

  svg += "</svg>";
  document.getElementById("chart-line").innerHTML = svg;
}

function renderBar(rows) {
  const data = perJenis(rows);
  const maks = Math.max.apply(null, data);
  const W = 520, baris = 44, atas = 8, kiri = 80, kanan = 70;
  const H = atas + baris * JENIS.length;
  const lebar = W - kiri - kanan;

  let svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Grafik batang jumlah setoran per jenis sampah: ' +
    JENIS.map(function (j, i) { return j + " " + fmt(data[i]) + " kg"; }).join(", ") + '">';

  JENIS.forEach(function (j, i) {
    const yy = atas + i * baris;
    const w = maks === 0 ? 0 : (data[i] / maks) * lebar;
    const utama = data[i] === maks && maks > 0 ? " utama" : "";
    svg += '<text x="' + (kiri - 10) + '" y="' + (yy + 24) + '" text-anchor="end">' + j + "</text>" +
      '<rect class="bar' + utama + '" x="' + kiri + '" y="' + (yy + 6) + '" width="' + w + '" height="26" rx="4"/>' +
      '<text x="' + (kiri + w + 8) + '" y="' + (yy + 24) + '">' + fmt(data[i]) + "</text>";
  });

  svg += "</svg>";
  document.getElementById("chart-bar").innerHTML = svg;
}

function renderTabel(rows) {
  const tampil = state.jenis === "all" ? JENIS : [state.jenis];
  let html = "<thead><tr><th scope=\"col\">Bulan</th>" +
    tampil.map(function (j) { return '<th scope="col">' + j + "</th>"; }).join("") +
    '<th scope="col">Total</th></tr></thead><tbody>';

  BULAN.forEach(function (b) {
    const rb = rows.filter(function (r) { return r.bulan === b; });
    html += "<tr><th scope=\"row\">" + b + "</th>" +
      tampil.map(function (j) {
        return "<td>" + fmt(jumlah(rb.filter(function (r) { return r.jenis === j; }))) + "</td>";
      }).join("") +
      "<td><strong>" + fmt(jumlah(rb)) + "</strong></td></tr>";
  });

  document.getElementById("tabel").innerHTML = html + "</tbody>";
}

function renderStatus() {
  const rw = state.rw === "all" ? "semua wilayah" : state.rw;
  const jenis = state.jenis === "all" ? "semua jenis sampah" : "jenis " + state.jenis;
  document.getElementById("status").textContent = "Menampilkan data untuk " + rw + " dan " + jenis + ".";
}

function render() {
  const rows = saring();
  renderStatus();
  renderKpi(rows);
  renderLine(rows);
  renderBar(rows);
  renderTabel(rows);
}

isiPilihan(elRw, "Semua wilayah", WILAYAH);
isiPilihan(elJenis, "Semua jenis", JENIS);

elRw.addEventListener("change", function () { state.rw = elRw.value; render(); });
elJenis.addEventListener("change", function () { state.jenis = elJenis.value; render(); });

document.getElementById("reset").addEventListener("click", function () {
  state.rw = "all";
  state.jenis = "all";
  elRw.value = "all";
  elJenis.value = "all";
  render();
});

render();
