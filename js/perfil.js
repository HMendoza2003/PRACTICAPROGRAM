// =============================================
// RUTA PROTEGIDA
// Si no hay sesión activa, redirige al login.
// =============================================

const sesion = JSON.parse(localStorage.getItem('sesion'))

if (!sesion) {
  window.location.href = 'login.html'
}

// A partir de aquí sabemos que sesion existe.

// =============================================
// MOSTRAR DATOS DEL USUARIO
// =============================================

// Mostramos el nombre y email del usuario logueado
document.querySelector('#perfil-nombre').textContent = sesion.nombre
document.querySelector('#perfil-email').textContent = sesion.email

// Creamos el avatar con las iniciales del nombre.
// Ejemplo: "Juan Pérez" → "JP"
const iniciales = sesion.nombre
  .split(' ')
  // 'Juan Pérez'.split(' ') → ['Juan', 'Pérez']

  .map(function(palabra) {
    return palabra[0]
    // palabra[0] es la primera letra de cada palabra
    // 'Juan'[0] → 'J'
  })
  // → ['J', 'P']

  .join('')
  // ['J', 'P'].join('') → 'JP'

document.querySelector('#perfil-avatar').textContent = iniciales

// =============================================
// MOSTRAR PROGRAMAS DEL USUARIO
// =============================================

function cargarMisProgramas() {
  const programasGuardados = JSON.parse(localStorage.getItem('programas')) || []

  // Filtramos solo los programas del usuario logueado
  const misProgramas = programasGuardados.filter(function(programa) {
    return programa.autorId === sesion.id
    // Comparamos el id del autor del programa
    // con el id del usuario en sesión.
  })

  const grid = document.querySelector('#grid-mis-programas')

  // Actualizamos el contador de programas
  document.querySelector('#perfil-contador-programas').textContent =
    `${misProgramas.length} programas publicados`

  if (misProgramas.length === 0) {
    grid.innerHTML = `
      <div class="sin-programas">
        <p>Aún no has publicado ningún programa.</p>
        <a href="subir.html" class="btn-submit" style="display:inline-block; text-decoration:none; margin-top:16px;">
          + Subir mi primer programa
        </a>
      </div>
    `
    return
  }

  // Renderizamos las tarjetas de sus programas
  grid.innerHTML = misProgramas.map(function(programa) {
    return `
      <article class="tarjeta" data-id="${programa.id}">
        <img src="${programa.imagen}" alt="${programa.titulo}">
        <div class="tarjeta-contenido">
          <span class="categoria">${programa.categoria}</span>
          <h3>${programa.titulo}</h3>
          <p>${programa.descripcion}</p>
          <div class="tarjeta-footer">
            <span class="fecha">📅 ${programa.fecha}</span>
            <button
              class="btn-eliminar"
              data-id="${programa.id}"
              type="button"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </article>
    `
  }).join('')

  // Activamos los botones de eliminar
  activarBotonesEliminar()
}

// =============================================
// FUNCIÓN: ELIMINAR PROGRAMA
// =============================================

function activarBotonesEliminar() {
  const botones = document.querySelectorAll('.btn-eliminar')

  botones.forEach(function(boton) {
    boton.addEventListener('click', function() {

      const idAEliminar = parseInt(boton.dataset.id)
      // dataset.id lee el atributo data-id del HTML.
      // <button data-id="123"> → boton.dataset.id → "123"
      // parseInt lo convierte a número.

      const confirmar = window.confirm('¿Eliminar este programa?')
      // confirm() muestra un diálogo de confirmación
      // nativo del navegador. Devuelve true o false.

      if (!confirmar) return

      // Filtramos el array quitando el programa eliminado
      const programas = JSON.parse(localStorage.getItem('programas')) || []

      const programasActualizados = programas.filter(function(programa) {
        return programa.id !== idAEliminar
        // Devuelve true para todos EXCEPTO el que queremos eliminar
        // !== significa "distinto de"
      })

      localStorage.setItem('programas', JSON.stringify(programasActualizados))

      // Recargamos los programas en pantalla
      cargarMisProgramas()
    })
  })
}

// =============================================
// CERRAR SESIÓN
// =============================================

document.querySelector('#btn-cerrar-sesion').addEventListener('click', function() {
  localStorage.removeItem('sesion')
  // Eliminamos la sesión del localStorage

  window.location.href = 'index.html'
  // Redirigimos al inicio
})

// =============================================
// INICIO — cargamos los programas del usuario
// =============================================

cargarMisProgramas()