<?php
class EstudiantesModel extends Query{
    public function __construct()
    {
        parent::__construct();
    }
    public function getEstudiantes()
    {
        $sql = "SELECT * FROM estudiante";
        //$sql = "SELECT e.*, c.carrera FROM estudiante e INNER JOIN carrera c ON e.id_carrera = c.id";
        $res = $this->selectAll($sql);
        return $res;
    }
    public function insertarEstudiante($codigo, $dni, $nombre, $apellido_pa, $apellido_ma, $genero, $carrera, $direccion, $telefono)
    {
        $verificar = "SELECT * FROM estudiante WHERE codigo = '$codigo' OR dni = '$dni'";
        $existe = $this->select($verificar);
        
        // Validar que el código tenga exactamente 6 dígitos numéricos
        if (!preg_match('/^\d{6}$/', $codigo)) {
            return "error_codigo";
        }
    
        // Validar que el DNI tenga exactamente 8 dígitos numéricos
        if (!preg_match('/^\d{8}$/', $dni)) {
            return "error_dni";
        }
    
        // Validar que el teléfono tenga exactamente 9 dígitos numéricos
        if (!preg_match('/^\d{9}$/', $telefono)) {
            return "error_telefono";
        }
        
        if (empty($existe)) {
            $query = "INSERT INTO estudiante(codigo,dni,nombre,apellido_pa,apellido_ma,genero,carrera,direccion,telefono) VALUES (?,?,?,?,?,?,?,?,?)";
            $datos = array($codigo, $dni, $nombre, $apellido_pa, $apellido_ma, $genero, $carrera, $direccion, $telefono);
            $data = $this->save($query, $datos);
            if ($data == 1) {
                $res = "ok";
            } else {
                $res = "error";
            }
        } else {
            $res = "existe";
        }
        return $res;
    }
    public function editEstudiante($id)
    {
        $sql = "SELECT * FROM estudiante WHERE id = $id";
        $res = $this->select($sql);
        return $res;
    }
    public function actualizarEstudiante($codigo, $dni, $nombre, $apellido_pa, $apellido_ma, $genero, $carrera, $direccion, $telefono, $id)
    {
        $query = "UPDATE estudiante SET codigo = ?, dni = ?, nombre = ?, apellido_pa = ?, apellido_ma = ?, genero = ?, carrera = ?, direccion = ?, telefono = ?  WHERE id = ?";
        $datos = array($codigo, $dni, $nombre, $apellido_pa, $apellido_ma, $genero, $carrera, $direccion, $telefono, $id);
        $data = $this->save($query, $datos);
        if ($data == 1) {
            $res = "modificado";
        } else {
            $res = "error";
        }
        return $res;
    }
    public function estadoEstudiante($estado, $id)
    {
        $query = "UPDATE estudiante SET estado = ? WHERE id = ?";
        $datos = array($estado, $id);
        $data = $this->save($query, $datos);
        return $data;
    }
    public function buscarEstudiante($valor)
    {
        $sql = "SELECT id, codigo, nombre AS text FROM estudiante WHERE codigo LIKE '%" . $valor . "%' AND estado = 1 OR nombre LIKE '%" . $valor . "%'  AND estado = 1 LIMIT 10";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function verificarPermisos($id_user, $permiso)
    {
        $tiene = false;
        $sql = "SELECT p.*, d.* FROM permisos p INNER JOIN detalle_permisos d ON p.id = d.id_permiso WHERE d.id_usuario = $id_user AND p.nombre = '$permiso'";
        $existe = $this->select($sql);
        if ($existe != null || $existe != "") {
            $tiene = true;
        }
        return $tiene;
    }
}
