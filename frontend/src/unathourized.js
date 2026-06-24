// src/unauthorized.js
let segundos = 5;
const span = document.getElementById('countdown');

const intervalo = setInterval(() => {
  segundos--;
  if (span) span.textContent = segundos;

  if (segundos <= 0) {
    clearInterval(intervalo);
    window.location.href = '/index.html';
  }
}, 1000);