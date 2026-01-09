document.addEventListener("DOMContentLoaded", () => {

// ==============================
// DATOS DE LOS PARTIDOS
// ==============================
const partidosData = [
  "Milan vs Florentina",
  "Inter de Milán vs Napoli",
  "Heerenveen vs Feyenoord",
  "SC Telstar vs Ajax",
  "Bayern de Múnich vs Wolfsburgo",
  "Pumas vs Querétaro",
  "Atl. San Luis vs Tigres"
];

// ==============================
// VARIABLES PRINCIPALES
// ==============================
let quinielas = [];
let seleccionActual = [];

const cont = document.getElementById("partidos");

// ==============================
// PINTAR PARTIDOS
// ==============================
partidosData.forEach((p, i) => {
  const [local, visita] = p.split(" vs ");
  cont.innerHTML += `
    <div class="partido">
      <span>${local}</span>
      <div>
        <button onclick="sel(${i},'L',this)">L</button>
        <button onclick="sel(${i},'E',this)">E</button>
        <button onclick="sel(${i},'V',this)">V</button>
      </div>
      <span>${visita}</span>
    </div>
  `;
});

// ==============================
// SELECCIÓN L E V
// ==============================
window.sel = function (i, v, btn) {
  seleccionActual[i] = v;
  btn.parentNode.querySelectorAll("button")
    .forEach(b => b.classList.remove("seleccionado"));
  btn.classList.add("seleccionado");
};

// ==============================
// AGREGAR QUINIELA
// ==============================
window.agregar = function () {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) return alert("Ingresa tu nombre");

  quinielas.push({
    nombre,
    seleccionActual: [...seleccionActual]
  });

  actualizar();
  mostrarRegistros();
  limpiar();
};

// ==============================
// CALCULAR TOTAL CON PROMOS
// ==============================
function calcularTotal(cantidad) {
  let total = 0;

  if (cantidad >= 6) {
    const bloques6 = Math.floor(cantidad / 6);
    const resto = cantidad % 6;
    total += bloques6 * 100;

    const bloques3 = Math.floor(resto / 3);
    total += bloques3 * 50;
    total += (resto % 3) * 10;

  } else if (cantidad >= 3) {
    total += Math.floor(cantidad / 3) * 50;
    total += (cantidad % 3) * 10;
  } else {
    total = cantidad * 10;
  }

  return total;
}

// ==============================
// ACTUALIZAR TOTALES + WHATSAPP
// ==============================
function actualizar() {
  document.getElementById("totalQ").innerText = quinielas.length;
  document.getElementById("totalP").innerText =
    calcularTotal(quinielas.length);

  let texto = "⚽ Quinielas GL ⚽\n\n";
  quinielas.forEach(q => {
    texto += `${q.nombre}: ${q.seleccionActual.join(" - ")}\n`;
  });

  document.getElementById("whatsapp").href =
    "https://wa.me/522731180394?text=" +
    encodeURIComponent(texto);
}

// ==============================
// MOSTRAR REGISTROS
// ==============================
function mostrarRegistros() {
  const r = document.getElementById("registros");
  r.innerHTML = "";

  quinielas.forEach((q, i) => {
    r.innerHTML += `
      <p>${i + 1}. <strong>${q.nombre}</strong> →
      ${q.seleccionActual.join(" - ")}</p>
    `;
  });
}

// ==============================
// LIMPIAR
// ==============================
window.limpiar = function () {
  seleccionActual = [];
  document
    .querySelectorAll(".partido button")
    .forEach(b => b.classList.remove("seleccionado"));
};

// ==============================
// ALEATORIO
// ==============================
window.aleatorio = function () {
  seleccionActual = [];

  for (let i = 0; i < partidosData.length; i++) {
    const opciones = ["L", "E", "V"];
    seleccionActual[i] = opciones[Math.floor(Math.random() * 3)];
  }

  document.querySelectorAll(".partido").forEach((p, i) => {
    const botones = p.querySelectorAll("button");
    botones.forEach(b => b.classList.remove("seleccionado"));

    if (seleccionActual[i] === "L") botones[0].classList.add("seleccionado");
    if (seleccionActual[i] === "E") botones[1].classList.add("seleccionado");
    if (seleccionActual[i] === "V") botones[2].classList.add("seleccionado");
  });
};

// ==============================
// CONTADOR
// ==============================
function contador() {
  const cierre = new Date("2026-01-09T20:00:00");
  setInterval(() => {
    const diff = cierre - new Date();
    const h = Math.max(0, Math.floor(diff / 3600000));
    document.getElementById("contador").innerText =
      "Faltan: " + h + " hrs";
  }, 1000);
}

contador();
actualizar();
mostrarRegistros();

});
