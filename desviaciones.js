// Definición de Arrays
const prioridades = [
  { valor: 'Leve', clase: 'prioridad-leve', dias: 45 },
  { valor: 'Moderado', clase: 'prioridad-moderada', dias: 30 },
  { valor: 'Crítico', clase: 'prioridad-critica', dias: 15 }
];

const estados = ['Cerrado', 'Abierto'];
const entidades = ['Entidad 1', 'Entidad 2'];
const responsablesDesviacion = ['Responsable 1', 'Responsable 2'];
const auditores = ['Auditor 1', 'Auditor 2'];

const questions = [
  { module: 'infraestructura', question: [
    'separaciones',
    'equipos',
    'servicios',
  ]},
  { module: 'legales', question: [
    'trazabilidad',
    'registros',
    'correctiva',
    'entrenamiento'
  ]},
  { module: 'quimicos', question: [
    'almacenamiento',
    'rotulacion',
    'cantidad'
  ]},
  { module: 'agua', question: 'agua'},
  { module: 'superficies', question: [
    'utensilios',
    'higiene-tablas',
    'desinfeccion-equipos',
    'desengrasado-equipos',
    'desincrustacion-maquinas',
    'limpieza-mesas',
    'higiene-programa',
    'alarma-sanitaria',
    'luminometro'
  ]},
  { module: 'contaminacion', question: [
    'contaminacion-utensilios',
    'ubicacion-equipos'
  ]},
  { module: 'adulterantes', question: [
    'pulverizadores',
    'proteccion-mp'
  ]},
  { module: 'higiene', question: [
    'uniformes',
    'cubrepelo',
    'lavado-manos',
    'manos-heridas',
    'examenes'
  ]},
  { module: 'plagas', question: [
    'barreras-fisicas',
    'programa-plagas'
  ]},{ module: 'instalaciones', question: [
    'lavamanos',
    'servicios-higienicos'
  ]},
  { module: 'recepcion', question: [
    'registro-recepcion',
    'balanza',
    'tiempo-exposicion'
  ]},
  { module: 'almacenamiento', question: [
    'practicas-higienicas',
    'identificacion-areas',
    'receptaculos',
    'fifo-fefo',
    'productos-no-conforme',
    'nivel-piso',
    'separacion-materias',
    'entrega-produccion'
  ]},
  { module: 'pre-elaboraciones', question: [
    'preelaborados',
    'materias-primas',
    'separacion-productos',
    'manitizado'
  ]},
  { module: 'elaboraciones', question: [
    'recepcion-materias',
    'orden-limpieza',
    'productos-transito',
    'respetan-temperaturas',
    'uso-equipos-frio',
    'sistema-extraccion',
    'estantes',
    'especieros',
    'montajes-rapidos',
    'tiempo-elaboracion-consumo'
  ]},
  { module: 'mantencion', question: 'control-tiempo-temperatura'},
  { module: 'transporte', question: [
    'traslado-alimentos',
    'observacion-vehiculo'
  ]},
  { module: 'servicio', question: [
    'mantenimiento-baño-maria',
    'variedad-autoservicio',
    'equipos-suficientes',
    'reposicion-preparaciones',
    'observacion-vajilla'
  ]},
  { module: 'vajilla', question: [
    'desconche',
    'procedimiento-higiene',
    'orden-area'
  ]},
  { module: 'control', question: [
    'termometros-balanzas',
    'monitoreo-controles',
    'acciones-correctivas',
    'registro-contramuestras'
  ]},
  { module: 'proteccion', question: [
    'dosificacion',
    'productos',
    'basureros',
    'retiro-basura',
    'limpieza-area-basura',
    'manejo-aceites',
    'separacion-residuos'
  ]},
  { module: 'documentacion', question: [
    'autorizaciones',
    'libro-inspeccion',
    'informes-microbio',
    'informes-auditoria',
    'programa-charlas',
    'reporte-proveedor'
  ]},
]

const criterio = [ 'no cumple', 'cumple parcialmente', 'cumple', 'cumple totalmente' ];

//obtener preguntas por modulo
function obtenerTodasLasPreguntas() {
  let todasLasPreguntas = [];
  questions.forEach(modulo => {
    if (Array.isArray(modulo.question)) {
      todasLasPreguntas = todasLasPreguntas.concat(modulo.question);
    } else {
      todasLasPreguntas.push(modulo.question);
    }
  });
  return todasLasPreguntas;
}

// cargar datos desde localStorage y agregarlos a la tabla de desviaciones
function cargarDatosDesdeLocalStorage() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';
  const datos = JSON.parse(localStorage.getItem('tablaDatos'));
  if (datos) {
    datos.forEach(dato => agregarFilaConDatos(dato));
  }
}

// agregar fila con datos desde localStorage
function agregarFilaConDatos(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  const prioridadSeleccionada = prioridades.find(p => p.valor === dato.prioridad);
  if (prioridadSeleccionada) {
    fila.className = prioridadSeleccionada.clase;
  }

  fila.appendChild(crearCelda(dato.numeroPC));
  fila.appendChild(crearCeldaConInput(dato.numeroPregunta, crearComboBoxTodasLasPreguntas(dato.numeroPregunta)));
  fila.appendChild(crearCeldaConInput(dato.criterio));
  fila.appendChild(crearCeldaConInput(dato.desviacion));

  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), dato.prioridad);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  const estadoCelda = crearCeldaConSelect(estados, dato.estado);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput(dato.planAccion));
  fila.appendChild(crearCelda(dato.fechaCambioEstado));
  fila.appendChild(crearCelda(dato.fechaRecepcionSolicitud));
  fila.appendChild(crearCelda(dato.fechaSolucionProgramada));
  fila.appendChild(crearCelda(dato.cantidadDias));

  fila.appendChild(crearCeldaConSelect(entidades, dato.entidad));
  fila.appendChild(crearCeldaConSelect(responsablesDesviacion, dato.responsableDesviacion));
  fila.appendChild(crearCeldaConSelect(auditores, dato.auditor));

  fila.appendChild(crearCeldaConInput(dato.contacto));
  fila.appendChild(crearCeldaConInput(dato.correo));
  fila.appendChild(crearCelda(dato.fechaUltimaModificacion));
  fila.appendChild(crearCeldaConInput(dato.foto));

  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    eliminarFila(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  tabla.appendChild(fila);
  actualizarFiltros();
}

// crear una celda con texto
function crearCelda(texto) {
  const celda = document.createElement('td');
  celda.innerText = texto;
  return celda;
}

// crear una celda con un input
function crearCeldaConInput(valor, elemento) {
  const celda = document.createElement('td');
  if (!elemento) {
    elemento = document.createElement('input');
    elemento.type = 'text';
    elemento.className = 'form-control';
    elemento.value = valor;
  }
  celda.appendChild(elemento);
  return celda;
}

// crear una celda con un select
function crearCeldaConSelect(opciones, valorSeleccionado) {
  const celda = document.createElement('td');
  const select = document.createElement('select');
  select.className = 'form-control';
  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    if (opcion === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  celda.appendChild(select);
  return celda;
}

// inicializar los filtros de la tabla
function inicializarFiltros() {
  const selects = document.querySelectorAll('.filter-select');
  selects.forEach(select => {
    select.addEventListener('change', function () {
      filtrarTabla();
    });
  });
  actualizarFiltros();
}

// filtrar la tabla basada en los filtros 
function filtrarTabla() {
  const table = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const rows = table.getElementsByTagName('tr');
  const filters = document.querySelectorAll('.filter-select');
  for (let i = 0; i < rows.length; i++) {
    let showRow = true;
    for (let j = 0; j < filters.length; j++) {
      const cell = rows[i].getElementsByTagName('td')[j];
      const filterValue = filters[j].value;
      if (filterValue && cell.innerText !== filterValue) {
        showRow = false;
        break;
      }
    }
    rows[i].style.display = showRow ? '' : 'none';
  }
}

// agregar una fila a la tabla de desviaciones
function agregarFila() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  fila.appendChild(crearCelda(tabla.rows.length + 1));
  fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasPreguntas('')));
  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCeldaConInput(''));

  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), prioridades[0].valor);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  const estadoCelda = crearCeldaConSelect(estados, estados[0]);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCelda(new Date().toLocaleDateString('es-ES')));
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCelda(''));

  fila.appendChild(crearCeldaConSelect(entidades, entidades[0]));
  fila.appendChild(crearCeldaConSelect(responsablesDesviacion, responsablesDesviacion[0]));
  fila.appendChild(crearCeldaConSelect(auditores, auditores[0]));

  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCeldaConInput(''));

  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    eliminarFila(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  tabla.appendChild(fila);
  actualizarFiltros();
}

// eliminar una fila de la tabla de desviaciones
function eliminarFila(fila) {
  const tabla = fila.closest('tbody');
  fila.remove();
  guardarDatosTabla();
  actualizarFiltros();
  alert('Datos eliminados correctamente.');
}

// crear un combo box (select) con opciones específicas
function crearComboBox(options) {
  let html = '<select class="form-control">';
  options.forEach(option => {
    html += `<option>${option}</option>`;
  });
  html += '</select>';
  return html;
}

// crear un combo box de prioridades con clases de estilo
function crearComboBoxPrioridades() {
  let html = '<select class="form-control">';
  prioridades.forEach(p => {
    html += `<option class="${p.clase}">${p.valor}</option>`;
  });
  html += '</select>';
  return html;
}

//combo box preguntas
function crearComboBoxTodasLasPreguntas(valorSeleccionado) {
  const preguntas = obtenerTodasLasPreguntas();
  const select = document.createElement('select');
  select.className = 'form-control';
  
  preguntas.forEach(pregunta => {
    const option = document.createElement('option');
    option.value = pregunta;
    option.text = pregunta;
    if (pregunta === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  return select;
}


// actualizar la prioridad y calcular fechas relacionadas
function actualizarPrioridad(event) {
  const fila = event.target.closest('tr');
  const prioridadSeleccionada = prioridades.find(p => p.valor === event.target.value);
  fila.className = prioridadSeleccionada.clase;
  const fechaRecepcion = new Date(fila.cells[8].innerText.split('/').reverse().join('-'));
  const fechaSolucion = new Date(fechaRecepcion);
  fechaSolucion.setDate(fechaRecepcion.getDate() + prioridadSeleccionada.dias);
  fila.cells[9].innerText = fechaSolucion.toLocaleDateString('es-ES');
  const diferenciaDias = Math.ceil((fechaSolucion - fechaRecepcion) / (1000 * 60 * 60 * 24));
  fila.cells[10].innerText = diferenciaDias;
  fila.cells[16].innerText = new Date().toLocaleDateString('es-ES');
}

// actualizar el estado y establecer la fecha de cambio de estado
function actualizarEstado(event) {
  const fila = event.target.closest('tr');
  fila.cells[7].innerText = new Date().toLocaleDateString('es-ES');
}

// actualizar los valores de los filtros de la tabla
function actualizarFiltros() {
  const table = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const rows = table.getElementsByTagName('tr');
  const filters = document.querySelectorAll('.filter-select');
  filters.forEach(filter => {
    const column = filter.getAttribute('data-column');
    filter.innerHTML = '<option value="">Todos</option>';
    const values = new Set();
    for (let i = 0; i < rows.length; i++) {
      const cellValue = rows[i].getElementsByTagName('td')[column].innerText;
      if (cellValue) {
        values.add(cellValue);
      }
    }
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.text = value;
      filter.add(option);
    });
  });
}

// guardar datos de la tabla en localStorage
function guardarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');
  const datos = Array.from(filas).map(fila => {
    const celdas = fila.getElementsByTagName('td');
    return {
      numeroPC: celdas[0].innerText,
      numeroPregunta: celdas[1].getElementsByTagName('input')[0].value,
      criterio: celdas[2].getElementsByTagName('input')[0].value,
      desviacion: celdas[3].getElementsByTagName('input')[0].value,
      prioridad: celdas[4].getElementsByTagName('select')[0].value,
      estado: celdas[5].getElementsByTagName('select')[0].value,
      planAccion: celdas[6].getElementsByTagName('input')[0].value,
      fechaCambioEstado: celdas[7].innerText,
      fechaRecepcionSolicitud: celdas[8].innerText,
      fechaSolucionProgramada: celdas[9].innerText,
      cantidadDias: celdas[10].innerText,
      entidad: celdas[11].getElementsByTagName('select')[0].value,
      responsableDesviacion: celdas[12].getElementsByTagName('select')[0].value,
      auditor: celdas[13].getElementsByTagName('select')[0].value,
      contacto: celdas[14].getElementsByTagName('input')[0].value,
      correo: celdas[15].getElementsByTagName('input')[0].value,
      fechaUltimaModificacion: celdas[16].innerText,
      foto: celdas[17].getElementsByTagName('input')[0].value
    };
  });
  localStorage.setItem('tablaDatos', JSON.stringify(datos));
  alert('Lista de Desviaciones actualizada.');
}

// Descargar la tabla como archivo Excel
function descargarTablaExcel() {
  const tabla = document.getElementById('tabla-desviaciones');
  const ws = XLSX.utils.table_to_sheet(tabla);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, 'tabla.xlsx');
}

