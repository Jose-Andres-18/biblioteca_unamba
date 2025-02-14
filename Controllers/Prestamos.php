<?php
class Prestamos extends Controller
{
    public function __construct()
    {
        session_start();
        if (empty($_SESSION['activo'])) {
            header("location: " . base_url);
        }
        parent::__construct();
        $id_user = $_SESSION['id_usuario'];
        $perm = $this->model->verificarPermisos($id_user, "Prestamos");
        if (!$perm && $id_user != 1) {
            $this->views->getView($this, "permisos");
            exit;
        }
    }
    public function index()
    {
        $this->views->getView($this, "index");
    }
    public function listar()
    {
        $data = $this->model->getPrestamos();
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge badge-secondary">Prestado</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-icon btn-sm btn btn-primary" type="button" title="Entregar" onclick="btnEntregar(' . $data[$i]['id'] . ');">
                    <i class="fa fa-hourglass-start"></i>
                </button>
                <button class="btn btn-icon btn-sm btn btn-success" type="button" title="Editar" onclick="btnEditarPrestamo(' . $data[$i]['id'] . ');">
                    <i class="fa fa-pencil-square-o"></i>
                </button>
                <a class="btn btn-icon btn-sm btn btn-danger" target="_blank" title="Generar Ticket" href="'.base_url.'Prestamos/ticked/'. $data[$i]['id'].'">
                    <i class="fa fa-file-pdf-o"></i>
                </a>
                <div/>';
            } else {
                $data[$i]['estado'] = '<span class="badge badge-primary">Devuelto</span>';
                $data[$i]['acciones'] = '<div>
                <a class="btn btn-icon btn-sm btn btn-danger" target="_blank" title="Generar Ticket" href="'.base_url.'Prestamos/ticked/'. $data[$i]['id'].'">
                    <i class="fa fa-file-pdf-o"></i>
                </a>
                <div/>';
            }
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function registrar()
    {
        $libro = strClean($_POST['libro']);
        $estudiante = strClean($_POST['estudiante']);
        $cantidad = 1;
        $fecha_prestamo = strClean($_POST['fecha_prestamo']);
        $fecha_devolucion = strClean($_POST['fecha_devolucion']);
        $observacion = strClean($_POST['observacion']);
        $usuario = strClean($_SESSION['id_usuario']);
        $id = strClean($_POST['id']);
        if (empty($libro) || empty($estudiante) || empty($fecha_prestamo) || empty($fecha_devolucion)) {
            $msg = array('msg' => 'Todo los campos son requeridos', 'icono' => 'warning');
        } else {
            $verificar_cant = $this->model->getCantLibro($libro);
            if ($id == "") {
                $data = $this->model->insertarPrestamo($estudiante, $libro, $fecha_prestamo, $fecha_devolucion, $observacion, $usuario);
                if (is_numeric($data) && $data > 0) {
                    $msg = array('msg' => 'Libro Prestado', 'icono' => 'success', 'id' => $data);
                } else {
                    $msg = array('msg' => 'El estudiante tiene un préstamo pendiente.', 'icono' => 'warning');
                }   
            } else {
                $data = $this->model->actualizarPrestamo2($estudiante, $libro, $fecha_prestamo, $fecha_devolucion, $observacion, $id);
                if ($data == "modificado") {
                    $msg = array('msg' => 'Prestamo modificado', 'icono' => 'success');
                } else {
                    $msg = array('msg' => 'Error al prestar', 'icono' => 'error');
                }
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function editar($id)
    {
        $data = $this->model->editPrestamo($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function entregar($id)
    {
        $datos = $this->model->actualizarPrestamo(0, $id);
        if ($datos == "ok") {
            $msg = array('msg' => 'Libro recibido', 'icono' => 'success');
        }else{
            $msg = array('msg' => 'Error al recibir el libro', 'icono' => 'error');
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();

    }
    public function pdf()
    {
        $datos = $this->model->selectDatos();
        $prestamo = $this->model->selectPrestamoDebe();
        if (empty($prestamo)) {
            header('Location: ' . base_url . 'Configuracion/vacio');
        }
        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', 'letter');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetTitle("Prestamos");
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(195, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

        $pdf->Image(base_url. "Assets/img/logo.png", 180, 10, 23, 23, 'PNG');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, $datos['telefono'], 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Dirección: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, "Correo: ", 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, utf8_decode($datos['correo']), 0, 1, 'L');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(196, 5, utf8_decode("Detalle de Préstamos(Libros Prestados)"), 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(12, 5, utf8_decode('N°'), 1, 0, 'L');
        $pdf->Cell(30, 5, utf8_decode('Código Est.'), 1, 0, 'L');
        $pdf->Cell(89, 5, 'Libros', 1, 0, 'L');
        $pdf->Cell(30, 5, 'Fecha Prestamo', 1, 0, 'L');
        $pdf->Cell(35, 5, 'Fecha Devolución', 1, 1, 'L');
        $pdf->SetFont('Arial', '', 10);
        $contador = 1;
        foreach ($prestamo as $row) {
            $pdf->Cell(12, 5, $contador, 1, 0, 'L');
            $pdf->Cell(30, 5, $row['codigo'], 1, 0, 'L');
            $pdf->Cell(89, 5, utf8_decode($row['titulo']), 1, 0, 'L');
            $pdf->Cell(30, 5, $row['fecha_prestamo'], 1, 0, 'L');
            $pdf->Cell(35, 5, $row['fecha_devolucion'], 1, 1, 'L');
            $contador++;
        }
        $pdf->Output("prestamos.pdf", "I");
    }
    public function ticked($id_prestamo)
    {
        $datos = $this->model->selectDatos();
        $prestamo = $this->model->getPrestamoLibro($id_prestamo);
        if (empty($prestamo)) {
            header('Location: '.base_url. 'Configuracion/vacio');
        }
        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', array(80, 200));
        $pdf->AddPage();
        $pdf->SetMargins(5, 5, 5);
        $pdf->SetTitle("Prestamos");
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(65, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

        $pdf->Image(base_url . "Assets/img/logo.png", 55, 15, 20, 20, 'PNG');
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->Cell(15, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(15, 5, $datos['telefono'], 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->Cell(15, 5, utf8_decode("Dirección: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(15, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->Cell(15, 5, "Correo: ", 0, 0, 'L');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(15, 5, utf8_decode($datos['correo']), 0, 1, 'L');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 8);
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(72, 5, "Detalle de Prestamos", 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(60, 5, 'Libros', 1, 0, 'L');
        $pdf->Cell(12, 5, 'Cant.', 1, 1, 'L');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(60, 5, utf8_decode($prestamo['titulo']), 1, 0, 'L');
        $pdf->Cell(12, 5, $prestamo['cantidad'], 1, 1, 'L');
        $pdf->Ln();
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(72, 5, "Estudiante", 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(20, 5, 'Nombre.', 1, 0, 'L');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(52, 5, $prestamo['nombre_estudiante'], 1, 0, 'L');
        
        //Fechas
        $pdf->Ln();
        //Fechas
        $pdf->Ln();
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(72, 5, "Fechas", 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(36, 5, utf8_decode('F_Préstamo'), 1, 0, 'L');
        $pdf->Cell(36, 5, utf8_decode('F_Devolución'), 1, 1, 'L');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell(36, 5, $prestamo['fecha_prestamo'], 1, 0, 'L');
        $pdf->Cell(36, 5, $prestamo['fecha_devolucion'], 1, 1, 'L');
        //Observación
        $pdf->Ln();
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(72, 5, utf8_decode("Observación"), 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetFont('Arial', '', 8);
        $pdf->MultiCell(72, 5, utf8_decode($prestamo['observacion']), 1, 'L');

        $pdf->Output("prestamos.pdf", "I");
    }
    public function LibrosMasPrestado()
    {
        $datos = $this->model->selectDatos();
        $prestamo = $this->model->selectMayorPrestamo();
        if (empty($prestamo)) {
            header('Location: ' . base_url . 'Configuracion/vacio');
        }
        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', 'letter');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetTitle("Conteo de libros prestados");
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(195, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

        $pdf->Image(base_url. "Assets/img/logo.png", 180, 10, 23, 23, 'PNG');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, $datos['telefono'], 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Dirección: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, "Correo: ", 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(12, 5, utf8_decode($datos['correo']), 0, 1, 'L');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(196, 5, utf8_decode("Libros con Mayor Demanda de Préstamos"), 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(6, 5, utf8_decode('N°'), 1, 0, 'L');
        $pdf->Cell(10, 5, utf8_decode('Prest.'), 1, 0, 'L');
        $pdf->Cell(81, 5, utf8_decode('Libro'), 1, 0, 'L');
        $pdf->Cell(28, 5, 'ISBN', 1, 0, 'L');
        $pdf->Cell(43, 5, 'Autor', 1, 0, 'L');
        $pdf->Cell(20, 5, utf8_decode('Año'), 1, 0, 'L');
        $pdf->Cell(8, 5, 'Can.', 1, 1, 'L');
        $pdf->SetFont('Arial', '', 10);
        $contador = 1;
        foreach ($prestamo as $row) {
            $pdf->Cell(6, 5, $contador, 1, 0, 'L');
            $pdf->Cell(10, 5, $row['total_prestamos'], 1, 0, 'L');
            $pdf->Cell(81, 5, utf8_decode($row['libro']), 1, 0, 'L');
            $pdf->Cell(28, 5, $row['isbn'], 1, 0, 'L');
            $pdf->Cell(43, 5, utf8_decode($row['autor']), 1, 0, 'L');
            $pdf->Cell(20, 5, $row['anio_edicion'], 1, 0, 'L');
            $pdf->Cell(8, 5, $row['cantidad'], 1, 1, 'L');
            $contador++;
        }
        $pdf->Output("prestamos.pdf", "I");
    }
    public function LibrosStockCritico()
    {
        $datos = $this->model->selectDatos();
        $prestamo = $this->model->selectStockCritico();
        if (empty($prestamo)) {
            header('Location: ' . base_url . 'Configuracion/vacio');
        }
        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', 'letter');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetTitle("Libros con Stock crítico");
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(195, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

        $pdf->Image(base_url . "Assets/img/logo.png", 180, 10, 23, 23, 'PNG');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, $datos['telefono'], 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Dirección: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, "Correo: ", 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(12, 5, utf8_decode($datos['correo']), 0, 1, 'L');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(196, 5, utf8_decode("Libros con Stock Crítico"), 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);

        // Encabezado de la tabla
        $pdf->Cell(12, 6, 'N°', 1, 0, 'C');
        $pdf->Cell(50, 6, utf8_decode('Libro'), 1, 0, 'C');
        $pdf->Cell(15, 6, 'Cant.', 1, 0, 'C');
        $pdf->Cell(50, 6, utf8_decode('Editorial'), 1, 0, 'C');
        $pdf->Cell(30, 6, utf8_decode('Año Edición'), 1, 0, 'C');
        $pdf->Cell(39, 6, 'ISBN', 1, 1, 'C');

        $pdf->SetFont('Arial', '', 9);
        $contador = 1;

        // Recorremos los datos
        foreach ($prestamo as $row) {
            $yInicio = $pdf->GetY();
            
            // Obtener la altura máxima de las celdas con MultiCell
            $pdf->SetXY(22, $yInicio);
            $pdf->MultiCell(50, 6, utf8_decode($row['titulo']), 0, 'L');
            $alturaLibro = $pdf->GetY() - $yInicio;

            $pdf->SetXY(87, $yInicio);
            $pdf->MultiCell(50, 6, utf8_decode($row['editorial']), 0, 'L');
            $alturaEditorial = $pdf->GetY() - $yInicio;

            // Definir la altura de la fila como la mayor altura
            $alturaFila = max($alturaLibro, $alturaEditorial);

            // Ajustar las celdas con la altura calculada
            $pdf->SetXY(10, $yInicio);
            $pdf->Cell(12, $alturaFila, $contador, 1, 0, 'C');
            $pdf->SetXY(22, $yInicio);
            $pdf->MultiCell(50, 6, utf8_decode($row['titulo']), 1, 'L'); 
            $pdf->SetXY(72, $yInicio);
            $pdf->Cell(15, $alturaFila, $row['cantidad'], 1, 0, 'C');
            $pdf->SetXY(87, $yInicio);
            $pdf->MultiCell(50, 6, utf8_decode($row['editorial']), 1, 'L'); 
            $pdf->SetXY(137, $yInicio);
            $pdf->Cell(30, $alturaFila, $row['anio_edicion'], 1, 0, 'C');
            $pdf->SetXY(167, $yInicio);
            $pdf->Cell(39, $alturaFila, $row['isbn'], 1, 1, 'C');

            $contador++;
        }

        $pdf->Output("libros_stock_critico.pdf", "I");
    }

    public function LibrosPorPeriodo()
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
        $fechaInicio = $_REQUEST['FechaInicio'] ?? null;
        $fechaFin = $_REQUEST['FechaFin'] ?? null;

        if ($fechaInicio && $fechaFin) {
            if (strtotime($fechaInicio) > strtotime($fechaFin)) {
                echo '
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                    <div style="padding: 15px; background-color: #f44336; color: white; text-align: center; border-radius: 5px;">
                        <strong>Error!</strong> La fecha de inicio no puede ser mayor que la fecha de fin.
                    </div>
                </div>';
                return;
            }

            $datos = $this->model->selectDatos();
            $prestamo = $this->model->selectPrestamosPorPeriodo($fechaInicio, $fechaFin);

            if (empty($prestamo)) {
                header('Location: ' . base_url . 'Configuracion/vacio');
            }
            require_once 'Libraries/pdf/fpdf.php';
            $pdf = new FPDF('P', 'mm', 'letter');
            $pdf->AddPage();
            $pdf->SetMargins(10, 10, 10);
            $pdf->SetTitle("Libros consultados por periodo");
            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(195, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

            $pdf->Image(base_url . "Assets/img/logo.png", 180, 10, 23, 23, 'PNG');
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(20, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
            $pdf->SetFont('Arial', '', 10);
            $pdf->Cell(20, 5, $datos['telefono'], 0, 1, 'L');
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(20, 5, utf8_decode("Dirección: "), 0, 0, 'L');
            $pdf->SetFont('Arial', '', 10);
            $pdf->Cell(20, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(20, 5, "Correo: ", 0, 0, 'L');
            $pdf->SetFont('Arial', '', 10);
            $pdf->Cell(12, 5, utf8_decode($datos['correo']), 0, 1, 'L');
            $pdf->Ln();
            $pdf->SetFont('Arial', 'B', 10);
            $pdf->SetFillColor(0, 0, 0);
            $pdf->SetTextColor(255, 255, 255);
            $pdf->Cell(196, 5, utf8_decode(sprintf("Detalle de Libros del [%s] al [%s]", $fechaInicio, $fechaFin)), 1, 1, 'C', 1);
            $pdf->SetTextColor(0, 0, 0);
            $pdf->Cell(12, 5, utf8_decode('N°'), 1, 0, 'L');
            $pdf->Cell(29, 5, 'ISBN', 1, 0, 'L');
            $pdf->Cell(85, 5, utf8_decode('Libro'), 1, 0, 'L');
            $pdf->Cell(35, 5, utf8_decode('Fecha Préstamo'), 1, 0, 'L');
            $pdf->Cell(35, 5, utf8_decode('Fecha Devolución'), 1, 1, 'L');
            $pdf->SetFont('Arial', '', 10);
            $contador = 1;
            foreach ($prestamo as $row) {
                $pdf->Cell(12, 5, $contador, 1, 0, 'L');
                $pdf->Cell(29, 5, $row['isbn'], 1, 0, 'L');
                $pdf->Cell(85, 5, utf8_decode($row['titulo']), 1, 0, 'L');
                $pdf->Cell(35, 5, utf8_decode($row['fecha_prestamo']), 1, 0, 'L');
                $pdf->Cell(35, 5, utf8_decode($row['fecha_devolucion']), 1, 1, 'L');
                $contador++;
            }
            $pdf->Output("prestamos.pdf", "I");
        } else {
            echo '
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                <div style="padding: 15px; background-color: #f44336; color: white; text-align: center; border-radius: 5px;">
                    <strong>Error!</strong> Fechas no proporcionadas.
                </div>
            </div>';
        }
    } else {
        http_response_code(405);
    }
}
 
    public function EstudianteMayorDemanda()
    {
        $datos = $this->model->selectDatos();
        $prestamos = $this->model->selectEstudianteMasPrestamo();

        if (empty($prestamos)) {
            header('Location: ' . base_url . 'Configuracion/vacio');
            return;
        }

        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', 'letter');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetTitle("Estudiantes con Mas Prestamos");

        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', 'letter');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetTitle("Conteo de libros prestados");
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(195, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

        // Información del encabezado
        $pdf->Image(base_url . "Assets/img/logo.png", 180, 10, 23, 23, 'PNG');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, $datos['telefono'], 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Dirección: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, "Correo: ", 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(12, 5, utf8_decode($datos['correo']), 0, 1, 'L');
        
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(196, 5, "Estudiantes con Mas Prestamos", 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(12, 5, utf8_decode('N°'), 1, 0, 'L');
        $pdf->Cell(20, 5, utf8_decode('Código'), 1, 0, 'L');
        $pdf->Cell(55, 5, utf8_decode('Nombre'), 1, 0, 'L');
        $pdf->Cell(95, 5, 'Carrera', 1, 0, 'L');
        $pdf->Cell(14, 5, 'Total', 1, 1, 'L');

        $pdf->SetFont('Arial', '', 10);
        $contador = 1;
        
        foreach ($prestamos as $row) {
            $pdf->Cell(12, 5, $contador, 1, 0, 'L');
            $pdf->Cell(20, 5, utf8_decode($row['codigo']), 1, 0, 'L');
            $pdf->Cell(55, 5, utf8_decode($row['nombre']), 1, 0, 'L');
            $pdf->Cell(95, 5, utf8_decode($row['carrera']), 1, 0, 'L');
            $pdf->Cell(14, 5, $row['total_prestamos'], 1, 1, 'L');
            $contador++;
        }
        $pdf->Output("prestamos.pdf", "I");
    }
    public function MateriaMayorDemanda()
    {
        $datos = $this->model->selectDatos();
        $prestamo = $this->model->selectMayorMateria();
        if (empty($prestamo)) {
            header('Location: ' . base_url . 'Configuracion/vacio');
        }
        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', 'letter');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetTitle("Conteo de libros prestados");
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(195, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

        $pdf->Image(base_url. "Assets/img/logo.png", 180, 10, 23, 23, 'PNG');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, $datos['telefono'], 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Dirección: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, "Correo: ", 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(12, 5, utf8_decode($datos['correo']), 0, 1, 'L');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(196, 5, utf8_decode("Áreas con Mayor Préstamo"), 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(12, 5, utf8_decode('N°'), 1, 0, 'L');
        $pdf->Cell(134, 5, utf8_decode('Materia'), 1,0, 'L');
        $pdf->Cell(50, 5, utf8_decode('Cant. de libros prestados'), 1, 1, 'L');
        $pdf->SetFont('Arial', '', 10);
        $contador = 1;
        foreach ($prestamo as $row) {
            $pdf->Cell(12, 5, $contador, 1, 0, 'L');
            $pdf->Cell(134, 5, utf8_decode($row['materia']), 1, 0, 'L');
            $pdf->Cell(50, 5, $row['total_prestamos'], 1, 1, 'L');
            $contador++;
        }
        $pdf->Output("prestamos.pdf", "I");
    }
    public function CarreraMayorDemanda()
    {
        $datos = $this->model->selectDatos();
        $prestamo = $this->model->selectMayorCarrera();
        if (empty($prestamo)) {
            header('Location: ' . base_url . 'Configuracion/vacio');
        }
        require_once 'Libraries/pdf/fpdf.php';
        $pdf = new FPDF('P', 'mm', 'letter');
        $pdf->AddPage();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetTitle("Conteo de libros prestados");
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(195, 5, utf8_decode($datos['nombre']), 0, 1, 'C');

        $pdf->Image(base_url. "Assets/img/logo.png", 180, 10, 23, 23, 'PNG');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Teléfono: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, $datos['telefono'], 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, utf8_decode("Dirección: "), 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(20, 5, utf8_decode($datos['direccion']), 0, 1, 'L');
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(20, 5, "Correo: ", 0, 0, 'L');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell(12, 5, utf8_decode($datos['correo']), 0, 1, 'L');
        $pdf->Ln();
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->SetFillColor(0, 0, 0);
        $pdf->SetTextColor(255, 255, 255);
        $pdf->Cell(196, 5, utf8_decode("Escuela Profesional Con Mayor Solicitud de Préstamos"), 1, 1, 'C', 1);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->Cell(12, 5, utf8_decode('N°'), 1, 0, 'L');
        $pdf->Cell(134, 5, utf8_decode('Carrera Profesional'), 1, 0, 'L');
        $pdf->Cell(50, 5, utf8_decode('Cant. de libros prestados'), 1, 1, 'L');
        $pdf->SetFont('Arial', '', 10);
        $contador = 1;
        foreach ($prestamo as $row) {
            $pdf->Cell(12, 5, $contador, 1, 0, 'L');
            $pdf->Cell(134, 5, utf8_decode($row['carrera']), 1, 0, 'L');
            $pdf->Cell(50, 5, $row['total_prestamos'], 1, 1, 'L');
            $contador++;
        }
        $pdf->Output("prestamos.pdf", "I");
    }
}
