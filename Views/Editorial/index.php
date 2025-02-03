<?php include "Views/Templates/header.php"; ?>
<div class="app-title">
    <div>
        <h1><i class="fa fa-dashboard"></i> Editorial</h1>
    </div>
</div>
<button class="btn btn-primary mb-2" type="button" onclick="frmEditorial()"><i class="fa fa-plus"></i> Agregar
    Editorial</button>
<div class="row">
    <div class="col-lg-12">
        <div class="tile">
            <div class="tile-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="tblEditorial">
                        <thead class="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
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
<div id="nuevoEditorial" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-title"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title text-white" id="title">Registro Editorial</h5>
                <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="frmEditorial" onsubmit="registrarEditorial(event)">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="editorial">Nombre</label>
                                <input type="hidden" id="id" name="id">
                                <input id="editorial" class="form-control" type="text" name="editorial" required
                                    placeholder="Nombre de Editorial">
                                <span id="editorial-error" class="text-danger text-danger-tamaño"></span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group text-center">
                                <button class="btn btn-primary" type="submit" id="btnAccion"
                                    <i class="fa fa-check"></i>
                                    Registrar</button>
                                <button class="btn btn-danger" type="button" data-dismiss="modal">
                                    <i class="fa fa-arrow-left"></i>
                                    Atras
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<?php include "Views/Templates/footer.php"; ?>