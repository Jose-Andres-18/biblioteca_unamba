<?php
class Estudiantes extends Controller
{
    public function __construct()
    {
        session_start();
        if (empty($_SESSION['activo'])) {
            header("location: " . base_url);
        }
        parent::__construct();
        $id_user = $_SESSION['id_usuario'];
        $perm = $this->model->verificarPermisos($id_user, "Estudiantes");
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
        $data = $this->model->getEstudiantes();
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1) {
                $data[$i]['estado'] = '<span class="badge badge-success">Activo</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-icon btn-sm btn btn-primary" type="button" title="Editar" onclick="btnEditarEst(' . $data[$i]['id'] . ');">
                    <i class="fa fa-pencil-square-o">
                </i></button>
                <button class="btn btn-icon btn-sm btn btn-danger" type="button" title="Desactivar" onclick="btnEliminarEst(' . $data[$i]['id'] . ');">
                    <i class="fa fa-trash-o"></i>
                </button>
                <div/>';
            } else {
                $data[$i]['estado'] = '<span class="badge badge-danger">Inactivo</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-icon btn-sm btn btn-success" type="button" title="Activar" onclick="btnReingresarEst(' . $data[$i]['id'] . ');">
                    <i class="fa fa-reply-all"></i>
                </button>
                <div/>';
            }
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function registrar()
    {
        $codigo = strClean($_POST['codigo']);
        $dni = strClean($_POST['dni']);
        $nombre = strClean($_POST['nombre']);
        $apellido_pa = strClean($_POST['apellido_pa']);
        $apellido_ma = strClean($_POST['apellido_ma']);
        $genero = strClean($_POST['genero']);
        $carrera = strClean($_POST['carrera']);
        $direccion = strClean($_POST['direccion']);
        $telefono = strClean($_POST['telefono']);
        $id = strClean($_POST['id']);
        
        if (empty($codigo) || empty($dni) || empty($nombre) || empty($apellido_pa) || empty($apellido_ma) || empty($carrera)) {
            $msg = array('msg' => 'Todo los campos son requeridos', 'icono' => 'warning');
        } else {
            if ($id == "") {
                $data = $this->model->insertarEstudiante($codigo, $dni, $nombre, $apellido_pa, $apellido_ma, $genero, $carrera, $direccion, $telefono);
                if ($data == "ok") {
                    $msg = array('msg' => 'Estudiante registrado', 'icono' => 'success');
                } else if ($data == "existe") {
                    $msg = array('msg' => 'El estudiante ya existe', 'icono' => 'warning');
                } else {
                    $msg = array('msg' => 'Error al registrar', 'icono' => 'error');
                }
            } else {
                $data = $this->model->actualizarEstudiante($codigo, $dni, $nombre, $apellido_pa, $apellido_ma, $genero, $carrera, $direccion, $telefono, $id);
                if ($data == "modificado") {
                    $msg = array('msg' => 'Estudiante modificado', 'icono' => 'success');
                } else if ($data == "existe") {
                    $msg = array('msg' => 'El estudiante ya existe', 'icono' => 'warning');
                } else {
                    $msg = array('msg' => 'Error al modificar', 'icono' => 'error');
                }
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function editar($id)
    {
        $data = $this->model->editEstudiante($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function eliminar($id)
    {
        $tienePrestamo = $this->model->verificarPrestamosPendientes($id);
        if ($tienePrestamo['total'] > 0) {
            $msg = array('msg' => 'Estudiante con préstamo pendiente', 'icono' => 'warning');
        } else {
            $data = $this->model->estadoEstudiante(0, $id);
            if ($data == 1) {
                $msg = array('msg' => 'Estudiante dado de baja', 'icono' => 'success');
            } else {
                $msg = array('msg' => 'Error al eliminar', 'icono' => 'error');
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function reingresar($id)
    {
        $data = $this->model->estadoEstudiante(1, $id);
        if ($data == 1) {
            $msg = array('msg' => 'Estudiante restaurado', 'icono' => 'success');
        } else {
            $msg = array('msg' => 'Error al restaurar', 'icono' => 'error');
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function buscarEstudiante()
    {
        if (isset($_GET['est'])) {
            $valor = $_GET['est'];
            $data = $this->model->buscarEstudiante($valor);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }
    }
    public function buscarCarrera()
    {
        if (isset($_GET['ca'])) {
            $valor = $_GET['ca'];
            $data = $this->model->buscarCarrera('free');
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
            die();
        }
    }
    /*
    public function buscarPersona() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $dni = $_POST['dni'] ?? '';

            $dniModel = new PersonaModel();
            $resultado = $dniModel->buscarPorNombres($dni);

            echo json_encode($resultado);
        }
    }*/
}
