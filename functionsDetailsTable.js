


function extraerDatosTabla() {
  const tabla = document.querySelectorAll('tabla-details');
  const filas = tabla.querySelectorAll("tbody tr");

  const datosTabla = [];

  filas.forEach((fila) => {
    const celdas = fila.querySelectorAll("td");
    const filaDatos = {
      itemsEvaluados: celdas[0].innerText,
      preguntasEvaluadas: [],
      criterio: [],
      nota: celdas[11].innerText,
      observaciones: [],
      fotos: celdas[17].innerText
    };

    for (let i = 1; i <= 5; i++) {
      filaDatos.preguntasEvaluadas.push(celdas[i].innerText);
    }

    for (let i = 6; i <= 10; i++) {
      filaDatos.criterio.push(celdas[i].innerText);
    }

    for (let i = 12; i <= 16; i++) {
      filaDatos.observaciones.push(celdas[i].innerText);
    }

    datosTabla.push(filaDatos);
  });

  console.log(`Datos a guardar para la tabla con ID :`, datosTabla);
  return datosTabla;
}


function enviarDatosAlBackend() {
  const datos = extraerDatosTabla();

  fetch("URL_DEL_BACKEND", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tabla: datos })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);
    })
    .catch(error => {
      console.error("Error al enviar los datos:", error);
    });
}


