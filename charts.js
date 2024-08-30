document.addEventListener('DOMContentLoaded', function() {
  renderChart3D();
  renderChartLum3D();
  renderChartTra3D();
  renderTrazadoresChart();
  updateChartOnObservationChange();
});

function renderChart3D(bpmAverage = 70, poesAverage = 100, poeAverage = 90, maAverage = 45, docAverage = 76, traAverage = 100, lumAverage = 100, overallAverage = 100) {
  const data = [
    parseFloat(bpmAverage),
    parseFloat(poesAverage),
    parseFloat(poeAverage),
    parseFloat(maAverage),
    parseFloat(docAverage),
    parseFloat(traAverage),
    parseFloat(lumAverage),
    parseFloat(overallAverage)
  ];

  Highcharts.chart('resultChart', {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: 'Auditoría BPM'
    },
    accessibility: {
      enabled: false
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: true
      }
    },
    xAxis: {
      categories: ['BPM', 'POES', 'POE', 'MA', 'DOC', 'TRA', 'LUM', 'PROM'],
      labels: {
        rotation: 0,
        style: {
          fontSize: 'clamp(8px, 2vw, 12px)',
          whiteSpace: 'nowrap',
          overflow: 'visible'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Cumplimiento (%)'
      },
      max: 100
    },
    series: [{
      data: data.map(value => ({ y: value, color: getColorByPercentage(value) })),
      name: 'Porcentaje de Cumplimiento'
    }]
  });
}

function renderChartLum3D(lumAverage = 100) {
  lumAverage = parseFloat(lumAverage);

  Highcharts.chart('puntaje-sololum', {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: 'Luminometría'
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: true
      }
    },
    xAxis: {
      categories: ['Luminometría'],
      labels: {
        rotation: 0,
        style: {
          fontSize: 'clamp(8px, 2vw, 12px)',
          whiteSpace: 'nowrap',
          overflow: 'visible'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Cumplimiento (%)'
      },
      max: 100
    },
    series: [{
      data: [{ y: lumAverage, color: getColorByPercentage(lumAverage) }],
      name: 'Porcentaje de Cumplimiento'
    }]
  });
}

function renderChartTra3D(traAverage = 100, poeAverage = 100, docAverage = 100) {
  const data = [
    parseFloat(traAverage),
    parseFloat(poeAverage),
    parseFloat(docAverage)
  ];

  const overallAverageTra = data.reduce((acc, val) => acc + val, 0) / data.length;

  Highcharts.chart('promedios-kpi', {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: 'KPI de Alimentos'
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: true
      }
    },
    xAxis: {
      categories: ['Transporte', 'Servicios', 'Documentos', 'Promedio General'],
      labels: {
        rotation: 0,
        style: {
          fontSize: 'clamp(8px, 2vw, 12px)',
          whiteSpace: 'nowrap',
          overflow: 'visible'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Cumplimiento (%)'
      },
      max: 100
    },
    series: [{
      data: [
        { y: data[0], color: getColorByPercentage(data[0]) },
        { y: data[1], color: getColorByPercentage(data[1]) },
        { y: data[2], color: getColorByPercentage(data[2]) },
        { y: overallAverageTra, color: getColorByPercentage(overallAverageTra) }
      ],
      name: 'Porcentaje de Cumplimiento'
    }]
  });
}

function getColorByPercentage(average) {
  if (average >= 90) return 'green';
  if (average >= 75) return 'yellow';
  return 'red';
}

// Grafico de Trazadores ETA
function renderTrazadoresChart() {
  const data = [
    checkObservation('warning-cs-registro'),
    checkObservation('warning-cs-medidas'),
    checkObservation('warning-higiene-programa'),
    checkObservation('warning-plagas-autorizacion'),
    checkObservation('warning-plagas-desechos'),
    checkObservation('warning-recepcion-materias'),
    checkObservation('warning-recepcion-especificaciones'),
    checkObservation('warning-ppt-flujo'),
    checkObservation('warning-ppt-procedimientos'),
    checkObservation('warning-ppt-almacenamiento'),
    checkObservation('warning-ppt-distribucion'),
    checkObservation('warning-ppt-envases'),
    checkObservation('warning-ppt-observaciones'),
    checkObservation('warning-existe-programa'),
    checkObservation('warning-existe-capacitacion')
  ];

  // Cálculo del porcentaje de cumplimiento total
  const totalCumplimiento = data.reduce((acc, val) => acc + val, 0) / data.length;
  
  // Actualizar la etiqueta con el porcentaje de cumplimiento total y aplicarle estilos según el valor
  const cumplimientoElement = document.getElementById('total-cumplimiento');
  cumplimientoElement.innerText = `Cumplimiento Total: ${totalCumplimiento.toFixed(2)}%`;
  cumplimientoElement.style.color = getColorByPercentage(totalCumplimiento);

  Highcharts.chart('trazadores-chart', {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: 'Trazadores ETA'
    },
    xAxis: {
      categories: [
        'CS Registro', 'CS Medidas', 'Higiene Programa', 
        'Plagas Autorización', 'Plagas Desechos', 'Recepción Materias', 
        'Recepción Especificaciones', 'PPT Flujo', 'PPT Procedimientos', 
        'PPT Almacenamiento', 'PPT Distribución', 'PPT Envases', 
        'PPT Observaciones', 'Programa Capacitación', 'Capacitación Aseo'
      ],
      labels: {
        style: {
          fontSize: 'clamp(8px, 2vw, 12px)',
          whiteSpace: 'nowrap',
          overflow: 'visible'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Cumplimiento (%)'
      },
      max: 100
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: true,
        colors: ['#1f78b4', '#33a02c', '#e31a1c', '#ff7f00', '#6a3d9a', '#b15928', '#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f', '#cab2d6', '#ffff99', '#1f78b4', '#33a02c', '#e31a1c']
      }
    },
    series: [{
      data: data,
      name: 'Cumplimiento'
    }]
  });
}

function checkObservation(spanId) {
  const span = document.getElementById(spanId);
  return span && span.innerText.trim() !== '' ? 0 : 100;
}

// Función para obtener el color según el porcentaje
function getColorByPercentage(percentage) {
  if (percentage >= 90) return 'green'; // Verde
  if (percentage >= 75) return 'yellow'; // Amarillo
  return 'red'; // Rojo
}

// Asegura que se actualice el gráfico cuando el contenido de un span cambie
function updateChartOnObservationChange() {
  const spans = [
    'warning-cs-registro', 'warning-cs-medidas', 'warning-higiene-programa',
    'warning-plagas-autorizacion', 'warning-plagas-desechos', 'warning-recepcion-materias',
    'warning-recepcion-especificaciones', 'warning-ppt-flujo', 'warning-ppt-procedimientos',
    'warning-ppt-almacenamiento', 'warning-ppt-distribucion', 'warning-ppt-envases',
    'warning-ppt-observaciones', 'warning-existe-programa', 'warning-existe-capacitacion'
  ];

  spans.forEach(spanId => {
    const spanElement = document.getElementById(spanId);
    if (spanElement) {
      const observer = new MutationObserver(() => {
        renderTrazadoresChart(); // Actualiza el gráfico si cambia el contenido del span
      });
      observer.observe(spanElement, { childList: true, subtree: true });
    }
  });
}

