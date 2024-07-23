//ir al dashboard
function goToDashboard() {
  window.location.href = 'dashboard.html';
}

//cuando se carga el DOM llama a la función para calcular los promedios generales
document.addEventListener('DOMContentLoaded', function () {
  calculateOverallAverages();
  initializeSelectChangeListeners();
});

// Función para inicializar los event listeners en los selects
function initializeSelectChangeListeners() {
  const modules = [
    'infraestructura', 'legales', 'poes-control-productos', 'poes-control-agua', 'poes-superficies',
    'poes-contaminacion-cruzada', 'poes-sustancias-adulterantes', 'poes-higiene-empleados',
    'poes-control-plagas', 'poes-instalaciones', 'poe-recepcion', 'poe-almacenamiento',
    'poe-preelaboraciones', 'poe-elaboracion', 'poe-mantencion', 'poe-transporte', 'poe-servicio',
    'poe-lavado-ollas-vajilla', 'poe-control-calidad', 'poe-ppt', 'ma', 'doc', 'lum', 'tra'
  ];

  modules.forEach(module => {
    const form = document.getElementById(`form-${module}`);
    if (form) {
      const selects = form.querySelectorAll('select');
      selects.forEach(select => {
        select.addEventListener('change', function (event) {
          const id = event.target.id;
          const value = parseInt(event.target.value);
          const notaId = `nota-${id}`;
          const observationId = `observacion-${id}`;

          const notaElement = document.getElementById(notaId);
          const observationElement = document.getElementById(observationId);

          if (notaElement) {
            notaElement.innerText = `${value}%`;
          }

          if (observationElement) {
            observationElement.innerText = getObservationText(value);
          }
        });
      });
    }
  });
}

// Obtener el texto de observación basado en el porcentaje
function getObservationText(percentage) {
  if (percentage === 100) return '';
  if (percentage >= 90) return 'Cumple totalmente con el ítem evaluado';
  if (percentage >= 75) return 'Cumple con observaciones';
  if (percentage >= 50) return 'Parcialmente cumple con observaciones';
  if (percentage >= 25) return 'No cumple más del 70%';
  return 'No cumple con el ítem evaluado';
}

//color basado en el porcentaje
function getColorByPercentage(percentage) {
  if (percentage >= 90) return '#2E86C1';
  if (percentage >= 75) return '#5DADE2';
  return '#AED6F1';
}

//obtiene el texto de evaluación basado en el porcentaje
function getEvaluationText(percentage) {
  if (percentage >= 90) return 'Cumple totalmente con el ítem evaluado';
  if (percentage >= 75) return 'Cumple con observaciones';
  if (percentage >= 50) return 'Parcialmente cumple con observaciones';
  if (percentage >= 25) return 'No cumple más del 70%';
  return 'No cumple con el ítem evaluado';
}

//obtiene el texto de interpretación basado en el porcentaje
function getInterpretationText(percentage) {
  if (percentage >= 90) return 'El Administrador debe mejorar las observaciones realizadas en los plazos definidos y debe enviar el plan de acción con evidencias, por correo.';
  if (percentage >= 75) return 'El Administrador debe recibir el plan de acción del Coordinador de Calidad y/o Jefe de Calidad. Debe el Administrador enviar vía correo al Supervisor de alimentación.';
  return 'El Supervisor de Alimentación que realice la auditoría debe: comunicar el resultado al Jefe de Campamento vía correo electrónico.';
}

// Calcula el promedio de un módulo específico
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

  // Actualizar los promedios de lum y tra
  updateLumAndTraAverages();

  calculateOverallAverages();
}

// Calcula los promedios de lum y tra basándose en las preguntas compartidas
function updateLumAndTraAverages() {
  const lumModules = ['poes-superficies'];
  const traModules = [
    'poes-higiene-empleados', 'poe-preelaboraciones', 'poe-elaboracion',
    'poe-mantencion', 'poe-transporte', 'poe-servicio', 'doc'
  ];

  // Calcular promedio para lum
  let lumTotal = 0;
  let lumCount = 0;
  lumModules.forEach(module => {
    const form = document.getElementById(`form-${module}`);
    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
      lumTotal += parseInt(select.value);
      lumCount++;
    });
  });
  const lumAverage = (lumTotal / lumCount).toFixed(2);
  document.getElementById('average-lum').innerText = `${lumAverage}%`;

  // Calcular promedio para tra
  let traTotal = 0;
  let traCount = 0;
  traModules.forEach(module => {
    const form = document.getElementById(`form-${module}`);
    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
      traTotal += parseInt(select.value);
      traCount++;
    });
  });
  const traAverage = (traTotal / traCount).toFixed(2);
  document.getElementById('average-tra').innerText = `${traAverage}%`;
}

//calcula los promedios generales de todos los módulos
function calculateOverallAverages() {
  const bpmModules = ['infraestructura', 'legales'];
  const poesModules = [
    'poes-control-productos', 'poes-control-agua', 'poes-superficies', 'poes-contaminacion-cruzada',
    'poes-sustancias-adulterantes', 'poes-higiene-empleados', 'poes-control-plagas', 'poes-instalaciones'
  ];
  const poeModules = [
    'poe-recepcion', 'poe-almacenamiento', 'poe-preelaboraciones', 'poe-elaboracion', 'poe-mantencion',
    'poe-transporte', 'poe-servicio', 'poe-lavado-ollas-vajilla', 'poe-control-calidad', 'poe-ppt'
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
  const resumenBpm = document.getElementById('resumen-bpm');
  if (resumenBpm) {
    resumenBpm.innerText = `${bpmAverage}%`;
    resumenBpm.style.color = getColorByPercentage(bpmAverage);
  }

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
  const resumenPoes = document.getElementById('resumen-poes');
  if (resumenPoes) {
    resumenPoes.innerText = `${poesAverage}%`;
    resumenPoes.style.color = getColorByPercentage(poesAverage);
  }

  let poeTotal = 0, poeCount = 0;
  poeModules.forEach(module => {
    const averageElement = document.getElementById(`average-${module}`);
    if (averageElement) {
      const averageText = averageElement.innerText;
      const average = parseFloat(averageText.replace('%', ''));
      if (!isNaN(average)) {
        poeTotal += average;
        poeCount++;
      }
    }
  });
  const poeAverage = poeCount ? (poeTotal / poeCount).toFixed(2) : 0;
  const resumenPoe = document.getElementById('resumen-poe');
  if (resumenPoe) {
    resumenPoe.innerText = `${poeAverage}%`;
    resumenPoe.style.color = getColorByPercentage(poeAverage);
  }

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
  const resumenMa = document.getElementById('resumen-ma');
  if (resumenMa) {
    resumenMa.innerText = `${maAverage}%`;
    resumenMa.style.color = getColorByPercentage(maAverage);
  }

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
  const resumenDoc = document.getElementById('resumen-doc');
  if (resumenDoc) {
    resumenDoc.innerText = `${docAverage}%`;
    resumenDoc.style.color = getColorByPercentage(docAverage);
  }

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
  const resumenLum = document.getElementById('resumen-lum');
  if (resumenLum) {
    resumenLum.innerText = `${lumAverage}%`;
    resumenLum.style.color = getColorByPercentage(lumAverage);
  }

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
  const resumenTra = document.getElementById('resumen-tra');
  if (resumenTra) {
    resumenTra.innerText = `${traAverage}%`;
    resumenTra.style.color = getColorByPercentage(traAverage);
  }

  //promedio general
  const overallTotal = bpmTotal + poesTotal + poeTotal + maTotal + docTotal + lumTotal + traTotal;
  const overallCount = bpmCount + poesCount + poeCount + maCount + docCount + lumCount + traCount;
  const overallAverage = (overallTotal / overallCount).toFixed(2);
  document.getElementById('promedio-general').innerText = `${overallAverage}%`;
  document.getElementById('promedio-general').style.color = getColorByPercentage(overallAverage);

  // Actualiza la tabla de auditoría
  updateAuditTable(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, lumAverage, traAverage);
  renderChart(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, lumAverage, traAverage, overallAverage);
  updateTableDetails(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, lumAverage, traAverage);

  // Actualiza la tabla de auditoría con las notas y puntajes
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

    // Actualiza las notas y puntajes en la tabla de auditoría
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


  //Actualizar datos desde ficha
  function updateFichaResumen() {
    document.getElementById('resumen-nombre-establecimiento').innerText = document.getElementById('nombre-establecimiento').value;
    document.getElementById('resumen-numero-auditoria').innerText = document.getElementById('numero-auditoria').value;
    document.getElementById('resumen-gerente-establecimiento').innerText = document.getElementById('gerente-establecimiento').value;
    document.getElementById('resumen-administrador-establecimiento').innerText = document.getElementById('administrador-establecimiento').value;
    document.getElementById('resumen-supervisor-establecimiento').innerText = document.getElementById('supervisor-establecimiento').value;
    document.getElementById('resumen-auditor-externo').innerText = document.getElementById('auditor-externo').value;
    document.getElementById('resumen-fecha-auditoria').innerText = document.getElementById('fecha-auditoria').value;
  }


  //Actualiza tabla details 
  function updateTableDetails(bpmAverage, poesAverage, poeAverage, docAverage, lumAverage, traAverage, overallAverage) {
    const moduleAverages = {
      infraestructura: bpmAverage,
      legales: bpmAverage,
      quimicos: poesAverage,
      agua: poesAverage,
      superficies: poesAverage,
      contaminacion: poesAverage,
      adulterantes: poesAverage,
      higiene: poesAverage,
      plagas: poesAverage,
      instalaciones: poesAverage,
      recepcion: poeAverage,
      almacenamiento: poeAverage,
      preelaboraciones: poeAverage,
      elaboraciones: poeAverage,
      mantencion: poeAverage,
      transporte: poeAverage,
      servicio: poeAverage,
      vajilla: poeAverage,
      control: poeAverage,
      proteccion: poeAverage,
      ppt: poeAverage,
      documentacion: docAverage,
      bpm: bpmAverage,
      poes: poesAverage,
      doc: docAverage,
      tra: traAverage,
      lum: lumAverage,
      final: overallAverage
    };

    document.getElementById('promedio-infraestructura').innerText = `${moduleAverages.infraestructura}%`;
    document.getElementById('promedio-legales').innerText = `${moduleAverages.legales}%`;
    document.getElementById('promedio-quimicos').innerText = `${moduleAverages.quimicos}%`;
    document.getElementById('promedio-agua').innerText = `${moduleAverages.agua}%`;
    document.getElementById('promedio-superficies').innerText = `${moduleAverages.superficies}%`;
    document.getElementById('promedio-contaminacion').innerText = `${moduleAverages.contaminacion}%`;
    document.getElementById('promedio-adulterantes').innerText = `${moduleAverages.adulterantes}%`;
    document.getElementById('promedio-higiene').innerText = `${moduleAverages.higiene}%`;
    document.getElementById('promedio-plagas').innerText = `${moduleAverages.plagas}%`;
    document.getElementById('promedio-instalaciones').innerText = `${moduleAverages.instalaciones}%`;
    document.getElementById('promedio-recepcion').innerText = `${moduleAverages.recepcion}%`;
    document.getElementById('promedio-almacenamiento').innerText = `${moduleAverages.almacenamiento}%`;
    document.getElementById('promedio-pre-elaboraciones').innerText = `${moduleAverages.preelaboraciones}%`;
    document.getElementById('promedio-elaboraciones').innerText = `${moduleAverages.elaboraciones}%`;
    document.getElementById('promedio-mantencion').innerText = `${moduleAverages.mantencion}%`;
    document.getElementById('promedio-transporte').innerText = `${moduleAverages.transporte}%`;
    document.getElementById('promedio-servicio').innerText = `${moduleAverages.servicio}%`;
    document.getElementById('promedio-vajilla').innerText = `${moduleAverages.vajilla}%`;
    document.getElementById('promedio-control').innerText = `${moduleAverages.control}%`;
    document.getElementById('promedio-proteccion').innerText = `${moduleAverages.proteccion}%`;
    document.getElementById('promedio-poe-ppt').innerText = `${moduleAverages.ppt}%`;
    document.getElementById('promedio-documentacion').innerText = `${moduleAverages.documentacion}%`;
    document.getElementById('promedio-bpm').innerText = `${moduleAverages.bpm}%`;
    document.getElementById('promedio-poes').innerText = `${moduleAverages.poes}%`;
    document.getElementById('promedio-doc').innerText = `${moduleAverages.doc}%`;
    document.getElementById('promedio-tra').innerText = `${moduleAverages.tra}%`;
    document.getElementById('promedio-lum').innerText = `${moduleAverages.lum}%`;
    document.getElementById('promedio-final').innerText = `${moduleAverages.final}%`;


  }

  // Lógica adicional para actualizar las observaciones basadas en los promedios generales
  const overallModules = ['bpm', 'poes', 'poe', 'ma', 'doc', 'lum', 'tra'];
  overallModules.forEach(module => {
    const averageText = document.getElementById(`resumen-${module}`).innerText;
    const average = parseFloat(averageText.replace('%', ''));
    const evaluationText = getEvaluationText(average);
    const interpretationText = getInterpretationText(average);

    const observationElement = document.getElementById(`observacion-${module}`);
    const interpretationElement = document.getElementById(`interpretacion-${module}`);
    if (observationElement) {
      observationElement.innerText = evaluationText;
    }
    if (interpretationElement) {
      interpretationElement.innerText = interpretationText;
    }
  });

  updateFichaResumen();
}


function updateTableWarning() {
  const warningMapping = {
      'warning-cs-registro': 'observacion-cs-registro',
      'warning-cs-medidas': 'observacion-cs-medidas',
      'warning-higiene-programa': 'observacion-higiene-programa',
      'warning-plagas-autorizacion': 'observacion-plagas-autorizacion',
      'warning-plagas-desechos': 'observacion-plagas-desechos',
      'warning-recepcion-materias': 'observacion-recepcion-materias',
      'warning-recepcion-especificaciones': 'observacion-recepcion-especificaciones',
      'warning-ppt-flujo': 'observacion-ppt-flujo',
      'warning-ppt-procedimientos': 'observacion-ppt-procedimientos',
      'warning-ppt-almacenamiento': 'observacion-ppt-almacenamiento',
      'warning-ppt-distribucion': 'observacion-ppt-distribucion',
      'warning-ppt-envases': 'observacion-ppt-envases',
      'warning-ppt-etiquetas': 'observacion-ppt-etiquetas',
      'warning-cap-manipulacion': 'observacion-cap-manipulacion',
      'warning-cap-limpieza': 'observacion-cap-limpieza'
  };

  const observerCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const observationId = mutation.target.id;
        const warningId = Object.keys(warningMapping).find(key => warningMapping[key] === observationId);

        if (warningId) {
          const observationElement = document.querySelector(`#tabla-details #${observationId}`);
          const warningElement = document.querySelector(`#tabla-warning #${warningId}`);

          if (observationElement && warningElement) {
            warningElement.innerText = observationElement.innerText;
          }
        }
      }
    }
  };

  const observerConfig = {
    childList: true,
    characterData: true,
    subtree: true
  };

  Object.values(warningMapping).forEach(observationId => {
    const observationElement = document.querySelector(`#tabla-details #${observationId}`);
    if (observationElement) {
      const observer = new MutationObserver(observerCallback);
      observer.observe(observationElement, observerConfig);
    }
  });
}

updateTableWarning();


// Obtener los datos de la tabla y guardarlos en localStorage
function guardarDatosTabla() {
  const modulo = document.getElementById('module-details');
  const tablas = modulo.querySelectorAll('table');

  if (!tablas || tablas.length === 0) {
    console.error('Error: No se encontró ninguna tabla dentro de "module-details".');
    alert('Error: No se encontró ninguna tabla dentro de "module-details".');
    return;
  }

  tablas.forEach((tabla) => {
    const filas = tabla.rows;

    if (!filas || filas.length === 0) {
      console.error(`Error: La tabla con ID ${tabla.id} no contiene filas.`);
      alert(`Error: La tabla con ID ${tabla.id} no contiene filas.`);
      return;
    }

    const maxColumnas = Array.from(filas[0].cells).length;

    const datos = [];
    for (let i = 1; i < filas.length; i++) {
      const fila = filas[i];
      const celdas = fila.cells;

      if (!celdas || celdas.length === 0) {
        console.error(`Error: La fila ${i} en la tabla con ID ${tabla.id} no contiene celdas.`);
        continue;
      }

      const filaDatos = {};
      for (let j = 0; j < maxColumnas; j++) {
        const celda = celdas[j] || {};
        if (celda.nodeType === Node.ELEMENT_NODE) {
          const span = celda.querySelector('span');

          const contenido = span ? span.innerText : celda.innerText;
          filaDatos[`columna${j + 1}`] = contenido || '';
          filaDatos[`idColumna${j + 1}`] = span ? span.id : 'N/A';
        } else {

          filaDatos[`columna${j + 1}`] = '';
          filaDatos[`idColumna${j + 1}`] = 'N/A';
        }
      }
      datos.push(filaDatos);
    }

    localStorage.setItem(`tablaDatos-${tabla.id}`, JSON.stringify(datos));
  });

  alert('Datos guardados correctamente.');
}



// Descargar la tabla como archivo Excel
function descargarTablaExcel() {
  const tabla = document.getElementById('module-details');
  const ws = XLSX.utils.table_to_sheet(tabla);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, 'tabla.xlsx');
}