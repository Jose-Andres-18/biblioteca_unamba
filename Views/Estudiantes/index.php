<?php include "Views/Templates/header.php"; ?>
<div class="app-title">
    <div>
        <h1><i class="fa fa-dashboard"></i> Estudiantes</h1>
    </div>
</div>
<button class="btn btn-primary mb-2" type="button" onclick="frmEstudiante()"><i class="fa fa-plus"></i> Agregar Estudiante</button>
<div class="row">
    <div class="col-lg-12">
        <div class="tile">
            <div class="tile-body">
                <div class="table-responsive">
                    <table class="table table-light mt-4" id="tblEst">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Código</th>
                                <th>Dni</th>
                                <th>Nombre</th>
                                <th>Carrera</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="nuevoEstudiante" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title text-white" id="title">Registro Estudiante</h5>
                <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="frmEstudiante">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="codigo">Código</label>
                                <input type="hidden" id="id" name="id">
                                <input id="codigo" class="form-control" type="text" name="codigo" required placeholder="Código del estudiante" 
                                    pattern="^\d{6}$" maxlength="6" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                    title="El código debe tener exactamente 6 dígitos numéricos.">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="dni">DNI</label>
                                <input id="dni" class="form-control" type="text" name="dni" required placeholder="DNI" 
                                    pattern="^\d{8}$" maxlength="8" inputmode="numeric"  oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                    title="El DNI debe tener exactamente 8 dígitos numéricos.">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="nombre">Nombre</label>
                                <input id="nombre" class="form-control" type="text" name="nombre" required placeholder="Nombre completo" oninput="this.value = this.value.replace(/[^a-záéíóúA-ZÁÉÍÓÚÑñ\s]/g, '')">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="apellido_pa">Apellido Paterno</label>
                                <input id="apellido_pa" class="form-control" type="text" name="apellido_pa" required placeholder="Apellido completo"oninput="this.value=this.value.replace(/[^a-zA-Z]/g,'')">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="apellido_ma">Apellido Materno</label>
                                <input id="apellido_ma" class="form-control" type="text" name="apellido_ma" required placeholder="Apellido completo"oninput="this.value=this.value.replace(/[^a-zA-Z]/g,'')">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="carrera">Carrera</label><br>
                                <select id="carrera" class="form-control carrera" name="carrera" required style="width: 100%;">
                                
                                </select>
                                <!--<input id="carrera" class="form-control" type="text" name="carrera" required placeholder="Carrera">-->
                                
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="telefono">Télefono</label>
                                <input id="telefono" class="form-control" type="text" name="telefono" required placeholder="Teléfono"
                                    pattern="^9\d{8}$" maxlength="9" inputmode="numeric"  oninput="this.value = this.value.replace(/[^0-9]/g, '')" 
                                    title="El Número de celular es invalido.">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="direccion">Dirección</label>
                                <input id="direccion" class="form-control" type="text" name="direccion" required placeholder="Dirección">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <label for="genero">Género</label><br>
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="genero" id="genero_masculino" value="1" required>
                                <label class="form-check-label" for="genero_masculino">
                                    Masculino
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="genero" id="genero_femenino" value="0" required>
                                    <label class="form-check-label" for="genero_femenino_femenino">
                                        Femenino
                                    </label>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <button class="btn btn-primary" type="submit" onclick="registrarEstudiante(event)" id="btnAccion">Registrar</button>
                                <button class="btn btn-danger" type="button" data-dismiss="modal">Atras</button>
                            </div>
                        </div>
                    </div> 
                </form>
            </div>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>