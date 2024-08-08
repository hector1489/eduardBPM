document.addEventListener('DOMContentLoaded', () => {

});


// datos details desde localStorage
function loadTableDetails() {
  const tableId = 'tabla-details';
  const data = JSON.parse(localStorage.getItem(`tablaDatos-${tableId}`));

  if (!data) {
    console.log('No se encontraron datos en localStorage para la tabla especificada.');
    return;
  }

  data.forEach(rowData => {
    if (rowData[`columna4`]) {
      const id = rowData[`idColumna4`];
      if (id) {
        const idPart = id.replace('observacion-', '');
        const match = questions.find(module =>
          Array.isArray(module.question)
            ? module.question.find(q => q.toLowerCase() === idPart.toLowerCase())
            : module.question.toLowerCase() === idPart.toLowerCase()
        );
        if (match) {
          agregarFilaDesdeID(id);
        } else {
          console.log(`No se encontró acción para el ID ${id}`);
        }
      }
    }
  });

}


// Agregar una fila a la tabla de desviaciones con datos del ID
function agregarFilaDesdeID(id) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');
  const idPart = id.replace('observacion-', '');

  const match = questions.find(module =>
    Array.isArray(module.question)
      ? module.question.find(q => q.toLowerCase() === idPart.toLowerCase())
      : module.question.toLowerCase() === idPart.toLowerCase()
  );

  if (match) {
    const pregunta = Array.isArray(match.question) ? match.question[0] : match.question;

    fila.appendChild(crearCelda(tabla.rows.length + 1));
    fila.appendChild(crearCeldaConInput(pregunta, crearComboBoxTodasLasPreguntas(pregunta)));
    fila.appendChild(crearCeldaConSelect(criterio, ''));
    fila.appendChild(crearCeldaConInput('', crearComboBoxDesviaciones('')));
    fila.appendChild(crearCeldaConInput('', crearComboBoxDesviaciones('')));
    fila.appendChild(crearCeldaConInput(''));
    const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), prioridades[0].valor);
    prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
    fila.appendChild(prioridadCelda);
    fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasAction('')));
    fila.appendChild(crearCelda(new Date().toLocaleDateString('es-ES')));
    fila.appendChild(crearCeldaConInput('   /   /   '));
    const estadoCelda = crearCeldaConSelect(estados, estados[0]);
    estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
    fila.appendChild(estadoCelda);
    fila.appendChild(crearCeldaConInput('   /   /   '));
    fila.appendChild(crearCeldaConInput(''));
    fila.appendChild(crearCeldaConInputFoto());
    fila.appendChild(crearCeldaConInput(''));
    fila.appendChild(crearCeldaConSelect(auditores, auditores[0]));
    fila.appendChild(crearCeldaConInput(''));
    fila.appendChild(crearCeldaConInput('   /   /   '));

    // Eliminar
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

  } else {
    console.log(`No se encontró una pregunta para el ID ${id}`);
  }

}



