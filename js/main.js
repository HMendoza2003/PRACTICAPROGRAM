function obtenerTodosLosProgramas() {
  const programasGuardados = JSON.parse(localStorage.getItem('programas')) || []
  // Leemos los programas subidos por usuarios

  return [...programas, ...programasGuardados]
  // El spread operator (...) expande un array.
  // [...array1, ...array2] une dos arrays en uno.
  // Resultado: programas base + programas subidos
}
// =============================================
// LOS DATOS — array de objetos
// Aquí viven todos los programas.
// En el futuro esto vendría de un servidor.
// =============================================

const programas = [
  {
    id: 1,
    titulo: 'Taller de Liderazgo Juvenil',
    categoria: 'Liderazgo',
    descripcion: 'Aprende habilidades de liderazgo para transformar tu comunidad.',
    fecha: '20 Feb 2026',
    imagen: 'https://picsum.photos/seed/programa1/400/200',
    interesados: 12
  },
  {
    id: 2,
    titulo: 'Campamento de Verano 2026',
    categoria: 'Recreación',
    descripcion: 'Tres días de convivencia, naturaleza y actividades en equipo.',
    fecha: '15 Mar 2026',
    imagen: 'https://picsum.photos/seed/programa2/400/200',
    interesados: 34
  },
  {
    id: 3,
    titulo: 'Voluntariado Comunitario',
    categoria: 'Servicio',
    descripcion: 'Únete a nuestra brigada de servicio y marca la diferencia.',
    fecha: '5 Abr 2026',
    imagen: 'https://picsum.photos/seed/programa3/400/200',
    interesados: 8
  },
  {
    id: 4,
    titulo: 'Club de Lectura Juvenil',
    categoria: 'Cultura',
    descripcion: 'Comparte tu pasión por la lectura con otros jóvenes.',
    fecha: '10 Abr 2026',
    imagen: 'https://picsum.photos/seed/programa4/400/200',
    interesados: 15
  },
  {
    id: 5,
    titulo: 'Torneo de Fútbol Juvenil',
    categoria: 'Deportes',
    descripcion: 'Participa en nuestro torneo de fútbol para jóvenes.',
    fecha: '20 Abr 2026',
    imagen: 'https://picsum.photos/seed/programa5/400/200',
    interesados: 22
  },
  {
    id: 6,
    titulo: 'Taller de Programación para Jóvenes',
    categoria: 'Tecnología',
    descripcion: 'Aprende los fundamentos de programación con JavaScript.',
    fecha: '5 May 2026',
    imagen: 'https://picsum.photos/seed/programa6/400/200',
    interesados: 18
  },
  {
    id: 7,
    titulo: 'Festival de Música Juvenil',
    categoria: 'Música',
    descripcion: 'Disfruta de conciertos y presentaciones musicales con otros jóvenes.',
    fecha: '15 May 2026',
    imagen: 'https://picsum.photos/seed/programa7/400/200',
    interesados: 25
  },
  {
    id: 8,
    titulo: 'Taller de Arte Urbano',
    categoria: 'Arte',
    descripcion: 'Aprende técnicas de arte urbano con profesionales.',
    fecha: '25 May 2026',
    imagen: 'https://picsum.photos/seed/programa8/400/200',
    interesados: 14 
  },
  {
    id: 9,
    titulo: 'Lavado de Dinero para Jóvenes sin Fronteras',
    categoria: 'Finanzas',
    descripcion: 'Aprende sobre lavado de dinero y cómo evitarlo.',
    fecha: '10 Jun 2026',
    imagen: 'https://picsum.photos/seed/programa9/400/200',
    interesados: 250
  }
]

// =============================================
// FUNCIÓN: CREAR UNA TARJETA
// Recibe un objeto programa y devuelve
// el HTML de esa tarjeta como string.
// =============================================

function crearTarjeta(programa) {
  // Template literal — construimos el HTML
  // usando los datos del objeto programa.
  // ${programa.titulo} inserta el valor
  // de esa propiedad en el HTML.
  return `
    <article class="tarjeta" data-id="${programa.id}">
      <img src="${programa.imagen}" alt="${programa.titulo}">
      <div class="tarjeta-contenido">
        <span class="categoria">${programa.categoria}</span>
        <h3>${programa.titulo}</h3>
        <p>${programa.descripcion}</p>
        <div class="tarjeta-footer">
          <span class="fecha">📅 ${programa.fecha}</span>
          <button class="btn-interes" type="button">
            ⭐ Me interesa <span class="contador">${programa.interesados}</span>
          </button>
        </div>
      </div>
    </article>
  `
  // Nota: data-id="${programa.id}" es un atributo
  // personalizado. Nos permite identificar qué
  // tarjeta es cuál desde JavaScript.
}

// =============================================
// FUNCIÓN: RENDERIZAR PROGRAMAS
// Toma un array de programas y los pinta
// todos en el grid del HTML.
// =============================================

function renderizarProgramas(listaDeProgramas) {

  // Seleccionamos el contenedor vacío del HTML.
  const grid = document.querySelector('#grid-programas')

  // Verificamos que existan programas para mostrar.
  if (listaDeProgramas.length === 0) {
    // innerHTML permite escribir HTML directamente
    // dentro de un elemento desde JavaScript.
    grid.innerHTML = `
      <p class="sin-resultados">
        No se encontraron programas 😕
      </p>
    `
    // return detiene la función aquí.
    // El código de abajo no se ejecuta.
    return
  }

  // .map() recorre el array y transforma
  // cada elemento. Devuelve un nuevo array.
  // Aquí transforma cada objeto programa
  // en su HTML correspondiente (string).
  const tarjetasHTML = listaDeProgramas.map(function(programa) {
    return crearTarjeta(programa)
    // crearTarjeta recibe el objeto y devuelve
    // el string HTML de esa tarjeta.
  })

  // tarjetasHTML ahora es un array de strings HTML:
  // ['<article>tarjeta1</article>',
  //  '<article>tarjeta2</article>',
  //  '<article>tarjeta3</article>']

  // .join('') une todos los strings del array
  // en uno solo, sin separador entre ellos.
  // Resultado: el HTML de las 3 tarjetas juntas.
  grid.innerHTML = tarjetasHTML.join('')

  // Con esta línea, las 3 tarjetas aparecen
  // en la página instantáneamente.

  // Después de renderizar, activamos los botones.
  activarBotonesInteres()
}

// =============================================
// FUNCIÓN: ACTIVAR BOTONES DE INTERÉS
// Se llama DESPUÉS de renderizar porque los
// botones no existían antes en el DOM.
// =============================================

function activarBotonesInteres() {
  const botonesInteres = document.querySelectorAll('.btn-interes')

  botonesInteres.forEach(function(boton) {
    boton.addEventListener('click', function() {

      boton.classList.toggle('activo')
      const spanContador = boton.querySelector('.contador')
      let numeroActual = parseInt(spanContador.textContent)

      if (boton.classList.contains('activo')) {
        numeroActual++
        boton.style.backgroundColor = '#4CAF50'
      } else {
        numeroActual--
        boton.style.backgroundColor = ''
      }

      spanContador.textContent = numeroActual
    })
  })
}

// =============================================
// FUNCIONALIDAD: BÚSQUEDA EN TIEMPO REAL
// Ahora filtra el ARRAY de datos, no el DOM.
// Es más eficiente y profesional.
// =============================================

const inputBusqueda = document.querySelector('#input-busqueda')

inputBusqueda.addEventListener('input', function() {
  const textoBuscado = inputBusqueda.value.toLowerCase()

  // .filter() recorre el array y devuelve
  // un NUEVO array solo con los elementos
  // que cumplan la condición.
  const programasFiltrados = programas.filter(function(programa) {
    const enTitulo = programa.titulo.toLowerCase().includes(textoBuscado)
    const enDescripcion = programa.descripcion.toLowerCase().includes(textoBuscado)
    const enCategoria = programa.categoria.toLowerCase().includes(textoBuscado)

    // Devuelve true si el texto buscado aparece
    // en el título, descripción O categoría.
    return enTitulo || enDescripcion || enCategoria
  })

  // Renderizamos solo los programas filtrados.
  // Si no hay coincidencias, renderizarProgramas
  // mostrará el mensaje "No se encontraron".
  renderizarProgramas(programasFiltrados)
})

// =============================================
// FUNCIONALIDAD: MENÚ HAMBURGUESA
// =============================================

const btnMenu = document.createElement('button')
btnMenu.textContent = '☰'
btnMenu.classList.add('btn-menu')

const navContainer = document.querySelector('.nav-container')
navContainer.appendChild(btnMenu)

btnMenu.addEventListener('click', function() {
  const nav = document.querySelector('nav ul')
  if (nav.style.display === 'flex') {
    nav.style.display = 'none'
  } else {
    nav.style.display = 'flex'
    nav.style.flexDirection = 'column'
  }
})

// =============================================
// INICIO — esto arranca todo
// Llamamos a renderizarProgramas con todos
// los programas para pintar el feed inicial.
// =============================================

renderizarProgramas(obtenerTodosLosProgramas())
