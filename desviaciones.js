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
  tabla.innerHTML = ''; // Limpia el contenido de la tabla
  const datos = JSON.parse(localStorage.getItem('tablaDatos'));
  if (datos) {
    datos.forEach(dato => agregarFilaConDatos(dato));
  }
}

// Agregar función para agregar fila con datos desde localStorage
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

// Función para eliminar una fila de la tabla de desviaciones
function eliminarFila(fila) {
  const tabla = fila.closest('tbody');
  fila.remove();
  guardarDatosTabla();
  actualizarFiltros();
  alert('Datos eliminados correctamente.');
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

// Función para guardar datos de la tabla en localStorage
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
  alert('Datos guardados correctamente.');
}
