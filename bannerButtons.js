
// botón de "Fotos"
document.getElementById('capture-btn').addEventListener('click', function () {
  html2canvas(document.getElementById('module-infraestructura')).then(canvas => {
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'infraestructura_screenshot.png';
    link.click();
  });
});

// botón de "Comentario"
document.getElementById('comment-btn').addEventListener('click', function () {

  alert('Botón de Comentario presionado');
});

// botón de "Incidencia"
document.getElementById('incident-btn').addEventListener('click', function () {

  alert('Botón de Incidencia presionado');
});
