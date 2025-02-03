<?php
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
      $codigo = htmlspecialchars($_POST['codigo']);
      $carrera = htmlspecialchars($_POST['carrera']);
      $libro = htmlspecialchars($_POST['libro']);

      $to = "221178@unamba.edu.pe"; // Dirección de correo de destino
      $subject = "Reserva de Libro - $libro";
      $message = "Código de Estudiante: $codigo\nCarrera Profesional: $carrera\nLibro Solicitado: $libro";
      $headers = "From: 221178@unamba.edu.pe";

      if (mail($to, $subject, $message, $headers)) {
          echo "Correo enviado correctamente.";
      } else {
          echo "Error al enviar el correo.";
      }
  }
  ?>