// =============================================
// PESTAÑAS — alternar entre login y registro
// =============================================

const tabLogin = document.querySelector('#tab-login')
const tabRegistro = document.querySelector('#tab-registro')
const formLogin = document.querySelector('#form-login')
const formRegistro = document.querySelector('#form-registro')

tabLogin.addEventListener('click', function() {
  // Activamos la pestaña de login
  tabLogin.classList.add('activo')
  tabRegistro.classList.remove('activo')

  // Mostramos el form de login, ocultamos el de registro
  formLogin.classList.remove('oculto')
  formRegistro.classList.add('oculto')
})

tabRegistro.addEventListener('click', function() {
  tabRegistro.classList.add('activo')
  tabLogin.classList.remove('activo')

  formRegistro.classList.remove('oculto')
  formLogin.classList.add('oculto')
})

// =============================================
// HELPERS — funciones reutilizables
// Las llamamos helpers porque "ayudan" a
// las funciones principales.
// =============================================

function mostrarError(idSpan, mensaje) {
  const span = document.querySelector('#' + idSpan)
  span.textContent = mensaje
  span.classList.add('visible')
}

function limpiarError(idSpan) {
  const span = document.querySelector('#' + idSpan)
  span.textContent = ''
  span.classList.remove('visible')
}

function limpiarTodosLosErrores(ids) {
  // ids es un array de strings con los ids a limpiar
  ids.forEach(function(id) {
    limpiarError(id)
  })
}

// =============================================
// REGISTRO — crear cuenta nueva
// =============================================

formRegistro.addEventListener('submit', function(evento) {
  evento.preventDefault()

  // Leemos los valores de los campos
  const nombre = document.querySelector('#reg-nombre').value.trim()
  const email = document.querySelector('#reg-email').value.trim()
  const password = document.querySelector('#reg-password').value
  const confirmar = document.querySelector('#reg-confirmar').value

  // Limpiamos errores anteriores antes de validar
  limpiarTodosLosErrores([
    'error-reg-nombre',
    'error-reg-email',
    'error-reg-password',
    'error-reg-confirmar'
  ])

  // Validamos cada campo
  let esValido = true

  if (nombre === '') {
    mostrarError('error-reg-nombre', 'El nombre es obligatorio')
    esValido = false
  }

  if (email === '') {
    mostrarError('error-reg-email', 'El correo es obligatorio')
    esValido = false
  } else if (!email.includes('@')) {
    // Validación básica de email
    mostrarError('error-reg-email', 'El correo no es válido')
    esValido = false
  }

  if (password.length < 6) {
    mostrarError('error-reg-password', 'La contraseña debe tener al menos 6 caracteres')
    esValido = false
  }

  if (confirmar !== password) {
    // !== significa "distinto de"
    mostrarError('error-reg-confirmar', 'Las contraseñas no coinciden')
    esValido = false
  }

  if (!esValido) return
  // Si hay errores, detenemos aquí con return.

  // Verificamos que el email no esté registrado ya
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  const emailExiste = usuarios.find(function(usuario) {
    return usuario.email === email
  })
  // .find() busca el PRIMER elemento que cumpla
  // la condición. Devuelve el elemento o undefined.

  if (emailExiste) {
    mostrarError('error-reg-email', 'Este correo ya está registrado')
    return
  }

  // Creamos el nuevo usuario
  const nuevoUsuario = {
    id: Date.now(),
    nombre: nombre,
    email: email,
    password: password,
    // ⚠️ Nota: en una app real NUNCA guardes
    // contraseñas en texto plano. Se usan
    // algoritmos de hash (bcrypt, etc).
    // Para aprender, esto está bien.
    fechaRegistro: new Date().toLocaleDateString('es-CO')
    // toLocaleDateString formatea la fecha
    // según el locale (es-CO = español Colombia)
  }

  // Guardamos en el array de usuarios
  usuarios.push(nuevoUsuario)
  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  // Iniciamos sesión automáticamente después del registro
  iniciarSesion(nuevoUsuario)
})

// =============================================
// LOGIN — verificar credenciales
// =============================================

formLogin.addEventListener('submit', function(evento) {
  evento.preventDefault()

  const email = document.querySelector('#login-email').value.trim()
  const password = document.querySelector('#login-password').value

  limpiarTodosLosErrores([
    'error-login-email',
    'error-login-password',
    'error-login-general'
  ])

  // Validaciones básicas
  let esValido = true

  if (email === '') {
    mostrarError('error-login-email', 'El correo es obligatorio')
    esValido = false
  }

  if (password === '') {
    mostrarError('error-login-password', 'La contraseña es obligatoria')
    esValido = false
  }

  if (!esValido) return

  // Buscamos el usuario en localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  const usuarioEncontrado = usuarios.find(function(usuario) {
    return usuario.email === email && usuario.password === password
    // Buscamos un usuario que tenga EXACTAMENTE
    // ese email Y esa contraseña. Ambas deben coincidir.
  })

  if (!usuarioEncontrado) {
    // !usuarioEncontrado → find() devolvió undefined
    // ! invierte el valor: !undefined → true
    mostrarError('error-login-general', 'Correo o contraseña incorrectos')
    return
  }

  // Credenciales correctas → iniciamos sesión
  iniciarSesion(usuarioEncontrado)
})

// =============================================
// FUNCIÓN: INICIAR SESIÓN
// Guarda la sesión y redirige al perfil.
// =============================================

function iniciarSesion(usuario) {
  // Guardamos solo los datos necesarios de la sesión.
  // No guardamos la contraseña en la sesión.
  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email
  }

  localStorage.setItem('sesion', JSON.stringify(sesion))
  // Guardamos la sesión activa

  window.location.href = 'perfil.html'
  // Redirigimos al perfil
}