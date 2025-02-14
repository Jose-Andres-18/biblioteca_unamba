<?php 
include 'Funciones.php'; 
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca Virtual UNAMBA</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="top-bar">
        <div class="logo">
            </div>
            <div class="admin-login">
            <img src="<?php echo base_url . 'Assets/img/inicio-sesion.png' ?>" alt="Logo Biblioteca" />
            <a href="<?php echo base_url; ?>usuarios/salir" class="login-button">Iniciar Sesión</a>
        </div>
    </div>
    <div class="main-content">
        <header class="header">
            <div class="header-content container">
                <h1>Biblioteca Virtual</h1>
                <p class="subtitle"><b>UNAMBA - Apurímac</b></p>
                <p class="subti" style="font-size: 1rem;"><i><b>"Accede a un mundo de conocimiento desde cualquier lugar".</b></i></p>
            </div>
        </header>
        <p class="p3">🔎 Escribe una palabra clave y encuentra el libro perfecto para ti.</p>
        <p class="p3"> ✨ Explora, aprende y crece con cada página.</p>
        <h2>Libros Disponibles</h2>
        <form method="GET" action="">
            <input type="text" id="searchInput" class="campo" name="searchInput" placeholder="Buscar por título o autor">
            <button id="searchButton" type="submit">Buscar</button>
        </form>
        <?php
        $librosPorPagina = 8;
        $paginaActual = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
        $offset = ($paginaActual - 1) * $librosPorPagina;

        if (!empty($_GET['searchInput'])) {
            // Sanitizar entrada
            $searchInput = trim($_GET['searchInput']);
            $searchInput = '%' . filter_var($searchInput, FILTER_SANITIZE_STRING) . '%';

            // Consulta principal con paginación
            $query = "SELECT L.id, L.imagen, L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, 
                            L.isbn, L.descripcion, COUNT(P.id_libro) AS total_prestamos
                    FROM libro L
                    INNER JOIN autor A ON L.id_autor = A.id
                    INNER JOIN editorial E ON L.id_editorial = E.id
                    LEFT JOIN prestamo P ON L.id = P.id_libro
                    WHERE LOWER(L.titulo) LIKE LOWER(?) OR LOWER(A.autor) LIKE LOWER(?)
                    GROUP BY L.id
                    ORDER BY total_prestamos DESC
                    LIMIT ? OFFSET ?;";

            $stmt = $conexion->prepare($query);
            $stmt->bind_param("ssii", $searchInput, $searchInput, $librosPorPagina, $offset);
            $stmt->execute();
            $result = $stmt->get_result();

            // Contar total de resultados sin paginación
            $totalQuery = "SELECT COUNT(*) as total FROM libro L 
                        INNER JOIN autor A ON L.id_autor = A.id
                        WHERE LOWER(L.titulo) LIKE LOWER(?) OR LOWER(A.autor) LIKE LOWER(?)";

            $stmtTotal = $conexion->prepare($totalQuery);
            $stmtTotal->bind_param("ss", $searchInput, $searchInput);
            $stmtTotal->execute();
            $totalResult = $stmtTotal->get_result();
            $totalRow = $totalResult->fetch_assoc();
            $totalLibros = $totalRow['total'];
            $totalPaginas = ceil($totalLibros / $librosPorPagina);

            // Generar lista de libros
            echo '<ul class="book-list">';
            if ($result->num_rows > 0) {
                while ($libro = $result->fetch_assoc()) {
                    echo '<li class="product-item">
                            <div class="libro-card">
                                <img src="' . base_url . 'Assets/img/libros/' . htmlspecialchars($libro['imagen'], ENT_QUOTES, 'UTF-8') . '" 
                                    alt="Portada del libro" class="img-thumbnail">
                                <h3>' . htmlspecialchars($libro['titulo'], ENT_QUOTES, 'UTF-8') . '</h3>
                                <p><strong>Autor:</strong> ' . htmlspecialchars($libro['autor'], ENT_QUOTES, 'UTF-8') . '</p>
                                <button class="btn-mas" data-libro=\'' . htmlspecialchars(json_encode($libro), ENT_QUOTES, 'UTF-8') . '\'>
                                    Más...
                                </button>
                            </div>
                        </li>';
                }
            } else {
                echo '<p style="color: white;">No se encontraron resultados para la búsqueda.</p>';
            }
            echo '</ul>';

            // Generar paginación
            if ($totalPaginas > 1) {
                echo '<ul class="pagination">';
                
                // Botón "Anterior"
                echo ($paginaActual > 1) 
                    ? '<li class="page-item"><a class="page-link" href="?searchInput=' . urlencode($_GET['searchInput']) . '&pagina=' . ($paginaActual - 1) . '">&lt;</a></li>'
                    : '<li class="page-item disabled"><span class="page-link">&lt;</span></li>';
                
                // Números de página
                for ($i = 1; $i <= $totalPaginas; $i++) {
                    $activeClass = ($i == $paginaActual) ? 'active' : '';
                    echo '<li class="page-item ' . $activeClass . '"><a class="page-link" href="?searchInput=' . urlencode($_GET['searchInput']) . '&pagina=' . $i . '">' . $i . '</a></li>';
                }
                
                // Botón "Siguiente"
                echo ($paginaActual < $totalPaginas) 
                    ? '<li class="page-item"><a class="page-link" href="?searchInput=' . urlencode($_GET['searchInput']) . '&pagina=' . ($paginaActual + 1) . '">&gt;</a></li>'
                    : '<li class="page-item disabled"><span class="page-link">&gt;</span></li>';
                
                echo '</ul>';
            }
        }
        ?>

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
        <!-- Libros por Carrera -->
        <?php
        $librosPorPagina = 8;

        foreach ($carreras as $nombre => $datos):
            $idCarrera = $datos['id'];
            $totalLibros = $librosPorCarrera[$idCarrera]->num_rows;
            $totalPaginas = ceil($totalLibros / $librosPorPagina);
        ?>
            <div id="libros-<?php echo $idCarrera; ?>" class="libros-container">
                <?php if ($totalLibros > 0): ?>
                    <ul class="book-list" id="book-list-<?php echo $idCarrera; ?>" data-total="<?php echo $totalLibros; ?>">
                        <?php 
                        $contador = 0;
                        while ($libro = $librosPorCarrera[$idCarrera]->fetch_assoc()): 
                            if ($contador >= $librosPorPagina) break;
                        ?>
                            <li class="product-item">
                                <div class="libro-card">
                                    <img src="<?php echo base_url . 'Assets/img/libros/' . $libro['imagen']; ?>" 
                                        alt="Portada del libro" class="img-thumbnail">
                                    <h3><?php echo htmlspecialchars(utf8_decode($libro['titulo']), ENT_QUOTES, 'UTF-8'); ?></h3>
                                    <button class="btn-mas" data-libro='<?php echo json_encode($libro, JSON_HEX_APOS | JSON_HEX_QUOT); ?>'>
                                        Más...
                                    </button>
                                </div>
                            </li>
                        <?php 
                            $contador++;
                        endwhile; 
                        ?>
                    </ul>
                    <!-- Paginador -->
                    <ul class="pagination" id="pagination-<?php echo $idCarrera; ?>" data-carrera="<?php echo $idCarrera; ?>">
                        <!-- Flecha izquierda -->
                        <li class="page-item">
                            <a class="page-link" href="#" onclick="cambiarPagina('<?php echo $idCarrera; ?>', 'prev', event)"><</a>
                        </li>

                        <?php for ($i = 1; $i <= $totalPaginas; $i++): ?>
                            <li class="page-item <?php echo ($i === 1) ? 'active' : ''; ?>">
                                <a class="page-link" href="#" onclick="cambiarPagina('<?php echo $idCarrera; ?>', <?php echo $i; ?>, event)"><?php echo $i; ?></a>
                            </li>
                        <?php endfor; ?>

                        <!-- Flecha derecha -->
                        <li class="page-item">
                            <a class="page-link" href="#" onclick="cambiarPagina('<?php echo $idCarrera; ?>', 'next', event)">></a>
                        </li>
                    </ul>
                <?php else: ?>
                    <p class="p2">No hay libros disponibles para esta carrera.</p>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>

            <!-- Modal (compartido para todas las listas de libros) -->
            <div id="modalLibro" class="modal" style="display:none;">
                <div class="modal-content">
                    <span class="close" onclick="cerrarModal()">&times;</span>
                    <h3 id="modalTitulo"></h3>
                    <img id="modalImagen" class="img-thumbnail" alt="Portada del libro">
                    <div class="modal-info">
                        <p><strong>Disponible:</strong> <span id="modalCantidad"></span></p>
                        <p><strong>Páginas:</strong> <span id="modalPaginas"></span></p>
                        <p><strong>Autor:</strong> <span id="modalAutor"></span></p>
                        <p><strong>Editorial:</strong> <span id="modalEditorial"></span></p>
                        <p><strong>ISBN:</strong> <span id="modalISBN"></span></p>
                        <p><strong>Total Préstamos:</strong> <span id="modalPrestamos"></span></p>
                        <p><strong>Descripción:</strong> <span id="modalDescripcion"></span></p>
                    </div>
                </div>
            </div>

            <h2>Libros con Mayor Consecuencia</h2>
            <div class="product-gridet">
                <ul id="bookList" class="book-list">
                    <?php while ($libro = $resultado1->fetch_assoc()) { ?>
                        <li class="product-item">
                            <div class="libro-card">
                                <img src="<?php echo base_url . 'Assets/img/libros/' . $libro['imagen']; ?>" 
                                    alt="Portada del libro" class="img-thumbnail">
                                <h3><?php echo htmlspecialchars(utf8_decode($libro['titulo']), ENT_QUOTES, 'UTF-8'); ?></h3>
                                <button class="btn-mas" data-libro='<?php echo json_encode($libro, JSON_HEX_APOS | JSON_HEX_QUOT); ?>'>
                                    Más...
                                </button>
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
                    <h3 class="h3info">Ubicación</h3>
                    <p>Av. Garcilazo de la Vega S/N Tamburco - Abancay - Apurímac</p>
                </div>
                <div>
                    <h3 class="h3info">Horario de Atención</h3>
                    <p>Lunes a Viernes de 7:30 a 15:30</p>
                </div>
                <div>
                    <h3 class="h3info">Contacto</h3>
                    <p>Central telefónica: 083-321965</p>
                </div>
            </div>
        </div>
    </footer>
    <script>
        const BASE_URL = "<?php echo base_url; ?>";
    </script>
    <script src="../../Assets/js/catalogo.js"></script>
</body>
</html>
