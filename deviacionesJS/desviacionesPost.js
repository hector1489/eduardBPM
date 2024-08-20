document.addEventListener('DOMContentLoaded', () => {

});



// Enviar filas al backend 
function enviarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');

  // Obtener datos del usuario desde localStorage
  const authToken = localStorage.getItem('authToken');


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
      criticidad: celdas[6]?.querySelector('select')?.value || '',
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

  // Enviar los datos al backend
  fetch('https://bpm-backend.onrender.com/send-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(datos)
  })
    .then(response => response.json())
    .then(data => {
      alert('Lista de Desviaciones actualizada.');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


