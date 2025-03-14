let tblUsuarios, tblEst, tblMateria, tblAutor, tblEditorial, tblLibros, tblPrestar;
document.addEventListener("DOMContentLoaded", function(){
    document.querySelector("#modalPass").addEventListener("click", function () {
        document.querySelector('#frmCambiarPass').reset();
        $('#cambiarClave').modal('show');
    });
    
    const language = {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
    }
    const buttons = [{
                //Botón para Excel
                extend: 'excel',
                footer: true,
                title: 'Archivo',
                filename: 'Export_File',

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-success"><i class="fa fa-file-excel-o"></i></button>'
            },
            //Botón para PDF
            {
                extend: 'pdf',
                footer: true,
                title: 'Archivo PDF',
                filename: 'reporte',
                text: '<button class="btn btn-danger"><i class="fa fa-file-pdf-o"></i></button>'
            },
            //Botón para print
            {
                extend: 'print',
                footer: true,
                title: 'Reportes',
                filename: 'Export_File_print',
                text: '<button class="btn btn-info"><i class="fa fa-print"></i></button>'
            }
        ]

    //TABLA USUARIOS
    tblUsuarios = $('#tblUsuarios').DataTable({
        ajax: {
            url: base_url + "Usuarios/listar",
            dataSrc: ''
        },
        columns: [
            {'data' : 'id'},
            {'data': 'usuario'},
            {'data': 'nombre'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ],
        responsive: true,
        bDestroy: true,
        iDisplayLength: 10,
        order: [
            [0, "desc"]
        ],
        language,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons
    });
    //Fin de la tabla usuarios
    //TABLA ESTUDIANTES
    tblEst = $('#tblEst').DataTable({
        ajax: {
            url: base_url + "Estudiantes/listar",
            dataSrc: ''
        },
        columns: [{'data': 'id'},
            {'data': 'codigo'},
            {'data': 'dni'},
            {'data': 'nombre'},
            {
                'data': null, 
                'render': function(data, type, row) {
                    return row.apellido_pa + ' ' + row.apellido_ma;
                }
            },
            {'data': 'carrera'},
            {'data': 'direccion'},
            {'data': 'telefono'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ],
        columnDefs: [
            { width: '20%', targets: 5 }, // Columna "carrera" más corta
            { width: '12%', targets: 9 }  // Columna "acciones" más grande
        ],
        language,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons
    });
    //Fin de la tabla Estudiantes
    //TABLA MATERIA
    tblMateria = $('#tblMateria').DataTable({
        ajax: {
            url: base_url + "Materia/listar",
            dataSrc: ''
        },
        columns: [{'data': 'id'},
            {'data': 'materia'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ],
        language,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons
    });
    //Fin de la tabla Materias
    // TABLA AUTOR
    tblAutor = $('#tblAutor').DataTable({
        ajax: {
            url: base_url + "Autor/listar",
            dataSrc: ''
        },
        columns: [{'data': 'id'},
            {'data': 'imagen'},
            {'data': 'autor'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ],
        language,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons
    });
    //Fin de la tabla Autor
    //TABLA EDITORIAL
    tblEditorial= $('#tblEditorial').DataTable({
        ajax: {
            url: base_url + "Editorial/listar",
            dataSrc: ''
        },
        columns: [{'data': 'id'},
            {'data': 'editorial'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ],
        language,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons
    });
    //Fin de la tabla editorial
    //TABLA LIBROS
    tblLibros = $('#tblLibros').DataTable({
    ajax: {
        url: base_url + "Libros/listar",
        dataSrc: ''
    },
    columns: [
        {'data': 'id'},
        {'data': 'titulo'},
        {'data': 'autor'},
        {'data': 'editorial'},
        {'data': 'materia'},
        {'data': 'cantidad'},
        {'data': 'isbn'},
        {'data': 'foto'},
        {'data': 'estado'},
        {'data': 'acciones'}
    ],
    language,
    dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
         "<'row'<'col-sm-12'tr>>" +
         "<'row'<'col-sm-5'i><'col-sm-7'p>>",
    buttons,
    columnDefs: [
        {
            targets: 6, // Índice de la columna 'isbn'
            render: function (data) {
                if (data && data.length === 13) {
                    return data.replace(/^(\d{3})(\d{2})(\d{4})(\d{3})(\d{1})$/, '$1-$2-$3-$4-$5');
                }
                return data;
            }
        },
        {
            targets: [5], // Índice de la columna 'cantidad'
            width: '40px', // Tamaño de la columna
            className: 'text-center' // Centra el texto
        }
    ],
    order: [[0, 'asc']] // Ordena por la columna 'id' (cambiar a otro índice si es necesario)
});

    //fin Libros
    //TABLA PRESTAR
    tblPrestar = $('#tblPrestar').DataTable({
        ajax: {
            url: base_url + "Prestamos/listar",
            dataSrc: ''
        },
        columns: [{'data': 'id'},
            {'data': 'titulo'},
            {'data': 'codigo'},
            {
                'data': null, 
                'render': function(data, type, row) {
                    return row.nombre;
                }
            },
            {'data': 'carrera'},
            {'data': 'fecha_prestamo'},
            {'data': 'fecha_devolucion'},
            {'data': 'observacion'},
            {'data': 'estado'},
            {'data': 'acciones'}
        ],
        language,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons,
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [
            [0, "desc"]
        ]
    });
    //TABLA CARRERA
    tblCarrera = $('#tblCarrera').DataTable({
        ajax: {
            url: base_url + "Carrera/listar",
            dataSrc: ''
        },
        columns: [{'data': 'id'},
        {'data': 'carrera'},
        {'data': 'estado'}
        ],
        language,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons,
        "resonsieve": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [
            [0, "desc"]
        ]
    });
    //SPRING O SELECT
    //ESTUDIANTE
    $('.estudiante').select2({
        dropdownParent: $('#prestar'),
        placeholder: 'Buscar Estudiante',
        minimumInputLength: 2,
        ajax: {
            url: base_url + 'Estudiantes/buscarEstudiante',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    est: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true
        }
    });
    //LIBRO
    $('.libro').select2({
        dropdownParent: $('#prestar'),
        placeholder: 'Buscar Libro',
            minimumInputLength: 2,
            ajax: {
                url: base_url + 'Libros/buscarLibro',
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        lb: params.term
                    };
                },
                processResults: function (data) {
                    return {
                        results: data
                    };
                },
                cache: true
            }
    });
    //AUTOR
    $('.autor').select2({
        dropdownParent: $('#nuevoLibro'),
        placeholder: 'Buscar Autor',
        minimumInputLength: 2,
        ajax: {
            url: base_url + 'Autor/buscarAutor',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true
        }
    });
    //CARRERA
    $('.carrera').select2({
        dropdownParent: $('#nuevoEstudiante'),
        placeholder: 'Buscar Carrera',
        minimumInputLength: 2,
        ajax: {
            url: base_url + 'Carrera/buscarCarrera',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true
        }
    });
    //EDITORIAL
    $('.editorial').select2({
        dropdownParent: $('#nuevoLibro'),
        placeholder: 'Buscar Editorial',
        minimumInputLength: 2,
        ajax: {
            url: base_url + 'Editorial/buscarEditorial',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true
        }
    });
    //MATERIA
    $('.materia').select2({
        dropdownParent: $('#nuevoLibro'),
        placeholder: 'Buscar Materia',
        minimumInputLength: 2,
        ajax: {
            url: base_url + 'Materia/buscarMateria',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true
        }
    });
    // ENCONTRAR POR ID
    if (document.getElementById('nombre_estudiante')) {
        const http = new XMLHttpRequest();
        const url = base_url + 'Configuracion/verificar';
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                let html = '';
                res.forEach(row => {
                    html += `
                    <a class="app-notification__item" href="javascript:;">
                        <span class="app-notification__icon">
                            <span class="fa-stack fa-lg">
                                <i class="fa fa-circle fa-stack-2x text-primary"></i>
                                <i class="fa fa-user-o fa-stack-1x fa-inverse"></i>
                            </span>
                        </span>
                        <div>
                            <p class="app-notification__message">${row.nombre} ${row.apellido_pa} ${row.apellido_ma}</p>
                            <p class="app-notification__meta">${row.fecha_devolucion}</p>
                        </div>
                    </a>
                    `;
                });
                document.getElementById('nombre_estudiante').innerHTML = html; // Asegúrate de que este ID es un contenedor válido.
            }
        }
    }
    const btnCancelarPrestamo = document.getElementById("btnCancelarPrestamo");
    if (btnCancelarPrestamo) {
        btnCancelarPrestamo.addEventListener("click", function () {
            //limpiarCamposPrestamo();
        });
    }
    const btnCancelarLibro = document.getElementById("btnCancelarLibro");
    if (btnCancelarLibro) {
        btnCancelarLibro.addEventListener("click", function () {
            //limpiarCamposLibro();
        });
    }
    /*------------------------------- Validaciones para Modulo Estudiantes --------------------------------------*/
    //DNI
    const dniInput = document.getElementById("dni");
    if (dniInput) {
        dniInput.addEventListener("input", function () {
            const dni = this.value;
            const dniError = document.getElementById("dni-error");
            const regex = /^[0-9]{8}$/;
            const regex2 = /^(?!00000000)\d{8}$/;

            if (dni === "") {
                dniError.textContent = "El DNI es requerido.";
            } else if (!regex.test(dni)) {
                dniError.textContent = "El DNI debe tener exactamente 8 dígitos numéricos.";
            } else if (!regex2.test(dni)) {
                dniError.textContent = "El DNI no es válido.";
            } else {
                dniError.textContent = "";
            }
        });
        // Evento para filtrar la entrada de teclas: solo números
        dniInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[0-9]$/;

            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }
    // Función para encontrar nombres completos de personas por DNI en ConsultasPeru
    const buscarDniBtn = document.getElementById("buscar-dni");
    if (buscarDniBtn) {
        buscarDniBtn.addEventListener("click", function () {
            const dni = dniInput.value.trim();
            if (dni.length !== 8 || isNaN(dni)) {
                alert("Ingrese un DNI válido de 8 dígitos.");
                return;
            }

            fetch("https://api.consultasperu.com/api/v1/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "token": "79ccb10768a82c614f001110a60008d5855954c357a1da6b7fe10e7ef27d26db",
                    "type_document": "dni",
                    "document_number": dni
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('nombre').value = data.data.name;
                    document.getElementById('apellido_pa').value = data.data.surname.split(" ")[0] || "";
                    document.getElementById('apellido_ma').value = data.data.surname.split(" ")[1] || "";

                    document.getElementById('nombre').readOnly = true;
                    document.getElementById('apellido_pa').readOnly = true;
                    document.getElementById('apellido_ma').readOnly = true;
                } else {
                    document.getElementById('nombre').value = "";
                    document.getElementById('apellido_pa').value = "";
                    document.getElementById('apellido_ma').value = "";

                    document.getElementById('nombre').readOnly = false;
                    document.getElementById('apellido_pa').readOnly = false;
                    document.getElementById('apellido_ma').readOnly = false;

                    alert("DNI no encontrado. Ingrese los datos manualmente.");
                }
            })
            .catch(error => {
                console.error("Error en la API:", error);
                alert("Hubo un problema al consultar la API.");
            });
        });
    }

    //CODIGO
    const codigoInput = document.getElementById("codigo");
    if (codigoInput) {
        codigoInput.addEventListener("input", function () {
            const codigo = this.value;
            const codigoError = document.getElementById("codigo-error");
            const regex = /^[0-9]{6}$/;
    
            if (codigo === "") {
                codigoError.textContent = "El código es requerido.";
            } else if (!regex.test(codigo)) {
                codigoError.textContent = "El código debe ser de 6 dígitos numéricos.";
            } else {
                codigoError.textContent = "";
            }
        });
        // Evento para filtrar la entrada de teclas: solo números
        codigoInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[0-9]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }

    //NOMBRE 
    const nombreInput = document.getElementById("nombre");
    if(nombreInput){
        nombreInput.addEventListener("input", function () {
            const nombre = this.value;
            const nombreError = document.getElementById("nombre-error");
            const regex = /^[a-zA-Z\s]+$/;
    
            if (nombre === "") {
                nombreError.textContent = "El nombre es requerido.";
            } else if (!regex.test(nombre)) {
                nombreError.textContent = "El nombre solo puede contener letras y espacios.";
            } else {
                nombreError.textContent = "";
            }
        });
        // Evento para permitir solo letras y espacios
        nombreInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }
    
    //APELLIDO PATERNO 
    // Validación para el apellido (solo letras permitidas)
    const apellidopaInput = document.getElementById("apellido_pa");
    if(apellidopaInput){
        apellidopaInput.addEventListener("input", function () {
            const apellido = this.value;
            const apellidoError = document.getElementById("apellido-error");
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+$/;
    
            if (apellido === "") {
                apellidoError.textContent = "El apellido es requerido.";
            } else if (!regex.test(apellido)) {
                apellidoError.textContent = "El apellido solo puede contener letras.";
            } else {
                apellidoError.textContent = "";
            }
        });
        // Evento para permitir solo letras
        apellidopaInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            } 
        });
    }

    // APELLIDO MATERNO 
    // Validación para el apellido (solo letras permitidas)
    const apellidomaInput = document.getElementById("apellido_ma");
    if(apellidomaInput){
        apellidomaInput.addEventListener("input", function () {
            const apellido = this.value;
            const apellidoError = document.getElementById("apellido-error2");
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+$/;
    
            if (apellido === "") {
                apellidoError.textContent = "El apellido es requerido.";
            } else if (!regex.test(apellido)) {
                apellidoError.textContent = "El apellido solo puede contener letras.";
            } else {
                apellidoError.textContent = "";
            }
        });
        // Evento para permitir solo letras
        apellidomaInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }

    //TELEFONO
    const telefonoInput = document.getElementById("telefono")
        if (telefonoInput) {
            telefonoInput.addEventListener("input", function () {
                const telefono = this.value;
                const telefonoError = document.getElementById("telefono-error");
                const regex = /^[9][0-9]{8}$/;

                if (telefono === "") {
                    telefonoError.textContent = "El número de teléfono es requerido.";
                }  else if (!regex.test(telefono)) {
                    telefonoError.textContent = "El teléfono debe tener exactamente 9 dígitos.";
                } else {
                    telefonoError.textContent = "";
                }
            });
            // Evento para filtrar la entrada de teclas: solo números
            telefonoInput.addEventListener("keypress", function (e) {
                const key = e.key;
                const regex = /^[0-9]$/;

                if (!regex.test(key)) {
                    e.preventDefault();
                }
            });
        }

    //TITULO
    const tituloInput = document.getElementById("titulo");
    if(tituloInput){
        tituloInput.addEventListener("input", function () {
            const titulo = this.value;
            const tituloError = document.getElementById("titulo-error");
    
            if (titulo === "") {
                tituloError.textContent = "El título del libro es requerido.";
            } else {
                tituloError.textContent = "";
            }
        });
    }

    //ISBN
    const isbnInput = document.getElementById('isbn');
    if(isbnInput){
        isbnInput.addEventListener('input', function (event) {
            const input = event.target;
            
            // Eliminar caracteres no numéricos
            let value = input.value.replace(/\D/g, '');
            
            // Aplicar formato: 123-12-1234-123-1
            if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{1,2})/, '$1-$2');
            }
            if (value.length > 6) {
                value = value.replace(/^(\d{3})-(\d{2})(\d{1,4})/, '$1-$2-$3');
            }
            if (value.length > 10) {
                value = value.replace(/^(\d{3})-(\d{2})-(\d{4})(\d{1,3})/, '$1-$2-$3-$4');
            }
            if (value.length > 13) {
                value = value.replace(/^(\d{3})-(\d{2})-(\d{4})-(\d{3})(\d{1})/, '$1-$2-$3-$4-$5');
            }
            
            input.value = value;

            const isbn = this.value;
            const isbnError = document.getElementById("isbn-error");
            const regex = /^[0-9]{3}-[0-9]{2}-[0-9]{4}-[0-9]{3}-[0-9]{1}$/;
    
            if (isbn === "") {
                isbnError.textContent = "El isbn del libro es requerido.";
            } else if (!regex.test(isbn)) {
                isbnError.textContent = "El isbn del libro debe ser de 13 dígitos.";
            } else {
                isbnError.textContent = "";
            }
        });
        // Evento para permitir solo letras y espacios
        isbnInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[0-9]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }

    //CANTIDAD
    const cantidadInput = document.getElementById("cantidad");
    if (cantidadInput) {
        cantidadInput.addEventListener("input", function () {
            const cantidad = this.value;
            const cantidadError = document.getElementById("cantidad-error");
    
            if (cantidad === "") {
                cantidadError.textContent = "La cantidad o Stock del libro es requerido.";
            } else {
                cantidadError.textContent = "";
            }
        });
        // Evento para filtrar la entrada de teclas: solo números
        cantidadInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[0-9]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }

    //CANTIDAD DE PAGINAS
    const num_paginaInput = document.getElementById("num_pagina");
    if (num_paginaInput) {
        num_paginaInput.addEventListener("input", function () {
            const num_pagina = this.value;
            const num_paginaError = document.getElementById("num_pagina-error");
    
            if (num_pagina === "") {
                num_paginaError.textContent = "El número de páginas del libro es requerido.";
            } else {
                num_paginaError.textContent = "";
            }
        });
        // Evento para filtrar la entrada de teclas: solo números
        num_paginaInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[0-9]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }

    //AUTOR 
    const autorInput = document.getElementById("autor");
    if(autorInput){
        autorInput.addEventListener("input", function () {
            const autor = this.value;
            const autorError = document.getElementById("autor-error");
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    
            if (autor === "") {
                autorError.textContent = "El nombre del autor es requerido.";
            } else if (!regex.test(autor)) {
                autorError.textContent = "El nombre del autor solo puede contener letras y espacios.";
            } else {
                autorError.textContent = "";
            }
        });
        // Evento para permitir solo letras y espacios
        autorInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }
    //EDITORIAL
    const editorialInput = document.getElementById("editorial");
    if(editorialInput){
        editorialInput.addEventListener("input", function () {
            const editorial = this.value;
            const editorialError = document.getElementById("editorial-error");
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    
            if (editorial === "") {
                editorialError.textContent = "El nombre de la editorial es requerido.";
            } else if (!regex.test(editorial)) {
                editorialError.textContent = "El nombre del editorial solo puede contener letras y espacios.";
            } else {
                editorialError.textContent = "";
            }
        });
        // Evento para permitir solo letras y espacios
        editorialInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }
    //MATERIA
    const materiaInput = document.getElementById("materia");
    if(materiaInput){
        materiaInput.addEventListener("input", function () {
            const materia = this.value;
            const materiaError = document.getElementById("materia-error");
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    
            if (materia === "") {
                materiaError.textContent = "El nombre de la materia es requerido.";
            } else if (!regex.test(materia)) {
                materiaError.textContent = "El nombre del materia solo puede contener letras y espacios.";
            } else {
                materiaError.textContent = "";
            }
        });
        // Evento para permitir solo letras y espacios
        materiaInput.addEventListener("keypress", function (e) {
            const key = e.key;
            const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]$/;
    
            if (!regex.test(key)) {
                e.preventDefault();
            }
        });
    }
    //USUARIO
    const usuarioInput = document.getElementById("usuario");
    if(usuarioInput){
        usuarioInput.addEventListener("input", function () {
            const usuario = this.value;
            const usuarioError = document.getElementById("usuario-error");
    
            if (usuario === "") {
                usuarioError.textContent = "El usuario es requerido.";
            } else {
                usuarioError.textContent = "";
            }
        });
    }
    //NOMBRE DE USUARIOS
    const nombre_usuarioInput = document.getElementById("nombre_usuario");
    if(nombre_usuarioInput){
        nombre_usuarioInput.addEventListener("input", function () {
            const nombre_usuario = this.value;
            const nombre_usuarioError = document.getElementById("nombre_usuario-error");
    
            if (nombre_usuario === "") {
                nombre_usuarioError.textContent = "El nombre del usuario es requerido.";
            } else {
                nombre_usuarioError.textContent = "";
            }
        });
    }
    //CLAVE O CONTRASEÑA
    const claveInput = document.getElementById("clave");
    if(claveInput){
        claveInput.addEventListener("input", function () {
            const clave = this.value;
            const claveError = document.getElementById("clave-error");
    
            if (clave === "") {
                claveError.textContent = "La contraseña es requerida.";
            } else {
                claveError.textContent = "";
            }
        });
    }
    //CONFIRMAR CONTRASEÑA
    const confirmarInput = document.getElementById("confirmar");
    if(confirmarInput){
        confirmarInput.addEventListener("input", function () {
            const confirmar = this.value;
            const confirmarError = document.getElementById("confirmar-error");
            const clave = claveInput.value;
    
            if (confirmar === "") {
                confirmarError.textContent = "Confirmar contraseña es requerido.";
            } else if (confirmar !== clave) {
                confirmarError.textContent = "Las contraseñas no coincie.";
            } else {
                confirmarError.textContent = "";
            }
        });
    }

/*------------------------------- Validaciones para Modulo Estudiantes --------------------------------------*/
})
//FUNCION USUARIO
function frmUsuario() {
    document.getElementById("title").textContent = "Nuevo Usuario";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    document.getElementById("id").value = "";
    $("#nuevo_usuario").modal("show");
}
//FUNCION REGISTRAR USUARIO
function registrarUser(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario");
    const nombre = document.getElementById("nombre_usuario");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    if (usuario.value == "" || nombre.value == "") {
        alertas('Todo los campos son requeridos', 'warning');
    } else {
        const url = base_url + "Usuarios/registrar";
        const frm = document.getElementById("frmUsuario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                tblUsuarios.ajax.reload();
                alertas(res.msg, res.icono);
                if(res.icon == 'success'){
                    $("#nuevo_usuario").modal("hide");
                    frm.reset();
                }
            }
        }
    }
}
//FUNCION EDITAR USUARIO
function btnEditarUser(id) {
    document.getElementById("title").textContent = "Actualizar usuario";
    document.getElementById("btnAccion").innerHTML = '<i class="fa fa-pencil-square-o"></i> Modificar';
    const url = base_url + "Usuarios/editar/"+id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("usuario").value = res.usuario;
            document.getElementById("nombre_usuario").value = res.nombre;
            document.getElementById("claves").classList.add("d-none");
            $("#nuevo_usuario").modal("show");
        }
    }
}
//FUNCION ELIMINAR USUARIO
function btnEliminarUser(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El usuario no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblUsuarios.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }
            
        }
    })
}
//FUNCION REINGRESAR USUARIO
function btnReingresarUser(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblUsuarios.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//Fin Usuarios
//FUNCION ESTUDIANTE
function frmEstudiante() {
    document.getElementById("title").textContent = "Nuevo Estuadiante";
    document.getElementById("frmEstudiante").reset();
    document.getElementById("id").value = "";
    $("#nuevoEstudiante").modal("show");
}
//FUNCION REGISTRAR ESTUDIANTE
//FUNCION REGISTRAR ESTUDIANTE
function registrarEstudiante(e) {
    e.preventDefault();
    const codigo = document.getElementById("codigo");
    const dni = document.getElementById("dni");
    const nombre = document.getElementById("nombre");
    const apellido_pa = document.getElementById("apellido_pa");
    const apellido_ma = document.getElementById("apellido_ma");
    const genero = document.querySelector('input[name="genero"]:checked');
    const carrera = document.getElementById("carrera");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");

    if (codigo.value == "" || dni.value == "" || nombre.value == "" || 
        telefono.value == "" || direccion.value == "" || carrera.value == "" || 
        apellido_pa.value == "" || apellido_ma.value == "" || !genero) {
        alertas('Todos los campos son requeridos', 'warning');
    } else {
        const url = base_url + "Estudiantes/registrar";
        const frm = document.getElementById("frmEstudiante");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let res;
                try {
                    res = JSON.parse(this.responseText);
                    tblEst.ajax.reload();
                    alertas(res.msg, res.icono);
                    if (res.icono == 'success') {
                        $("#nuevoEstudiante").modal("hide");
                        frm.reset();
                        limpiarCamposEstudiante();
                    }
                } catch (error) {
                    alertas('Error al procesar la respuesta del servidor.', 'error');
                }
            }
        };
    }
}

//FUNCION EDITAR ESTUDIANTE
function btnEditarEst(id) {
    document.getElementById("title").textContent = "Actualizar estudiante";
    document.getElementById("btnAccion").innerHTML = '<i class="fa fa-pencil-square-o"></i> Modificar';
    const url = base_url + "Estudiantes/editar/" + id;
    const urlCarreras = base_url + "Carrera/listar";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            
            document.getElementById("id").value = res.id;
            document.getElementById("codigo").value = res.codigo;
            document.getElementById("dni").value = res.dni;
            document.getElementById("nombre").value = res.nombre;
            document.getElementById("apellido_pa").value = res.apellido_pa;
            document.getElementById("apellido_ma").value = res.apellido_ma;
            document.getElementById("carrera").value = res.carrera;
            document.getElementById("telefono").value = res.telefono;
            document.getElementById("direccion").value = res.direccion;
            if (res.genero == "1") {
                document.getElementById("genero_masculino").checked = true;
            } else if (res.genero == "0") {
                document.getElementById("genero_femenino").checked = true;
            }

            // Agregar opciones de carrera
            const httpCarreras = new XMLHttpRequest();
            httpCarreras.open("GET", urlCarreras, true);
            httpCarreras.send();

            httpCarreras.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const carreras = JSON.parse(this.responseText);
                    const carrerasSelect = document.getElementById("carrera");
                    carrerasSelect.innerHTML = "";

                    // Agregar opciones de carrera
                    carreras.forEach((carrera) => {
                        const option = document.createElement("option");
                        option.value = carrera.id;
                        option.textContent = carrera.carrera; 
                        if (carrera.id == res.id_carrera) {
                            option.selected = true;
                        }
                        carrerasSelect.appendChild(option);
                    });
                }
            };
            $("#nuevoEstudiante").modal("show");
        }
    }
}
//FUNCION ELIMINAR ESTUDIANTE
function btnEliminarEst(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El estudiante no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Estudiantes/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblEst.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//FUNCION REINGRESAR ESTUDIANTE
function btnReingresarEst(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Estudiantes/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblEst.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//Fin Estudiante
//FUNCION MATERIA
function frmMateria() {
    document.getElementById("title").textContent = "Nueva Materia";
    document.getElementById("frmMateria").reset();
    document.getElementById("id").value = "";
    $("#nuevoMateria").modal("show");
}
//FUNCION REGISTRAR MATERIA
function registrarMateria(e) {
    e.preventDefault();
    const materia = document.getElementById("materia");
    if (materia.value == "") {
        alertas('La materia es requerido', 'warning');
    } else {
        const url = base_url + "Materia/registrar";
        const frm = document.getElementById("frmMateria");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                tblMateria.ajax.reload();
                alertas(res.msg, res.icono);
                if(res.icon == 'success'){
                    $("#nuevoMateria").modal("hide");
                    frm.reset();
                }
            }
        }
    }
}
//FUNCION EDITAR MATERIA
function btnEditarMat(id) {
    document.getElementById("title").textContent = "Actualizar caja";
    document.getElementById("btnAccion").innerHTML = '<i class="fa fa-pencil-square-o"></i> Modificar';
    const url = base_url + "Materia/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("materia").value = res.materia;
            $("#nuevoMateria").modal("show");
        }
    }
}
//FUNCION ELIMINAR MATERIA
function btnEliminarMat(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "La materia no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Materia/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblMateria.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//FUNCION REINGRESAR MATERIA
function btnReingresarMat(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Materia/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblMateria.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//Fin Materia
//FUNCION AUTOR
function frmAutor() {
    document.getElementById("title").textContent= "Nuevo Autor";
    document.getElementById("frmAutor").reset();
    document.getElementById("id").value = "";
    deleteImg();
    $("#nuevoAutor").modal("show");
}
//FUNCION REGISTRAR AUTOR
function registrarAutor(e) {
    e.preventDefault();
    const autor = document.getElementById("autor");
    if (autor.value == "") {
        alertas('El nombre es requerido', 'warning');
    } else {
        const url = base_url + "Autor/registrar";
        const frm = document.getElementById("frmAutor");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                tblAutor.ajax.reload();
                alertas(res.msg, res.icono);
                if(res.icon == 'success'){
                    $("#nuevoAutor").modal("hide");
                    frm.reset();
                }
            }
        }
    }
}
//FUNCION EDITAR AUTOR
function btnEditarAutor(id) {
    document.getElementById("title").textContent = "Actualizar Autor";
    document.getElementById("btnAccion").innerHTML = '<i class="fa fa-pencil-square-o"></i> Modificar';
    const url = base_url + "Autor/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("autor").value = res.autor;
            document.getElementById("foto_actual").value = res.imagen;
            document.getElementById("img-preview").src = base_url + 'Assets/img/autor/' + res.imagen;
            document.getElementById("icon-image").classList.add("d-none");
            document.getElementById("icon-cerrar").innerHTML = `
            <button class="btn btn-danger" onclick="deleteImg()">
            <i class="fa fa-times-circle"></i></button>`;
            $("#nuevoAutor").modal("show");
        }
    }
}
//FUNCION ELIMINAR AUTOR
function btnEliminarAutor(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El Autor no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Autor/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblAutor.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//FUNCION REINGRESAR AUTOR
function btnReingresarAutor(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Autor/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblAutor.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//Fin Autor
//FUNCION EDITORIAL
function frmEditorial() {
    document.getElementById("title").textContent = "Nuevo Editorial";
    document.getElementById("frmEditorial").reset();
    document.getElementById("id").value = "";
    $("#nuevoEditorial").modal("show");
}
//FUNCION REGITRAR EDITORIAL
function registrarEditorial(e) {
    e.preventDefault();
    const editorial = document.getElementById("editorial");
    if (editorial.value == "") {
        alertas('El editorial es requerido', 'warning');
    } else {
        const url = base_url + "Editorial/registrar";
        const frm = document.getElementById("frmEditorial");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                tblEditorial.ajax.reload();
                alertas(res.msg, res.icono);
                if(res.icon == 'success'){
                    $("#nuevoEditorial").modal("hide");
                }
            }
        }
    }
}
//FUNCION EDITAR EDITORIAL
function btnEditarEdi(id) {
    document.getElementById("title").textContent = "Actualizar Editorial";
    document.getElementById("btnAccion").innerHTML = '<i class="fa fa-pencil-square-o"></i> Modificar';
    const url = base_url + "Editorial/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("editorial").value = res.editorial;
            $("#nuevoEditorial").modal("show");
        }
    }
}
//FUNCION ELIMINAR EDITORIAL
function btnEliminarEdi(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El Editorial no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Editorial/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblEditorial.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//FUNCION REINGRESAR EDITORIAL
function btnReingresarEdi(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Editorial/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblEditorial.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//Fin editorial
//FUNCION LIBROS
function frmLibros() {
    document.getElementById("title").textContent = "Nuevo Libro";
    document.getElementById("frmLibro").reset();
    document.getElementById("id").value = "";
    $("#nuevoLibro").modal("show");
    deleteImg();
}
//FUNCION REGISTRAR LIBRO
function registrarLibro(e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo");
    const autor = document.getElementById("autor");
    const editorial = document.getElementById("editorial");
    const materia = document.getElementById("materia");
    const isbn = document.getElementById("isbn");
    const cantidad = document.getElementById("cantidad");
    const num_pagina = document.getElementById("num_pagina");

    if (titulo.value == '' || autor.value == '' || editorial.value == ''
    || materia.value == '' || cantidad.value == '' || num_pagina.value == '' || isbn.value == '') {
        alertas('Todo los campos son requeridos', 'warning');
    } else {
        const url = base_url + "Libros/registrar";
        const frm = document.getElementById("frmLibro");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                tblLibros.ajax.reload();
                alertas(res.msg, res.icono);
                if(res.icon == 'success'){
                    $("#nuevoLibro").modal("hide");
                    frm.reset();
                    limpiarCamposLibro();
                }
            }
        }
    }
}
//FUNCION EDITAR LIBRO
function btnEditarLibro(id) {
    document.getElementById("title").textContent = "Actualizar Libro";
    document.getElementById("btnAccion").innerHTML = '<i class="fa fa-pencil-square-o"></i> Modificar';
    const url = base_url + "Libros/editar/" + id;
    const urlAutor = base_url + "Autor/listar";
    const urlEditorial = base_url + "Editorial/listar";
    const urlMateria = base_url + "Materia/listar";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("titulo").value = res.titulo;
            document.getElementById("autor").value = res.id_autor;
            document.getElementById("editorial").value = res.id_editorial;
            document.getElementById("materia").value = res.id_materia;
            
            // Formatear el ISBN
            const formattedIsbn = formatIsbn(res.isbn);
            document.getElementById("isbn").value = formattedIsbn;

            document.getElementById("cantidad").value = res.cantidad;
            document.getElementById("num_pagina").value = res.num_pagina;
            document.getElementById("anio_edicion").value = res.anio_edicion;
            document.getElementById("descripcion").value = res.descripcion;
            document.getElementById("img-preview").src = base_url + 'Assets/img/libros/' + res.imagen;
            document.getElementById("icon-cerrar").innerHTML = `
            <button class="btn btn-danger" onclick="deleteImg()">
            <i class="fa fa-times-circle"></i></button>`;
            document.getElementById("icon-image").classList.add("d-none");
            document.getElementById("foto_actual").value = res.imagen;
            // Agregar opciones de autor
            const httpAutor = new XMLHttpRequest();
            httpAutor.open("GET", urlAutor, true);
            httpAutor.send();

            httpAutor.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const autores = JSON.parse(this.responseText);
                    const carrerasSelect = document.getElementById("autor");
                    carrerasSelect.innerHTML = "";

                    // Agregar opciones de autor
                    autores.forEach((autor) => {
                        const option = document.createElement("option");
                        option.value = autor.id;
                        option.textContent = autor.autor; 
                        if (autor.id == res.id_autor) {
                            option.selected = true;
                        }
                        carrerasSelect.appendChild(option);
                    });
                }
            };
            // Agregar opciones de editorial
            const httpEditorial = new XMLHttpRequest();
            httpEditorial.open("GET", urlEditorial, true);
            httpEditorial.send();

            httpEditorial.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const editoriales = JSON.parse(this.responseText);
                    const editorialSelect = document.getElementById("editorial");
                    editorialSelect.innerHTML = "";

                    // Agregar opciones de editorial
                    editoriales.forEach((editorial) => {
                        const option = document.createElement("option");
                        option.value = editorial.id;
                        option.textContent = editorial.editorial; 
                        if (editorial.id == res.id_editorial) {
                            option.selected = true;
                        }
                        editorialSelect.appendChild(option);
                    });
                }
            };
            // Agregar opciones de materia
            const httpMaterias = new XMLHttpRequest();
            httpMaterias.open("GET", urlMateria, true);
            httpMaterias.send();

            httpMaterias.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const materias = JSON.parse(this.responseText);
                    const materiasSelect = document.getElementById("materia");
                    materiasSelect.innerHTML = "";

                    // Agregar opciones de materia
                    materias.forEach((materia) => {
                        const option = document.createElement("option");
                        option.value = materia.id;
                        option.textContent = materia.materia; 
                        if (materia.id == res.id_carrera) {
                            option.selected = true;
                        }
                        materiasSelect.appendChild(option);
                    });
                }
            };

            $("#nuevoLibro").modal("show");
        }
    }
}

function formatIsbn(value) {
    value = value.replace(/\D/g, ''); // Elimina cualquier caracter no numérico
    if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{1,2})/, '$1-$2');
    }
    if (value.length > 6) {
        value = value.replace(/^(\d{3})-(\d{2})(\d{1,4})/, '$1-$2-$3');
    }
    if (value.length > 10) {
        value = value.replace(/^(\d{3})-(\d{2})-(\d{4})(\d{1,3})/, '$1-$2-$3-$4');
    }
    if (value.length > 13) {
        value = value.replace(/^(\d{3})-(\d{2})-(\d{4})-(\d{3})(\d{1})/, '$1-$2-$3-$4-$5');
    }
    return value;
}

//FUNCION ELIMINAR LIBRO
function btnEliminarLibro(id) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        text: "El libro no se eliminará de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Libros/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblLibros.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//FUNCION REINGRESAR LIBRO
function btnReingresarLibro(id) {
    Swal.fire({
        title: 'Esta seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Libros/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblLibros.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
//OTRAS FUNCIONES
//FUNCION PREVIEW
function preview(e) {
    var input = document.getElementById('imagen');
    var filePath = input.value;
    var extension = /(\.png|\.jpeg|\.jpg)$/i;
    if (!extension.exec(filePath)) {
        alertas('Seleccione un archivo valido', 'warning');
        deleteImg();
        return false;
    }else{
        const url = e.target.files[0];
        const urlTmp = URL.createObjectURL(url);
        document.getElementById("img-preview").src = urlTmp;
        document.getElementById("icon-image").classList.add("d-none");
        document.getElementById("icon-cerrar").innerHTML = `
        <button class="btn btn-danger" onclick="deleteImg()"><i class="fa fa-times-circle"></i></button>
        `;
    }

}
//FUNCION ELIMINAR IMAGEN
function deleteImg() {
    document.getElementById("icon-cerrar").innerHTML = '';
    document.getElementById("icon-image").classList.remove("d-none");
    document.getElementById("img-preview").src = '';
    document.getElementById("imagen").value = '';
    document.getElementById("foto_actual").value = '';
}
//FUNCION CONFIGURAR
function frmConfig(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
    const correo = document.getElementById("correo");
    if (nombre.value == "" || telefono.value == "" || direccion.value == "" || correo.value == "") {
        alertas('Todo los campos son requeridos', 'warning');
    } else {
        const url = base_url + "Configuracion/actualizar";
        const frm = document.getElementById("frmConfig");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                alertas(res.msg, res.icono);
            }
        }
    }
}
//FUNCION PRESTAR
function frmPrestar() {
    document.getElementById("frmPrestar").reset();
    $("#prestar").modal("show");
}
//FUNCION REPORTE
function formReporte() {
    document.getElementById("formReporte").reset();
    $("#reporteModal").modal("show");
}
//FUNCION ENTREGAR
function btnEntregar(id) {
    Swal.fire({
        title: 'Recibir de libro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Prestamos/entregar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    tblPrestar.ajax.reload();
                    alertas(res.msg, res.icono);
                }
            }

        }
    })
}
// FUNCIÓN REGISTRAR PRÉSTAMOS
function registroPrestamos(e) {
    e.preventDefault();
    const libro = document.getElementById("libro").value;
    const estudiante = document.getElementById("estudiante").value;
    const fecha_prestamo = document.getElementById("fecha_prestamo").value;
    const fecha_devolucion = document.getElementById("fecha_devolucion").value;

    if (libro == '' || estudiante == '' || fecha_prestamo == '' || fecha_devolucion == '') {
        alertas('Todos los campos son requeridos', 'warning');
        return; // Detiene la ejecución si hay campos vacíos
    }

    // Convertir a objetos Date para comparar
    const fechaPrestamo = new Date(fecha_prestamo);
    const fechaDevolucion = new Date(fecha_devolucion);

    if (fechaDevolucion < fechaPrestamo) {
        alertas('La fecha de devolución no puede ser menor que la fecha de préstamo', 'error');
        return; // Detiene la ejecución si la fecha es incorrecta
    }

    // Si las validaciones pasan, procede con el registro
    const frm = document.getElementById("frmPrestar");
    const url = base_url + "Prestamos/registrar";
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            tblPrestar.ajax.reload();
            alertas(res.msg, res.icono);
            if (res.icono == 'success') {
                $("#prestar").modal("hide");
                limpiarCamposPrestamo();
            }
        }
    }
}

//FUNCION MOSTRAR EL MODAL DEL PRESTAMO
function btnEditarPrestamo(id) {
    document.getElementById("title").textContent = "Actualizar Préstamo";
    document.getElementById("btnAccion").innerHTML = '<i class="fa fa-pencil-square-o"></i> Modificar';
    const url = base_url + "Prestamos/editar/" + id;
    console.log("Llamando a: ", url);
    const urlLibros = base_url + "Libros/listar";
    const urlEstudiantes = base_url + "Estudiantes/listar";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("fecha_prestamo").value = res.fecha_prestamo;
            document.getElementById("fecha_devolucion").value = res.fecha_devolucion;
            document.getElementById("observacion").value = res.observacion;

            const httpLibros = new XMLHttpRequest();
            httpLibros.open("GET", urlLibros, true);
            httpLibros.send();

            httpLibros.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const libros = JSON.parse(this.responseText);
                    const librosSelect = document.getElementById("libro");
                    librosSelect.innerHTML = "";

                    // Agregar opciones de libro
                    libros.forEach((libro) => {
                        const option = document.createElement("option");
                        option.value = libro.id;
                        option.textContent = libro.titulo; 
                        if (libro.id == res.id_libro) {
                            option.selected = true;
                        }
                        librosSelect.appendChild(option);
                    });
                }
            };

            const httpEstudiantes = new XMLHttpRequest();
            httpEstudiantes.open("GET", urlEstudiantes, true);
            httpEstudiantes.send();

            httpEstudiantes.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const estudiantes = JSON.parse(this.responseText);
                    const estudiantesSelect = document.getElementById("estudiante");
                    estudiantesSelect.innerHTML = "";

                    // Agregar opciones de estudiante
                    estudiantes.forEach((estudiante) => {
                        const option = document.createElement("option");
                        option.value = estudiante.id;
                        option.textContent = `${estudiante.nombre} ${estudiante.apellido_pa} ${estudiante.apellido_ma}`; 
                        if (estudiante.id == res.id_estudiante) {
                            option.selected = true;
                        }
                        estudiantesSelect.appendChild(option);
                    });
                }
            };
            $("#prestar").modal("show");

        } else if (this.readyState == 4) {
            console.error("Error en la solicitud: " + this.status);
        }
    }
}
//FUNCION REPORTE POR PERIODO
function reportePeriodo(e) {
    e.preventDefault();

    const FechaInicio = document.getElementById("fechaInicio").value;
    const FechaFin = document.getElementById("fechaFin").value;

    if (FechaInicio === '' || FechaFin === '') {
        alertas('Todos los campos son requeridos', 'warning');
    } else {
        const frm = document.getElementById("formReporte");
        if (frm instanceof HTMLFormElement) { 
            const url = base_url + "Prestamos/LibrosPorPeriodo";
            const http = new XMLHttpRequest();
            http.open("POST", url, true);
            http.send(new FormData(frm));
            window.open(url + "?FechaInicio=" + FechaInicio + "&FechaFin=" + FechaFin, "_blank");
                $("#reporteModal").modal("hide");
        } else {
            console.error("El elemento con id 'formReporte' no es un formulario válido.");
        }
    }
}

//FUNCIONES DE ROLES DE USUARIO
function btnRolesUser(id) {
    const http = new XMLHttpRequest();
    const url = base_url + "Usuarios/permisos/" + id;
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("frmPermisos").innerHTML = this.responseText;
            $("#permisos").modal("show");
        }
    }
}
//FUNCIONES DE ROLES CARRERAS
function btnRolesCarrera(id) {
    const http = new XMLHttpRequest();
    const url = base_url + "Libros/carreras/" + id;
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("frmCarreras").innerHTML = this.responseText;
            $("#carreras").modal("show");
        }
    }
}
//FUNCION REGISTRAR PERMISOS
function registrarPermisos(e) {
    e.preventDefault();
    const http = new XMLHttpRequest();
    const frm = document.getElementById("frmPermisos");
    const url = base_url + "Usuarios/registrarPermisos";
    http.open("POST", url);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            $("#permisos").modal("hide");
            if(res == 'ok'){
				alertas('Permisos Asignado', 'success');
			}else{
				alertas('Error al asignar los permisos', 'error');
			}
        }
    }
}
//FUNCION REGISTRAR CARRERAS
function registrarCarreras(e) {
    e.preventDefault();
    const http = new XMLHttpRequest();
    const frm = document.getElementById("frmCarreras");
    const url = base_url + "Libros/registrarCarreras";
    http.open("POST", url);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            $("#carreras").modal("hide");
            if(res == 'ok'){
				alertas('Carreras Asignado', 'success');
			}else{
				alertas('Error al asignar las carreras', 'error');
			}
        }
    }
}
//FUNCION MODIFICAR CLAVE
function modificarClave(e) {
    e.preventDefault();
    var formClave = document.querySelector("#frmCambiarPass");
    formClave.onsubmit = function (e) {
        e.preventDefault();
        const clave_actual = document.querySelector("#clave_actual").value;
        const nueva_clave = document.querySelector("#clave_nueva").value;
        const confirmar_clave = document.querySelector("#clave_confirmar").value;
        if (clave_actual == "" || nueva_clave == "" || confirmar_clave == "") {
            alertas('Todo los campos son requeridos', 'warning');
        } else if (nueva_clave != confirmar_clave) {
            alertas('Las contraseñas no coinciden', 'warning');
        } else {
            const http = new XMLHttpRequest();
            const frm = document.getElementById("frmPermisos");
            const url = base_url + "Usuarios/cambiarPas";
            http.open("POST", url);
            http.send(new FormData(formClave));
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    $('#cambiarClave').modal("hide");
                    alertas(res.msg, res.icono);                    
                }
            }            
        }

    }
}
if (document.getElementById("reportePrestamo")) {
    const url = base_url + "Configuracion/grafico";
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                let nombre = [];
                let cantidad = [];
                for (let i = 0; i < data.length; i++) {
                    nombre.push(data[i]['titulo']);
                    cantidad.push(data[i]['cantidad']);
                }
                var ctx = document.getElementById("reportePrestamo");
                var myPieChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: nombre,
                        datasets: [{
                            label: 'Libros',
                            data: cantidad,
                            backgroundColor: ['#dc143c'],
                        }],
                    },
                });
            
        }
    }
}
//FUNCION ALERTAS
function alertas(msg, icono) {
    Swal.fire({
        position: 'top-end',
        icon: icono,
        title: msg,
        showConfirmButton: false,
        timer: 3000
    })
}
//FUNCION VERIFICAR LIBRO
function verificarLibro() {
    const libro = document.getElementById('libro').value;
    if (!libro) { 
        // Si el libro está vacío, no realiza la verificación
        document.getElementById('msg_error').innerHTML = '';
        return;
    }
    
    const http = new XMLHttpRequest();
    const url = base_url + 'Libros/verificar/' + libro;
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            if (res.icono == 'success') {
                document.getElementById('msg_error').innerHTML = `<span class="badge badge-primary">Disponible: ${res.cantidad}</span>`;
            } else {
                alertas(res.msg, res.icono);
            }
        }
    };
}

/*------------------------------- LIMPIAR CAMPOS SELECTS --------------------------------------*/
//PRESTAMOS
function limpiarCamposPrestamo() {
    $('#libro').val(null).trigger('change').empty().select2({
        placeholder: 'Buscar Libro',
        minimumInputLength: 2,
        ajax: {
            url: base_url + 'Libros/buscarLibro',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return { lb: params.term };
            },
            processResults: function (data) {
                return { results: data };
            },
            cache: true
        }
    });

    $('#estudiante').val(null).trigger('change');
    
    $('#msg_error').text('');
}

function limpiarCamposEstudiante(){
    $('#carrera').val(null).trigger('change');
    document.getElementById('nombre').value = "";
    document.getElementById('apellido_pa').value = "";
    document.getElementById('apellido_ma').value = "";

    document.getElementById('nombre').readOnly = false;
    document.getElementById('apellido_pa').readOnly = false;
    document.getElementById('apellido_ma').readOnly = false;
}

function limpiarCamposLibro(){
    $('#materia').val(null).trigger('change');
}


