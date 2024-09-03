 // Paleta de colores: Cian, Magenta, Amarillo
 const palette = ['#00FFFF', '#FF00FF', '#FFFF00'];

 // Función para obtener el valor de un campo de selección, o 100 si no hay selección
 function getValue(id) {
   const selectElement = document.getElementById(id);
   return selectElement ? parseFloat(selectElement.value) || 100 : 100;
 }

 // Hallazgos Críticos/Acciones Correctivas (Gráfico de Barras Horizontales)
 Highcharts.chart('hallazgos-criticos-chart', {
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
     data: [75, 50, 30], // Ejemplo de datos, luego se cambiará por los reales
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

 // Evaluaciones Críticas (Gráfico de Torta con Leyenda)
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
       { name: 'Sistema de extracción', y: getValue('sistema-extraccion'), color: palette[0] },
       { name: 'Equipos', y: getValue('equipos'), color: palette[1] },
       { name: 'Estantes', y: getValue('estantes'), color: palette[2] },
       { name: 'Uniformes', y: getValue('uniformes'), color: palette[0] },
       { name: 'Cubrepelo', y: getValue('cubrepelo'), color: palette[1] }
     ]
   }]
 });

 // Trazadores (Gráfico de Barras)
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
     text: 'Trazadores'
   },
   xAxis: {
     categories: ['Programa Higiene', 'Lavado Manos', 'Exámenes', 'Descongelación', 'Respetan Temperaturas', 'Tiempo Elaboración-Consumo', 'Control Tiempo-Temperatura', 'Traslado Alimentos', 'Equipos Suficientes', 'Informes Auditoría', 'Programa Charlas']
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
     data: [
       getValue('higiene-programa'),
       getValue('lavado-manos'),
       getValue('examenes'),
       getValue('descongelacion'),
       getValue('respetan-temperaturas'),
       getValue('tiempo-elaboracion-consumo'),
       getValue('control-tiempo-temperatura'),
       getValue('traslado-alimentos'),
       getValue('equipos-suficientes'),
       getValue('informes-auditoria'),
       getValue('programa-charlas')
     ],
     color: palette[0]
   }]
 });
 // Recuperar el promedio general desde localStorage
 const promedioGeneral = parseFloat(localStorage.getItem('promedioGeneral')) || 100; // 100 por defecto si no hay datos

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
     categories: ['Variedad Autoservicio', 'Exámenes Manipuladores', 'Informes Microbiológicos', 'Programa Capacitación', 'Auditoria BPM']
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
     data: [
       getValue('variedad-autoservicio'),
       getValue('examenes'),
       getValue('informes-microbio'),
       getValue('existe-programa'),
       promedioGeneral // Aquí usamos el valor del promedio general obtenido de localStorage
     ],
     color: palette[1]
   }, {
     name: 'Meta',
     data: [95, 95, 100, 100, 100],
     color: palette[2]
   }]
 });


 // Higiene Instalaciones/Alimentos (Barras de tendencia con una línea de tendencia)
 Highcharts.chart('higiene-instalaciones-chart', {
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
     text: 'Higiene Instalaciones/Alimentos'
   },
   xAxis: {
     categories: ['Luminómetro', 'Higiene Tablas', 'Desinfección Equipos', 'Sanitizado']
   },
   yAxis: {
     title: {
       text: 'Porcentaje'
     }
   },
   series: [{
     name: 'Cumplimiento',
     data: [
       getValue('luminometro'),
       getValue('higiene-tablas'),
       getValue('desinfeccion-equipos'),
       getValue('sanitizado')
     ],
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

 // Eficiencia Operacional (Gráfico de Barras)
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
     categories: ['PPT Flujo', 'PPT Cuenta', 'Autorizaciones Sanitarias', 'Mantención Correctiva', 'Almacenamiento Químicos', 'Tiempo Exposición', 'Entrega Producción', 'Reposición Preparaciones']
   },
   yAxis: {
     title: {
       text: 'Porcentaje'
     }
   },
   series: [{
     name: 'Eficiencia',
     data: [
       getValue('ppt-flujo'),
       getValue('ppt-cuenta'),
       getValue('autorizaciones'),
       getValue('correctiva'),
       getValue('almacenamiento'),
       getValue('tiempo-exposicion'),
       getValue('entrega-produccion'),
       getValue('reposicion-preparaciones')
     ],
     color: palette[0]
   }]
 });

 // Satisfacción al Cliente (Gráfico de Torta)
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
   colors: palette,
   plotOptions: {
     pie: {
       innerSize: 100,
       depth: 45
     }
   },
   series: [{
     name: 'Satisfacción',
     data: [
       ['Variedad Autoservicio', getValue('variedad-autoservicio')],
       ['Trazabilidad', getValue('trazabilidad')],
       ['Monitoreo Controles', getValue('monitoreo-controles')],
       ['Vajilla', getValue('vajilla')]
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
     categories: ['Programa Plagas', 'Registros Control', 'Materias Primas', 'Productos No Conformes', 'Cantidad Productos Químicos', 'Registro Contramuestras']
   },
   yAxis: {
     title: {
       text: 'Porcentaje'
     }
   },
   series: [{
     name: 'Cumplimiento',
     data: [
       getValue('programa-plagas'),
       getValue('registros'),
       getValue('materias-recepcion'),
       getValue('productos-no-conforme'),
       getValue('cantidad'),
       getValue('registro-contramuestras')
     ],
     color: palette[2]
   }]
 });

 // Control de Calidad (Gráfico de Barras)
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
     categories: ['Registro Recepción', 'PPT Etiqueta', 'PPT Envasado', 'FIFO/FEFO', 'Materias Recepción', 'Identificación Áreas', 'Contaminación Utensilios', 'Orden Limpieza']
   },
   yAxis: {
     title: {
       text: 'Porcentaje'
     }
   },
   series: [{
     name: 'Cumplimiento',
     data: [
       getValue('registro-recepcion'),
       getValue('ppt-etiqueta'),
       getValue('ppt-envasado'),
       getValue('fifo-fefo'),
       getValue('materias-recepcion'),
       getValue('identificacion-areas'),
       getValue('contaminacion-utensilios'),
       getValue('orden-limpieza')
     ],
     color: palette[0]
   }]
 });

