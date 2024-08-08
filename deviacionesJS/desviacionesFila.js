document.addEventListener('DOMContentLoaded', () => {
  actualizarFiltros();
  analizarEstadoTablaSimplificado();
});

// ComboBox con todas las acciones disponibles inicialmente
function crearComboBoxTodasLasAction(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control acciones';

  const todasLasAcciones = obtenerTodasLasAction();
  todasLasAcciones.forEach(action => {
    const option = document.createElement('option');
    option.value = action;
    option.text = action;
    if (action === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  return select;
}

// Actualizar ComboBox de acciones basado en la pregunta seleccionada
function actualizarComboBoxActions(preguntaSeleccionada, selectActions) {
  console.log("Actualizando ComboBox para pregunta:", preguntaSeleccionada);
  const actions = obtenerAccionesPorPregunta(preguntaSeleccionada);
  console.log("Acciones obtenidas:", actions);

  selectActions.innerHTML = '';

  actions.forEach(action => {
    const option = document.createElement('option');
    option.value = action;
    option.text = action;
    console.log("Agregando opción al select:", action);
    selectActions.appendChild(option);
  });
}

function crearComboBoxTodasLasPreguntas(valorSeleccionado) {
  const preguntas = obtenerTodasLasPreguntas();
  const select = document.createElement('select');
  select.className = 'form-control preguntas';

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
    const preguntaSeleccionada = event.target.value;
    const fila = event.target.closest('tr');
    const selectActions = fila.querySelector('.form-control.acciones');
    actualizarComboBoxActions(preguntaSeleccionada, selectActions);
  });

  return select;
}

// combo box de criterios
function crearComboBoxCriterios(valorSeleccionado) {
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
  return select;
}

//combo box desviaciones
function crearComboBoxDesviaciones(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';
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

// crear una celda con texto
function crearCelda(texto) {
  const celda = document.createElement('td');
  celda.innerText = texto;
  return celda;
}

// crear una celda con un input
function crearCeldaConInput(valor, input) {
  const celda = document.createElement('td');
  if (input) {
    input.value = valor;
    celda.appendChild(input);
  } else {
    celda.innerText = valor;
  }
  return celda;
}

// crear una celda con un selectu
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

// crear un combo box (select) con opciones específicas
function crearComboBox(options) {
  let html = '<select class="form-control">';
  options.forEach(option => {
    html += `<option>${option}</option>`;
  });
  html += '</select>';
  return html;
}

// Crear un combo box de prioridades con clases de estilo
function crearComboBoxPrioridades() {
  let html = '<select class="form-control">';
  prioridades.forEach(p => {
    html += `<option class="${p.clase}">${p.valor}</option>`;
  });
  html += '</select>';
  return html;
}

// eliminar una fila de la tabla de desviaciones
function eliminarFila(fila) {
  const tabla = fila.closest('tbody');
  fila.remove();
  guardarDatosTabla();
  actualizarFiltros();
  alert('Datos eliminados correctamente.');
}

// Función para enviar la imagen a la API
function crearCeldaConInputFoto() {
  const td = document.createElement('td');
  td.classList.add('td-foto')
  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.accept = 'image/*';
  const uploadButton = document.createElement('button');
  uploadButton.innerText = 'Enviar';
  uploadButton.classList.add('btn-blue');
  uploadButton.style.display = 'none';
  inputFile.addEventListener('change', function () {
    if (inputFile.files.length > 0) {
      inputFile.style.display = 'none';
      uploadButton.style.display = 'inline-block';
    }
  });
  uploadButton.addEventListener('click', function () {
    const file = inputFile.files[0];
    if (file) {
      enviarImagen(file);
    } else {
      alert('Por favor, selecciona una imagen primero.');
    }
  });
  td.appendChild(inputFile);
  td.appendChild(uploadButton);
  return td;
}
function enviarImagen(file) {
  const formData = new FormData();
  formData.append('image', file);
  fetch('URL_DE_TU_API', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Imagen subida correctamente:', data);
    })
    .catch(error => {
      console.error('Error al subir la imagen:', error);
    });
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

// Función para agregar una fila a la tabla de desviaciones
function agregarFila() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  // Agrega celdas con datos a la nueva fila
  fila.appendChild(crearCelda(tabla.rows.length + 1));
  
  fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasPreguntas('')));
  
  fila.appendChild(crearCeldaConSelect(criterio, ''));
  fila.appendChild(crearCelda(' '));
  fila.appendChild(crearCeldaConInput('', crearComboBoxDesviaciones('')));
  fila.appendChild(crearCeldaConInput(' '));

  // Agrega celda de prioridad con evento de cambio
  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), prioridades[0].valor);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  // Agrega celda de acción con evento de cambio
  fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasAction('')));
  fila.appendChild(crearCelda(new Date().toLocaleDateString('es-ES')));
  fila.appendChild(crearCeldaConInput('   /   /   '));
  
  // Agrega celda de estado con evento de cambio
  const estadoCelda = crearCeldaConSelect(estados, estados[0]);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);
  
  // Agrega celdas restantes y el botón de eliminar
  fila.appendChild(crearCeldaConInput('   /   /   '));
  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCeldaConInputFoto());
  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCeldaConSelect(auditores, auditores[0]));
  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCeldaConInput('   /   /   '));

  // Crear botón de eliminar
  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    eliminarFila(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  // Agrega la nueva fila a la tabla y actualiza los filtros
  tabla.appendChild(fila);
  actualizarFiltros();
}

// estados globales  de la tabla desviaciones
function analizarEstadoTablaSimplificado() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  if (!tabla) return;

  const filas = tabla.getElementsByTagName('tr');
  
  const resumenEstado = {
    totalFilas: filas.length,
    estado: {},
    criticidad: {}
  };

  Array.from(filas).forEach(fila => {
    const celdas = fila.getElementsByTagName('td');
    
    const estado = celdas[10]?.querySelector('select')?.value || '';
    const criticidad = celdas[6]?.querySelector('select')?.value || '';
    
    if (estado) {
      resumenEstado.estado[estado] = (resumenEstado.estado[estado] || 0) + 1;
    }

    if (criticidad) {
      resumenEstado.criticidad[criticidad] = (resumenEstado.criticidad[criticidad] || 0) + 1;
    }
  });

  console.log('Resumen del Estado Simplificado de la Tabla:', resumenEstado);
  localStorage.setItem('resumenEstadoTablaSimplificado', JSON.stringify(resumenEstado));

  // Actualiza los elementos span con los resultados
  document.getElementById('totalIncidencias').textContent = `Total : ${resumenEstado.totalFilas || 0}`;
  document.getElementById('estadoCerrado').textContent = `Cerradas : ${resumenEstado.estado['Cerrado'] || 0}`;
  document.getElementById('estadoAbierto').textContent = `Abiertas: ${resumenEstado.estado['Abierto'] || 0}`;
  document.getElementById('criticidadLeve').textContent = `${resumenEstado.criticidad['Leve'] || 0}`;
  document.getElementById('criticidadModerado').textContent = `${resumenEstado.criticidad['Moderado'] || 0}`;
  document.getElementById('criticidadCritico').textContent = `${resumenEstado.criticidad['Crítico'] || 0}`;
  document.getElementById('cardEstadoAbierto').textContent = `${resumenEstado.estado['Abierto'] || 0}`;
  document.getElementById('cardEstadoCerrado').textContent = `${resumenEstado.estado['Cerrado'] || 0}`;
  

  return resumenEstado;
}

// Configura un MutationObserver para escuchar cambios en el tbody de la tabla
const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
if (tabla) {
  const observer = new MutationObserver(() => {
    analizarEstadoTablaSimplificado();
  });
  observer.observe(tabla, { childList: true, subtree: true });
}

