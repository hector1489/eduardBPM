document.addEventListener('DOMContentLoaded', function() {
  // Llamar a las funciones de renderizado de gráficos con valores de ejemplo o predeterminados
  renderChart3D();
  renderChartLum3D();
  renderChartTra3D();
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
