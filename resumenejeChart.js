// Función para extraer datos de la tabla de desviaciones
function obtenerDatosTablaDesviaciones() {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.querySelectorAll('tbody tr');
  let datosHallazgos = [];
  let datosEvaluaciones = [];

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    const pregunta = celdas[1].innerText.trim();
    const desviacion = parseFloat(celdas[2].innerText.trim()) || 0;
    const criticidad = parseFloat(celdas[6].innerText.trim()) || 0;

    datosHallazgos.push({
      name: pregunta,
      y: desviacion,
      criticidad: criticidad
    });

    datosEvaluaciones.push({
      name: pregunta,
      y: criticidad
    });
  });

  return { datosHallazgos, datosEvaluaciones };
}


Highcharts.chart('hallazgos-criticos-chart', {
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 70,
      viewDistance: 25
    }
  },
  title: {
    text: 'Hallazgos Críticos'
  },
  xAxis: {
    categories: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3']
  },
  yAxis: {
    title: {
      text: 'Porcentaje de Desviación'
    }
  },
  series: [{
    name: 'Desviación',
    data: [75, 50, 30],
    color: '#FF5733'
  }, {
    name: 'Criticidad',
    data: [90, 85, 80],
    color: '#FF0000'
  }, {
    name: 'Recomendaciones',
    data: [95, 92, 88],
    color: '#000000'
  }]
});

// Evaluaciones Críticas (Gráfico de Pastel 3D)
Highcharts.chart('evaluaciones-criticas-chart', {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: {
    text: 'Evaluaciones Críticas'
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [{
    name: 'Evaluaciones',
    data: [
      { name: 'Infraestructura', y: 62, color: '#1abc9c' },
      { name: 'Equipamiento', y: 2, color: '#f39c12' },
      { name: 'Utensilios', y: 54, color: '#9b59b6' },
      { name: 'Higiene Manipulador', y: 28, color: '#2ecc71' },
      { name: 'Uniforme Completo', y: 27, color: '#e74c3c' }
    ]
  }]
});

// Trazadores (Gráfico de Líneas 3D)
Highcharts.chart('trazadores-chart', {
  chart: {
    type: 'line',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      depth: 50,
      viewDistance: 25
    }
  },
  title: {
    text: 'Trazadores'
  },
  xAxis: {
    categories: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5', 'Pregunta 6', 'Pregunta 7', 'Pregunta 8', 'Pregunta 9', 'Pregunta 10', 'Pregunta 11']
  },
  yAxis: {
    title: {
      text: 'Cumplimiento (%)'
    },
    plotLines: [{
      value: 90,
      color: 'red',
      dashStyle: 'shortdash',
      width: 2,
      label: {
        text: 'Meta 90%'
      }
    }]
  },
  series: [{
    name: 'Cumplimiento',
    data: [85, 88, 75, 90, 92, 85, 80, 88, 87, 93, 95],
    color: '#FF33FF'
  }]
});

// Indicadores Claves de Gestión (Gráfico de Barras Apiladas 3D)
Highcharts.chart('indicadores-gestion-chart', {
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
    text: 'Indicadores Claves de Gestión'
  },
  xAxis: {
    categories: ['BPM', 'Minuta', 'Exámenes', 'Inaptitud Microbiológica', 'Capacitaciones']
  },
  yAxis: {
    title: {
      text: 'Cumplimiento (%)'
    }
  },
  plotOptions: {
    column: {
      depth: 25,
      stacking: 'normal'
    }
  },
  series: [{
    name: 'Cumplimiento Real',
    data: [95, 85, 100, 97, 100],
    color: '#27ae60'
  }, {
    name: 'Meta',
    data: [95, 95, 100, 100, 100],
    color: '#c0392b'
  }]
});

// Higiene Instalaciones/Alimentos (Gráfico de Áreas 3D)
Highcharts.chart('higiene-instalaciones-chart', {
  chart: {
    type: 'area',
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 70,
      viewDistance: 25
    }
  },
  title: {
    text: 'Higiene Instalaciones/Alimentos'
  },
  xAxis: {
    categories: ['Luminometría', 'Limpieza Equipos', 'Limpieza Utensilios', 'Sanitización Gral']
  },
  yAxis: {
    title: {
      text: 'Porcentaje'
    }
  },
  series: [{
    name: 'Cumplimiento',
    data: [80, 70, 75, 85],
    color: '#3498db'
  }]
});

// Eficiencia Operacional (Gráfico de Barras 3D)
Highcharts.chart('eficiencia-operacional-chart', {
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 70,
      viewDistance: 25
    }
  },
  title: {
    text: 'Eficiencia Operacional'
  },
  xAxis: {
    categories: ['Flujo Operaciones', 'Procedimientos Estandarizados', 'Resoluciones Sanitarias', 'Mantenciones Correctivas', 'Almacenamiento Productos Químicos', 'Control Tiempo y Temperatura', 'Planificación Productos', 'Reposición']
  },
  yAxis: {
    title: {
      text: 'Porcentaje'
    }
  },
  series: [{
    name: 'Cumplimiento',
    data: [82, 83, 95, 65, 78, 85, 72, 88],
    color: '#f39c12'
  }]
});

// Satisfacción al Cliente (Gráfico de Pastel 3D)
Highcharts.chart('satisfaccion-cliente-chart', {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: {
    text: 'Satisfacción al Cliente'
  },
  colors: ['#2ecc71', '#3498db', '#e74c3c', '#9b59b6', '#f1c40f'],
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [{
    name: 'Satisfacción',
    data: [
      ['Calidad del Servicio', 71],
      ['Trazabilidad del Producto', 85],
      ['Calidad Organoléptica', 79],
      ['Inventario de Vajilla', 74]
    ]
  }]
});

// Seguridad Alimentaria (Gráfico de Áreas Apiladas 3D)
Highcharts.chart('seguridad-alimentaria-chart', {
  chart: {
    type: 'area',
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 70,
      viewDistance: 25
    }
  },
  title: {
    text: 'Seguridad Alimentaria'
  },
  xAxis: {
    categories: ['Control de Plagas', 'Controles de Procesos', 'Reclamo a Proveedores', 'No Conformidades Internas', 'Control Uso de Químicos', 'Toma Contramuestras']
  },
  yAxis: {
    title: {
      text: 'Porcentaje'
    }
  },
  series: [{
    name: 'Cumplimiento',
    data: [34, 50, 72, 48, 60, 81],
    color: '#e67e22'
  }]
});

// Control de Calidad (Gráfico de Barras 3D)
Highcharts.chart('control-calidad-chart', {
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 70,
      viewDistance: 25
    }
  },
  title: {
    text: 'Control de Calidad'
  },
  xAxis: {
    categories: ['Inspección Materias Primas', 'Etiquetado Materias Primas', 'Envasado Productos Terminados', 'Almacenamiento FEFO FIFO', 'Rotulaciones Materias Primas', 'Rotaciones', 'Contaminación Cruzada', 'Control de Temperatura']
  },
  yAxis: {
    title: {
      text: 'Porcentaje'
    }
  },
  series: [{
    name: 'Cumplimiento',
    data: [39, 87, 86, 47, 42, 45, 22, 58],
    color: '#2980b9'
  }]
});


// Función para actualizar los gráficos
function actualizarGraficos() {
  const { datosHallazgos, datosEvaluaciones } = obtenerDatosTablaDesviaciones();

}

const tablaDesviaciones = document.getElementById('tabla-desviaciones');
const observer = new MutationObserver(actualizarGraficos);
observer.observe(tablaDesviaciones, { childList: true, subtree: true });

actualizarGraficos();




