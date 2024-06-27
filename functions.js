function goToDashboard() {
  window.location.href = 'dashboard.html';
}

document.addEventListener('DOMContentLoaded', function () {
  calculateOverallAverages();
});

function getColorByPercentage(percentage) {
  if (percentage >= 90) return 'green';
  if (percentage >= 75) return 'yellow';
  return 'red';
}

function getEvaluationText(percentage) {
  if (percentage >= 90) return 'Cumple totalmente con el ítem evaluado';
  if (percentage >= 75) return 'Cumple con observaciones';
  if (percentage >= 50) return 'Parcialmente cumple con observaciones';
  if (percentage >= 25) return 'No cumple más del 70%';
  return 'No cumple con el ítem evaluado';
}

function getInterpretationText(percentage) {
  if (percentage >= 90) return 'El Administrador debe mejorar las observaciones realizadas en los plazos definidos y debe enviar el plan de acción con evidencias, por correo.';
  if (percentage >= 75) return 'El Administrador debe recibir el plan de acción del Coordinador de Calidad y/o Jefe de Calidad. Debe el Administrador enviar vía correo al Supervisor de alimentación.';
  return 'El Supervisor de Alimentación que realice la auditoría debe: comunicar el resultado al Jefe de Campamento vía correo electrónico.';
}

function calculateAverage(module) {
  const form = document.getElementById(`form-${module}`);
  const selects = form.querySelectorAll('select');
  let total = 0;
  let count = 0;

  selects.forEach(select => {
    total += parseInt(select.value);
    count++;
  });

  const average = (total / count).toFixed(2);
  document.getElementById(`average-${module}`).innerText = `${average}%`;
  calculateOverallAverages();
}

function calculateOverallAverages() {
  const bpmModules = ['infraestructura', 'legales'];
  const poesModules = [
    'poes-control-productos', 'poes-control-agua', 'poes-superficies', 'poes-contaminacion-cruzada',
    'poes-sustancias-adulterantes', 'poes-higiene-empleados', 'poes-control-plagas', 'poes-instalaciones'
  ];
  const poeModules = [
    'poe-recepcion', 'poe-almacenamiento', 'poe-preelaboraciones', 'poe-elaboracion', 'poe-mantencion',
    'poe-transporte', 'poe-servicio', 'poe-lavado-ollas-vajilla', 'poe-control-calidad'
  ];
  const maModules = ['ma'];
  const docModules = ['doc'];
  const lumModules = ['lum'];
  const traModules = ['tra'];

  let bpmTotal = 0, bpmCount = 0;
  bpmModules.forEach(module => {
    const averageText = document.getElementById(`average-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    if (!isNaN(average)) {
      bpmTotal += average;
      bpmCount++;
    }
  });
  const bpmAverage = (bpmTotal / bpmCount).toFixed(2);
  document.getElementById('resumen-bpm').innerText = `${bpmAverage}%`;
  document.getElementById('resumen-bpm').style.color = getColorByPercentage(bpmAverage);

  let poesTotal = 0, poesCount = 0;
  poesModules.forEach(module => {
    const averageText = document.getElementById(`average-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    if (!isNaN(average)) {
      poesTotal += average;
      poesCount++;
    }
  });
  const poesAverage = (poesTotal / poesCount).toFixed(2);
  document.getElementById('resumen-poes').innerText = `${poesAverage}%`;
  document.getElementById('resumen-poes').style.color = getColorByPercentage(poesAverage);

  let poeTotal = 0, poeCount = 0;
  poeModules.forEach(module => {
    const averageText = document.getElementById(`average-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    if (!isNaN(average)) {
      poeTotal += average;
      poeCount++;
    }
  });
  const poeAverage = (poeTotal / poeCount).toFixed(2);
  document.getElementById('resumen-poe').innerText = `${poeAverage}%`;
  document.getElementById('resumen-poe').style.color = getColorByPercentage(poeAverage);

  let maTotal = 0, maCount = 0;
  maModules.forEach(module => {
    const averageText = document.getElementById(`average-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    if (!isNaN(average)) {
      maTotal += average;
      maCount++;
    }
  });
  const maAverage = (maTotal / maCount).toFixed(2);
  document.getElementById('resumen-ma').innerText = `${maAverage}%`;
  document.getElementById('resumen-ma').style.color = getColorByPercentage(maAverage);

  let docTotal = 0, docCount = 0;
  docModules.forEach(module => {
    const averageText = document.getElementById(`average-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    if (!isNaN(average)) {
      docTotal += average;
      docCount++;
    }
  });
  const docAverage = (docTotal / docCount).toFixed(2);
  document.getElementById('resumen-doc').innerText = `${docAverage}%`;
  document.getElementById('resumen-doc').style.color = getColorByPercentage(docAverage);

  let lumTotal = 0, lumCount = 0;
  lumModules.forEach(module => {
    const averageText = document.getElementById(`average-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    if (!isNaN(average)) {
      lumTotal += average;
      lumCount++;
    }
  });
  const lumAverage = (lumTotal / lumCount).toFixed(2);
  document.getElementById('resumen-lum').innerText = `${lumAverage}%`;
  document.getElementById('resumen-lum').style.color = getColorByPercentage(lumAverage);

  let traTotal = 0, traCount = 0;
  traModules.forEach(module => {
    const averageText = document.getElementById(`average-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    if (!isNaN(average)) {
      traTotal += average;
      traCount++;
    }
  });
  const traAverage = (traTotal / traCount).toFixed(2);
  document.getElementById('resumen-tra').innerText = `${traAverage}%`;
  document.getElementById('resumen-tra').style.color = getColorByPercentage(traAverage);

  const overallTotal = bpmTotal + poesTotal + poeTotal + maTotal + docTotal + lumTotal + traTotal;
  const overallCount = bpmCount + poesCount + poeCount + maCount + docCount + lumCount + traCount;
  const overallAverage = (overallTotal / overallCount).toFixed(2);
  document.getElementById('promedio-general').innerText = `${overallAverage}%`;
  document.getElementById('promedio-general').style.color = getColorByPercentage(overallAverage);

  // Obtén la interpretación final
  const finalInterpretation = getFinalInterpretation(overallAverage);

  // Actualiza el elemento de interpretación
  const interpretationContainer = document.getElementById('interpretacion-final');
  interpretationContainer.innerHTML = `
      <h5>Nota: ${finalInterpretation.nota}</h5>
      <p>Acciones a seguir: ${finalInterpretation.accion}</p>
  `;

  updateAuditTable(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, lumAverage, traAverage, overallAverage);
  renderChart(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, lumAverage, traAverage, overallAverage);

  // Actualiza la información de la ficha en el resumen
  updateFichaResumen();
}

function updateAuditTable(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, lumAverage, traAverage, overallAverage) {
  const weights = {
    infraestructura: 4,
    poes: 25,
    poe: 25,
    ma: 4,
    doc: 10,
    traz: 21,
    lum: 10
  };

  document.getElementById('nota-infraestructura').innerText = `${bpmAverage}%`;
  document.getElementById('puntaje-infraestructura').innerText = `${(bpmAverage * weights.infraestructura / 100).toFixed(1)}%`;

  document.getElementById('nota-poes').innerText = `${poesAverage}%`;
  document.getElementById('puntaje-poes').innerText = `${(poesAverage * weights.poes / 100).toFixed(1)}%`;

  document.getElementById('nota-poe').innerText = `${poeAverage}%`;
  document.getElementById('puntaje-poe').innerText = `${(poeAverage * weights.poe / 100).toFixed(1)}%`;

  document.getElementById('nota-ma').innerText = `${maAverage}%`;
  document.getElementById('puntaje-ma').innerText = `${(maAverage * weights.ma / 100).toFixed(1)}%`;

  document.getElementById('nota-doc').innerText = `${docAverage}%`;
  document.getElementById('puntaje-doc').innerText = `${(docAverage * weights.doc / 100).toFixed(1)}%`;

  document.getElementById('nota-traz').innerText = `${traAverage}%`;
  document.getElementById('puntaje-traz').innerText = `${(traAverage * weights.traz / 100).toFixed(1)}%`;

  document.getElementById('nota-lum').innerText = `${lumAverage}%`;
  document.getElementById('puntaje-lum').innerText = `${(lumAverage * weights.lum / 100).toFixed(1)}%`;

  const weightedAverage = (
    (bpmAverage * weights.infraestructura) +
    (poesAverage * weights.poes) +
    (poeAverage * weights.poe) +
    (maAverage * weights.ma) +
    (docAverage * weights.doc) +
    (traAverage * weights.traz) +
    (lumAverage * weights.lum)
  ) / 100;

  document.getElementById('promedio-ponderado').innerText = `${weightedAverage.toFixed(1)}%`;
}

function getFinalInterpretation(percentage) {
  if (percentage >= 90) {
    return {
      nota: "CUMPLE",
      accion: "El Administrador debe mejorar las observaciones realizadas en los plazos definidos y debe enviar el plan de acción con evidencias, por correo."
    };
  } else if (percentage >= 75) {
    return {
      nota: "EN ALERTA",
      accion: "El Administrador debe recibir el plan de acción del Coordinador de Calidad y/o Jefe de Calidad. Debe el Administrador enviar vía correo al Supervisor de alimentación."
    };
  } else {
    return {
      nota: "CRITICO",
      accion: "El Supervisor de Alimentación que realice la auditoria debe: comunicar el resultado al Jefe de Campamento vía correo electrónico."
    };
  }
}

function updateFichaResumen() {
  document.getElementById('resumen-nombre-establecimiento').innerText = document.getElementById('nombre-establecimiento').value;
  document.getElementById('resumen-numero-auditoria').innerText = document.getElementById('numero-auditoria').value;
  document.getElementById('resumen-gerente-establecimiento').innerText = document.getElementById('gerente-establecimiento').value;
  document.getElementById('resumen-administrador-establecimiento').innerText = document.getElementById('administrador-establecimiento').value;
  document.getElementById('resumen-supervisor-establecimiento').innerText = document.getElementById('supervisor-establecimiento').value;
  document.getElementById('resumen-auditor-externo').innerText = document.getElementById('auditor-externo').value;
  document.getElementById('resumen-fecha-auditoria').innerText = document.getElementById('fecha-auditoria').value;
}



