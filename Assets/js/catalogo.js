document.addEventListener("DOMContentLoaded", function () {
    // Agregar eventos a los botones para mostrar detalles de libros
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-mas")) {
            let libro = JSON.parse(event.target.getAttribute("data-libro"));
    
            document.getElementById("modalTitulo").textContent = decodeURIComponent(escape(libro.titulo));
            document.getElementById("modalImagen").src = BASE_URL + "Assets/img/libros/" + libro.imagen;
            document.getElementById("modalCantidad").textContent = libro.cantidad == 0 ? "No" : "Sí";
            document.getElementById("modalPaginas").textContent = libro.num_pagina;
            document.getElementById("modalAutor").textContent = decodeURIComponent(escape(libro.autor));
            document.getElementById("modalEditorial").textContent = decodeURIComponent(escape(libro.editorial));
            document.getElementById("modalISBN").textContent = libro.isbn;
            document.getElementById("modalPrestamos").textContent = libro.total_prestamos || "N/A";
            document.getElementById("modalDescripcion").textContent = libro.descripcion 
            ? decodeURIComponent(escape(libro.descripcion)) 
            : "Sin descripción.";
            
            document.getElementById("modalLibro").style.display = "flex";
        }
    });
      
});

function cambiarPagina(carreraId, pagina) {
    const listaLibros = document.getElementById(`book-list-${carreraId}`);
    const paginador = document.getElementById(`pagination-${carreraId}`);
    const librosPorPagina = 5;

    // Obtener la página actual
    let paginaActual = parseInt(paginador.getAttribute("data-pagina")) || 1;
    let totalPaginas = parseInt(paginador.getAttribute("data-total")) || 1;

    // Determinar la nueva página
    if (pagina === "prev") {
        pagina = paginaActual > 1 ? paginaActual - 1 : 1;
    } else if (pagina === "next") {
        pagina = paginaActual < totalPaginas ? paginaActual + 1 : totalPaginas;
    } else {
        pagina = parseInt(pagina);
    }

    // Evitar recargas innecesarias
    if (pagina === paginaActual) return;

    // Obtener libros dinámicamente con AJAX
    fetch(`obtener_libros.php?id=${carreraId}&pagina=${pagina}`)
        .then(response => response.json())
        .then(data => {
            listaLibros.innerHTML = ""; // Limpiar lista

            data.libros.forEach(libro => {
                let li = document.createElement("li");
                li.classList.add("product-item");
                li.innerHTML = `
                    <div class="libro-card">
                        <img src="${BASE_URL}Assets/img/libros/${libro.imagen}" alt="Portada del libro" class="img-thumbnail">
                        <h3>${libro.titulo}</h3>
                        <button class="btn-mas" data-libro='${JSON.stringify(libro)}'>Más...</button>
                    </div>
                `;
                listaLibros.appendChild(li);
            });

            // Actualizar el paginador
            paginador.setAttribute("data-pagina", pagina);
            paginador.setAttribute("data-total", data.totalPaginas);
            actualizarPaginador(paginador, pagina, data.totalPaginas);
        });
}

function actualizarPaginador(paginador, pagina, totalPaginas) {
    let paginas = paginador.querySelectorAll('.page-item');

    paginas.forEach((item) => item.classList.remove("active"));

    // Seleccionar el número de página correcto
    let numeroPagina = paginador.querySelector(`.page-item:nth-child(${pagina + 1})`);
    if (numeroPagina) {
        numeroPagina.classList.add("active");
    }

    let prev = paginador.querySelector("li:first-child");
    let next = paginador.querySelector("li:last-child");

    prev.classList.toggle("disabled", pagina === 1);
    next.classList.toggle("disabled", pagina === totalPaginas);
}


// Mostrar Libros por Carrera
function mostrarLibros(id) {
    var contenedores = document.querySelectorAll(".libros-container");
    contenedores.forEach(c => c.style.display = "none");

    var container = document.getElementById("libros-" + id);
    if (container) {
        container.style.display = "flex";
    }
}

// Cerrar modal
function cerrarModal() {
    document.getElementById("modalLibro").style.display = "none";
}

// Detectar clic fuera del modal
window.onclick = function (event) {
    let modal = document.getElementById("modalLibro");
    if (event.target === modal) {
        cerrarModal();
    }
};


