document.addEventListener('DOMContentLoaded', () => {

});

function loadTableDetails() {
  const tableId = 'tabla-details';
  const data = JSON.parse(localStorage.getItem(`tablaDatos-${tableId}`));

  if (!data) {
    console.log('No se encontraron datos en localStorage para la tabla especificada.');
    return;
  }

  console.log(data);

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
          // Verifica en ambos campos columna2 y columna3
          const valor2 = rowData.columna2 || rowData.columna3; // Prioriza columna2 si tiene valor
          if (valor2) {
            observacionesConValores.push({
              id: idValue,
              valor1: rowData.columna2, 
              valor2: valor2
            });
          }
        }
      }
    }

    observacionesConValores.forEach(({ id, valor2 }) => {
      console.log(id);
      agregarFilaDesdeID(id, valor2);
    });
  });
}


function actualizarPrioridadID(event, criticidadValor = null) {
  let fila, prioridadSeleccionada;
  
  if (criticidadValor !== null) {
    fila = criticidadValor.fila;
    prioridadSeleccionada = prioridades.find(p => p.valor === criticidadValor.valor);
  } else {
    fila = event.target.closest('tr');
    console.log(`Valor seleccionado del select: ${event.target.value}`);
    prioridadSeleccionada = prioridades.find(p => p.valor === event.target.value);
  }

  if (!prioridadSeleccionada) {
    console.error(`No se encontró una prioridad coincidente para el valor: ${criticidadValor ? criticidadValor.valor : event.target.value}`);
    return; 
  }

  fila.className = prioridadSeleccionada.clase;

  const fechaRecepcion = new Date(fila.cells[8].innerText.split('/').reverse().join('-'));
  const fechaSolucion = new Date(fechaRecepcion);
  fechaSolucion.setDate(fechaRecepcion.getDate() + prioridadSeleccionada.dias);

  // Actualizar las celdas correspondientes
  fila.cells[9].innerText = fechaSolucion.toLocaleDateString('es-ES');
  fila.cells[17].innerText = new Date().toLocaleDateString('es-ES');
}


// Agregar una fila a la tabla de desviaciones con datos del ID
function agregarFilaDesdeID(id, valor2) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const idPart = id.replace('observacion-', '');
  const username = localStorage.getItem('username') || 'Auditor desconocido';

  // Verificar si ya existe una fila con la misma pregunta
  /*for (let i = 0; i < tabla.rows.length; i++) {
    const preguntaCelda = tabla.rows[i].cells[1].textContent;
    if (preguntaCelda.toLowerCase() === idPart.toLowerCase()) {
      console.log(`Fila ya existe para la pregunta: ${preguntaCelda}`);
      return;
    }
  }*/

  const fila = document.createElement('tr');

  const preguntaSeleccionada = idPart;

  // Alineación de celdas según la estructura de la tabla
  fila.appendChild(crearCelda(tabla.rows.length + 1));
  fila.appendChild(crearCelda(preguntaSeleccionada));

  // Extraer el porcentaje del valor2
  const porcentajeMatch = valor2.match(/(\d+)%/);
  let porcentaje = 0;
  if (porcentajeMatch) {
    porcentaje = parseInt(porcentajeMatch[1], 10);
  }

  // Determinar el nivel de criticidad basado en el porcentaje
  let criticidad = '';
  if (porcentaje >= 0 && porcentaje <= 24) {
    criticidad = 'Crítico';
  } else if (porcentaje >= 25 && porcentaje <= 74) {
    criticidad = 'Moderado';
  } else if (porcentaje >= 75) {
    criticidad = 'Leve';
  }

  // Añadir la celda del valor y criticidad
  const valorCelda = crearCelda(valor2);
  valorCelda.classList.add(`prioridad-${criticidad.toLowerCase()}`);
  fila.appendChild(valorCelda);

  fila.appendChild(crearCeldaConInputFile(''));
  fila.appendChild(crearCeldaConInput('', crearComboBoxDesviaciones('')));
  fila.appendChild(crearCeldaConInputFile(''));

  // Celda para mostrar la criticidad
  const criticidadCelda = crearCelda(criticidad);
  criticidadCelda.classList.add(`prioridad-${criticidad.toLowerCase()}`);
  fila.appendChild(criticidadCelda);

  

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
  fila.appendChild(crearCeldaConInputTelefono(''));

  // Celda para mostrar la imagen
  const imgCelda = document.createElement('td');
  const imgId = `foto-${idPart}`;
  const imageData = localStorage.getItem(imgId);
  if (imageData) {
    const imgElement = document.createElement('img');
    imgElement.src = imageData;
    imgElement.alt = 'Imagen de desviación';
    imgElement.style.maxWidth = '100px';
    imgElement.style.maxHeight = '100px';
    imgElement.style.margin = '5px';
    imgCelda.appendChild(imgElement);
  } else {
    imgCelda.textContent = 'Sin imagen';
  }
  fila.appendChild(imgCelda);
  
  fila.appendChild(crearCeldaConInputFile(''));
  fila.appendChild(crearCelda([username], username));
  fila.appendChild(crearCeldaConInputEmail(''));
  fila.appendChild(crearCeldaConInput('   /   /   '));

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

  tabla.appendChild(fila);

  actualizarPrioridadID(null, { fila: fila, valor: criticidad });
  actualizarFiltros();
}

