document.addEventListener('DOMContentLoaded', () => {

});

function loadTableDetails() {
  const tableId = 'tabla-details';
  const data = JSON.parse(localStorage.getItem(`tablaDatos-${tableId}`));

  if (!data) {
    console.log('No se encontraron datos en localStorage para la tabla especificada.');
    return;
  }

  data.forEach(rowData => {
    if (!rowData.columna2 || !rowData.columna3) {
      return;
    }

    if (rowData[`columna1`] === "NUMERO DE AUDITORIA") {
      const columna2Value = rowData.columna2;
      const targetElementId = 'cardNumeroAuditoria';

      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        targetElement.textContent = columna2Value;
      } else {
        console.warn(`Elemento con ID ${targetElementId} no encontrado.`);
      }
    }

    let criterio = [];
    let nota = [];
    let observacion = [];
    let observacionesConValores = [];

    for (let i = 1; i <= 6; i++) {
      const idValue = rowData[`idColumna${i}`];
      if (idValue) {
        if (idValue.startsWith('criterio-')) {
          criterio.push(idValue);
        } else if (idValue.startsWith('nota-')) {
          nota.push(idValue);
        } else if (idValue.startsWith('observacion-')) {
          observacion.push(idValue);
          observacionesConValores.push({
            id: idValue,
            valor1: rowData.columna2, 
            valor2: rowData.columna3
          });
        }
      }
    }

   
    // Eliminar duplicados
    const uniqueObservaciones = [...new Set(observacion)];
    const uniqueCriterios = [...new Set(criterio)];
    const uniqueNotas = [...new Set(nota)];

    observacionesConValores.forEach(({ id, valor2 }) => {
      agregarFilaDesdeID(id, valor2);
    });
  });
}


// Agregar una fila a la tabla de desviaciones con datos del ID
function agregarFilaDesdeID(id, valor2) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const idPart = id.replace('observacion-', '');

  // Verificar si ya existe una fila con la misma pregunta
  for (let i = 0; i < tabla.rows.length; i++) {
    const preguntaCelda = tabla.rows[i].cells[1].textContent;
    if (preguntaCelda.toLowerCase() === idPart.toLowerCase()) {
      console.log(`Fila ya existe para la pregunta: ${preguntaCelda}`);
      return;
    }
  }

  const fila = document.createElement('tr');


  const preguntaSeleccionada = idPart;

  // Alineación de celdas según la estructura de la tabla
  fila.appendChild(crearCelda(tabla.rows.length + 1));
  fila.appendChild(crearCelda(preguntaSeleccionada));

  // Manejar criterios
  fila.appendChild(crearCelda(valor2));

  fila.appendChild(crearCeldaConInputFile(''));
  fila.appendChild(crearCeldaConInput('', crearComboBoxDesviaciones('')));
  fila.appendChild(crearCeldaConInputFile(''));

  // Celda de criticidad (prioridad)
  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), prioridades[0].valor);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  // Celda de acciones correctivas
  const selectActions = crearComboBoxTodasLasAction('');
  fila.appendChild(crearCeldaConInput('', selectActions));

  // Ejecutar manualmente actualizarComboBoxActions
  actualizarComboBoxActions(preguntaSeleccionada, selectActions);

  fila.appendChild(crearCelda(new Date().toLocaleDateString('es-ES')));
  fila.appendChild(crearCeldaConInput('   /   /   '));

  // Celda de estado
  const estadoCelda = crearCeldaConSelect(estados, estados[0]);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput('   /   /   '));
  fila.appendChild(crearCeldaConInputFile(''));
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCelda(''));
  fila.appendChild(crearCeldaConSelect(auditores, auditores[0]));
  fila.appendChild(crearCeldaConInputEmail(''));
  fila.appendChild(crearCeldaConInput('   /   /   '));

  // Celda de eliminación
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
