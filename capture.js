

async function fetchIncidencias() {
  try {
    const response = await fetch('https://bpm-backend.onrender.com/photos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map(photo => ({
      key: photo.key,
      url: photo.url
    }));
  } catch (error) {
    console.error('Error fetching incidencias:', error);
    return [];
  }
}

function renderCards(incidencias) {
  const row = document.querySelector('#card-container');
  row.innerHTML = '';

  incidencias.forEach(incidencia => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = incidencia.url;
    img.className = 'card-img-top';
    img.alt = 'Imagen de Incidencia';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = 'Título de la Incidencia';

    const text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = 'Descripción breve de la incidencia.';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = async () => {
      try {
        const deleteResponse = await fetch(`https://bpm-backend.onrender.com/delete-photos/${encodeURIComponent(incidencia.key)}`, {
          method: 'DELETE',
        });
        if (!deleteResponse.ok) {
          throw new Error('Error al eliminar la incidencia');
        }
        col.remove();
      } catch (error) {
        console.error('Error al eliminar la incidencia:', error);
      }
    };

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(deleteButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const incidencias = await fetchIncidencias();
  renderCards(incidencias);
  await cargarDatosPorAuditor();
});


function renderImagesForAuditor(desviaciones) {
  const container = document.querySelector('#auditor-image-container');
  container.innerHTML = '';

  function extractKeyFromUrl(awsUrl) {
    const urlPath = awsUrl.pathname;
    const parts = urlPath.split('/');
    let Key = parts.slice(2).join('/');

    if (Key.endsWith('_blob')) {
      Key = Key.slice(0, -5);
    }
    
    return Key;
  }

  desviaciones.forEach(desviacion => {
    const awsUrl = new URL(desviacion.evidencia_fotografica);
    const Key = extractKeyFromUrl(awsUrl);

    const backendUrl = `https://bpm-backend.onrender.com/photos/${encodeURIComponent(Key)}`;
    console.log(Key);
    console.log(backendUrl);

    const img = document.createElement('img');
    img.src = backendUrl;
    img.className = 'img-thumbnail';
    img.alt = 'Imagen del auditor';
    img.style.margin = '10px';

    container.appendChild(img);
  });
}


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

    const desviaciones = await response.json();

    renderImagesForAuditor(desviaciones);
  } catch (error) {
    console.error('Error al cargar datos por auditor:', error);
  }
}

