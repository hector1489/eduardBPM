document.addEventListener('DOMContentLoaded', () => {
  loadTableDetailsDoc();
  loadImagesFromLocalStorage();
  createObservationTable();
});

// Función para cargar las imágenes desde localStorage
function loadImagesFromLocalStorage() {
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '';

  // Itera sobre todas las claves en localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('foto-')) {
      const imageData = localStorage.getItem(key);
      const imageItem = document.createElement('div');
      imageItem.className = 'image-item';

      const imgElement = document.createElement('img');
      imgElement.src = imageData;
      imgElement.alt = `Foto guardada con ID: ${key}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.onclick = function () {
        localStorage.removeItem(key);
        imageContainer.removeChild(imageItem);
        console.log(`Imagen con ID ${key} eliminada.`);
      };

      imageItem.appendChild(imgElement);
      imageItem.appendChild(deleteButton);
      imageContainer.appendChild(imageItem);
    }
  }

  if (!imageContainer.hasChildNodes()) {
    imageContainer.innerHTML = '<p>No se encontraron imágenes en localStorage.</p>';
  }
}

// Función para agregar una fila a la tabla
function addRowToTable(tableId, rowData) {
  const tableBody = document.querySelector(`#${tableId} tbody`);

  const row = document.createElement('tr');

  const criterioCell = document.createElement('td');
  criterioCell.textContent = rowData['criterio'] || '';
  row.appendChild(criterioCell);

  const notaCell = document.createElement('td');
  notaCell.textContent = rowData['nota'] || '';
  row.appendChild(notaCell);

  const observacionCell = document.createElement('td');
  observacionCell.textContent = rowData['observacion'] || '';
  row.appendChild(observacionCell);

  tableBody.appendChild(row);
}

// Función para cargar los detalles de la tabla desde localStorage
function loadTableDetailsDoc() {
  const tableId = 'tabla-details';
  const data = JSON.parse(localStorage.getItem(`tablaDatos-${tableId}`));

  if (!data) {
    console.log('No se encontraron datos en localStorage para la tabla especificada.');
    return;
  }

  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = '';

  const labels = [];
  const promedios = [];

  data.forEach(rowData => {
    if (rowData.columna1.startsWith('PROMEDIO')) {
      labels.push(rowData.columna1.replace('PROMEDIO ', ''));
      promedios.push(parseFloat(rowData.columna2.replace('%', '')));
    }

    if (!rowData.columna2 || !rowData.columna3) {
      return;
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
          nota.push(rowData.columna3);
        } else if (idValue.startsWith('observacion-')) {
          observacion.push(idValue);
          const valor2 = rowData.columna2 || rowData.columna3;
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

    data.forEach(rowData => {
      if (rowData[`columna1`] === "NUMERO DE AUDITORIA") {
        const columna2Value = rowData.columna2;
        const targetElementId = 'numeroAuditoria';

        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
          targetElement.textContent = columna2Value;
        } else {
          console.warn(`Elemento con ID ${targetElementId} no encontrado.`);
        }
      }

    });


    observacionesConValores.forEach(({ id, valor2 }) => {
      addRowToTable(tableId, {
        criterio: criterio.join(', '),
        nota: nota.join(', '),
        observacion: valor2 || ''
      });
    });
  });

  // Crear el gráfico usando Chart.js
  const ctx = document.getElementById('promediosChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Promedios (%)',
        data: promedios,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


// Función para descargar el PDF
document.getElementById('download-pdf-btn').addEventListener('click', async function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const margin = 10;
  const lineHeight = 10;
  const colWidths = [100, 100];
  const pageHeight = doc.internal.pageSize.height;
  let y = margin;

  // Título
  doc.setFontSize(16);
  doc.text('Reporte Detallado - Parte 1', margin, y);
  y += lineHeight * 2;

  // Tabla: mostrar solo las dos primeras columnas
  const table = document.getElementById('tabla-details');
  const rows = table.querySelectorAll('tr');

  rows.forEach((row, rowIndex) => {
    const cols = row.querySelectorAll('th, td');
    let x = margin;

    cols.forEach((col, colIndex) => {
      if (colIndex < 2) {
        const text = col.textContent || '';

        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }

        doc.text(text, x, y);
        x += colWidths[colIndex];
      }
    });

    y += lineHeight;
  });

  doc.addPage();
  y = margin;
  doc.text('Reporte Detallado - Parte 2: Observaciones', margin, y);
  y += lineHeight * 2;

  rows.forEach((row, rowIndex) => {
    const cols = row.querySelectorAll('th, td');
    let x = margin;

    const colIndex = 2;
    const text = cols[colIndex].textContent || '';

    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    doc.text(text, x, y);
    y += lineHeight;
  });

  // Convertir el gráfico a una imagen
  const chartCanvas = document.getElementById('promediosChart');
  const chartImage = chartCanvas.toDataURL('image/png');

  // Agregar el gráfico al PDF
  if (y + 100 > pageHeight - margin) {
    doc.addPage();
    y = margin;
  }

  doc.addImage(chartImage, 'PNG', margin, y, 180, 100);
  y += 110;

  // Manejo de las imágenes del contenedor
  const imageContainer = document.getElementById('imageContainer');
  const images = imageContainer.querySelectorAll('img');

  images.forEach((img, imgIndex) => {
    if (y + 120 > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    doc.addImage(img.src, 'PNG', margin, y, 180, 120);
    y += 130;
  });

  doc.save('reporte-detallado.pdf');
});


// Lista de IDs de observación a buscar
const observationIDs = [
  'observacion-cs-registro',
  'observacion-cs-medidas',
  'observacion-higiene-programa',
  'observacion-plagas-autorizacion',
  'observacion-plagas-desechos',
  'observacion-recepcion-materias',
  'observacion-recepcion-especificaciones',
  'observacion-ppt-flujo',
  'observacion-ppt-procedimientos',
  'observacion-ppt-almacenamiento',
  'observacion-ppt-distribucion',
  'observacion-ppt-envases',
  'observacion-ppt-etiquetas',
  'observacion-existe-programa',
  'observacion-existe-capacitacion'
];

// Función para crear la nueva tabla con las observaciones específicas
function createObservationTable() {
  const tableId = 'observationsTable';
  const tableContainer = document.getElementById('observationsTableContainer');

  // Crear la estructura básica de la tabla
  const table = document.createElement('table');
  table.id = tableId;
  table.classList.add('observations-table');

  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const headers = ['Criterio', 'Nota', 'Observación'];
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  tableContainer.appendChild(table);

  const data = JSON.parse(localStorage.getItem(`tablaDatos-tabla-details`));
  if (!data) {
    console.log('No se encontraron datos en localStorage para la tabla especificada.');
    return;
  }

  data.forEach(rowData => {
    observationIDs.forEach(observationID => {
      if (rowData.idColumna4 && rowData.idColumna4 === observationID) {
        const row = document.createElement('tr');

        const criterioCell = document.createElement('td');
        criterioCell.textContent = rowData.columna1 || '';
        row.appendChild(criterioCell);

        const notaCell = document.createElement('td');
        notaCell.textContent = rowData.columna3 || '';
        row.appendChild(notaCell);

        const observacionCell = document.createElement('td');
        observacionCell.textContent = rowData.columna4 || '';
        row.appendChild(observacionCell);

        tableBody.appendChild(row);
      }
    });
  });

  // Mostrar un mensaje si no se encontraron observaciones
  if (!tableBody.hasChildNodes()) {
    const noDataMessage = document.createElement('tr');
    const noDataCell = document.createElement('td');
    noDataCell.colSpan = headers.length;
    noDataCell.textContent = 'No se encontraron observaciones para los IDs especificados.';
    noDataMessage.appendChild(noDataCell);
    tableBody.appendChild(noDataMessage);
  }
}

