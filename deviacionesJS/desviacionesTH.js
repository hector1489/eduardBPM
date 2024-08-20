document.addEventListener('DOMContentLoaded', () => {
  inicializarFiltros();
  obtenerTodasLasAction();
});

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
const criterio = ['No Cumple', 'Parcialmente', 'Cumple', 'Cumple Totalmente'];

const desviaciones = [
  '1-Gerente De Contrato',
  '2-Administrador',
  '3-Supervisor De Mantencion',
  '4-Supervisor De Casino',
  '5-Spervisor De Aseo',
  '6-Coordinador De Calidad',
  '7-Asesor SSO',
  '8-Asesor Medio Ambiente',
  '9-Jefe RH',
  '10-Bodeguero',
  '11-Chef'
];

const questions = [
  {
    module: 'infraestructura', question: [
      'Separaciones',
      'Equipos',
      'Servicios',
    ]
  },
  {
    module: 'legales', question: [
      'Trazabilidad',
      'Registros',
      'Correctiva',
      'Entrenamiento'
    ]
  },
  {
    module: 'quimicos', question: [
      'Almacenamiento',
      'Rotulacion',
      'Cantidad'
    ]
  },
  { module: 'Agua', question: 'Agua' },
  {
    module: 'superficies', question: [
      'Utensilios',
      'Higiene-tablas',
      'Desinfeccion-equipos',
      'Desengrasado-equipos',
      'Desincrustacion-maquinas',
      'Limpieza-mesas',
      'Higiene-programa',
      'Alarma-Sanitaria',
      'cs-registro',
      'cs-medidas',
      'Luminometro'
    ]
  },
  {
    module: 'contaminacion', question: [
      'Contaminacion-Utensilios',
      'Ubicacion-Equipos'
    ]
  },
  {
    module: 'adulterantes', question: [
      'Pulverizadores',
      'Proteccion-MP',
      'producto-mp',
    ]
  },
  {
    module: 'higiene', question: [
      'Uniformes',
      'Cubrepelo',
      'Lavado-Manos',
      'Manos-Heridas',
      'Examenes',
      'csh-programa'
    ]
  },
  {
    module: 'plagas', question: [
      'Barreras-Fisicas',
      'Programa-Plagas',
      'cp-programa',
      'cp-desechos'
    ]
  }, {
    module: 'instalaciones', question: [
      'Lavamanos',
      'Servicios-Higienicos'
    ]
  },
  {
    module: 'recepcion', question: [
      'Registro-Recepcion',
      'Balanza',
      'Tiempo-Exposicion',
      'materias-recepcion',
      'prima-recepcion'
    ]
  },
  {
    module: 'almacenamiento', question: [
      'Practicas-Higienicas',
      'Identificacion-Areas',
      'Receptaculos',
      'Fifo-Fefo',
      'Productos-No-Conforme',
      'Nivel-Piso',
      'Separacion-Materias',
      'Entrega-Produccion'
    ]
  },
  {
    module: 'pre-elaboraciones', question: [
      'Descongelacion',
      'Preelaborados',
      'Materias-Primas',
      'Separacion-Productos',
      'Manitizado'
    ]
  },
  {
    module: 'elaboraciones', question: [
      'Recepcion-Materias',
      'Orden-Limpieza',
      'Productos-Transito',
      'Pespetan-Temperaturas',
      'Uso-Equipos-Frio',
      'Sistema-Extraccion',
      'Estantes',
      'Especieros',
      'Montajes-Rapidos',
      'Tiempo-Elaboracion-Consumo'
    ]
  },
  { module: 'mantencion', question: 'control-tiempo-temperatura' },
  {
    module: 'transporte', question: [
      'Traslado-Alimentos',
      'Observacion-Vehiculo'
    ]
  },
  {
    module: 'servicio', question: [
      'Mantenimiento-Baño-Maria',
      'Variedad-Autoservicio',
      'Equipos-Suficientes',
      'Reposicion-Preparaciones',
      'Observacion-Vajilla'
    ]
  },
  {
    module: 'vajilla', question: [
      'Desconche',
      'Procedimiento-Higiene',
      'Orden-Area'
    ]
  },
  {
    module: 'control', question: [
      'Termometros-Balanzas',
      'Monitoreo-Controles',
      'Acciones-Correctivas',
      'Registro-Contramuestras'
    ]
  },
  {
    module: 'proteccion', question: [
      'Dosificacion',
      'Productos',
      'Basureros',
      'Retiro-Basura',
      'Limpieza-Area-Basura',
      'Manejo-Aceites',
      'Separacion-Residuos'
    ]
  },
  {
    module: 'poe-ppt', question: [
      'ppt-flujo',
      'ppt-cuenta',
      'ppt-almacenamiento',
      'ppt-distribucion',
      'ppt-envasado',
      'ppt-etiqueta'
    ]
  },
  {
    module: 'documentacion', question: [
      'Autorizaciones',
      'Libro-Inspeccion',
      'Informes-Microbio',
      'Informes-Auditoria',
      'Programa-Charlas',
      'Reporte-Proveedor',
      'Existe-programa',
      'Existe-capacitacion',
    ]
  },
];


// Variables global para almacenar los datos obtenidos desde la API
let accionesCorrectivas = [];

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
};

// Función para obtener datos desde la API
async function obtenerTodasLasAccionesDesdeAPI() {
  try {
    const response = await fetch('https://bpm-backend.onrender.com/accion-correctivas');
    if (!response.ok) {
      throw new Error('Error al obtener datos de la API');
    }
    const data = await response.json();
    accionesCorrectivas = data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Llamar a las funciones para obtener los datos
obtenerTodasLasAccionesDesdeAPI();

// Obtener todas las acciones de todas las preguntas
function obtenerTodasLasAction() {
  return accionesCorrectivas.flatMap(q => q.action);
}

// Obtener acciones para una pregunta seleccionada
function obtenerAccionesPorPregunta(preguntaSeleccionada) {
  const normalizedPregunta = preguntaSeleccionada.trim().toLowerCase();
  const question = accionesCorrectivas.find(q => q.question.trim().toLowerCase() === normalizedPregunta);
  
  return question ? question.action : [];
}


// Crea una celda con contenido
function crearCeldaTH(contenido) {
  const celda = document.createElement('th');
  celda.innerHTML = contenido;
  return celda;
}

// Crea una celda con un input
function crearCeldaConInputTH(valor, elemento) {
  const celda = document.createElement('th');
  if (!elemento) {
    elemento = document.createElement('input');
    elemento.type = 'text';
    elemento.className = 'form-control';
    elemento.value = valor;
  }
  celda.appendChild(elemento);
  return celda;
}

// Crea una celda con un inputNumero
function crearCeldaConSelectNumeroTH() {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';

  for (let i = 1; i <= 1000; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    select.appendChild(option);
  }

  select.addEventListener('change', function () {
    filtrarPorNumero(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Crea un combobox (select) con todas las acciones sin restricciones
function crearComboBoxTodasLasActionTH(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';
  select.id = 'select-actions';
  const optionDefault = document.createElement('option');
  optionDefault.value = '';
  optionDefault.text = 'Todas las Acciones';
  select.appendChild(optionDefault);
  const todasLasAcciones = accionesCorrectivas.reduce((acciones, item) => {
    return acciones.concat(item.action);
  }, []);

  // Eliminar duplicados
  const accionesUnicas = [...new Set(todasLasAcciones)];
  accionesUnicas.forEach(action => {
    const option = document.createElement('option');
    option.value = action;
    option.text = action;
    if (action === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  select.addEventListener('change', (event) => {
    filtrarPorAccion(event.target.value);
  });
  return select;
}

// Crea un combobox (select) con todas las preguntas sin restricciones
function crearComboBoxTodasLasPreguntasTH(valorSeleccionado) {
  const preguntas = obtenerTodasLasPreguntas();
  const select = document.createElement('select');
  select.className = 'form-control';
  const optionDefault = document.createElement('option');
  optionDefault.value = '';
  optionDefault.text = 'Todas las Preguntas';
  select.appendChild(optionDefault);
  preguntas.forEach(pregunta => {
    const option = document.createElement('option');
    option.value = pregunta;
    option.text = pregunta;
    if (pregunta === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  select.addEventListener('change', (event) => {
    filtrarPorPregunta(event.target.value);
  });
  return select;
}

// combo box de criterios
function crearComboBoxCriteriosTH(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';
  criterio.forEach(criterio => {
    const option = document.createElement('option');
    option.value = criterio;
    option.text = criterio;
    if (criterio === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  select.addEventListener('change', (event) => {
    filtrarPorCriterio(event.target.value);
  });
  return select;
}

// Crea un combobox (select) de desviaciones sin restricciones
function crearComboBoxDesviacionesTH(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';

  select.addEventListener('change', (event) => {
    filtrarPorDesviacion(event.target.value);
  });

  desviaciones.forEach(desviacion => {
    const option = document.createElement('option');
    option.value = desviacion;
    option.text = desviacion;
    if (desviacion === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  return select;
}

// Crea un input de prioridad
function crearCeldaConSelectPrioridadTH() {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';
  const prioridades = ['Leve', 'Moderado', 'Crítico'];
  prioridades.forEach(prioridad => {
    const option = document.createElement('option');
    option.value = prioridad;
    option.text = prioridad;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorPrioridad(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Crea un input de Estado
function crearCeldaConSelectEstadoTH() {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';
  // Agregar opciones para Estado
  const estados = ['Abierto', 'Cerrado'];
  estados.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado;
    option.text = estado;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorEstado(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Crea un input de fecha en la cabecera de la tabla
function crearCeldaConInputFechaTH(valor) {
  const celda = document.createElement('th');
  const inputFecha = document.createElement('input');
  inputFecha.type = 'date';
  inputFecha.className = 'form-control';
  inputFecha.value = valor;

  inputFecha.addEventListener('change', function () {
    filtrarPorFecha(inputFecha.value);
  });
  celda.appendChild(inputFecha);
  return celda;
}

// Crea un combobox (select) de entidades evaluadas
function crearCeldaConSelectEntidadTH(opciones) {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';
  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorEntidad(select.value);
  });
  celda.appendChild(select);
  return celda;
}

// Crea un combobox (select) de Responsable
function crearCeldaConSelectResponsableTH(opciones) {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';
  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorResponsable(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Crea un combobox (select) de Auditor
function crearCeldaConSelectAuditorTH(opciones) {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';
  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorAuditor(select.value);
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

// Filtrar por numeroInput
function filtrarPorNumero(numeroSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const numeroCelda = fila.getElementsByTagName('td')[0].innerText;
    if (numeroSeleccionado === '' || numeroCelda === numeroSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Filtrar por acción
function filtrarPorAccion(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
  filas.forEach(fila => {
    const celdaAccion = fila.cells[2];
    const valorCelda = celdaAccion ? celdaAccion.textContent.trim() : '';
    if (valorSeleccionado === '' || valorCelda.includes(valorSeleccionado)) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// Filtrar por pregunta 
function filtrarPorPregunta(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
  filas.forEach(fila => {
    const celdaPregunta = fila.cells[1];
    const valorCelda = celdaPregunta ? celdaPregunta.textContent.trim() : '';
    if (valorSeleccionado === '' || valorCelda === valorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// Filtrar por criterio
function filtrarPorCriterio(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
  filas.forEach(fila => {
    const celdaCriterio = fila.cells[2];
    const valorCelda = celdaCriterio ? celdaCriterio.textContent.trim() : '';
    if (valorSeleccionado === '' || valorCelda === valorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// Filtrar por desviacion
function filtrarPorDesviacion(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

  filas.forEach(fila => {
    const celdaDesviacion = fila.cells[3];
    const valorCelda = celdaDesviacion.textContent.trim();

    if (valorSeleccionado === '' || valorCelda === valorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// Filtrar por prioridad
function filtrarPorPrioridad(prioridadSeleccionada) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const prioridadCelda = fila.getElementsByTagName('td')[4].innerText;
    if (prioridadSeleccionada === '' || prioridadCelda === prioridadSeleccionada) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Filtrar por estado
function filtrarPorEstado(estadoSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const estadoCelda = fila.getElementsByTagName('td')[6].innerText;
    if (estadoSeleccionado === '' || estadoCelda === estadoSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Filtrar filas por fecha
function filtrarPorFecha(fechaSeleccionada) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const fechaCelda = fila.getElementsByTagName('td')[9].innerText;
    const fechaCeldaDate = new Date(fechaCelda);
    const fechaFiltroDate = new Date(fechaSeleccionada);
    if (fechaCeldaDate.getTime() === fechaFiltroDate.getTime()) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Filtrar filas por entidad evaluada
function filtrarPorEntidad(entidadSeleccionada) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const entidadCelda = fila.getElementsByTagName('td')[10].innerText;
    if (entidadCelda === entidadSeleccionada) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Filtrar filas por responsable
function filtrarPorResponsable(responsableSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const responsableCelda = fila.getElementsByTagName('td')[11].innerText;
    if (responsableCelda === responsableSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Filtrar filas por Auditor
function filtrarPorAuditor(auditorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const auditorCelda = fila.getElementsByTagName('td')[12].innerText;
    if (auditorCelda === auditorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Filtrar fuera de plazo 
function mostrarFilasFueraDePlazo() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');
  const fechaActual = new Date();

  Array.from(filas).forEach(fila => {
    const fechaTexto = fila.cells[9]?.innerText || '';
    let fueraDePlazo = false;

    if (fechaTexto) {
      const [dia, mes, anio] = fechaTexto.split('/').map(Number);
      const fechaCelda = new Date(anio, mes - 1, dia);
      fueraDePlazo = fechaCelda < fechaActual;
    }

  
    fila.style.display = fueraDePlazo ? '' : 'none';
  });
}



// Función para agregar filtros a la cabecera de la tabla
function agregarFiltrosHead() {
  const tabla = document.getElementById('tabla-desviaciones');
  const thead = tabla.getElementsByTagName('thead')[0];
  const filaFiltro = document.getElementById('tr-filter');

  // Limpia el contenido previo de la fila de filtros
  filaFiltro.innerHTML = '';

  // Agrega celdas con filtros a la fila
  filaFiltro.appendChild(crearCeldaConSelectNumeroTH(''));
  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxTodasLasPreguntasTH()));
  filaFiltro.appendChild(crearCeldaConInputTH(''));
  filaFiltro.appendChild(crearCeldaConInputTH(''));
  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxDesviacionesTH()));
  filaFiltro.appendChild(crearCeldaConInputTH(''));
  filaFiltro.appendChild(crearCeldaConSelectPrioridadTH());
  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxTodasLasActionTH('')));
  filaFiltro.appendChild(crearCeldaConInputFechaTH(''));

  // Aquí agregamos el botón en la cabecera de "Fecha de Solución Programada"
  const celdaConBotonFiltro = crearCeldaTH('');
  const botonFiltro = document.createElement('button');
  botonFiltro.textContent = 'Filtrar Fuera de Plazo';
  botonFiltro.className = 'btn-plazo';
  botonFiltro.onclick = function() {
    mostrarFilasFueraDePlazo();
  };
  celdaConBotonFiltro.appendChild(botonFiltro);
  filaFiltro.appendChild(celdaConBotonFiltro);
  
  filaFiltro.appendChild(crearCeldaTH(''));
  filaFiltro.appendChild(crearCeldaConInputFechaTH(''));
  filaFiltro.appendChild(crearCeldaTH(''));
  filaFiltro.appendChild(crearCeldaTH(''));
  filaFiltro.appendChild(crearCeldaTH(''));
  filaFiltro.appendChild(crearCeldaConSelectAuditorTH(auditores, auditores[0]));
  filaFiltro.appendChild(crearCeldaTH(''));
  filaFiltro.appendChild(crearCeldaConInputFechaTH(''));
  filaFiltro.appendChild(crearCeldaTH(''));

  // Agrega la fila de filtros a la cabecera de la tabla
  thead.appendChild(filaFiltro);
}

// Llamada a la función para agregar los filtros a la cabecera
agregarFiltrosHead();

//Buttons
function guardarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');

  // Obtener datos del usuario desde localStorage
  const usuarioId = localStorage.getItem('usuario_id');
  const rol = localStorage.getItem('rol');
  
  const datos = Array.from(filas).map(fila => {
    const celdas = fila.getElementsByTagName('td');
    return {
      usuarioId: usuarioId || '',
      rol: rol || '', 
      numeroRequerimiento: celdas[0]?.innerText || '',
      preguntasAuditadas: celdas[1]?.querySelector('select')?.value || celdas[1]?.innerText || '',
      desviacionOCriterio: celdas[2]?.querySelector('input')?.value || celdas[2]?.innerText || '',
      tipoDeAccion: celdas[3]?.querySelector('input')?.value || '',
      responsableProblema: celdas[4]?.querySelector('select')?.value || '',
      local: celdas[5]?.querySelector('input')?.value || '',
      criticidad: celdas[6]?.querySelector('select')?.value || '',
      accionesCorrectivas: celdas[7]?.querySelector('select')?.value || celdas[1]?.innerText || '',
      fechaRecepcionSolicitud: celdas[8]?.innerText || '',
      fechaSolucionProgramada: celdas[9]?.innerText || '',
      estado: celdas[10]?.querySelector('select')?.value || '',
      fechaCambioEstado: celdas[11]?.querySelector('input')?.value || '',
      contactoClientes: celdas[12]?.querySelector('input')?.value || celdas[12]?.innerText || '',
      evidenciaFotografica: celdas[13]?.querySelector('input')?.value || '',
      detalleFoto: celdas[14]?.querySelector('input')?.value || '',
      auditor: celdas[15]?.querySelector('select')?.value || '',
      correo: celdas[16]?.querySelector('input')?.value || '',
      fechaUltimaModificacion: celdas[17]?.innerText || ''
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




