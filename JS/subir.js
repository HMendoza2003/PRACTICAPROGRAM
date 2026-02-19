// =============================================
// SELECCIÓN DE ELEMENTOS
// =============================================

const formulario = document.querySelector('#formulario-subir')
const inputTitulo = document.querySelector('#titulo')
const inputCategoria = document.querySelector('#categoria')
const inputDescripcion = document.querySelector('#descripcion')
const inputFecha = document.querySelector('#fecha')
const inputImagen = document.querySelector('#imagen')
const imgPreview = document.querySelector('#img-preview')
const previewContenedor = document.querySelector('#preview-imagen')

// =============================================
// FUNCIONALIDAD: PREVIEW DE IMAGEN
// Muestra la imagen mientras el usuario
// escribe la URL, en tiempo real.
// =============================================

inputImagen.addEventListener('input', function() {
  const url = inputImagen.value.trim()
  // .trim() elimina espacios al inicio y al final

  if (url !== '') {
    imgPreview.src = url
    // Cambiamos el src de la imagen al URL escrito

    previewContenedor.classList.remove('oculto')
    // Quitamos la clase 'oculto' para mostrar el preview

    // Si la imagen no carga (URL inválida),
    // onerror se dispara automáticamente.
    imgPreview.onerror = function() {
      previewContenedor.classList.add('oculto')
    }
  } else {
    previewContenedor.classList.add('oculto')
  }
})

// =============================================
// FUNCIÓN: VALIDAR FORMULARIO
// Verifica cada campo y muestra errores.
// Devuelve true si todo está bien,
// false si hay algún error.
// =============================================

function validarFormulario() {
  let esValido = true
  // Empezamos asumiendo que todo está bien.
  // Si encontramos un error, lo ponemos en false.

  // --- Validar título ---
  const titulo = inputTitulo.value.trim()
  if (titulo === '') {
    mostrarError('error-titulo', 'El título es obligatorio')
    esValido = false
  } else if (titulo.length < 5) {
    mostrarError('error-titulo', 'El título debe tener al menos 5 caracteres')
    esValido = false
  } else {
    limpiarError('error-titulo')
    // Si está bien, limpiamos cualquier error anterior
  }

  // --- Validar categoría ---
  const categoria = inputCategoria.value
  if (categoria === '') {
    mostrarError('error-categoria', 'Selecciona una categoría')
    esValido = false
  } else {
    limpiarError('error-categoria')
  }

  // --- Validar descripción ---
  const descripcion = inputDescripcion.value.trim()
  if (descripcion === '') {
    mostrarError('error-descripcion', 'La descripción es obligatoria')
    esValido = false
  } else if (descripcion.length < 20) {
    mostrarError('error-descripcion', 'La descripción debe tener al menos 20 caracteres')
    esValido = false
  } else {
    limpiarError('error-descripcion')
  }

  // --- Validar fecha ---
  const fecha = inputFecha.value
  if (fecha === '') {
    mostrarError('error-fecha', 'La fecha es obligatoria')
    esValido = false
  } else {
    limpiarError('error-fecha')
  }

  return esValido
  // Devuelve true solo si TODOS los campos
  // pasaron su validación.
}

// =============================================
// FUNCIÓN: MOSTRAR ERROR
// Pone el mensaje de error en el span
// correspondiente y le agrega estilo.
// =============================================

function mostrarError(idSpan, mensaje) {
  const span = document.querySelector('#' + idSpan)
  span.textContent = mensaje
  span.classList.add('visible')
  // La clase 'visible' en CSS muestra el span
  // que normalmente está invisible.
}

// =============================================
// FUNCIÓN: LIMPIAR ERROR
// Borra el mensaje de error del span.
// =============================================

function limpiarError(idSpan) {
  const span = document.querySelector('#' + idSpan)
  span.textContent = ''
  span.classList.remove('visible')
}

// =============================================
// FUNCIÓN: FORMATEAR FECHA
// Convierte '2026-02-20' a '20 Feb 2026'
// =============================================

function formatearFecha(fechaString) {
  const meses = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]
  // Array de nombres de meses. Los usamos
  // por posición: meses[0] = 'Ene', meses[1] = 'Feb'

  const partes = fechaString.split('-')
  // split('-') divide el string por el guión.
  // '2026-02-20'.split('-') → ['2026', '02', '20']

  const año = partes[0]   // '2026'
  const mes = partes[1]   // '02'
  const dia = partes[2]   // '20'

  const nombreMes = meses[parseInt(mes) - 1]
  // parseInt('02') → 2
  // 2 - 1 = 1 (los arrays empiezan en 0)
  // meses[1] → 'Feb'

  return `${dia} ${nombreMes} ${año}`
  // → '20 Feb 2026'
}

// =============================================
// FUNCIÓN: GUARDAR PROGRAMA
// Crea el objeto programa y lo guarda
// en localStorage.
// =============================================
function guardarPrograma() {
  const programasGuardados = JSON.parse(localStorage.getItem('programas')) || []
  const sesion = JSON.parse(localStorage.getItem('sesion'))

  const nuevoPrograma = {
    id: Date.now(),
    titulo: inputTitulo.value.trim(),
    categoria: inputCategoria.value,
    descripcion: inputDescripcion.value.trim(),
    fecha: formatearFecha(inputFecha.value),
    imagen: inputImagen.value.trim() || `https://picsum.photos/seed/${Date.now()}/400/200`,
    interesados: 0,
    autorId: sesion ? sesion.id : null,
    autor: sesion ? sesion.nombre : 'Anónimo'
  }

  programasGuardados.push(nuevoPrograma)
  localStorage.setItem('programas', JSON.stringify(programasGuardados))
}
// =============================================
// EVENTO: ENVÍO DEL FORMULARIO
// Se ejecuta cuando el usuario hace clic
// en "Publicar Programa".
// =============================================

formulario.addEventListener('submit', function(evento) {
  evento.preventDefault()
  // Cancela la recarga automática del navegador

  const formularioValido = validarFormulario()

  if (formularioValido) {
    guardarPrograma()
    window.location.href = 'perfil.html'
  }
})
