
function renderChart(bpmAverage, poesAverage, poeAverage, maAverage, docAverage, lumAverage, traAverage, overallAverage) {
  const evaluationText = {
    'BPM': getEvaluationText(bpmAverage),
    'POES': getEvaluationText(poesAverage),
    'POE': getEvaluationText(poeAverage),
    'MA': getEvaluationText(maAverage),
    'DOC': getEvaluationText(docAverage),
    'TRA': getEvaluationText(traAverage),
    'LUM': getEvaluationText(lumAverage),
    'General': getEvaluationText(overallAverage)
  };

  const ctx = document.getElementById('resultChart').getContext('2d');
  const data = {
    labels: ['BPM', 'POES', 'POE', 'MA', 'DOC', 'TRA', 'LUM', 'General'],
    datasets: [{
      label: 'Porcentaje de Cumplimiento',
      data: [bpmAverage, poesAverage, poeAverage, maAverage, docAverage, traAverage, lumAverage, overallAverage],
      backgroundColor: [
        getColorByPercentage(bpmAverage),
        getColorByPercentage(poesAverage),
        getColorByPercentage(poeAverage),
        getColorByPercentage(maAverage),
        getColorByPercentage(docAverage),
        getColorByPercentage(traAverage),
        getColorByPercentage(lumAverage),
        getColorByPercentage(overallAverage)
      ]
    }]
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label;
            return evaluationText[label];
          }
        }
      }
    }
  };
  if (window.resultChart instanceof Chart) {
    window.resultChart.destroy();
  }
  window.resultChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}



