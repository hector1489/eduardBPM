document.addEventListener('DOMContentLoaded', function() {
  renderChartLum();
  renderChart();
});

function renderChart(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, traAverage, lumAverage, overallAverage) {
  const ctx = document.getElementById('resultChart').getContext('2d');

  function getBarGradient(ctx) {
    const barGradient = ctx.createLinearGradient(0, 0, 0, 400);
    barGradient.addColorStop(0, 'rgba(0, 150, 255, 0.5)');
    barGradient.addColorStop(1, 'rgba(0, 255, 150, 0.9)');
    return barGradient;
  }

  function getPromGradient(ctx) {
    const barGradient = ctx.createLinearGradient(0, 0, 0, 400);
    barGradient.addColorStop(0, 'rgba(0, 0, 150, 0.5)');
    barGradient.addColorStop(1, 'rgba(0, 0, 255, 0.9)');
    return barGradient;
  }

  function getFixedBarGradient(ctx) {
    const barGradient = ctx.createLinearGradient(0, 0, 0, 400);
    barGradient.addColorStop(0, 'green');      
    barGradient.addColorStop(0.10, 'green');
    barGradient.addColorStop(0.11, 'yellow');  
    barGradient.addColorStop(0.25, 'yellow');
    barGradient.addColorStop(0.26, 'red');     
    barGradient.addColorStop(1, 'red');
    return barGradient;
  }

  const data = {
    labels: ['BPM', 'POES', 'POE', 'MA', 'DOC', 'TRA', 'LUM', '', 'PROM', ''],
    datasets: [{
      label: 'Porcentaje de Cumplimiento',
      data: [bpmAverage, poesAverage, poeAverage, maAverage, docAverage, traAverage, lumAverage, null, overallAverage, 100],
      backgroundColor: [
        getBarGradient(ctx),
        getBarGradient(ctx),
        getBarGradient(ctx),
        getBarGradient(ctx),
        getBarGradient(ctx),
        getBarGradient(ctx),
        getBarGradient(ctx),
        'transparent',
        getPromGradient(ctx),
        getFixedBarGradient(ctx)
      ],
      borderColor: 'black',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value + '%';
          },
          color: 'black',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label;
            return label + ': ' + Math.round(tooltipItem.raw) + '%';
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 12,
          weight: 'bold'
        },
        bodyFont: {
          size: 10
        },
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1
      },
      legend: {
        display: false,
        labels: {
          color: 'black',
          font: {
            size: 10,
            weight: 'bold'
          }
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20
      }
    }
  };

  Chart.register({
    id: 'customLabelPlugin',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar, index) => {
          const data = dataset.data[index];
          if (data !== null) {
            const labelX = bar.x - 10;
            const labelY = bar.y - 20;
            const boxSize = 20;

            ctx.fillStyle = 'white';
            ctx.fillRect(labelX, labelY, boxSize, boxSize);

            ctx.fillStyle = 'black';
            ctx.font = 'bold 8px Arial';
            ctx.fillText(Math.round(data) + '%', labelX + 3, labelY + 15);
          }
        });
      });
    }
  });

  const customLabelsPlugin = {
    id: 'customLabelsPlugin',
    afterDraw(chart) {
      const ctx = chart.ctx;
      const yScale = chart.scales.y;
      const xScale = chart.scales.x;
      const barWidth = xScale.getPixelForValue('PROM') - xScale.getPixelForValue('');

      const positions = [
        { value: 95.2, text: 'CUMPLE' },
        { value: 78.2, text: 'ALERTA' },
        { value: 37.5, text: 'CRITICO' }
      ];

      positions.forEach(pos => {
        const yPos = yScale.getPixelForValue(pos.value);
        const xPos = xScale.getPixelForValue('') + barWidth + 28.3;
        ctx.save();
        ctx.font = 'bold 7px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(pos.text, xPos, yPos);
        ctx.restore();
      });
    }
  };

  if (window.resultChart instanceof Chart) {
    window.resultChart.destroy();
  }
  window.resultChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options,
    plugins: ['customLabelPlugin', customLabelsPlugin]
  });
}

// Function to get evaluation text
function getEvaluationText(average) {
  if (average >= 90) return 'CUMPLE';
  if (average >= 75) return 'EN ALERTA';
  return 'CRITICO';
}

// Function to get color by percentage
function getColorByPercentage(average) {
  if (average >= 90) return 'green';
  if (average >= 75) return 'yellow';
  return 'red';
}

// grafico solo para lum
function renderChartLum(lumAverage) {
  const ctx = document.getElementById('puntaje-sololum').getContext('2d');
  

  const data = {
    labels: ['Luminosidad'],
    datasets: [{
      label: 'Porcentaje de Cumplimiento',
      data: [lumAverage],
      backgroundColor: [getBarGradient(ctx)],
      borderColor: 'black',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(100, lumAverage), // Ajustar el máximo de Y según el valor de lumAverage
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value + '%';
          },
          color: 'black',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return 'Luminosidad: ' + Math.round(tooltipItem.raw) + '%';
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 12,
          weight: 'bold'
        },
        bodyFont: {
          size: 10
        },
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1
      },
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20
      }
    }
  };

  if (window.lumChart instanceof Chart) {
    window.lumChart.destroy();
  }

  window.lumChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}

function getBarGradient(ctx) {
  const barGradient = ctx.createLinearGradient(0, 0, 0, 400);
  barGradient.addColorStop(0, 'rgba(0, 150, 255, 0.5)');
  barGradient.addColorStop(1, 'rgba(0, 255, 150, 0.9)');
  return barGradient;
}

//module Kpi
// grafico solo para tra
function renderChartTra(traAverage, poeAverage, docAverage) {
  const ctx = document.getElementById('promedios-kpi').getContext('2d');

  // Asegurarse de que los valores sean números, en caso contrario, asignarles 0.
  traAverage = typeof traAverage === 'number' ? traAverage : 100;
  poeAverage = typeof poeAverage === 'number' ? poeAverage : 100;
  docAverage = typeof docAverage === 'number' ? docAverage : 100;
  
  // Calcula el promedio de TRA, SER y DOC
  const overallAverageTra = (traAverage + poeAverage + docAverage) / 3;

  const data = {
    labels: ['Transporte', 'Servicios', 'Documentos', 'Promedio General'],
    datasets: [{
      label: 'Porcentaje de Cumplimiento',
      data: [traAverage, poeAverage, docAverage, overallAverageTra],
      backgroundColor: [
        getBarGradient(ctx), // Transporte
        getBarGradient(ctx), // Servicios
        getBarGradient(ctx), // Documentos
        getBarGradient(ctx)  // Promedio General
      ],
      borderColor: 'black',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value + '%';
          },
          color: 'black',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 10,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = data.labels[tooltipItem.dataIndex];
            return `${label}: ${Math.round(tooltipItem.raw)}%`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 12,
          weight: 'bold'
        },
        bodyFont: {
          size: 10
        },
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1
      },
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20
      }
    }
  };

  if (window.traChart instanceof Chart) {
    window.traChart.destroy();
  }

  window.traChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}
