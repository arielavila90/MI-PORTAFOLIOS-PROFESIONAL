/* =========================================================
   PORTAFOLIO PROFESIONAL — script.js
   Autor: Avila Ariel Maximiliano
   Programación III — Unidad 4: JavaScript + DOM
   ========================================================= */

// ARRAY con la información del proyecto
const proyectos = [
  {
    titulo: "Sistema de Gestión con SQL Server",
    descripcion: "Base de datos con procedimientos almacenados y vistas para gestión académica.",
    tecnologia: "sql"
  },
  {
    titulo: "Portafolio Web Responsive",
    descripcion: "Sitio personal desarrollado con HTML5 y CSS3, usando Flexbox y Grid.",
    tecnologia: "html"
  },
  {
    titulo: "Formulario Interactivo con Validaciones",
    descripcion: "Formulario de contacto con validaciones en JavaScript y manejo de errores.",
    tecnologia: "js"
  },
  {
    titulo: "Landing con Animaciones CSS",
    descripcion: "Página con transiciones, keyframes y diseño responsive moderno.",
    tecnologia: "html"
  },
  {
    titulo: "Buscador Dinámico de Contenido",
    descripcion: "Componente que filtra elementos en tiempo real usando el DOM.",
    tecnologia: "js"
  }
];

function mostrarProyectos(lista) {
  const contenedor = document.getElementById("lista-proyectos");
  contenedor.innerHTML = ""; // limpiar antes de dibujar

  if (lista.length === 0) {
    contenedor.innerHTML = "<p class='sin-resultados'>No se encontraron proyectos.</p>";
    return;
  }

  // Crear elementos dinámicamente
  lista.forEach(proyecto => {
    const card = document.createElement("article");
    card.className = "proyecto-card";
    card.innerHTML = `
      <h4>${proyecto.titulo}</h4>
      <p>${proyecto.descripcion}</p>
      <span class="tag tag-${proyecto.tecnologia}">${proyecto.tecnologia.toUpperCase()}</span>
    `;
    contenedor.appendChild(card);
  });
}

// Filtrar proyectos por texto y tecnología
function filtrarProyectos() {
  const texto = document.getElementById("buscador").value.toLowerCase().trim();
  const filtro = document.querySelector(".filtro-btn.activo").dataset.filtro;

  const resultado = proyectos.filter(p => {
    const coincideTexto =
      p.titulo.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto);
    const coincideFiltro = filtro === "todos" || p.tecnologia === filtro;
    return coincideTexto && coincideFiltro;
  });

  mostrarProyectos(resultado);
}

// Validar el formulario de contacto 
function validarFormulario(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const feedback = document.getElementById("form-feedback");


  try {
    if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email.value)) {
      throw new Error("El correo electrónico no tiene un formato válido.");
    }

    if (mensaje.value.trim().length < 10) {
      throw new Error("El mensaje debe tener al menos 10 caracteres.");
    }

    // Éxito
    feedback.textContent = `¡Gracias, ${nombre.value}! Tu mensaje fue enviado correctamente.`;
    feedback.className = "form-feedback exito";
    document.querySelector(".contact-form").reset();
  } catch (error) {
    feedback.textContent = "⚠ " + error.message;
    feedback.className = "form-feedback error";
    console.error("Error en el formulario:", error);
  }
}

// Cambiar filtro activo
function seleccionarFiltro(evento) {
  document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("activo"));
  evento.target.classList.add("activo");
  filtrarProyectos();
}

//  Efecto hover sobre habilidades 
function resaltarHabilidad(evento) {
  evento.target.style.transform = "scale(1.05)";
  evento.target.style.transition = "transform 0.2s ease";
}
function quitarResaltado(evento) {
  evento.target.style.transform = "scale(1)";
}


document.addEventListener("DOMContentLoaded", () => {
  // Render inicial de proyectos
  mostrarProyectos(proyectos);

  // Buscador en tiempo real
  document.getElementById("buscador").addEventListener("input", filtrarProyectos);

  // Botones de filtro
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", seleccionarFiltro);
  });

  // Validación del formulario
  document.querySelector(".contact-form").addEventListener("submit", validarFormulario);

  // Evento MOUSEOVER / MOUSEOUT
  document.querySelectorAll(".skills-grid li").forEach(item => {
    item.addEventListener("mouseover", resaltarHabilidad);
    item.addEventListener("mouseout", quitarResaltado);
  });
});
