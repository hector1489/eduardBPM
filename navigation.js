function nextModule(currentModule, nextModule) {
  document.getElementById(`module-${currentModule}`).classList.remove('active');
  document.getElementById(`module-${nextModule}`).classList.add('active');
  window.scrollTo(0, 0);

  switch(nextModule) {
    case 'poes':
      document.getElementById('module-title').innerText = 'POES - Procedimientos Operacionales Estandarizados de Saneamiento';
      break;
    case 'poe':
      document.getElementById('module-title').innerText = 'POE - Procedimientos Operacionales Estandarizados';
      break;
    case 'ma':
      document.getElementById('module-title').innerText = 'MA - Manejo y Protección Ambiental';
      break;
    case 'doc':
      document.getElementById('module-title').innerText = 'DOC - Documentación';
      break;
    case 'cap':
      document.getElementById('module-title').innerText = 'DOC - CAPACITACION';
      break;
    case 'resumen':
      document.getElementById('module-title').innerText = 'Resumen auditoría';
      calculateOverallAverages();
      break;
    case 'tra':
      document.getElementById('module-title').innerText = 'TRA - PROMEDIO DE TRAZADORES BROTE ETA';
      break;
    case 'lum':
      document.getElementById('module-title').innerText = 'LUM - LUMINOMETRÍA';
      break;
    case 'ficha':
      document.getElementById('module-title').style.display = 'none';
      break;
    default:
      document.getElementById('module-title').innerText = 'BPM - Buenas Prácticas de Manufactura';
  }

  document.getElementById('module-title').style.display = nextModule === 'ficha' ? 'none' : 'block';
}

function previousModule(currentModule, previousModule) {
  document.getElementById(`module-${currentModule}`).classList.remove('active');
  document.getElementById(`module-${previousModule}`).classList.add('active');
  window.scrollTo(0, 0);

  switch(previousModule) {
    case 'poes':
      document.getElementById('module-title').innerText = 'POES - Procedimientos Operacionales Estandarizados de Saneamiento';
      break;
    case 'poe':
      document.getElementById('module-title').innerText = 'POE - Procedimientos Operacionales Estandarizados';
      break;
    case 'ma':
      document.getElementById('module-title').innerText = 'MA - Manejo y Protección Ambiental';
      break;
    case 'doc':
      document.getElementById('module-title').innerText = 'DOC - Documentación';
      break;
    case 'cap':
      document.getElementById('module-title').innerText = 'DOC - CAPACITACION';
      break;
    case 'resumen':
      document.getElementById('module-title').innerText = 'Resumen auditoría';
      calculateOverallAverages();
      break;
    case 'tra':
      document.getElementById('module-title').innerText = 'TRA - PROMEDIO DE TRAZADORES BROTE ETA';
      break;
    case 'lum':
      document.getElementById('module-title').innerText = 'LUM - LUMINOMETRÍA';
      break;
    case 'ficha':
      document.getElementById('module-title').style.display = 'none';
      break;
    default:
      document.getElementById('module-title').innerText = 'BPM - Buenas Prácticas de Manufactura';
  }

  document.getElementById('module-title').style.display = previousModule === 'ficha' ? 'none' : 'block';
}
