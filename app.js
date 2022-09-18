const usuarios =[];
const facturas=[];
const productos =[];
const carrito = [];
const productosDisponibles=[];
let producto;
let pass;
let moneda="$";
//let formaPago;
let usuarioLogueado;


//const usuarioLogueado;




class Factura{
    constructor(idUsuario,nroFactura,fecha,total,items){
        this.idUsuario=idUsuario;
        this.nroFactura=nroFactura
        this.fecha=fecha;
        this.total=total;
        this.items=items;
        }
    }




class Usuario{
    constructor(id,nombre,apellido,nombreUsuario,pass,cuenta,email){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.pass=pass;
        this.nombreUsuario=nombreUsuario;
        this.cuenta=cuenta;
        this.email=email;
        }
    }

        //para borrar, SI BIEN SE Puede AGREGAR USUARIOS , SE HARCODEA PARA TRABAJAR MAS RAPIDO
        const usuario1 = new Usuario (1,"diego","tocchetto","dtoccho","131313",100000,"diego.tocchetto@gmail.com");
        const usuario2 = new Usuario (2,"profesor","js","profe","111111",5000,"profesor@gmail.com");
        usuarios.push(usuario1);
        usuarios.push(usuario2);
    



    class Producto{
        constructor(id,descripcion,valor,cantidad,imagen) {
            this.id=id;
            this.descripcion=descripcion;
            this.valor=valor;
            this.cantidad=cantidad;
            this.imagen=imagen;
            }
        }
    

        //sE HARCODEA PARA TRABAJAR MAS RAPIDO //NO ESTA IMPLEMENTADOP AGREGAR PRODUCTOS
        const producto1 = new Producto (1,"TV SMART 50 ANDROID",19336,5,"tv50.jpg");
        const producto2 = new Producto (2,"TV SMART 65 ANDROID",25025,0,"tv65.jpg");
        const producto3 = new Producto (3,"LAVARROPA CYAN C",11690,1,"lavarropa.jpg");
        const producto4 = new Producto (4,"AIRE ACONDICIONADO 12KBTU",22000,5,"Aire.jpg");
        const producto5 = new Producto (5,"HELADERA FRENCH DOOR INV",52000,5,"Heladera.jpg");
        const producto6 = new Producto (6,"MINICOMPONENTE 5000W",15000,5,"miniComponente.jpg");

        productos.push(producto1);
        productos.push(producto2);
        productos.push(producto3);
        productos.push(producto4);
        productos.push(producto5);
        productos.push(producto6);
  






        class Carrito{
            constructor(idProducto,descProducto,cantidad,precioLineaCarrito){
                this.idProducto=idProducto;
                this.descProducto=descProducto;
                this.precioLineaCarrito=precioLineaCarrito;
                this.cantidad=cantidad;
                }
            }




//FUNCIONES UTILES


function fechaActual()
    {
        let date = new Date();
        const formatDate = (date)=>{
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return formatted_date;
    }
 return(formatDate(date));
    }

   

//SE VALIDA EL USUARIO AL LOGUEO


function validarUsuario (nombreUsuario,password)
{
    let valido=false;
    usuarioLogueado=usuarios.find(usuario => usuario.nombreUsuario.toLowerCase()===nombreUsuario.toLowerCase()); 

        if(usuarioLogueado!=undefined)
        {
                if(usuarioLogueado.pass===password)
                {
                     valido=true;
                    
                }        
        }
    
return valido;

}




//AGREGA AL USUARIO 

function agregarUsuario ()
{
    let nombre =prompt("Ingrese Nombre").toUpperCase();
    let apellido=prompt("Ingrese Apellido").toUpperCase();;
    let email=prompt("Ingrese su Correo electronico").toLowerCase();
    let nombreUsuario=prompt("Ingrese un nombre de usuario").toLowerCase();
    let pass=prompt("Ingrese un password");
    let id=Math.ceil(Math.random()*1000).toString();
    let cuenta=0;

    const usuario = new Usuario (id,nombre,apellido,nombreUsuario,pass,cuenta,email);
    const existeUsuarioMail=usuarios.find(usuario => usuario.email === email);
    const existeUsuarioNombreUsuario=usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario);
   
    if(!existeUsuarioMail && !existeUsuarioNombreUsuario){
    usuarios.push(usuario);
    alert(`Hola ${usuario.nombre} ${usuario.apellido} , te has registrado correctamente`);
   }


   //SI EXISTE EL USUARIO VERIFICO QUE ESTA DUPLICADO, SI EL NOMBREUSUARIO O EL CORREO
   if(existeUsuarioMail)
   {
    alert("YA EXISTE UN USUARIO CON ESE CORREO ELECTRÓNICO")
   }
   if(existeUsuarioNombreUsuario)
   {
    alert("YA EXISTE UN USUARIO CON ESE NOMBRE DE USUARIO")
   }


 
    mostrarMenuGeneral();
}



//MENU PARA LOGUEARSE

function mostrarMenulogueo()
{

    let nombreUsuario= prompt("Ingrese Su Usuario");
    let password= prompt("Ingrese su password");
   if( validarUsuario(nombreUsuario,password))
   {
          alert(`Bienvenido ${usuarioLogueado.nombre.toUpperCase()} ${usuarioLogueado.apellido.toUpperCase()}`);

          MenuUsuario ();

   }
   else
   {
    alert("Usuario o contraseña incorrectos");
    mostrarMenuGeneral();
  
    }
    

    
}




//MENU GENERAL REGISTRARSE O INGRESAR
function mostrarMenuGeneral()
{
    let entrada=Number(prompt("\n 1 - Registrarse \n 2 - Ingresar"));

    if(entrada===1)
    {
        agregarUsuario ();
    }2
    if(entrada===2)
    {
        mostrarMenulogueo();
    }
}




/*
//VER CARRITO
function verCarrito()
{
    let lineaCarrito="";
    carrito.forEach(elementoCarrito => {//elementoCarrito es el elemento que esta dentro del arry
       lineaCarrito= lineaCarrito+ elementoCarrito.descProducto+"    Cantidad:" +elementoCarrito.cantidad+"    Total $" +elementoCarrito.precioLineaCarrito+" \n" ;
        });

            if(carrito.length===0)
            {
                alert("Su carrito está vacio");
            }
            else
            {
                alert(lineaCarrito);
            }
       
    return lineaCarrito;
    
}

*/

//VACIAR CARRITO

function vaciarCarrito (accion)
 {
    for(let i=carrito.length;i>0;i--)
        {
   
             const lineacarrito =new Carrito (carrito[i-1].idProducto, carrito[i-1].descripcion,carrito[i-1].cantidad, carrito[i-1].precioLineaCarrito);
    
            if(accion===0) //0 SE INVOCA DESDE VACIAR CARRITO / 1 - SE INVOCA DESDE EL PAGAR 
            {
                MoverStock(1,lineacarrito);
            }

            carrito.pop();  //  vaciarCarrito(carrito) 
        
        }
        
        
        if(carrito.length===0 && accion===0)
        {
            alert("No hay items en su carrito");
        }
        else
        {
            if(accion===0  ) //0 sE INVOCA DESDE VACIAR CARRITO / 1 - SE INVOCA DESDE EL PAGAR 
            {
             alert("Los items del carrito se quitaron correctamente");
            } 
        }
 
    
}




//AGREGAR DINERO A LA CUENTA DEL USUARIO

function agregarDineroACuentaUsuario (usuarioLogueado)
{
 
    for (let i = 0; i<usuarios.length; i++) 
    {
       if(usuarios[i].nombreUsuario===usuarioLogueado.nombreUsuario)
       {
            alert(`Su saldo actual es ${usuarios[i].cuenta}`);
            let deposito=parseFloat(prompt("Ingrese el dinero a depositar")); 
            let saldo = usuarios[i].cuenta;   
            usuarios[i].cuenta =  saldo+ deposito;
            usuarioLogueado=usuarios[i];
            alert(`Se ha agregado dinero a su cuenta, su saldo es ${usuarios[i].cuenta}`);
            break;
      }
   
        MenuUsuario()

    }
    MenuUsuario ();
}




//GENERAR FACTURA

function generarFactura(total,carrito)
{
    let nroFactura=Math.ceil(Math.random()*1000000).toString();

    const factura = new Factura (usuarioLogueado.id,nroFactura,fechaActual(),total,carrito);
    facturas.push(factura);
     
}





//VER FACTURAS

function verFactura(idusuario)
{

let misfacturas="";

if (facturas.length>0)
    {

        for (let i =0;i<facturas.length;i++)
        {   

                if(facturas[i].idUsuario===usuarioLogueado.id)
                        {
                        misfacturas+= "Nro. Factura: "+facturas[i].nroFactura + " - " +"Fecha: "+facturas[i].fecha + " - " +"Total $: "+facturas[i].total+"\n";
                        }
         }
     }
     else
     {

        misfacturas="Usted no ha hecho ninguna compra";
     }


    
     return misfacturas
}





//MENU MICUENTA USUARIO LOGUEADO

function miCuenta (usuarioLogueado)
{

            let opcion =Number(prompt("\n 1 - Ver Mis Datos \n 2 - Mis compras \n 3 - Mi Saldo \n 4 - Recargar Saldo \n 5 - Volver"));
            switch(opcion){
                case 1:
                    alert(`Nombre: ${usuarioLogueado.nombre.toUpperCase()}  ${usuarioLogueado.apellido.toUpperCase()}\nEmail: ${usuarioLogueado.email.toUpperCase()}`);
                    miCuenta (usuarioLogueado);
                    break;
                case 2:
                   alert(verFactura(usuarioLogueado.id));
                   miCuenta (usuarioLogueado);
                    break;
                case 3:
                    alert(`Su saldo actual es: $ ${usuarioLogueado.cuenta}`)
                    miCuenta (usuarioLogueado);
                    break;
                case 4:
                    agregarDineroACuentaUsuario(usuarioLogueado);
                    miCuenta (usuarioLogueado);
                    break;
                case 5:
                    MenuUsuario();
                    break;
                  default:"Nada"
            }
   
        }
   

//MENU USUARIO LOGUEADO

function MenuUsuario()
{
  let entrada= Number(prompt("\n 1 - Comprar Producto \n 2 - Mostrar Carrito\n 3 - Vaciar Carrito\n 4 - Pagar \n 5 - Mi Cuenta\n 6 - Salir"));
 

  switch(entrada)
{
    case 1:
           // agregarProducto ();
            agregarAlCarrito(); //borrar si tengo una db
    break;
    case 2: verCarrito();
            MenuUsuario ();
    break;
    case 3:
            vaciarCarrito (0);
            MenuUsuario ();
    break;
    case 4:
            comprar();
    break;
    case 5:
            miCuenta (usuarioLogueado);
      
    break;
    case 6:
            usuarioLogueado=null;
            mostrarMenuGeneral();
      
    break;
    default:   
            MenuUsuario ();
  } 

}





function montoCompra() //LINEAS DE FACTURA
{

let montoTotal=0;;
    if (carrito.length>0)
    {

        for(let i=0;i<carrito.length;i++)
        { 

            montoTotal=montoTotal+carrito[i].precioLineaCarrito;
          
        }

    } 
   return montoTotal;
}





function comprar ()
{
    let total=montoCompra();
    if(carrito.length>0){

            let i =usuarios.findIndex(usuario => usuario.nombreUsuario===usuarioLogueado.nombreUsuario); 


                if(parseFloat(usuarios[i].cuenta)>=parseFloat(total))  {

                    //actualizo el saldo en el array de usuariosd
                    usuarios[i].cuenta-=total;
                    generarFactura(total,carrito);
                     vaciarCarrito(1);
                    alert("Compra Realizada con éxito, recibirá un correo con los detalles");
                }
                else{
                alert(`Saldo Insuficiente, su saldo es de $ ${usuarios[i].cuenta} , recargue dinero para continuar con la compra`);
                }
    }
    else{
         alert("Su carrito esta vacío");
    }
    MenuUsuario() ; 
}
   





function MoverStock(modo,lineacarrito) //    //MODO 0 ES DEBITAR / MODO 1 ACREDITAR Y VIENE UN OBJETO CARRITO QUE ES LA LINEA
{
  
    let i = productos.findIndex(prod => prod.id==lineacarrito.idProducto); //obtengo el indice del idproducto del objeto carrito

     if(modo===1)
     {
      productos[i].cantidad=productos[i].cantidad+lineacarrito.cantidad; }
     else {
         
          productos[i].cantidad=productos[i].cantidad-lineacarrito.cantidad;
      
     }   

}




function calcularPrecioLinea(precio,cantidad)
{
    let totalLinea=precio*cantidad;
 
   return (totalLinea);
 
}
//mostrarMenuGeneral(); //SE COMENTA POR AGREGADO DE DOM




//VERSION V2 con DOM MOSTRAR PRODUCTOS 


const produc=document.getElementById("Productos")
const templateCard=document.getElementById("templateCard").content;
const fragment = document.createDocumentFragment();


function mostrarProductos(){


produc.innerHTML="";

    for(producto of productos)
    {
     
        templateCard.querySelector("h5").textContent=producto.descripcion;
        templateCard.querySelector("p").textContent=`${moneda} ${producto.valor}`;
        templateCard.querySelector("img").setAttribute("src",`imagenes/${producto.imagen}`);
        templateCard.querySelector("button").textContent="Comprar";
        templateCard.querySelector("button").dataset.id = producto.id;
        templateCard.querySelector("button").removeAttribute("disabled");
        if(producto.cantidad<=0)
         {
   
            templateCard.querySelector("p").textContent="Sin Stock";
            templateCard.querySelector("button").textContent="Agotado";  
            templateCard.querySelector("button").setAttribute("disabled","true"); 
         }

        const cardClonada= templateCard.cloneNode(true);
        fragment.appendChild(cardClonada);

    }

  produc.appendChild(fragment);


    
}



//AGREGAR ITEMS AL CARRITO
function agregaraCarrito (idProdSeleccionado,descProdSeleccionado,valorProdSeleccionado)
{

    const lineacarrito =new Carrito(idProdSeleccionado, descProdSeleccionado,1,valorProdSeleccionado);
    carrito.push(lineacarrito);//guardo un objeto carrito que contiene la info de la linea
     MoverStock(0,lineacarrito); //QUITO STOCK DEL ARRAY PRODCUTOS
 // console.log(carrito);
}



//EVENTO DEL BOTON de comprar
produc.addEventListener('click', e => { 


    if (e.target.classList.contains('btn-dark')) //si hago click en el boton COMPRAR DE CADA CARD
    {
    let idProdSeleccionado =e.target.dataset.id;//con esto obtengo el idproducto clickeado
    let descProdSeleccionado=e.target.parentElement.querySelector("h5").textContent;
    let valorProdSeleccionado=e.target.parentElement.querySelector("p").textContent;
    agregaraCarrito(idProdSeleccionado,descProdSeleccionado,valorProdSeleccionado);
    verCarrito();
    mostrarProductos()
    }
 
 
  
});

//evento boton ingresar
const eventoBotonIngresar=document.getElementById("ingresar");
eventoBotonIngresar.addEventListener('click', e => { 


})

//evento boton ingresar
const eventoBotonLogin=document.getElementById("botonlogin");
eventoBotonIngresar.addEventListener('click', e => { 
console.log("hola boton login");

})


//evento boton vaciar carrito
const eventoBotonVaciar=document.getElementById("btnBorrar");
eventoBotonVaciar.addEventListener('click', e => {  
  
  
  
  
        vaciarCarrito();
        console.log(carrito.length)
        productos[0].cantidad;
        produc.innerHTML="";
        mostrarProductos()
    })


//VER CARRITO
function verCarrito()
{
    produc.innerHTML="";
    const templateCARRITO=document.getElementById("templatelistaCarrito").content;

    
   
         carrito.forEach(elementoCarrito => {

      //  templateCARRITO.querySelector("th").textContent=elementoCarrito.idProducto;
        templateCARRITO.querySelectorAll("td")[0].textContent=elementoCarrito.descProducto;
        templateCARRITO.querySelectorAll("td")[1].textContent="1";
        templateCARRITO.querySelector("span").textContent=elementoCarrito.precioLineaCarrito;
        
        const clone=templateCARRITO.cloneNode(true);
        fragment.appendChild(clone)
    });


}
    produc.appendChild(fragment);

/*
    let lineaCarrito="";
    carrito.forEach(elementoCarrito => {//elementoCarrito es el elemento prodcuto que esta dentro del array 
      // console.log(carrito);
        lineaCarrito= lineaCarrito+ elementoCarrito.descProducto+"    Cantidad:" +elementoCarrito.cantidad+"    Total $" +elementoCarrito.precioLineaCarrito+" \n" ;
        });

            if(carrito.length===0)
            {
                alert("Su carrito está vacio");
            }
            else
            {
                alert(lineaCarrito);
            }
       
    return lineaCarrito;
    */
//}


mostrarProductos();











