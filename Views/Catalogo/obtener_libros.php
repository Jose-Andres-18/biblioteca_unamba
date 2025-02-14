<?php
include 'conexion.php';

$id_carrera = $_GET['id'];
$pagina = $_GET['pagina'];
$librosPorPagina = 8;
$offset = ($pagina - 1) * $librosPorPagina;

$query = "SELECT L.imagen, L.titulo, L.cantidad, L.num_pagina, A.autor, E.editorial, L.isbn, L.descripcion, COUNT(P.id_libro) AS total_prestamos
          FROM libro L
          INNER JOIN autor A ON L.id_autor = A.id
          INNER JOIN editorial E ON L.id_editorial = E.id
          INNER JOIN detalle_librocarrera LC ON L.id = LC.id_libro
          LEFT JOIN prestamo P ON L.id = P.id_libro
          WHERE LC.id_carrera = ?
          GROUP BY L.id
          ORDER BY total_prestamos DESC
          LIMIT ? OFFSET ?";

$stmt = $conexion->prepare($query);
$stmt->bind_param("iii", $id_carrera, $librosPorPagina, $offset);
$stmt->execute();
$result = $stmt->get_result();

$libros = [];
while ($libro = $result->fetch_assoc()) {
    $libros[] = $libro;
}

// Obtener total de libros para calcular páginas
$totalQuery = "SELECT COUNT(*) AS total FROM detalle_librocarrera WHERE id_carrera = ?";
$stmt = $conexion->prepare($totalQuery);
$stmt->bind_param("i", $id_carrera);
$stmt->execute();
$totalResult = $stmt->get_result();
$totalLibros = $totalResult->fetch_assoc()['total'];
$totalPaginas = ceil($totalLibros / $librosPorPagina);

echo json_encode(["libros" => $libros, "totalPaginas" => $totalPaginas]);
