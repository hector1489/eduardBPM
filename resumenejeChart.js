
// Definición de categorías comunes (debe estar antes de cualquier uso)
let preguntasCriticas = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3'];

const trazadoresCategories = ['cs-registro', 'cs-medidas', 'higiene-programa', 'plagas-autorizacion', 'plagas-desechos', 'recepcion-materias', 'recepcion-especificaciones', 'ppt-flujo', 'ppt-procedimientos', 'ppt-almacenamiento', 'ppt-distribucion', 'ppt-envases', 'ppt-etiquetas', 'existe-programa', 'existe-capacitacion'];
const indicadoresCategories = ['Variedad Autoservicio', 'Exámenes Manipuladores', 'Informes Microbiológicos', 'Programa Capacitación', 'Auditoria BPM'];
const higieneCategories = ['Luminómetro', 'Higiene Tablas', 'Desinfección Equipos', 'Sanitizado'];
const eficienciaCategories = ['PPT Flujo', 'PPT Cuenta', 'Autorizaciones Sanitarias', 'Mantención Correctiva', 'Almacenamiento Químicos', 'Tiempo Exposición', 'Entrega Producción', 'Reposición Preparaciones'];
const calidadCategories = ['Registro Recepción', 'PPT Etiqueta', 'PPT Envasado', 'FIFO/FEFO', 'Materias Recepción', 'Identificación Áreas', 'Contaminación Utensilios', 'Orden Limpieza'];
const seguridadCategories = ['Programa Plagas', 'Registros Control', 'Materias Primas', 'Productos No Conformes', 'Cantidad Productos Químicos', 'Registro Contramuestras'];

// Paleta de colores: Cian, Magenta, Amarillo
const palette = ['#00FFFF', '#FF00FF', '#FFFF00'];

// Función para obtener el valor de un campo de selección, o 100 si no hay selección
function getValue(id) {
  const selectElement = document.getElementById(id);
  return selectElement ? parseFloat(selectElement.value) || 100 : 100;
}

// Recuperar valores desde localStorage
const promedioGeneral = parseFloat(localStorage.getItem('promedioGeneral')) || 100; // 100 por defecto si no hay datos

// Recuperar datos de inputs (puedes cambiar los IDs según corresponda)
const sistemaExtraccion = getValue('sistema-extraccion');
const equipos = getValue('equipos');
const estantes = getValue('estantes');
const uniformes = getValue('uniformes');
const cubrepelo = getValue('cubrepelo');

const variedadAutoservicio = getValue('variedad-autoservicio');
const examenes = getValue('examenes');
const informesMicrobio = getValue('informes-microbio');
const existePrograma = getValue('existe-programa');

const luminometro = getValue('luminometro');
const higieneTablas = getValue('higiene-tablas');
const desinfeccionEquipos = getValue('desinfeccion-equipos');
const sanitizado = getValue('sanitizado');

// Aquí debes mapear cada categoría con el ID correspondiente
const eficienciaDatos = eficienciaCategories.map(id => getValue(id.replace(/ /g, '-').toLowerCase()));
const calidadDatos = calidadCategories.map(id => getValue(id.replace(/ /g, '-').toLowerCase()));
const seguridadDatos = seguridadCategories.map(id => getValue(id.replace(/ /g, '-').toLowerCase()));

// Función para crear gráficos de Highcharts
function createChart(container, options) {
  Highcharts.chart(container, options);
}
// Gráfico Hallazgos Críticos
createChart('hallazgos-criticos-chart', {
  chart: {
    type: 'bar',
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 70,
      viewDistance: 25
    }
  },
  title: { text: 'Hallazgos Críticos' },
  xAxis: { categories: preguntasCriticas },
  yAxis: {
    title: { text: 'Porcentaje de Desviación' }
  },
  series: [{
    name: 'Desviación',
    data: [75, 50, 30],
    color: palette[0]
  }, {
    name: 'Criticidad',
    data: [90, 85, 80],
    color: palette[1]
  }, {
    name: 'Recomendaciones',
    data: [95, 92, 88],
    color: palette[2]
  }]
});

// Gráfico Evaluaciones Críticas
createChart('evaluaciones-criticas-chart', {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: { text: 'Evaluaciones Críticas' },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [{
    name: 'Evaluaciones',
    data: [
      { name: 'Sistema de extracción', y: sistemaExtraccion, color: palette[0] },
      { name: 'Equipos', y: equipos, color: palette[1] },
      { name: 'Estantes', y: estantes, color: palette[2] },
      { name: 'Uniformes', y: uniformes, color: palette[0] },
      { name: 'Cubrepelo', y: cubrepelo, color: palette[1] }
    ]
  }]
});

// Gráfico Trazadores
createChart('trazadores-chart', {
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
  title: { text: 'Trazadores' },
  xAxis: { categories: trazadoresCategories },
  yAxis: {
    title: { text: 'Cumplimiento (%)' },
    plotLines: [{
      value: 90,
      color: 'red',
      dashStyle: 'shortdash',
      width: 2,
      label: { text: 'Meta 90%' }
    }]
  },
  series: [{
    name: 'Cumplimiento',
    data: trazadoresCategories.map((_, index) => getValue(`higiene-programa`)),
    color: palette[0]
  }]
});

// Gráfico Indicadores Claves de Gestión
createChart('indicadores-gestion-chart', {
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
  title: { text: 'Indicadores Claves de Gestión' },
  xAxis: { categories: indicadoresCategories },
  yAxis: { title: { text: 'Cumplimiento (%)' } },
  plotOptions: {
    column: {
      depth: 25,
      stacking: 'normal'
    }
  },
  series: [{
    name: 'Cumplimiento Real',
    data: [
      variedadAutoservicio,
      examenes,
      informesMicrobio,
      existePrograma,
      promedioGeneral
    ],
    color: palette[1]
  }, {
    name: 'Meta',
    data: [95, 95, 100, 100, 100],
    color: palette[2]
  }]
});

// Gráfico Higiene Instalaciones/Alimentos
createChart('higiene-instalaciones-chart', {
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
  title: { text: 'Higiene Instalaciones/Alimentos' },
  xAxis: { categories: higieneCategories },
  yAxis: { title: { text: 'Porcentaje' } },
  series: [{
    name: 'Cumplimiento',
    data: [luminometro, higieneTablas, desinfeccionEquipos, sanitizado],
    color: palette[0]
  }, {
    type: 'spline',
    name: 'Tendencia',
    data: [80, 70, 75, 85],
    marker: {
      lineWidth: 2,
      lineColor: palette[2],
      fillColor: 'white'
    }
  }]
});

// Gráfico Eficiencia Operacional
createChart('eficiencia-operacional-chart', {
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
  title: { text: 'Eficiencia Operacional' },
  xAxis: { categories: eficienciaCategories },
  yAxis: { title: { text: 'Porcentaje' } },
  series: [{
    name: 'Eficiencia',
    data: eficienciaDatos,
    color: palette[0]
  }]
});

// Gráfico Satisfacción al Cliente
createChart('satisfaccion-cliente-chart', {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45,
      depth: 45
    }
  },
  title: { text: 'Satisfacción al Cliente' },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [{
    name: 'Satisfacción',
    data: [
      { name: 'Variedad Autoservicio', y: getValue('variedad-autoservicio'), color: palette[0] },
      { name: 'Trazabilidad', y: getValue('trazabilidad'), color: palette[1] },
      { name: 'Monitoreo Controles', y: getValue('monitoreo-controles'), color: palette[2] },
      { name: 'Vajilla', y: getValue('vajilla'), color: palette[0] }
    ]
  }]
});


// Gráfico Seguridad Alimentaria
createChart('seguridad-alimentaria-chart', {
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
  title: { text: 'Seguridad Alimentaria' },
  xAxis: { categories: seguridadCategories },
  yAxis: { title: { text: 'Porcentaje' } },
  series: [{
    name: 'Seguridad',
    data: seguridadDatos,
    color: palette[2]
  }]
});

// Gráfico Control de Calidad
createChart('control-calidad-chart', {
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
  title: { text: 'Control de Calidad' },
  xAxis: {
    categories: calidadCategories
  },
  yAxis: {
    title: { text: 'Porcentaje' }
  },
  series: [{
    name: 'Cumplimiento',
    data: calidadDatos,
    color: palette[0]
  }]
});


//Actualizaciones Graficos

// Función para limpiar las cadenas y hacer la comparación más flexible
function limpiarTexto(texto) {
  return texto.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
}

/// Llamada a la función dentro de loadTableDetailsDoc
function loadTableDetailsDoc() {
  const tableId = 'tabla-details';
  const data = JSON.parse(localStorage.getItem(`tablaDatos-${tableId}`));

  if (!data) {
    console.log('No se encontraron datos en localStorage para la tabla especificada.');
    return;
  }

  const labels = [];
  const promedios = [];
  let trazadores = [];
  let observacionesConValores = [];

  data.forEach(rowData => {
    // Identificamos las filas que contienen "PROMEDIO"
    if (rowData.columna1.startsWith('PROMEDIO')) {
      labels.push(rowData.columna1.replace('PROMEDIO ', ''));
      promedios.push(parseFloat(rowData.columna2.replace('%', '')));
    }

    // Agregamos observaciones a la lista
    if (rowData.idColumna4 && rowData.idColumna4.startsWith('observacion-')) {
      observacionesConValores.push({
        valor3: rowData.columna3,
        valor4: rowData.columna4
      });
    }


    // Verificamos si el prefijo observacion- está en idColumna4 o idColumna5
    if (rowData.idColumna4 && rowData.idColumna4.startsWith('observacion-')) {
      trazadores.push({
        valor1: rowData.idColumna4.replace('observacion-', ''),
        valor2: parseFloat(rowData.columna3.replace('%', ''))
      });
    } else if (rowData.idColumna5 && rowData.idColumna5.startsWith('observacion-')) {
      trazadores.push({
        valor1: rowData.idColumna5.replace('observacion-', ''),
        valor2: parseFloat(rowData.columna3.replace('%', ''))
      });
    }


  });

  // Actualizamos las categorías de trazadores basadas en las observaciones
  actualizarGraficotrazadoresCategories(trazadores);
  actualizarGraficoEvaluacionesCriticas(trazadores);
  actualizarGraficoHigieneInstalaciones(trazadores);
  actualizarGraficoEficienciaOperacional(trazadores);
  actualizarGraficoSatisfaccionCliente(trazadores);
  actualizarGraficoControlCalidad(trazadores);
  actualizarGraficoHallazgosCriticos(trazadores);
  actualizarGraficoIndicadoresClavesGestión(trazadores);
};

loadTableDetailsDoc();

//actualizar grafico de hallazgos criticos
function actualizarGraficoHallazgosCriticos(trazadores) {
  let data = [
    { name: 'Pregunta 1', y: 0 },
    { name: 'Pregunta 2', y: 0 },
    { name: 'Pregunta 3', y: 0 }
  ];

  trazadores.forEach(t => {

    data.forEach(item => {
      if (t.valor1 === item.name) {
        item.y = t.valor2;
      }
    });
  });

  data = data.map(item => ({
    ...item,
    y: item.y === 0 ? 5 : item.y
  }));
  let dataY3 = data.map(item => ({
    ...item,
    y: item.y !== 0 ? [item.y, item.y, item.y] : item.y
  }));

  // Gráfico Hallazgos Críticos
  createChart('hallazgos-criticos-chart', {
    chart: {
      type: 'bar',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
        viewDistance: 25
      }
    },
    title: { text: 'Hallazgos Críticos' },
    xAxis: { categories: preguntasCriticas },
    yAxis: {
      title: { text: 'Porcentaje de Desviación' }
    },
    series: [{
      name: 'Desviación',
      data: dataY3.map(item => item.y[0]),
      color: palette[0]
    }, {
      name: 'Criticidad',
      data: dataY3.map(item => item.y[1]),
      color: palette[1]
    }, {
      name: 'Recomendaciones',
      data: dataY3.map(item => item.y[2]),
      color: palette[2]
    }]
  });
};

// Actualizar el gráfico de trazadores basado en los valores actualizados
function actualizarGraficotrazadoresCategories(trazadores) {

  let data = [
    { name: 'cs-registro', y: 0 },
    { name: 'cs-medidas', y: 0 },
    { name: 'plagas-autorizacion', y: 0 },
    { name: 'plagas-desechos', y: 0 },
    { name: 'recepcion-materias', y: 0 },
    { name: 'recepcion-especificaciones', y: 0 },
    { name: 'ppt-flujo', y: 0 },
    { name: 'ppt-procedimientos', y: 0 },
    { name: 'ppt-almacenamiento', y: 0 },
    { name: 'ppt-distribucion', y: 0 },
    { name: 'ppt-envases', y: 0 },
    { name: 'ppt-etiquetas', y: 0 },
    { name: 'existe-programa', y: 0 },
    { name: 'existe-capacitacion', y: 0 }
  ];

  trazadores.forEach(t => {

    data.forEach(item => {
      if (t.valor1 === item.name) {
        item.y = t.valor2;
      }
    });
  });

  data = data.map(item => ({
    ...item,
    y: item.y === 0 ? 5 : item.y
  }));

  // Crear el gráfico de trazadores
  createChart('trazadores-chart', {
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
    title: { text: 'Trazadores' },
    xAxis: { categories: data.map(item => item.name) },
    yAxis: {
      title: { text: 'Cumplimiento (%)' },
      plotLines: [{
        value: 90,
        color: 'red',
        dashStyle: 'shortdash',
        width: 2,
        label: { text: 'Meta 90%' }
      }]
    },
    series: [{
      name: 'Cumplimiento',
      data: data.map(item => item.y),
      color: palette[0]
    }, {
      type: 'spline',
      name: 'Tendencia',
      data: [80, 70, 75, 85],
      marker: {
        lineWidth: 2,
        lineColor: palette[2],
        fillColor: 'white'
      }
    }]
  });
}

// Actualizar el gráfico de evaluaciones críticas basado en trazadores
function actualizarGraficoEvaluacionesCriticas(trazadores) {
  // Definimos los datos iniciales
  let data = [
    { name: 'Sistema de extracción', y: sistemaExtraccion, color: palette[0] },
    { name: 'Equipos', y: equipos, color: palette[1] },
    { name: 'Estantes', y: estantes, color: palette[2] },
    { name: 'Uniformes', y: uniformes, color: palette[0] },
    { name: 'Cubrepelo', y: cubrepelo, color: palette[1] }
  ];

  // Iteramos sobre trazadores para actualizar los datos
  trazadores.forEach(t => {
    data.forEach(item => {
      if (limpiarTexto(t.valor1) === limpiarTexto(item.name)) {
        item.y = t.valor2;
      }
    });
  });

  // Actualizamos el gráfico de trazadores
  Highcharts.chart('evaluaciones-criticas-chart', {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: { text: 'Evaluaciones Críticas' },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    series: [{
      name: 'Evaluaciones',
      data: data
    }]
  });
}

//Actualzar Indicadores Claves de Gestión
function actualizarGraficoIndicadoresClavesGestión(trazadores) {
  let data = [
    { name: 'variedad-autoservicio', y: 0 },
    { name: 'examenes', y: 0 },
    { name: 'informes-microbio', y: 0 },
    { name: 'existe-capacitacion', y: 0 },
    { name: 'informes-auditoria', y: 0 }
  ];

  trazadores.forEach(t => {

    data.forEach(item => {
      if (t.valor1 === item.name) {
        item.y = t.valor2;
      }
    });
  });

  data = data.map(item => ({
    ...item,
    y: item.y === 0 ? 5 : item.y
  }));
  

  // Gráfico Indicadores Claves de Gestión
  createChart('indicadores-gestion-chart', {
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
    title: { text: 'Indicadores Claves de Gestión' },
    xAxis: { categories: indicadoresCategories },
    yAxis: { title: { text: 'Cumplimiento (%)' } },
    plotOptions: {
      column: {
        depth: 25,
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Cumplimiento Real',
      data:  data.map(item => item.y),
      color: palette[1]
    }, {
      name: 'Meta',
      data: [95, 95, 100, 100, 100],
      color: palette[2]
    }]
  });
};

// Actualizar el gráfico de Higiene Instalaciones
function actualizarGraficoHigieneInstalaciones(trazadores) {
  // Definimos los datos iniciales
  let data = [
    { name: 'luminometro', y: 0 },
    { name: 'higiene-tablas', y: 0 },
    { name: 'desinfeccion-equipos', y: 0 },
    { name: 'desengrasado-equipos', y: 0 }
  ];

  // Iteramos sobre trazadores para actualizar los datos
  trazadores.forEach(t => {
    data.forEach(item => {
      if (limpiarTexto(t.valor1) === limpiarTexto(item.name)) {
        item.y = t.valor2;
      }
    });
  });

  // Crear el gráfico Higiene Instalaciones/Alimentos
  createChart('higiene-instalaciones-chart', {
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
    title: { text: 'Higiene Instalaciones/Alimentos' },
    xAxis: { categories: ['Luminómetro', 'Higiene Tablas', 'Desinfección Equipos', 'Sanitizado'] },
    yAxis: { title: { text: 'Porcentaje' } },
    series: [{
      name: 'Cumplimiento',
      data: data.map(item => item.y),
      color: palette[0]
    }, {
      type: 'spline',
      name: 'Tendencia',
      data: [80, 70, 75, 85],
      marker: {
        lineWidth: 2,
        lineColor: palette[2],
        fillColor: 'white'
      }
    }]
  });

}


// Actualizar el gráfico Eficiencia Operacional
function actualizarGraficoEficienciaOperacional(trazadores) {
  let data = [
    { name: 'ppt-flujo', y: 0 },
    { name: 'ppt-cuenta', y: 0 },
    { name: 'autorizaciones', y: 0 },
    { name: 'reposicion-preparaciones', y: 0 },
    { name: 'almacenamiento', y: 0 },
    { name: 'tiempo-exposicion', y: 0 },
    { name: 'entrega-produccion', y: 0 },
    { name: 'reposicion-preparaciones', y: 0 }
  ];

  // Iteramos sobre trazadores para actualizar los datos
  trazadores.forEach(t => {
    data.forEach(item => {
      if (limpiarTexto(t.valor1) === limpiarTexto(item.name)) {
        item.y = t.valor2;
      }
    });
  });

  data = data.map(item => ({
    ...item,
    y: item.y === 0 ? 5 : item.y
  }));

  // Gráfico Eficiencia Operacional
  createChart('eficiencia-operacional-chart', {
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
    title: { text: 'Eficiencia Operacional' },
    xAxis: { categories: eficienciaCategories },
    yAxis: { title: { text: 'Porcentaje' } },
    series: [{
      name: 'Eficiencia',
      data: data.map(item => item.y),
      color: palette[0]
    }]
  });

}


// Actualizar el gráfico de evaluaciones críticas basado en trazadores
function actualizarGraficoSatisfaccionCliente(trazadores) {
  // Definimos los datos iniciales
  let data = [
    { name: 'variedad-autoservicio', y: getValue('variedad-autoservicio'), color: palette[0] },
    { name: 'trazabilidad', y: getValue('trazabilidad'), color: palette[1] },
    { name: 'monitoreo-controles', y: getValue('monitoreo-controles'), color: palette[2] },
    { name: 'vajilla', y: getValue('vajilla'), color: palette[0] }
  ];

  // Iteramos sobre trazadores para actualizar los datos
  trazadores.forEach(t => {
    data.forEach(item => {
      if (limpiarTexto(t.valor1) === limpiarTexto(item.name)) {
        item.y = t.valor2;
      }
    });
  });

  data = data.map(item => ({
    ...item,
    y: item.y === 0 ? 5 : item.y
  }));

  // Actualizamos el gráfico de trazadores
  Highcharts.chart('evaluaciones-criticas-chart', {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: { text: 'Evaluaciones Críticas' },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    series: [{
      name: 'Evaluaciones',
      data: data
    }]
  });



  // Gráfico Satisfacción al Cliente
  createChart('satisfaccion-cliente-chart', {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        depth: 45
      }
    },
    title: { text: 'Satisfacción al Cliente' },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    series: [{
      name: 'Satisfacción',
      data: data,
    }]
  });

}


function actualizarGraficoSatisfaccionCliente(trazadores) {
  // Definimos los datos iniciales
  let data = [
    { name: 'Programa Plagas', y: 0 },
    { name: 'Registros Control', y: 0 },
    { name: 'Materias Primas', y: 0 },
    { name: 'Productos No Conformes', y: 0 },
    { name: 'Cantidad Productos Químicos', y: 0 },
    { name: 'Registro Contramuestras', y: 0 }
  ];


  // Iteramos sobre trazadores para actualizar los datos
  trazadores.forEach(t => {

    data.forEach(item => {
      if (limpiarTexto(t.valor1) === limpiarTexto(item.name)) {
        item.y = t.valor2;
      }
    });
  });

  data = data.map(item => ({
    ...item,
    y: item.y === 0 ? 5 : item.y
  }));

  // Gráfico Seguridad Alimentaria
  createChart('seguridad-alimentaria-chart', {
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
    title: { text: 'Seguridad Alimentaria' },
    xAxis: { categories: seguridadCategories },
    yAxis: { title: { text: 'Porcentaje' } },
    series: [{
      name: 'Seguridad',
      data: data.map(item => item.y),
      color: palette[2]
    }]
  });

}


function actualizarGraficoControlCalidad(trazadores) {
  // Definimos los datos iniciales
  let data = [
    { name: 'registro-recepcion', y: 0 },
    { name: 'ppt-etiqueta', y: 0 },
    { name: 'ppt-envasado', y: 0 },
    { name: 'fifo-fefo', y: 0 },
    { name: 'materias-recepcion', y: 0 },
    { name: 'identificacion-areas', y: 0 },
    { name: 'contaminacion-utensilios', y: 0 },
    { name: 'orden-limpieza', y: 0 }
  ];

  // Iteramos sobre trazadores para actualizar los datos
  trazadores.forEach(t => {
    data.forEach(item => {
      if (limpiarTexto(t.valor1) === limpiarTexto(item.name)) {
        item.y = t.valor2;
      }
    });
  });

  data = data.map(item => ({
    ...item,
    y: item.y === 0 ? 5 : item.y
  }));

  // Gráfico Control de Calidad
  createChart('control-calidad-chart', {
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
    title: { text: 'Control de Calidad' },
    xAxis: {
      categories: calidadCategories
    },
    yAxis: {
      title: { text: 'Porcentaje' }
    },
    series: [{
      name: 'Cumplimiento',
      data: data.map(item => item.y),
      color: palette[0]
    }]
  });
};