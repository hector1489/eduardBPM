document.addEventListener('DOMContentLoaded', () => {
  cargarDatosPorAuditor();
});

// cargar todas las deviaciones
async function cargarDatosDesdeBackend() {
  try {
    const response = await fetch('https://bpm-backend.onrender.com/desviaciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al recuperar las desviaciones');
    }

    const datos = await response.json();
    const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    if (datos) {
      datos.forEach(dato => agregarFilaConGet(dato));
      console.log(datos);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para eliminar la fila
async function desviacionDelete(fila) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const indice = Array.from(tabla.rows).indexOf(fila);

  const numeroRequerimiento = fila.cells[0].innerText;

  try {
    const response = await fetch(`https://bpm-backend.onrender.com/desviacionesDelete/${numeroRequerimiento}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la desviación');
    }

    fila.remove();
    console.log(`Desviación con requerimiento número ${numeroRequerimiento} eliminada correctamente`);
  } catch (error) {
    console.error('Error al eliminar la desviación:', error);
  }

  // Actualizar los filtros si es necesario
  actualizarFiltros();
}

function agregarFilaConGet(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  // Ajusta la clase según la criticidad
  const prioridadSeleccionada = prioridades.find(p => p.valor === dato.criticidad);
  if (prioridadSeleccionada) {
    fila.className = prioridadSeleccionada.clase;
  }

  // Alinea las celdas según el orden correcto en la cabecera
  fila.appendChild(crearCelda(dato.id));
  fila.appendChild(crearCelda(dato.preguntas_auditadas));
  fila.appendChild(crearCelda(dato.desviacion_o_criterio));
  fila.appendChild(crearCelda(dato.tipo_de_accion));
  fila.appendChild(crearCelda(dato.responsable_problema));
  fila.appendChild(crearCelda(dato.local));

  // Celda de criticidad (prioridad)
  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), dato.criticidad);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  fila.appendChild(crearCelda(dato.acciones_correctivas));
  fila.appendChild(crearCelda(dato.fecha_recepcion_solicitud));
  fila.appendChild(crearCelda(dato.fecha_solucion_programada));

  // Celda de estado
  const estadoCelda = crearCeldaConSelect(estados, dato.estado);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput(dato.fecha_cambio_estado));
  fila.appendChild(crearCeldaConInput(dato.contacto_clientes));
  fila.appendChild(crearCeldaConInput(dato.evidencia_fotografica || 'N/A'));
  fila.appendChild(crearCeldaConInput(dato.detalle_foto));
  fila.appendChild(crearCelda(dato.auditor));
  fila.appendChild(crearCeldaConInput(dato.correo));
  fila.appendChild(crearCelda(dato.fecha_ultima_modificacion));

  // Celda de eliminación
  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.className = 'btn-eliminar';
  botonEliminar.addEventListener('click', function () {
    desviacionDelete(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  // Agregar la fila a la tabla
  tabla.appendChild(fila);

  // Actualizar los filtros si es necesario
  actualizarFiltros();
}

// Cargar por auditor
async function cargarDatosPorAuditor() {
  const username = localStorage.getItem('username') || 'Auditor desconocido';
  const auditor = username;

  if (!auditor) {
    console.error('Nombre del auditor no especificado.');
    return;
  }

  try {
    const response = await fetch(`https://bpm-backend.onrender.com/desviaciones/auditor/${auditor}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al recuperar las desviaciones');
    }

    const datos = await response.json();
    const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    if (datos && datos.length > 0) {
      datos.forEach(dato => agregarFilaConGet(dato));
    } else {
      alert('No se encontraron desviaciones en la base de datos para el auditor especificado.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al recuperar las desviaciones.');
  }
}

function agregarFilaConGet(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  // Ajusta la clase según la criticidad
  const prioridadSeleccionada = prioridades.find(p => p.valor === dato.criticidad);
  if (prioridadSeleccionada) {
    fila.className = prioridadSeleccionada.clase;
  }

  // Alinea las celdas según el orden correcto en la cabecera
  fila.appendChild(crearCelda(dato.id));
  fila.appendChild(crearCelda(dato.preguntas_auditadas));
  fila.appendChild(crearCelda(dato.desviacion_o_criterio));
  fila.appendChild(crearCelda(dato.tipo_de_accion));
  fila.appendChild(crearCelda(dato.responsable_problema));
  fila.appendChild(crearCelda(dato.local));

  // Celda de criticidad (prioridad)
  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), dato.criticidad);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  fila.appendChild(crearCelda(dato.acciones_correctivas));
  fila.appendChild(crearCelda(dato.fecha_recepcion_solicitud));
  fila.appendChild(crearCelda(dato.fecha_solucion_programada));

  // Celda de estado
  const estadoCelda = crearCeldaConSelect(estados, dato.estado);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput(dato.fecha_cambio_estado));
  fila.appendChild(crearCeldaConInput(dato.contacto_clientes));

  // Celda de evidencia fotográfica
  const evidenciaCelda = document.createElement('td');
  if (dato.evidencia_fotografica && dato.evidencia_fotografica !== 'N/A') {
    const imagen = document.createElement('img');
    imagen.src = dato.evidencia_fotografica;
    imagen.alt = 'Evidencia Fotográfica';
    imagen.style.width = '100px';
    evidenciaCelda.appendChild(imagen);
  } else {
    evidenciaCelda.innerText = 'N/A';
  }
  fila.appendChild(evidenciaCelda);

  fila.appendChild(crearCeldaConInput(dato.detalle_foto));
  fila.appendChild(crearCelda(dato.auditor));
  fila.appendChild(crearCeldaConInput(dato.correo));
  fila.appendChild(crearCelda(dato.fecha_ultima_modificacion));

  // Celda de eliminación
  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.className = 'btn-eliminar';
  botonEliminar.addEventListener('click', function () {
    desviacionDelete(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  // Agregar la fila a la tabla
  tabla.appendChild(fila);

  // Actualizar los filtros si es necesario
  actualizarFiltros();
}


