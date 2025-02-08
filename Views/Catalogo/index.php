<?php
include 'conexion.php';


function obtenerLibrosPorCarrera($conexion, $id_carrera) {
    $query = "SELECT L.imagen,L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, L.isbn
              FROM libro L
              INNER JOIN autor A ON L.id_autor = A.id
              INNER JOIN editorial E ON L.id_editorial = E.id
              INNER JOIN detalle_librocarrera LC ON L.id = LC.id_libro
              WHERE LC.id_carrera = ?";
    
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("i", $id_carrera);
    $stmt->execute();
    return $stmt->get_result();
}

// Libro por Carrera
$carreras = [
    "Informática" => ["id" => 1, "imagen" => "images/Informatica/eapiis.jpg"],
    "Civil" => ["id" => 4, "imagen" => "images/Civil/civil.jpg"],
    "Agroindustrial" => ["id" => 5, "imagen" => "images/Agro/agro.jpg"],
    "Minas" => ["id" => 6, "imagen" => "images/Minas/minas.jpg"],
    "Veterinaria" => ["id" => 2, "imagen" => "images/Veterinaria/veterinaria.png"],
    "Administración" => ["id" => 3, "imagen" => "images/Admi/administracion.jpg"],
    "Educación Inicial" => ["id" => 8, "imagen" => "images/Inicial/educacion.png"],
    "Ciencias Políticas" => ["id" => 7, "imagen" => "images/Politica/politica.jpg"],
];

// Guardar los libros en un array asociativo
$librosPorCarrera = [];
foreach ($carreras as $nombre => $datos) {
    $librosPorCarrera[$datos['id']] = obtenerLibrosPorCarrera($conexion, $datos['id']);
}

//LIBROS CON MAYOR CONSECUENCIA O PRÉSTAMOS
$query1 = "SELECT L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, L.isbn,
       COUNT(P.id_libro) AS total_prestamos
            FROM libro L
            INNER JOIN autor A ON L.id_autor = A.id
            INNER JOIN editorial E ON L.id_editorial = E.id
            LEFT JOIN prestamo P ON L.id = P.id_libro
            GROUP BY L.id, L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, L.isbn
            ORDER BY total_prestamos DESC
            LIMIT 3;";
$resultado1 = $conexion->query($query1);



?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca Virtual UNAMBA</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /*Nuevo*/
        body {
            font-family: Arial, sans-serif;
            background-color: #121063;
            color: white;
            margin: 0;
            display: flex;
            flex-direction: column;
        }

        .container {
            display: flex;
            flex-direction: column;
            width: 90%;
            align-items: center;
            margin-top: 20px; 
        }

        /* Sidebar */
        .sidebar {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            padding: 20px;
            background-color: #112e84;
            color: white;
            width: 120%; 
            justify-content: center;
            border-radius:10px;
        }

        .sidebar a {
            display: block;
            text-align: center;
            text-transform: uppercase;
            font-weight: 500;
            color: white;
        }

        .sidebar img {
            width: 150px;
            height: 150px;
            border-radius: 10px;
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }

        .sidebar img:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .main-content {
            flex-grow: 1;
            padding: 20px;
            text-align: center;
        }

        .header {
            background-image: url('images/a1.jpg');
            filter: saturate(50%);
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
            padding: 50px 20px;
        }

        .libros-container {
            display: none;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }

        .libro-card {
            background: white;
            color: black;
            border-radius: 10px;
            padding: 15px;
            width: 250px;
            text-align: left;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        }

        .libro-card img {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .libro-card h3 {
            font-size: 18px;
            margin: 5px 0;
        }

        .btn-mas {
            background-color: #007BFF;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        .btn-mas:hover {
            background-color: #0056b3;
        }

        p h3{
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
        }

    </style>
    <script>
        function mostrarLibros(id) {
            // Ocultar todas las secciones de libros
            var contenedores = document.querySelectorAll(".libros-container");
            contenedores.forEach(c => c.style.display = "none");

            // Mostrar la sección seleccionada
            var container = document.getElementById("libros-" + id);
            if (container) {
                container.style.display = "flex";
            }
        }
    </script>
</head>
<body>
    <!-- Contenido principal -->
    <div class="main-content">
        <header class="header">
            <div class="header-content container">
                <h1>Biblioteca Virtual</h1>
                <p class="subtitle"><b>UNAMBA - Apurímac</b></p>
                <p class="subti"><i><b>"Accede a un mundo de conocimiento desde cualquier lugar".</b></i></p>
            </div>
        </header>

        
            <!-- Container -->
        <div class="container">
            <!-- Sidebar con imágenes de carreras -->
            <div class="sidebar">
                <?php foreach ($carreras as $nombre => $datos): ?>
                    <img src="<?php echo $datos['imagen']; ?>" alt="<?php echo $nombre; ?>"
                     onclick="mostrarLibros('<?php echo $datos['id']; ?>')">
                <?php endforeach; ?>
            </div>
        </div>
        <!-- Libros Muestra-->
        <?php foreach ($carreras as $nombre => $datos): ?>
            <div id="libros-<?php echo $datos['id']; ?>" class="libros-container">
                <?php if ($librosPorCarrera[$datos['id']]->num_rows > 0): ?>
                    <?php while ($libro = $librosPorCarrera[$datos['id']]->fetch_assoc()): ?>
                        <div class="libro-card">
                            <img src="<?php echo base_url . 'Assets/img/libros/' . $libro['imagen']; ?>" alt="Portada del libro" class="img-thumbnail">
                            <h3><?php echo $libro['titulo']; ?></h3>
                            <p><strong>Autor:</strong> <?php echo $libro['autor']; ?></p>
                            <p><strong>Editorial:</strong> <?php echo $libro['editorial']; ?></p>
                            <p><strong>ISBN:</strong> <?php echo $libro['isbn']; ?></p>
                            <p><strong>Páginas:</strong> <?php echo $libro['num_pagina']; ?></p>
                            <p><strong>Cantidad:</strong> <?php echo $libro['cantidad']; ?></p>
                            <button class="btn-mas" onclick="mostrarDetalleLibro('<?php echo $datos['id']; ?>')">Más...</button>
                        </div>
                    <?php endwhile; ?>
                <?php else: ?>
                    <p>No hay libros disponibles para esta carrera.</p>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>

        <script>
        function mostrarDetalleLibro(id) {
            // Ocultar todas las secciones de libros
            var contenedores = document.querySelectorAll(".libros-container");
            contenedores.forEach(c => c.style.display = "none");

            // Mostrar la sección seleccionada
            var container = document.getElementById("libros-" + id);
            if (container) {
                container.style.display = "flex";
            }
        }
    </script>

        <h2>Libros con Mayor Consecuencia</h2>
        <div class="product-gridet">
            <ul id="bookList" class="book-list">
                <?php while ($libro = $resultado1->fetch_assoc()) { ?>
                    <li class="product-item">
                        <div class="libro-card">
                            <img src="images/Informatica/estructura.jpg" alt="Libro VIP">
                            <h3><?php echo $libro['titulo']; ?></h3>
                            <p>
                            <p><strong>Cantidad:</strong> <?php echo $libro['cantidad']; ?></p>
                            <p><strong>Páginas:</strong> <?php echo $libro['num_pagina']; ?></p>
                            <p><strong>Autor:</strong> <?php echo $libro['autor']; ?></p>
                            <p><strong>Editorial:</strong> <?php echo $libro['editorial']; ?></p>
                            <p><strong>ISBN:</strong> <?php echo $libro['isbn']; ?></p>
                            <a href="#" class="btn-mas">Más...</a>
                        </div>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </div>

    <footer>
        <div class="footer-bg">
            <p><i><b>"Explora, aprende y crece con nuestra biblioteca virtual".</b></i></p>
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
