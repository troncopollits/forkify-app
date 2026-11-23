// El objetivo de este archivo es contener un puñado de funciones que nosotros reutilizamos una y otra vez en nuestro proyecto. En este módulo nosotros tenemos una 'plaza central' para ello

import { TIMEOUT_SEC } from "./config";
// Retorna una promesa que lanza un error si pasa un determinado tiempo. Se lanza en una carrera de promesas con getJSON
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Función para obtener la url de la api y convertirla en un objeto JSON
export const getJSON = async function (url) {
  try {
    // Del fetch, nace la respuesta y de la respuesta, nace la data
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // Super importante esto. Para que la promesa sea verdaderamente rechazada y pase el error a la promesa que hay model.js y salte el error allí, aquí debemos forzar al error con un throw err; Estamos propagando el error
  }
};
