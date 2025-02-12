<?php include "Views/Templates/header.php"; ?>
<div class="app-title">
    <div>
        <h1><i class="fa fa-dashboard"></i> Libros</h1>
    </div>
</div>
<button class="btn btn-primary mb-2" onclick="frmLibros()"><i class="fa fa-plus"></i> Agregar Libro</button>
<div class="row">
    <div class="col-lg-12">
        <div class="tile">
            <div class="tile-body">
                <div class="table-responsive">
                    <table class="table table-light mt-4" id="tblLibros">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Titulo</th>
                                <th>Autor</th>
                                <th>Editorial</th>
                                <th>Materia</th>
                                <th>Disponibilidad</th>
                                <th>ISBN</th>
                                <th>Foto</th>
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

<div id="nuevoLibro" class="modal fade" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="title">Registro Libro</h5>
                <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="frmLibro" class="row" onsubmit="registrarLibro(event)">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label for="titulo"><b>Título</b></label>
                            <input type="hidden" id="id" name="id">
                            <input id="titulo" class="form-control" type="text" name="titulo"
                                placeholder="Título del libro" required>
                            <span id="titulo-error" class="text-danger text-danger-tamaño"></span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="autor">Autor</label><br>
                            <select id="autor" class="form-control autor" name="autor" required
                                style="width: 100%; z-index: 10;">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="editorial">Editorial</label><br>
                            <select id="editorial" class="form-control editorial" name="editorial" required
                                style="width: 100%; z-index: 10;">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="materia">Materia</label><br>
                            <select id="materia" class="form-control materia" name="materia" required
                                style="width: 100%; z-index: 10;">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="isbn">ISBN</label><br>
                            <input id="isbn" class="form-control" type="text" name="isbn" placeholder="ISBN del libro"
                                required>
                            <span id="isbn-error" class="text-danger text-danger-tamaño"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="cantidad">Cantidad</label>
                            <input id="cantidad" class="form-control" type="number" name="cantidad" inputmode="numeric"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="Cantidad" min="1"
                                step="1" required>
                            <span id="cantidad-error" class="text-danger text-danger-tamaño"></span>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="num_pagina">Cantidad de página</label>
                            <input id="num_pagina" class="form-control" type="number" name="num_pagina"
                                placeholder="Cantidad Página" required min="1" [(ngModel)]="numPagina"
                                #num_pagina="ngModel" inputmode="numeric"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                            <span id="num_pagina-error" class="text-danger text-danger-tamaño"></span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="anio_edicion">Año Edición</label>
                            <input id="anio_edicion" class="form-control" type="date" name="anio_edicion"
                                value="<?php echo date("Y-m-d"); ?>" max="<?php echo date('Y-m-d'); ?>" required>
                        </div>
                        <div class="form-group">
                            <label>Logo</label>
                            <div class="card border-primary">
                                <div class="card-body">
                                    <input type="hidden" id="foto_actual" name="foto_actual">
                                    <label for="imagen" id="icon-image" class="btn btn-primary"><i
                                            class="fa fa-cloud-upload"></i></label>
                                    <span id="icon-cerrar"></span>
                                    <input id="imagen" class="d-none" type="file" name="imagen"
                                        onchange="preview(event)">
                                    <img class="img-thumbnail" id="img-preview" src="" width="150">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-group">
                            <label for="descripcion">Descripción</label>
                            <textarea id="descripcion" class="form-control" name="descripcion" rows="7" placeholder="Descripción"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group text-center">
                            <button class="btn btn-primary" type="submit" id="btnAccion">
                                <i class="fa fa-check"></i>
                                Registrar</button>
                            <button class="btn btn-danger" type="button" data-dismiss="modal" onclick="limpiarCamposLibro()">
                                <i class="fa fa-arrow-left"></i>
                                Atras
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div id="carreras" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white">Asignar Carreras</h5>
                <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="frmCarreras">
                </form>
            </div>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>