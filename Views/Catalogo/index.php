<?php
include 'conexion.php';

$query = "SELECT titulo, cantidad, num_pagina FROM libro";
$resultado = $conexion->query($query);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca Virtual UNAMBA</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .product-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .product-image {
            margin-right: 20px;
        }
        .product-info {
            flex: 1;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content container">
            <h1>Biblioteca Virtual</h1>
            <p class="subtitle"><b>UNAMBA - Apurímac</b></p>
            <p><i><b>"Accede a un mundo de conocimiento desde cualquier lugar".</b></i></p>
        </div>
    </header>
    
    <main class="container">
        <section id="booksSection" class="books">
            <h2>Libros Disponibles</h2>
            <input type="text" id="searchInput" class="campo" placeholder="Buscar por título o autor">
        </section>
        
        <div class="sidebar">
            <a href="#" class="btn-1"><img src="images/Informatica/eapiis.jpg" alt="Informática"></a>
            <a href="#" class="btn-2"><img src="images/Civil/civil.jpg" alt="Ingeniería Civil"></a>
            <a href="#" class="btn-3"><img src="images/Agro/agro.jpg" alt="Agronomía"></a>
            <a href="#" class="btn-4"><img src="images/Minas/minas.jpg" alt="Ingeniería de Minas"></a>
            <a href="#" class="btn-5"><img src="images/Veterinaria/veterinaria.png" alt="Medicina Veterinaria"></a>
            <a href="#" class="btn-6"><img src="images/Admi/administracion.jpg" alt="Administración"></a>
            <a href="#" class="btn-7"><img src="images/Inicial/educacion.png" alt="Educación Inicial"></a>
            <a href="#" class="btn-8"><img src="images/Politica/politica.jpg" alt="Ciencias Políticas"></a>
        </div>
        
        <div class="product-grid">
            <ul id="bookList" class="book-list">
                <?php while ($libro = $resultado->fetch_assoc()) { ?>
                    <li class="product-item">
                        <div class="product-image">
                            <img src="images/Informatica/Algoritmos.png" alt="Libro VIP">
                        </div>
                        <div class="product-info">
                            <h3><?php echo $libro['titulo']; ?></h3>
                            <p><strong>Cantidad:</strong> <?php echo $libro['cantidad']; ?></p>
                            <p><strong>Páginas:</strong> <?php echo $libro['num_pagina']; ?></p>
                            <a href="#" class="btn-more">Más...</a>
                        </div>
                    </li>
                <?php } ?>
            </ul>
        </div>

        <h2>Libros con Mayor Consecuencia</h2>
        <div class="product-grid">
            <div class="product-item">
                <div class="product-image">
                    <img src="images/Informatica/Algoritmos.png" alt="Libro VIP">
                </div>
                <div class="product-info">
                    <h3>Libro VIP</h3>
                    <p>Diseño y Dibujo</p>
                    <a href="#" class="btn-more">Más...</a>
                </div>
            </div>
            <div class="product-item">
                <div class="product-image">
                    <img src="images/Politica/giovanni.jpg" alt="Libro VIP">
                </div>
                <div class="product-info">
                    <h3>Libro VIP</h3>
                    <p>Ciencias Computacionales</p>
                    <a href="#" class="btn-more">Más...</a>
                </div>
            </div>
            <div class="product-item">
                <div class="product-image">
                    <img src="images/Informatica/datos.jpg" alt="Libro VIP">
                </div>
                <div class="product-info">
                    <h3>Libro VIP</h3>
                    <p>Política</p>
                    <a href="#" class="btn-more">Más...</a>
                </div>
            </div>
        </div>
    </main>
    
    <footer>
        <div class="footer-bg">
            <p>Explora, aprende y crece con nuestra biblioteca virtual.</p>
            <div class="footer-info">
                <div>
                    <h3>Ubicación</h3>
                    <p>Av. Garcilazo de la Vega S/N Tamburco - Abancay - Apurímac</p>
                </div>
                <div>
                    <h3>Horario de Atención</h3>
                    <p>Lunes a Viernes de 7:30 a 15:30</p>
                </div>
                <div>
                    <h3>Contacto</h3>
                    <p>Central telefónica: 083-321965</p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>