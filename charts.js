function renderChart(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, traAverage, lumAverage, overallAverage) {
  const ctx = document.getElementById('resultChart').getContext('2d');

  // Create gradient for the chart background (0 to 100% area only)
  const backgroundGradient = ctx.createLinearGradient(0, 400, 0, 0);
  backgroundGradient.addColorStop(0, 'white');
  backgroundGradient.addColorStop(1, 'lightblue');

  // Create gradients for bars
  function getBarGradient(ctx) {
    const barGradient = ctx.createLinearGradient(0, 400, 0, 0);
    barGradient.addColorStop(0, 'white');
    barGradient.addColorStop(1, 'cyan');
    return barGradient;
  }

  function getPromGradient(ctx) {
    const barGradient = ctx.createLinearGradient(0, 400, 0, 0);
    barGradient.addColorStop(0, 'white');
    barGradient.addColorStop(1, 'blue');
    return barGradient;
  }

  // Fixed gradient for the right indicator bar
  function getFixedBarGradient(ctx) {
    const barGradient = ctx.createLinearGradient(0, 400, 0, 0);
    barGradient.addColorStop(0, 'red'); // 0% to 74% Red
    barGradient.addColorStop(0.74, 'red');
    barGradient.addColorStop(0.75, 'yellow'); // 75% to 89% Yellow
    barGradient.addColorStop(0.89, 'yellow');
    barGradient.addColorStop(0.90, 'green'); // 90% to 100% Green
    barGradient.addColorStop(1, 'green');
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
        'transparent', // Empty space for visual separation
        getPromGradient(ctx), // Gradient for overall average
        getFixedBarGradient(ctx) // Fixed gradient for the right indicator bar
      ],
      borderColor: 'black',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value + '%'; // Show percentage values
          },
          color: 'black',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          color: 'black'
        }
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
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
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1
      },
      legend: {
        display: false,
        labels: {
          color: 'black',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    layout: {
      padding: {
        top: 30, // Add padding to the top to show labels above 100%
        right: 50 // Space for the color rule
      }
    }
  };

  // Add labels on top of the bars
  Chart.register({
    id: 'customLabelPlugin',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar, index) => {
          const data = dataset.data[index];
          if (data !== null) {
            const labelX = bar.x - 15;
            const labelY = bar.y - 35; // Adjust Y position for the box above the bar
            const boxSize = 35;

            // Draw a small square box above the bar with subtle gradient
            ctx.fillStyle = 'white';
            ctx.fillRect(labelX, labelY, boxSize, boxSize);

            // Draw the percentage text inside the box
            ctx.fillStyle = 'black';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(Math.round(data) + '%', labelX + 5, labelY + 22);
          }
        });
      });
    }
  });

  // Create the background color for the chart
  const backgroundColorPlugin = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      ctx.save();
      ctx.fillStyle = backgroundGradient;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    }
  };

  // Add custom labels on the fixed gradient bar
  const customLabelsPlugin = {
    id: 'customLabelsPlugin',
    afterDraw(chart) {
      const ctx = chart.ctx;
      const yScale = chart.scales.y;
      const xScale = chart.scales.x;
      const barWidth = xScale.getPixelForValue('PROM') - xScale.getPixelForValue('');

      // Positions for the text labels
      const positions = [
        { value: 95.2, text: 'CUMPLE' },
        { value: 78.2, text: 'ALERTA' },
        { value: 37.5, text: 'CRITICO' }
      ];

      positions.forEach(pos => {
        const yPos = yScale.getPixelForValue(pos.value);
        const xPos = xScale.getPixelForValue('') + barWidth + 28.3; // Position on the right bar
        ctx.save();
        ctx.font = 'bold 7px Arial'; // Smaller font size for fitting inside the bar
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
    plugins: [backgroundColorPlugin, 'customLabelPlugin', customLabelsPlugin]
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