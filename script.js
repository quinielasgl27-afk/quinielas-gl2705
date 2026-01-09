document.addEventListener("DOMContentLoaded", () => {

  const partidosData = [
    ["América", "Chivas"],
    ["Tigres", "Rayados"],
    ["Pumas", "Cruz Azul"],
    ["Toluca", "León"],
    ["Pachuca", "Santos"]
  ];

  let seleccionActual = [];
  const contenedor = document.getElementById("partidos");

  function pintarPartidos() {
    contenedor.innerHTML = "";
    partidosData.forEach((p, i) => {
      contenedor.innerHTML += `
        <div class="partido">
          <span>${p[0]}</span>
          <button onclick="seleccionar(${i},'L')">L</button>
          <button onclick="seleccionar(${i},'E')">E</button>
          <button onclick="seleccionar(${i},'V')">V</button>
          <span>${p[1]}</span>
        </div>
      `;
    });
  }

  window.seleccionar = function (i, v) {
    seleccionActual[i] = v;
    const botones = document.querySelectorAll(".partido")[i].querySelectorAll("button");
    botones.forEach(b => b.classList.remove("seleccionado"));
    if (v === "L") botones[0].classList.add("seleccionado");
    if (v === "E") botones[1].classList.add("seleccionado");
    if (v === "V") botones[2].classList.add("seleccionado");
  };

  window.limpiar = function () {
    seleccionActual = [];
    document.querySelectorAll("button").forEach(b => b.classList.remove("seleccionado"));
  };

  window.aleatorio = function () {
    document.querySelectorAll(".partido").forEach((_, i) => {
      const r = ["L","E","V"][Math.floor(Math.random()*3)];
      seleccionar(i, r);
    });
  };

  window.reiniciar = function () {
    limpiar();
  };

  pintarPartidos();
});
