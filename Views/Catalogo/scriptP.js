document.addEventListener('DOMContentLoaded', () => {
    // Lista de libros disponibles
    const books = [
        { title: "La Política", author: "Aristóteles", image: "images/Politica/aris.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Política como Vocación", author: "Max Weber", image: "images/Politica/weber.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Fundamentos de la Ciencia Política", author: "Gionvanni Sartoni", image: "images/Politica/giovanni.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Teoría Política Moderna", author: "Will Kymlivka", image: "images/Politica/will.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Teoría de la Justicia", author: "John Rawls", image: "images/Politica/jhon.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "El Capital en el Siglo XXI", author: "Thomas Piketty", image: "images/Politica/thomas.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Los Orígenes del Totalitarismo", author: "Hannah Arendt", image: "images/Politica/hana.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "El Fin de la Historia y el Último Hombre", author: "Francis Fukuyama", image: "images/Politica/francis.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "La República", author: "Platón", image: "images/Politica/platon.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "Ensayo Sobre el Gobierno Civil", author: "John Locke", image: "images/Politica/locke.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "La Revolución Permanente", author: "León Trotsky", image: "images/Politica/leon.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" },
        { title: "La Anarquía que Viene", author: "Robert D. Kaplan", image: "images/Politica/robert.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "El Orden Mundial", author: "Henry Kissinger", image: "images/Politica/henry.jpg" , copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4"},
        { title: "Cómo Puede ser la Democracia", author: "Marta Pina", image: "images/Politica/marta.jpg", copies: "Cantidad: "+10,isbn: "ISBN: 978-84-933117-5-4" }
    ];

    const politicaButton = document.querySelector('a.btn-8'); // Selector modificado
    const booksSection = document.getElementById('booksSection');
    const bookList = document.getElementById('bookList');
    const searchInput = document.getElementById('searchInput');

    // Mostrar libros al hacer clic en el botón "Ingeniería Agroindustrial"
    politicaButton.addEventListener('click', (e) => {
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
