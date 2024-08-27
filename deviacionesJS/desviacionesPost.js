document.addEventListener('DOMContentLoaded', () => {

});

async function enviarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');

  const authToken = localStorage.getItem('authToken');

  // Obtener los datos de la tabla
  const datos = Array.from(filas).map(fila => {
    const celdas = fila.getElementsByTagName('td');
    return {
      authToken: authToken || '',
      numeroRequerimiento: celdas[0]?.innerText || '',
      preguntasAuditadas: celdas[1]?.querySelector('select')?.value || celdas[1]?.innerText || '',
      desviacionOCriterio: celdas[2]?.querySelector('input')?.value || celdas[2]?.innerText || '',
      tipoDeAccion: celdas[3]?.querySelector('input')?.value || '',
      responsableProblema: celdas[4]?.querySelector('select')?.value || '',
      local: celdas[5]?.querySelector('input')?.value || '',
      criticidad: celdas[6]?.querySelector('select')?.value || celdas[6]?.innerText || '',
      accionesCorrectivas: celdas[7]?.querySelector('select')?.value || celdas[7]?.innerText || '',
      fechaRecepcionSolicitud: celdas[8]?.innerText || '',
      fechaSolucionProgramada: celdas[9]?.innerText || '',
      estado: celdas[10]?.querySelector('select')?.value || '',
      fechaCambioEstado: celdas[11]?.querySelector('input')?.value || celdas[11]?.innerText || '',
      contactoClientes: celdas[12]?.querySelector('input')?.value || celdas[12]?.innerText || '',
      evidenciaFotografica: celdas[13]?.querySelector('input')?.value || '',
      detalleFoto: celdas[14]?.querySelector('input')?.value || '',
      auditor: celdas[15]?.querySelector('select')?.value || '',
      correo: celdas[16]?.querySelector('input')?.value || '',
      fechaUltimaModificacion: celdas[17]?.innerText || ''
    };
  });

  console.log(datos);

  // Cargar imágenes
  const cargarImagenes = async (datos) => {
    const datosConImagenes = [];
    for (const dato of datos) {
      if (dato.evidenciaFotografica) {
        const formData = new FormData();
        formData.append('photo', dato.evidenciaFotografica);

        try {
          const response = await fetch('https://bpm-backend.onrender.com/upload-photo', {
            method: 'POST',
            body: formData
          });

          const result = await response.json();
          dato.evidenciaFotografica = result.url;
        } catch (error) {
          console.error('Error al cargar imagen:', error);
          dato.evidenciaFotografica = '';
        }
      }
      datosConImagenes.push(dato);
    }
    return datosConImagenes;
  };

  // Verificar que todos los campos sean obligatorios
  const camposObligatorios = datos.every(dato =>
    dato.authToken &&
    dato.numeroRequerimiento &&
    dato.preguntasAuditadas &&
    dato.desviacionOCriterio &&
    dato.tipoDeAccion &&
    dato.responsableProblema &&
    dato.local &&
    dato.criticidad &&
    dato.accionesCorrectivas &&
    dato.fechaRecepcionSolicitud &&
    dato.fechaSolucionProgramada &&
    dato.estado &&
    dato.fechaCambioEstado &&
    dato.contactoClientes &&
    dato.detalleFoto &&
    dato.auditor &&
    dato.correo &&
    dato.fechaUltimaModificacion
  );

  if (!camposObligatorios) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  try {
    const datosConImagenes = await cargarImagenes(datos);

    // Enviar los datos al backend
    const response = await fetch('https://bpm-backend.onrender.com/send-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(datosConImagenes)
    });

    const result = await response.json();
    alert('Lista de Desviaciones actualizada.');
  } catch (error) {
    console.error('Error:', error);
  }
}


