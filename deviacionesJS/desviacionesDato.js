document.addEventListener('DOMContentLoaded', () => {
  cargarDatosDesdeLocalStorage();
});

// cargar datos desde localStorage y agregarlos a la tabla de desviaciones
function cargarDatosDesdeLocalStorage() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';
  const datos = JSON.parse(localStorage.getItem('tablaDatos'));
  if (datos) {
    datos.forEach(dato => agregarFilaConDatos(dato));
  }
};


// Agregar fila con datos del localStorage
function agregarFilaConDatos(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  // Ajusta la clase según la prioridad
  const prioridadSeleccionada = prioridades.find(p => p.valor === dato.criticidad);
  if (prioridadSeleccionada) {
    fila.className = prioridadSeleccionada.clase;
  }

  // Alinea las celdas según el orden correcto en la cabecera
  fila.appendChild(crearCelda(dato.numeroRequerimiento));
  fila.appendChild(crearCelda(dato.preguntasAuditadas));
  fila.appendChild(crearCeldaConSelect(criterio, dato.desviacionOCriterio));
  fila.appendChild(crearCelda(dato.tipoDeAccion));
  fila.appendChild(crearCelda(dato.responsableProblema));
  fila.appendChild(crearCelda(dato.local));

  // Celda de criticidad (prioridad)
  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), dato.criticidad);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  fila.appendChild(crearCeldaConInput(dato.accionesCorrectivas, crearComboBoxTodasLasAction(dato.accionesCorrectivas)));
  fila.appendChild(crearCelda(dato.fechaRecepcionSolicitud));
  fila.appendChild(crearCeldaConInput(dato.fechaSolucionProgramada));

  // Celda de estado
  const estadoCelda = crearCeldaConSelect(estados, dato.estado);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput(dato.fechaCambioEstado));
  fila.appendChild(crearCeldaConInput(dato.contactoClientes));
  fila.appendChild(crearCeldaConInput(dato.evidenciaFotografica));
  fila.appendChild(crearCeldaConInput(dato.detalleFoto));
  fila.appendChild(crearCelda(dato.auditor));
  fila.appendChild(crearCeldaConInput(dato.correo));
  fila.appendChild(crearCelda(dato.fechaUltimaModificacion));

  // Celda de eliminación
  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    eliminarFila(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  // Agregar la fila a la tabla
  tabla.appendChild(fila);

  // Actualizar los filtros si es necesario
  actualizarFiltros();
}



