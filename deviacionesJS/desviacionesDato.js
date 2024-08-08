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


function agregarFilaConDatos(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');
  const prioridadSeleccionada = prioridades.find(p => p.valor === dato.prioridad);

  if (prioridadSeleccionada) {
    fila.className = prioridadSeleccionada.clase;
  }

  fila.appendChild(crearCelda(dato.numeroPC));
  fila.appendChild(crearCeldaConInput(dato.numeroPregunta, crearComboBoxTodasLasPreguntas(dato.numeroPregunta)));
  fila.appendChild(crearCeldaConSelect(criterio, dato.criterio));
  fila.appendChild(crearCeldaConSelect(desviaciones, dato.desviacion));
  fila.appendChild(crearCeldaConSelect(desviaciones, dato.desviacion));
  fila.appendChild(crearCeldaConInput(''));

  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), dato.prioridad);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);
  
  fila.appendChild(crearCeldaConInput(dato.planAccion, crearComboBoxTodasLasAction(dato.planAccion)));
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCelda(''));

  // Agrega celda de estado con evento de cambio
  const estadoCelda = crearCeldaConSelect(estados, estados[0]);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCeldaConInput(dato.foto));
  fila.appendChild(crearCeldaConInput(dato.contacto));
  fila.appendChild(crearCeldaConSelect(auditores, dato.auditor));
  fila.appendChild(crearCeldaConInput(dato.correo));
  fila.appendChild(crearCelda(dato.fechaUltimaModificacion));

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