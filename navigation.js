function nextModule(currentModule, nextModule) {
  document.getElementById(`module-${currentModule}`).classList.remove('active');
  document.getElementById(`module-${nextModule}`).classList.add('active');
  window.scrollTo(0, 0);

  if (nextModule.startsWith('poes')) {
    document.getElementById('module-title').innerText = 'POES - Procedimientos Operacionales Estandarizados de Saneamiento';
    document.getElementById('module-title').style.display = 'block';
  } else if (nextModule.startsWith('poe')) {
    document.getElementById('module-title').innerText = 'POE - Procedimientos Operacionales Estandarizados';
    document.getElementById('module-title').style.display = 'block';
  } else if (nextModule === 'ma') {
    document.getElementById('module-title').innerText = 'MA - Manejo y Protección Ambiental';
    document.getElementById('module-title').style.display = 'block';
  } else if (nextModule === 'doc') {
    document.getElementById('module-title').innerText = 'DOC - Documentación';
    document.getElementById('module-title').style.display = 'block';
  } else if (nextModule === 'resumen') {
    document.getElementById('module-title').innerText = 'Resumen auditoría';
    document.getElementById('module-title').style.display = 'block';
    calculateOverallAverages();
  } else if (nextModule === 'tra') {
    document.getElementById('module-title').innerText = 'TRA - PROMEDIO DE TRAZADORES BROTE ETA';
    document.getElementById('module-title').style.display = 'block';
  } else if (nextModule === 'lum') {
    document.getElementById('module-title').innerText = 'LUM - LUMINOMETRÍA';
    document.getElementById('module-title').style.display = 'block';
  } else if (nextModule === 'ficha') {
    document.getElementById('module-title').style.display = 'none'; // No mostrar título para la ficha
  } else {
    document.getElementById('module-title').innerText = 'BPM - Buenas Prácticas de Manufactura';
    document.getElementById('module-title').style.display = 'block';
  }
}

function previousModule(currentModule, previousModule) {
  document.getElementById(`module-${currentModule}`).classList.remove('active');
  document.getElementById(`module-${previousModule}`).classList.add('active');
  window.scrollTo(0, 0); // Desplaza la pantalla al inicio

  if (previousModule.startsWith('poes')) {
    document.getElementById('module-title').innerText = 'POES - Procedimientos Operacionales Estandarizados de Saneamiento';
    document.getElementById('module-title').style.display = 'block';
  } else if (previousModule.startsWith('poe')) {
    document.getElementById('module-title').innerText = 'POE - Procedimientos Operacionales Estandarizados';
    document.getElementById('module-title').style.display = 'block';
  } else if (previousModule === 'ma') {
    document.getElementById('module-title').innerText = 'MA - Manejo y Protección Ambiental';
    document.getElementById('module-title').style.display = 'block';
  } else if (previousModule === 'doc') {
    document.getElementById('module-title').innerText = 'DOC - Documentación';
    document.getElementById('module-title').style.display = 'block';
  } else if (previousModule === 'tra') {
    document.getElementById('module-title').innerText = 'TRA - PROMEDIO DE TRAZADORES BROTE ETA';
    document.getElementById('module-title').style.display = 'block';
  } else if (previousModule === 'lum') {
    document.getElementById('module-title').innerText = 'LUM - LUMINOMETRÍA';
    document.getElementById('module-title').style.display = 'block';
  } else if (previousModule === 'ficha') {
    document.getElementById('module-title').style.display = 'none'; // No mostrar título para la ficha
  } else {
    document.getElementById('module-title').innerText = 'BPM - Buenas Prácticas de Manufactura';
    document.getElementById('module-title').style.display = 'block';
  }
}