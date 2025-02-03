document.addEventListener('DOMContentLoaded', () => {
    // Lista de libros disponibles
    const books = [
        { title: "Biotecnología Agroindustrial", author: "Marcia Carolina Quirós", image: "images/oop.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Bioquímica de los Alimentos", author: "Owen Fennema", image: "images/data_structures.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Microbiología de los Alimentos", author: "James m. Jay", image: "images/algorithms.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Gestión de la Calidad Total", author: "Dale H. Besterfield", image: "images/databases.jpg" },
        { title: "Procesamiento y Equipos Agroindustriales", author: "Miguel Carrillo", image: "images/math_analysis.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Economía Agroindustrial", author: "Jorge Lara Jiménez", image: "images/numerical_methods.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Gestión Ambiental en Agroindustrias", author: "Ana María Pérez", image: "images/digital_systems.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Evaluación del Impacto Ambiental en la Agroindustria", author: "Luis Enrique Sanchez", image: "images/physics1.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Ecuaciones Diferenciales y sus Aplicaciones de Modelado", author: "Dennis G. Zill", image: "images/differential_eq.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"}
    ];

    const agroindustrialButton = document.querySelector('a.btn-3'); // Selector modificado
    const booksSection = document.getElementById('booksSection');
    const bookList = document.getElementById('bookList');
    const searchInput = document.getElementById('searchInput');

    // Mostrar libros al hacer clic en el botón "Ingeniería Agroindustrial"
    agroindustrialButton.addEventListener('click', (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado
        booksSection.classList.remove('hidden'); // Mostrar la sección de libros

        // Cargar la lista de libros
        displayBooks(books);

        // Desplazarse a la sección de libros
        booksSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Función para mostrar libros
    function displayBooks(filteredBooks) {
        bookList.innerHTML = ''; // Limpiar la lista
        filteredBooks.forEach(book => {
            const bookContainer = document.createElement('div');
            bookContainer.classList.add('book-container');

            const img = document.createElement('img');
            img.src = book.image;
            img.alt = book.title;
            img.classList.add('book-image');

            const title = document.createElement('h3');
            title.textContent = book.title;
            title.classList.add('book-title');

            const author = document.createElement('p');
            author.textContent = book.author;
            author.classList.add('book-author');

            const copies = document.createElement('p');
            copies.textContent = book.copies;
            copies.classList.add('book-copies');

            const isbn = document.createElement('p');
            isbn.textContent = book.isbn;
            isbn.classList.add('book-isbn');

            bookContainer.appendChild(img);
            bookContainer.appendChild(title);
            bookContainer.appendChild(author);
            bookContainer.appendChild(copies);
            bookContainer.appendChild(isbn);

            bookList.appendChild(bookContainer);
        });
    }

    // Buscar libros en tiempo real
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
            || book.copies.toLowerCase().includes(query) ||  book.isbn.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    });
});
