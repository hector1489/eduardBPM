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

  tabla.appendChild(fila);

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
  const filters = document.querySelectorAll('.filter-select');

  filters.forEach(filter => {
    const columnIndex = filter.getAttribute('data-column');
    const uniqueValues = new Set();
    for (let i = 0; i < rows.length; i++) {
      const cellValue = rows[i].getElementsByTagName('td')[columnIndex].innerText;
      if (cellValue) {
        uniqueValues.add(cellValue);
      }
    }
    filter.innerHTML = '<option value="">Todos</option>';
    uniqueValues.forEach(value => {
      filter.innerHTML += `<option value="${value}">${value}</option>`;
    });
  });
}


// Obtener los datos de la tabla y guardarlos en localStorage
function guardarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones');

  if (!tabla) {
    console.error('Error: No se encontró la tabla con el ID "tabla-desviaciones".');
    alert('Error: No se encontró la tabla con el ID "tabla-desviaciones".');
    return;
  }

  const filas = tabla.getElementsByTagName('tr');

  if (!filas || filas.length === 0) {
    console.error('Error: La tabla no contiene filas.');
    alert('Error: La tabla no contiene filas.');
    return;
  }

  const datos = [];

  for (let i = 1; i < filas.length; i++) {
    const fila = filas[i];
    const celdas = fila.cells;

    if (!celdas || celdas.length === 0) {
      console.error(`Error: La fila ${i} no contiene celdas.`);
      continue;
    }

    const filaDatos = {};
    for (let j = 0; j < celdas.length; j++) {
      filaDatos[`columna${j + 1}`] = celdas[j].innerText;
    }
    datos.push(filaDatos);
  }

  localStorage.setItem('tablaDatos', JSON.stringify(datos));
  alert('Datos guardados correctamente.');
}

// Descargar la tabla como archivo Excel
function descargarTablaExcel() {
  const tabla = document.getElementById('module-details');
  const ws = XLSX.utils.table_to_sheet(tabla);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, 'tabla.xlsx');
}









