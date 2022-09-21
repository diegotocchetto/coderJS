const usuarios = [];
const facturas = [];
const productos = [];
const carrito = [];
const productosDisponibles = [];
let producto;
let pass;
let moneda = "$";
let contador=0;
//let formaPago;


let usuarioLogueado;




class Factura {
    constructor(idUsuario, nroFactura, fecha, total, items) {
        this.idUsuario = idUsuario;
        this.nroFactura = nroFactura
        this.fecha = fecha;
        this.total = total;
        this.items = items;
    }
}




class Usuario {
    constructor(id, nombre, apellido, nombreUsuario, pass, cuenta, email) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.pass = pass;
        this.nombreUsuario = nombreUsuario;
        this.cuenta = cuenta;
        this.email = email;
    }
}

//para borrar, SI BIEN SE Puede AGREGAR USUARIOS , SE HARCODEA PARA TRABAJAR MAS RAPIDO
const usuario1 = new Usuario(1, "Diego", "Tocchetto", "dtoccho", "131313", 100000, "diego.tocchetto@gmail.com");
const usuario2 = new Usuario(2, "Profesor Coder", "js", "profe", "111111", 5000, "profesor@gmail.com");
usuarios.push(usuario1);
usuarios.push(usuario2);




class Producto {
    constructor(id, descripcion, valor, cantidad, imagen) {
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
        this.cantidad = cantidad;
        this.imagen = imagen;
    }
}


//sE HARCODEA PARA TRABAJAR MAS RAPIDO //NO ESTA IMPLEMENTADOP AGREGAR PRODUCTOS
const producto1 = new Producto(1, "TV SMART 50 ANDROID", 19336, 5, "tv50.jpg");
const producto2 = new Producto(2, "TV SMART 65 ANDROID", 25025, 0, "tv65.jpg");
const producto3 = new Producto(3, "LAVARROPA CYAN C", 11690, 1, "lavarropa.jpg");
const producto4 = new Producto(4, "AIRE ACONDICIONADO 12KBTU", 22000, 5, "Aire.jpg");
const producto5 = new Producto(5, "HELADERA FRENCH DOOR INV", 52000, 5, "Heladera.jpg");
const producto6 = new Producto(6, "MINICOMPONENTE 5000W", 15000, 5, "miniComponente.jpg");

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);
productos.push(producto5);
productos.push(producto6);







class Carrito {
    constructor(idProducto, descProducto, cantidad, precioLineaCarrito, total) {
        this.idProducto = idProducto;
        this.descProducto = descProducto;
        this.precioLineaCarrito = precioLineaCarrito;
        this.cantidad = cantidad;
        this.total = total;
    }
}




//FUNCIONES UTILES


function fechaActual() {
    let date = new Date();
    const formatDate = (date) => {
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return formatted_date;
    }
    return (formatDate(date));
}



//SE VALIDA EL USUARIO AL LOGUEO
function validarUsuario(nombreUsuario, password) {
    //console.log(usuarioLogueado)
    let valido = false;
    usuarioLogueado = usuarios.find(usuario => usuario.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase());

    if (usuarioLogueado != undefined) {
        if (usuarioLogueado.pass === password) {
            valido = true;
            sessionStorage.setItem("usuario", JSON.stringify(usuarioLogueado)); //GUARDO EL USUARIO

        }
    }

    return valido;

}







//AGREGA AL USUARIO NO FUNCIONAL AUN CON DOM
function agregarUsuario() {
    let nombre = prompt("Ingrese Nombre").toUpperCase();
    let apellido = prompt("Ingrese Apellido").toUpperCase();;
    let email = prompt("Ingrese su Correo electronico").toLowerCase();
    let nombreUsuario = prompt("Ingrese un nombre de usuario").toLowerCase();
    let pass = prompt("Ingrese un password");
    let id = Math.ceil(Math.random() * 1000).toString();
    let cuenta = 0;

    const usuario = new Usuario(id, nombre, apellido, nombreUsuario, pass, cuenta, email);
    const existeUsuarioMail = usuarios.find(usuario => usuario.email === email);
    const existeUsuarioNombreUsuario = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario);

    if (!existeUsuarioMail && !existeUsuarioNombreUsuario) {
        usuarios.push(usuario);
        //alert(`Hola ${usuario.nombre} ${usuario.apellido} , te has registrado correctamente`);
    }


    //SI EXISTE EL USUARIO VERIFICO QUE ESTA DUPLICADO, SI EL NOMBREUSUARIO O EL CORREO
    if (existeUsuarioMail) {
        // alert("YA EXISTE UN USUARIO CON ESE CORREO ELECTRÓNICO")
    }
    if (existeUsuarioNombreUsuario) {
        // alert("YA EXISTE UN USUARIO CON ESE NOMBRE DE USUARIO")
    }



    //  mostrarMenuGeneral();
}






//VACIAR CARRRITO
function vaciarCarrito(accion) {
    const tamaniocarrtitoOriginal = carrito.length;
    for (let i = carrito.length; i > 0; i--) {

        const lineacarrito = new Carrito(carrito[i - 1].idProducto, carrito[i - 1].descripcion, carrito[i - 1].cantidad, carrito[i - 1].precioLineaCarrito);

        // SE QUITA MOMENTANEAMENTE FUNCION DE STOCK
        //  if(accion===0) //0 SE INVOCA DESDE VACIAR CARRITO / 1 - SE INVOCA DESDE EL PAGAR 
        // {
        //      MoverStock(1,lineacarrito);
        //   }

        carrito.pop();  //  vaciarCarrito(carrito) 
        let contadorCarrito=document.getElementById("contador");
        contador=0;
        contadorCarrito.innerHTML=contador;
    }





    if (tamaniocarrtitoOriginal === 0 && accion === 0) {
        alert("No hay items en su carrito");
    }

    if (accion === 0 && tamaniocarrtitoOriginal > 0) //0 sE INVOCA DESDE VACIAR CARRITO / 1 - SE INVOCA DESDE EL PAGAR 
    {
        alert("Los items del carrito se quitaron correctamente");
    }
}








//AGREGAR DINERO A LA CUENTA DEL USUARIO // NO FUNCIONAL AUN CON DOM

function agregarDineroACuentaUsuario(usuarioLogueado) {

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombreUsuario === usuarioLogueado.nombreUsuario) {
            //  alert(`Su saldo actual es ${usuarios[i].cuenta}`);
            let deposito = parseFloat(prompt("Ingrese el dinero a depositar"));
            let saldo = usuarios[i].cuenta;
            usuarios[i].cuenta = salsdo + deposito;
            usuarioLogueado = usuarios[i];
            //   alert(`Se ha agregado dinero a su cuenta, su saldo es ${usuarios[i].cuenta}`);
            break;
        }

        MenuUsuario()

    }
    MenuUsuario();
}




//GENERAR FACTURA // NO FUNCIONAL AUN CON DOM

function generarFactura(total, carrito) {
    let nroFactura = Math.ceil(Math.random() * 1000000).toString();

    const factura = new Factura(usuarioLogueado.id, nroFactura, fechaActual(), total, carrito);
    facturas.push(factura);

}





//VER FACTURAS // NO FUNCIONAL AUN CON DOM

function verFactura(idusuario) {

    let misfacturas = "";

    if (facturas.length > 0) {

        for (let i = 0; i < facturas.length; i++) {

            if (facturas[i].idUsuario === usuarioLogueado.id) {
                misfacturas += "Nro. Factura: " + facturas[i].nroFactura + " - " + "Fecha: " + facturas[i].fecha + " - " + "Total $: " + facturas[i].total + "\n";
            }
        }
    }
    else {

        misfacturas = "Usted no ha hecho ninguna compra";
    }



    return misfacturas
}





//SUMA TODOS LOS TOTALES DE CADA LINEA DEL CARRITO Y DEVUELVE EL TOTAL A PAGAR
function montoCompra() {


    let montoTotal = 0;;
    if (carrito.length > 0) {
        for (let i = 0; i < carrito.length; i++) {

            montoTotal = parseFloat(montoTotal) + parseFloat(carrito[i].total);
        }
    }

    return montoTotal;
}






function comprar() {

    let total = parseFloat(montoCompra());

    if (carrito.length > 0) {

        let i = usuarios.findIndex(usuario => usuario.nombreUsuario === JSON.parse(sessionStorage.getItem("usuario")).nombreUsuario);


        if (parseFloat(usuarios[i].cuenta) >= parseFloat(total)) {

            //  actualizo el saldo en el array de usuariosd
            usuarios[i].cuenta -= total;
            generarFactura(total, carrito);// NO FUNCIONAL AUN CON DOM
            vaciarCarrito(1);
            alert(`Gracias ${usuarios[i].nombre} ${usuarios[i].apellido}, tu Compra se ha realizada con éxito, recibirá un correo a ${usuarios[i].email} con los detalles`);
        }
        else {
            alert(`Saldo Insuficiente, su saldo es de $ ${parseFloat(usuarios[i].cuenta)} , recargue dinero para continuar con la compra`);
        }
    }
    else {
        alert("Su carrito esta vacío, agregue productos para comprar");
    }

}






// FUNCION MOMENTANEAMENTE NO LLAMADA
function MoverStock(modo, lineacarrito) //    //MODO 0 ES DEBITAR / MODO 1 ACREDITAR Y VIENE UN OBJETO CARRITO QUE ES LA LINEA
{

    let i = productos.findIndex(prod => prod.id == lineacarrito.idProducto); //obtengo el indice del idproducto del objeto carrito

    if (modo === 1) {
        productos[i].cantidad = productos[i].cantidad + lineacarrito.cantidad;
    }
    else {

        productos[i].cantidad = productos[i].cantidad - lineacarrito.cantidad;

    }

}




function calcularPrecioLinea(precio, cantidad) {
    let totalLinea = precio * cantidad;

    return (totalLinea);

}





//VERSION V2 con DOM MOSTRAR PRODUCTOS 


const produc = document.getElementById("Productos")
const templateCard = document.getElementById("templateCard").content;
const fragment = document.createDocumentFragment();


//FUNCION PARA MOSTRAR PRODUCTOS

function mostrarProductos() {


    produc.innerHTML = "";


    for (producto of productos) {

        templateCard.querySelector("h5").textContent = producto.descripcion;
        templateCard.querySelector("p").textContent = `$ ${producto.valor}`;
        templateCard.querySelector("img").setAttribute("src", `imagenes/${producto.imagen}`);
        templateCard.querySelector("button").textContent = "Agregar al carrito";
        templateCard.querySelector("button").dataset.id = producto.id;
        templateCard.querySelector("button").removeAttribute("disabled");
        if (producto.cantidad <= 0) {

            templateCard.querySelector("p").textContent = "Sin Stock";
            templateCard.querySelector("button").textContent = "Agotado";
            templateCard.querySelector("button").setAttribute("disabled", "true");
        }

        const cardClonada = templateCard.cloneNode(true);
        fragment.appendChild(cardClonada);

    }

    produc.appendChild(fragment);



}





// SACO FUNCIONALIDAD DE STOCK MOMENTANEAMENTE

//AGREGAR ITEMS AL CARRITO
function agregaraCarrito(idProdSeleccionado, descProdSeleccionado, valorProdSeleccionado) {


    if (carrito.length > 0) //SI EL CARRITO TIENE ALGO , VERIFICO SI EL PRODUCTO QUE LLEGA YA SE ENCUENTRA PARA SUMARLO
    {
        const i = carrito.findIndex(prod => prod.idProducto == idProdSeleccionado); //obtengo el indice del idproducto del objeto carrito
        if (i == -1) {
            //SI NO SE ENCUENTRA EN EL CARRITO LO GUARDO
            const lineacarrito = new Carrito(idProdSeleccionado, descProdSeleccionado, 1, valorProdSeleccionado, valorProdSeleccionado);
            carrito.push(lineacarrito);//guardo un objeto carrito que contiene la info de la linea
        }
        else {
            //SI SE ENCUENTRA EN EL CARRITO SUMO LA CANTIDAD Y EL TOTAL
            carrito[i].cantidad = carrito[i].cantidad + 1;
            //  carrito[i].precioLineaCarrito=carrito[i].precioLineaCarrito*carrito[i].cantidad;
            carrito[i].total = carrito[i].cantidad * parseFloat(carrito[i].precioLineaCarrito);
        }


    }
    else  //SI EL CARRITO ESTA VACIO LO AGREGO
    {
        const lineacarrito = new Carrito(idProdSeleccionado, descProdSeleccionado, 1, valorProdSeleccionado, valorProdSeleccionado);
        carrito.push(lineacarrito);//guardo un objeto carrito que contiene la info de la linea  
    }




    if (localStorage.getItem("carrito") === null) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    else {
        localStorage.removeItem("carrito")
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}






//EVENTO DEL BOTON AGREGAR AL CARRITO EN CADA TARJETA
produc.addEventListener('click', e => {


    if (e.target.classList.contains('btn-dark')) //si hago click en el boton COMPRAR DE CADA CARD
    {
        let idProdSeleccionado = e.target.dataset.id;//con esto obtengo el idproducto clickeado
        let i = productos.findIndex(prod => prod.id == idProdSeleccionado); //Busco en productos el objeto
        productoEnCarrito = productos[i];
        let descProdSeleccionado = e.target.parentElement.querySelector("h5").textContent;
        let valorProdSeleccionado = e.target.parentElement.querySelector("p").textContent;
        agregaraCarrito(idProdSeleccionado, descProdSeleccionado, productoEnCarrito.valor);
        mostrarProductos()
        let contadorCarrito=document.getElementById("contador");
       
        contador=contador+1;
        contadorCarrito.innerHTML=contador;



       const totalCarrito=document.getElementById("totCompra");

        totalCarrito.content=`MONTO TOTAL  $ ${montoCompra()}`;
        produc.innerHTML(totalCarrito)
     

     

    }



});






//EVENTO DEL BOTON VER CARRITO
const vercarrito = document.getElementById("btnVerCarrito");
vercarrito.addEventListener('click', e => {

    verCarrito();

})








//EVENTO BOTON LOGIN

const eventoBotonLogin = document.getElementById("btnLogin");

eventoBotonLogin.addEventListener('click', e => {

    const usuarioDigitado = document.getElementById("txtUser").value;
    const UsuarioPassword = document.getElementById("txtPass").value;
    const valido = validarUsuario(usuarioDigitado, UsuarioPassword);


    if (valido) { // SI VALIDÓ USUARIO
        const linkIngresar = document.getElementById("Linkingresar");
        const linKMiCuenta = document.getElementById("LinkMiCuenta");
        linkIngresar.setAttribute("class", "nav-link disabled");
        linkIngresar.setAttribute("disabled", "true");   //SI VALIDO MARCO EL LINK deshabilitado PARA QUE NO SE PUEDA INGRESAR DE NUEVo
        linkIngresar.textContent = `Bienvenido ${JSON.parse(sessionStorage.getItem("usuario")).nombre}`

        const cerrarSesion = document.querySelector("#divCerrarSesion");
        const botonCerrarSesion = document.createElement("a");
        botonCerrarSesion.id = "LinkCerrar";
        botonCerrarSesion.className = "nav-link active";
        botonCerrarSesion.setAttribute("data-bs-target", "#staticBackdrop");
        botonCerrarSesion.setAttribute("href", "");
        botonCerrarSesion.setAttribute("aria-current", "page");
        botonCerrarSesion.setAttribute("class", "btn-Cerrar'");
        botonCerrarSesion.setAttribute("class", "nav-link active")
        linKMiCuenta.setAttribute("class", "nav-link active")
        linKMiCuenta.textContent = "Mi cuenta";
        botonCerrarSesion.textContent = "Cerrar Sesion";
        cerrarSesion.appendChild(botonCerrarSesion);








        //EVENTO BOTÓN CERRAR SESION
        const eventoBotonCerrarSesion = document.getElementById("LinkCerrar");
        eventoBotonCerrarSesion.addEventListener('click', e => {

            //ELIMINO EL SESSION STORAGE y quito el boton cerrar session Y CAMBIO EL ESTADO DEL BOTON INGRESAR

            sessionStorage.removeItem("usuario");
            cerrarSesion.removeChild(botonCerrarSesion);
            linkIngresar.textContent = `Ingresar`;
            linkIngresar.removeAttribute("class", "nav-link disabled");
            linKMiCuenta.removeAttribute("class", "nav-link disabled");




        })

    }
    else {
        alert("Usuario o contraseña incorrecta")
    }

})








//EVENTO BOTON VACIAR CARRITO
const eventoBotonVaciar = document.getElementById("btnBorrar");
eventoBotonVaciar.addEventListener('click', e => {


    //alert(`Bienvenido ${usuarioLogueado.nombre}`);

    vaciarCarrito(0);
    produc.innerHTML = "";
    mostrarProductos()
    localStorage.removeItem("carrito")
})






//EVENTO BOTON PAGAR
const eventoBotonComprar = document.getElementById("btnComprar");
eventoBotonComprar.addEventListener('click', e => {

    //VERIFICO QUE ESTE ALGUIEN LOGUEADO

    if (sessionStorage.getItem("usuario") === null) {
        alert("Usuario,debes loguearte para poder comprar");
    }
    else {
        comprar();
        localStorage.removeItem("carrito")
    }


})






//VER CARRITO
function verCarrito() {
    document.getElementById("carritoConProducto").innerHTML = "";
    const templateCARRITO = document.getElementById("templatelistaCarrito").content; //aca es donde va la data


    for (elementoCarrito of carrito) {

        //  templateCARRITO.querySelector("th").textContent=elementoCarrito.idProducto;
        templateCARRITO.querySelectorAll("td")[0].textContent = elementoCarrito.descProducto;
        templateCARRITO.querySelectorAll("td")[1].textContent = elementoCarrito.cantidad;
        templateCARRITO.querySelector("span").textContent = elementoCarrito.total;

        const clone = templateCARRITO.cloneNode(true);
        fragment.appendChild(clone);
    }
document.getElementById("carritoConProducto").appendChild(fragment)





}






mostrarProductos();
sessionStorage.removeItem("usuario"); //AL INICIAR PROGRAMA BORRO EL SESSIONSTORAGE PARA SEGURIDAD QUE HAYA QUEDADO DUPLICADO
console.log(JSON.parse(localStorage.getItem("carrito")));
carrito = JSON.parse(localStorage.getItem("carrito"));