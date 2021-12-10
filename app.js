function capturar(nombre, apellido, email, fechaNacimiento, telefono, genero, motivo) {
    var elementos = [
        document.getElementsByClassName(nombre)[0].value,
        document.getElementsByClassName(apellido)[0].value,
        document.getElementsByClassName(email)[0].value,
        document.getElementsByClassName(fechaNacimiento)[0].value,
        document.getElementsByClassName(telefono)[0].value,
        document.getElementsByClassName(genero)[0].value
    ];
    if (motivo == "insertar") {
        if (elementos.indexOf("") == -1 && elementos[2].indexOf("@") != -1) {
            if (registroPrograma[idLog][1][3] == null) {
                registroPrograma[idLog][1][3] = [];
            }
            elementos.unshift(registroPrograma[idLog][1][3].length + 1);
            registroPrograma[idLog][1][3].push(elementos);
            insertaEnFilas(-1, registroPrograma[idLog][1][3]);
            $('#agregarDatos').click(function () {
                $('#addModal').modal('hide');
            });
        } else {
            $('#agregarDatos').click(function () {
                $('#addModal').modal('show');
            });
        }
    } else if (motivo == "editar") {
        //var idLista = document.getElementById("listaContactos").value;
        var idLista = seleccion;
        elementos.unshift(idLista);
        registroPrograma[idLog][1][3][idLista - 1] = elementos;
        insertaEnFilas(-1, registroPrograma[idLog][1][3]);
    }
}

function agregado() {
    return false;
}

function limpia(nombre, apellido, email, fechaNacimiento, telefono) {
    document.getElementsByClassName(nombre)[0].value = "";
    document.getElementsByClassName(apellido)[0].value = "";
    document.getElementsByClassName(email)[0].value = "";
    document.getElementsByClassName(fechaNacimiento)[0].value = "";
    document.getElementsByClassName(telefono)[0].value = "";
}

function ajusteModal() {
    $('#agregarDatos').click(function () {
        $('#addModal').modal('hide');
    });
    $('#editarDatos').click(function () {
        $('#editModal').modal('hide');
    });
    $('#eliminarDatos').click(function () {
        $('#deleteModal').modal('hide');
    });

    document.getElementById("textoContactos").innerHTML = "Contactos[" + count + "] ";
    document.getElementById('btnUsuario').innerHTML = "@" + registroPrograma[idLog][1][0];
}

function devuelveIdContactos(motivo) {
    if (motivo == "editar") {
        muestra_oculta('formEditContact', 'seleccion');
    } else if (motivo == "eliminar") {
        muestra_oculta('formDeleteContact', 'eliminacion');
    }
}

function muestra_oculta(id, motivo) {
    var el = document.getElementById(id);
    if (motivo == "boton") {
        el.style.display = 'none';
    }
    if (motivo == "seleccion") {
        el.style.display = 'block';
        //var idLista = document.getElementById("listaContactos").value;
        var idLista = seleccion;
        llenaFormulario(idLista - 1);
    }
    if (motivo == "eliminacion") {
        el.style.display = 'block';
        //var idEliminarLista = document.getElementById("listaEliminarContactos").value;
        var idEliminarLista = seleccion;
        llenaDiv(idEliminarLista - 1);
    }
}

function abrirBusqueda(motivo) {
    if (motivo == "buscar") {
        muestra_oculta('formEditContact', 'boton');
        //llenaOption('listaContactos');
    }
    if (motivo == "eliminar") {
        muestra_oculta('formDeleteContact', 'boton');
        //llenaOption('listaEliminarContactos');

    }

}

function llenaFormulario(idLista) {
    document.getElementsByClassName('inputEditNombre')[0].value = registroPrograma[idLog][1][3][idLista][1];
    document.getElementsByClassName('inputEditApellido')[0].value = registroPrograma[idLog][1][3][idLista][2];
    document.getElementsByClassName('inputEditEmail')[0].value = registroPrograma[idLog][1][3][idLista][3];
    document.getElementsByClassName('inputEditFechaNacimiento')[0].value = registroPrograma[idLog][1][3][idLista][4];
    document.getElementsByClassName('inputEditTelefono')[0].value = registroPrograma[idLog][1][3][idLista][5];
    document.getElementsByClassName('inputEditGenero')[0].value = registroPrograma[idLog][1][3][idLista][6];
}

function insertaEnFilas(id, registroSeleccionado) {
    document.getElementById("tbody").innerHTML = "";
    for (i in registroSeleccionado) {
        if (registroSeleccionado[i] != null) {
            document.getElementById("tbody").insertRow(id).innerHTML = '<tr><td>' + registroSeleccionado[i][0] + '</td><td>' + registroSeleccionado[i][1] + '</td><td>' + registroSeleccionado[i][2] + '</td><td>' + registroSeleccionado[i][3] + '</td><td>' + registroSeleccionado[i][4] + '</td><td>' + registroSeleccionado[i][5] + '</td><td>' + registroSeleccionado[i][6] + '</td></tr>';
            count++;
        }
    }

    document.getElementById("textoContactos").innerHTML = "Contactos[" + count + "]";
    count = 0;
    $('#tabla tr').on("click", function () {
        seleccion = $(this).find('td').html();
        console.log(seleccion);
        swal("¿Que quieres hacer?", {
            buttons: {
                cancel: "Cancelar",
                catch: {
                    text: "Editar",
                    value: "editar",
                },
                defeat: {
                    text: "Eliminar",
                    value: "eliminar",
                },
            }
        })
            .then((value) => {
                switch (value) {
                    case "editar":
                        abrirBusqueda('buscar');
                        $('#editModal').modal('toggle');
                        devuelveIdContactos('editar');
                        break;
                    case "eliminar":
                        abrirBusqueda('eliminar');
                        $('#deleteModal').modal('toggle');
                        devuelveIdContactos('eliminar');
                        break;
                }
            });
    });

}

/*function verArray() {
    for (let i = 0; i < registroPrograma.length; i++) {
        var newDiv = document.createElement("div");
        var newContent = document.createTextNode(registroPrograma[i]);
        newDiv.appendChild(newContent);
        var currentDiv = document.getElementById("verResultados");

        document.body.insertBefore(newDiv, currentDiv);
    }
}*/

function llenaOption(lista) {

    if (registroPrograma[idLog][1][3] != null) {
        if (registroPrograma[idLog][1][3].length != 0) {
            var select = document.getElementById(lista);
            document.getElementById(lista).innerHTML = "";
            for (let i = 0; i < registroPrograma[idLog][1][3].length; i++) {
                if (registroPrograma[idLog][1][3][i] != null) {
                    var option = document.createElement("option");
                    option.text = (i + 1);
                    select.add(option);
                }
            }
            if (select.value != "") {
                busco = true;
            } else {
                busco = false;
            }
        }
    }
}

function llenaDiv(idLista) {
    document.getElementById("verResultado").innerHTML = "";
    document.getElementById("verResultado").innerHTML = 'Nombre: ' + registroPrograma[idLog][1][3][idLista][1] + '<br>Apellido: ' + registroPrograma[idLog][1][3][idLista][2] + '<br>Correo: ' + registroPrograma[idLog][1][3][idLista][3] + '<br>Fecha de Nacimiento: ' + registroPrograma[idLog][1][3][idLista][4] + '<br>Teléfono: ' + registroPrograma[idLog][1][3][idLista][5] + '<br>Género: ' + registroPrograma[idLog][1][3][idLista][6] + '<br>¿Seguro que desea eliminar este registro?';

}

function vaciaRegistro() {
    //var indice = document.getElementById(id).value - 1;
    var indice = seleccion - 1;
    registroPrograma[idLog][1][3][indice] = null;
    insertaEnFilas(-1, registroPrograma[idLog][1][3]);
}

function registrate() {
    document.getElementById('formSingIn').setAttribute('hidden', '');
    document.getElementById('formRegister').removeAttribute('hidden');
    if (registroPrograma.length != 0) {
        idLog = registroPrograma.length;
    }
}

function iniciaSesion(username, password) {
    window.location.href = "http://127.0.0.1:9989/infinitygmfretailbankingolb2/kdw?transactionid=t76kHgARCzu%2B6yC3bKF%2F8w%3D%3D#_frmPseCommerceLogin";
    var elementos = [
        document.getElementById(username).value,
        document.getElementById(password).value
    ]
    if (elementos.indexOf("") == -1) {
        for (i in registroPrograma) {
            if (elementos[0] == registroPrograma[i][1][0]) {
                if (elementos[1] == registroPrograma[i][1][2]) {
                    document.getElementById('formSingIn').setAttribute('hidden', '');
                    document.getElementById('formRegister').setAttribute('hidden', '');
                    document.getElementById('section').removeAttribute('hidden');
                    document.getElementById('header').removeAttribute('hidden');
                    document.getElementById('footer').removeAttribute('hidden');
                    idLog = i;
                    //verArray();
                    ajusteModal();
                    insertaEnFilas(-1, registroPrograma[idLog][1][3]);
                    passwordError = false;
                    userExist = true;
                    break;
                } else {
                    passwordError = true;
                }
                userExist = true;
            } else {
                userExist = false;
            }
        }
        if (!(userExist)) {
            swal("Error", "El usuario no existe", "error");
        } else if (passwordError) {
            swal("Error", "Contraseña incorrecta", "error");
        }
    }
}

function iniciaDesdeRegistro(username, correo, password) {
    exist = false;
    var elementos = [
        document.getElementById(username).value,
        document.getElementById(correo).value,
        document.getElementById(password).value
    ];
    if (elementos.indexOf("") == -1 && elementos[1].indexOf("@") != -1) {
        for (let i = 0; i < registroPrograma.length; i++) {
            if (registroPrograma[i][1][0] == elementos[0]) {
                exist = true;
                swal("Error", "El usuario ya existe", "error");
                break;
            }
            if (registroPrograma[i][1][1] == elementos[1]) {
                exist = true;
                swal("Error", "El correo ya existe", "error");
                break;
            }
        }
        if (!(exist)) {
            registroLogin.push(elementos)
            var registroDatos = [
                idLog,
                registroLogin[registroLogin.length - 1]
            ];
            registroPrograma.push(registroDatos);
            document.getElementById('formSingIn').setAttribute('hidden', '');
            document.getElementById('formRegister').setAttribute('hidden', '');
            document.getElementById('section').removeAttribute('hidden');
            document.getElementById('header').removeAttribute('hidden');
            document.getElementById('footer').removeAttribute('hidden');
            //verArray();
            ajusteModal();
        }
    }
}

function cerrarSesion() {
    document.getElementById('section').setAttribute('hidden', '');
    document.getElementById('header').setAttribute('hidden', '');
    document.getElementById('footer').setAttribute('hidden', '');
    document.getElementById('formSingIn').removeAttribute('hidden');
    document.getElementById("tbody").innerHTML = "";
    document.getElementById("listaEliminarContactos").innerHTML = "";
    document.getElementById("listaContactos").innerHTML = "";
}

var busco = false, exist = false, userExist = false, passwordError = true;
var count = 0, idLog = 0, seleccion = 0;
var registro = new Array();
var registroLogin = new Array();
var registroPrograma = new Array();
var registroDatos = new Array();

/*
------------------------------------Arbol de variables------------------------------------
registroPrograma[0] = registroDatos: idLog, registroLogin: user, correo, password, registro: ID, nombre, apellido, email, fecha de Nacimiento, telefono, genero;
registroPrograma[0][0] = idLog
registroPrograma[0][1] = registroLogin: user, correo, password, registro: ID, nombre, apellido, email, fecha de Nacimiento, telefono, genero;
registroPrograma[0][1][0] = user;
registroPrograma[0][1][1] = correo;
registroPrograma[0][1][2] = password;
registroPrograma[0][1][3] = registro: ID, nombre, apellido, email, fecha de Nacimiento, telefono, genero;
registroPrograma[0][1][3][0][0] = ID;
registroPrograma[0][1][3][0][1] = nombre;
registroPrograma[0][1][3][0][2] = apellido;
registroPrograma[0][1][3][0][3] = email;
registroPrograma[0][1][3][0][4] = fecha de Nacieminento;
registroPrograma[0][1][3][0][5] = telefono;
registroPrograma[0][1][3][0][6] = genero;
------------------------------------Arbol de variables------------------------------------
*/
