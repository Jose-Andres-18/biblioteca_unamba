<?php
include 'conexion.php';

function obtenerLibrosPorCarrera($conexion, $id_carrera) {
    $query = "SELECT L.imagen,L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, L.isbn, L.descripcion, COUNT(P.id_libro) AS total_prestamos
              FROM libro L
              INNER JOIN autor A ON L.id_autor = A.id
              INNER JOIN editorial E ON L.id_editorial = E.id
              INNER JOIN detalle_librocarrera LC ON L.id = LC.id_libro
              LEFT JOIN prestamo P ON L.id = P.id_libro
              WHERE LC.id_carrera = ?
              GROUP BY L.id, L.imagen, L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, L.isbn, L.descripcion
              ORDER BY total_prestamos desc;";
    
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
$query1 = "SELECT 
            L.imagen, 
            L.titulo, 
            L.cantidad, 
            L.num_pagina, 
            A.autor, 
            E.editorial, 
            L.isbn, 
            L.descripcion, 
            COUNT(P.id_libro) AS total_prestamos
        FROM libro L
        INNER JOIN autor A ON L.id_autor = A.id
        INNER JOIN editorial E ON L.id_editorial = E.id
        LEFT JOIN prestamo P ON L.id = P.id_libro
        GROUP BY L.id, L.imagen, L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, L.isbn, L.descripcion
        ORDER BY total_prestamos DESC
        LIMIT 7;
";
$resultado1 = $conexion->query($query1);

?>