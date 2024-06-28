
// botón de "Fotos"
document.querySelectorAll('#capture-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const module = this.closest('.module-section');

    html2canvas(module).then(canvas => {
      let link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = module.id + '_screenshot.png';
      link.click();
    });
  });
});

// botón de "Comentario"
document.getElementById('#comment-btn').addEventListener('click', function () {

  alert('Comentario Enviado');
});

// botón de "Incidencia"
document.getElementById('#incident-btn').addEventListener('click', function () {

  alert('Incidencia enviada');
});
