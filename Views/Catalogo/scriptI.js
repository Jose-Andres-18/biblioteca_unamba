document.addEventListener('DOMContentLoaded', () => {
    // Lista de libros disponibles
    const books = [
        { title: "Programación Orientada a Objetos", author: "Autor A", image: "image" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Estructuras de Datos", author: "Autor B", image: "images/data_structures.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Introducción a Algoritmos", author: "Autor C", image: "images/algorithms.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Bases de Datos", author: "Autor D", image: "images/databases.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Análisis Matemático", author: "Espinoza", image: "images/math_analysis.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Métodos Numéricos", author: "J. Fuentes", image: "images/numerical_methods.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Sistemas Digitales", author: "Autor C", image: "images/digital_systems.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Física I", author: "Espinoza", image: "images/physics1.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Ecuaciones Diferenciales", author: "Mendoza", image: "images/differential_eq.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" }
    ];

    const inicialButton = document.querySelector('a.btn-7'); // Selector modificado
    const booksSection = document.getElementById('booksSection');
    const bookList = document.getElementById('bookList');
    const searchInput = document.getElementById('searchInput');

    // Mostrar libros al hacer clic en el botón "Ingeniería Agroindustrial"
    inicialButton.addEventListener('click', (e) => {
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
