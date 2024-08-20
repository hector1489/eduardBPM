document.addEventListener('DOMContentLoaded', () => {
  
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

function agregarFilaConGet(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  // Ajusta la clase según la criticidad
  const prioridadSeleccionada = prioridades.find(p => p.valor === dato.criticidad);
  if (prioridadSeleccionada) {
    fila.className = prioridadSeleccionada.clase;
  }

  // Alinea las celdas según el orden correcto en la cabecera
  fila.appendChild(crearCelda(dato.numero_requerimiento));
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
    eliminarFila(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  // Agregar la fila a la tabla
  tabla.appendChild(fila);

  // Actualizar los filtros si es necesario
  actualizarFiltros();
}


