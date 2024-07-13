// Definición de arrays y constantes
const prioridades = [
  { valor: 'Leve', clase: 'prioridad-leve', dias: 45 },
  { valor: 'Moderado', clase: 'prioridad-moderada', dias: 30 },
  { valor: 'Crítico', clase: 'prioridad-critica', dias: 15 }
];
const estados = ['Cerrado', 'Abierto'];
const entidades = ['Entidad 1', 'Entidad 2'];
const responsablesDesviacion = ['Responsable 1', 'Responsable 2'];
const auditores = ['Auditor 1', 'Auditor 2'];

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  inicializarFiltros();
  cargarDatosDesdeLocalStorage();
});

// Función para cargar datos desde localStorage y agregarlos a la tabla de desviaciones
function cargarDatosDesdeLocalStorage() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  tabla.innerHTML = ''; // Limpiar la tabla antes de cargar datos
  const datos = JSON.parse(localStorage.getItem('tablaDatos'));
  if (datos) {
    datos.forEach(dato => agregarFilaConDatos(dato));
  }
}

// Función para agregar fila con datos desde localStorage
function agregarFilaConDatos(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  Object.keys(dato).forEach((key, index) => {
    const celda = document.createElement('td');
    celda.innerText = dato[key];
    fila.appendChild(celda);
  });

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

// Función para inicializar los filtros de la tabla
function inicializarFiltros() {
  const selects = document.querySelectorAll('.filter-select');
  selects.forEach(select => {
    select.addEventListener('change', function () {
      filtrarTabla();
    });
  });
  actualizarFiltros();
}

// Función para filtrar la tabla basada en los filtros seleccionados
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

// Función para agregar una fila a la tabla de desviaciones
function agregarFila() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  const numeroPC = document.createElement('td');
  numeroPC.innerText = tabla.rows.length + 1;
  fila.appendChild(numeroPC);

  const numeroPregunta = document.createElement('td');
  numeroPregunta.innerHTML = '<input type="text" class="form-control">';
  fila.appendChild(numeroPregunta);

  const criterio = document.createElement('td');
  criterio.innerHTML = '<input type="text" class="form-control">';
  fila.appendChild(criterio);

  const desviacion = document.createElement('td');
  desviacion.innerHTML = '<input type="text" class="form-control">';
  fila.appendChild(desviacion);

  const prioridad = document.createElement('td');
  prioridad.innerHTML = crearComboBoxPrioridades();
  prioridad.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridad);

  const estado = document.createElement('td');
  estado.innerHTML = crearComboBox(estados);
  estado.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estado);

  const planAccion = document.createElement('td');
  planAccion.innerHTML = '<input type="text" class="form-control">';
  fila.appendChild(planAccion);

  const fechaCambioEstado = document.createElement('td');
  fechaCambioEstado.innerText = '';
  fila.appendChild(fechaCambioEstado);

  const fechaRecepcionSolicitud = document.createElement('td');
  fechaRecepcionSolicitud.innerText = new Date().toLocaleDateString('es-ES');
  fila.appendChild(fechaRecepcionSolicitud);

  const fechaSolucionProgramada = document.createElement('td');
  fechaSolucionProgramada.innerText = '';
  fila.appendChild(fechaSolucionProgramada);

  const cantidadDias = document.createElement('td');
  cantidadDias.innerText = '';
  fila.appendChild(cantidadDias);

  const entidad = document.createElement('td');
  entidad.innerHTML = crearComboBox(entidades);
  fila.appendChild(entidad);

  const responsableDesviacion = document.createElement('td');
  responsableDesviacion.innerHTML = crearComboBox(responsablesDesviacion);
  fila.appendChild(responsableDesviacion);

  const auditor = document.createElement('td');
  auditor.innerHTML = crearComboBox(auditores);
  fila.appendChild(auditor);

  const contacto = document.createElement('td');
  contacto.innerHTML = '<input type="text" class="form-control">';
  fila.appendChild(contacto);

  const correo = document.createElement('td');
  correo.innerHTML = '<input type="email" class="form-control">';
  fila.appendChild(correo);

  const fechaUltimaModificacion = document.createElement('td');
  fechaUltimaModificacion.innerText = '';
  fila.appendChild(fechaUltimaModificacion);

  const foto = document.createElement('td');
  foto.innerHTML = '<input type="text" class="form-control">';
  fila.appendChild(foto);

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

// Función para eliminar fila
function eliminarFila(fila) {
  const tabla = fila.closest('tbody');
  fila.remove();
  guardarDatosTabla();
  actualizarFiltros();
}

// Función para crear un combo box (select) con opciones específicas
function crearComboBox(options) {
  let html = '<select class="form-control">';
  options.forEach(option => {
    html += `<option>${option}</option>`;
  });
  html += '</select>';
  return html;
}

// Función específica para crear un combo box de prioridades con clases de estilo
function crearComboBoxPrioridades() {
  let html = '<select class="form-control">';
  prioridades.forEach(p => {
    html += `<option class="${p.clase}">${p.valor}</option>`;
  });
  html += '</select>';
  return html;
}

// Función para actualizar la prioridad y calcular fechas relacionadas
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

// Función para actualizar el estado y establecer la fecha de cambio de estado
function actualizarEstado(event) {
  const fila = event.target.closest('tr');
  fila.cells[7].innerText = new Date().toLocaleDateString('es-ES');
}

// Función para actualizar los valores de los filtros de la tabla
function actualizarFiltros() {
  const table = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const rows = table.getElementsByTagName('tr');

  const filters = {
    prioridad: new Set(),
    estado: new Set(),
    entidad: new Set(),
    responsableDesviacion: new Set(),
    auditor: new Set()
  };

  for (let i = 0; i < rows.length; i++) {
    filters.prioridad.add(rows[i].cells[4].innerText);
    filters.estado.add(rows[i].cells[5].innerText);
    filters.entidad.add(rows[i].cells[11].innerText);
    filters.responsableDesviacion.add(rows[i].cells[12].innerText);
    filters.auditor.add(rows[i].cells[13].innerText);
  }

  document.getElementById('filterPrioridad').innerHTML = generarOpcionesFiltro([...filters.prioridad]);
  document.getElementById('filterEstado').innerHTML = generarOpcionesFiltro([...filters.estado]);
  document.getElementById('filterEntidad').innerHTML = generarOpcionesFiltro([...filters.entidad]);
  document.getElementById('filterResponsableDesviacion').innerHTML = generarOpcionesFiltro([...filters.responsableDesviacion]);
  document.getElementById('filterAuditor').innerHTML = generarOpcionesFiltro([...filters.auditor]);
}

// Función para generar opciones de filtro
function generarOpcionesFiltro(options) {
  let html = '<option value="">Todos</option>';
  options.forEach(option => {
    html += `<option value="${option}">${option}</option>`;
  });
  return html;
}

// Función para guardar datos de la tabla en localStorage
function guardarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');
  const datos = [];

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const celdas = fila.getElementsByTagName('td');
    const filaDatos = {
      numeroPC: celdas[0].innerText,
      numeroPregunta: celdas[1].querySelector('input').value,
      criterio: celdas[2].querySelector('input').value,
      desviacion: celdas[3].querySelector('input').value,
      prioridad: celdas[4].querySelector('select').value,
      estado: celdas[5].querySelector('select').value,
      planAccion: celdas[6].querySelector('input').value,
      fechaCambioEstado: celdas[7].innerText,
      fechaRecepcionSolicitud: celdas[8].innerText,
      fechaSolucionProgramada: celdas[9].innerText,
      cantidadDias: celdas[10].innerText,
      entidad: celdas[11].querySelector('select').value,
      responsableDesviacion: celdas[12].querySelector('select').value,
      auditor: celdas[13].querySelector('select').value,
      contacto: celdas[14].querySelector('input').value,
      correo: celdas[15].querySelector('input').value,
      fechaUltimaModificacion: celdas[16].innerText,
      foto: celdas[17].querySelector('input').value
    };
    datos.push(filaDatos);
  }

  localStorage.setItem('tablaDatos', JSON.stringify(datos));
}

// Evento para guardar los datos de la tabla al agregar una nueva fila
document.getElementById('agregarFilaBtn').addEventListener('click', function () {
  agregarFila();
  guardarDatosTabla();
});
