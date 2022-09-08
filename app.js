const usuarios =[];
const facturas=[];
const productos =[];
const carrito = [];
const productosDisponibles=[];
let posicionArrayUsuario;
let producto;
let pass;
let formaPago;


let cantidadItemsCarrito;
let totalDineroCompra=0;
let usuarioLogueado;


//const usuarioLogueado;

class Factura{
    constructor(idUsuario,nroFactura,producto,cantidad,total){
        this.idUsuario=idUsuario;
        this.nroFactura=nroFactura
        this.producto=producto;
        this.cantidad=cantidad;
        this.total=total;
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

    
    
    class Producto{
        constructor(id,descripcion,valor,cantidad)
        {
            this.id=id;
            this.descripcion=descripcion;
            this.valor=valor;
            this.cantidad=cantidad;
            }
        }
    


function validarUsuario (nombreUsuario,password)
{
    //para borrar, SI BIEN SE Puede AGREGAR USUARIOS , SE HARCODEA PARA TRABAJAR MAS RAPIDO
    const usuario = new Usuario (1,"diego","tocchetto","dtoccho","131313",1000,"diego.tocchetto@gmail.com");
    const usuario2 = new Usuario (2,"profesor","js","profe","111111",3560,"profesor@gmail.com");
    usuarios.push(usuario);
    usuarios.push(usuario2);
    let valido=false;
    usuarioLogueado=usuarios.find(usuario => usuario.nombreUsuario===nombreUsuario); 
    //alert(usuarioLogueado.nombre);

        if(usuarioLogueado!=undefined)
        {
                if(usuarioLogueado.pass===password)
                {
                     valido=true;
                    
                }        
        }
    
return valido;

}




function agregarUsuario ()
{
    let nombre =prompt("Ingrese Nombre").toUpperCase();
    let apellido=prompt("Ingrese Apellido").toUpperCase();;
    let email=prompt("Ingrese su Correo electronico");
    let nombreUsuario=prompt("Ingrese un nombre de usuario").toLowerCase();
    let pass=prompt("Ingrese un password");
    const usuario = new Usuario (documento,nombre,apellido,nombreUsuario,pass);
    usuarios.push(usuario);
    alert(`Hola ${usuario.nombre} ${usuario.apellido} , te has registrado correctamente`);
    mostrarMenuGeneral();
}




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





function agregarProducto()
{
    //SE AGREGAN HARCODEADOPS
    const producto  = new Producto (1,"MONITOR PHILIPS 17 PULGADAS",2000,5);
    const producto2 = new Producto (2,"TV SAMSUNG 65 PULGADAS",10000,5);
    const producto3 = new Producto (3,"TELEFONO IPHONE 10",50,1);
    const producto4 = new Producto (4,"TELEFONO SAMSUNG S20",15000,5);
    productos.push(producto);
    productos.push(producto2);
    productos.push(producto3);
    productos.push(producto4);
}

//VER ESTA FUNCION
function agregarAlCarrito()
{
    
   // let i =productos.findIndex(producto => usuario.nombreUsuario===usuarioLogueado.nombreUsuario); 
//tengo que controlar la cantidad de productos
for(let i =0;i<productos.length;i++)
{
    if (productos[i].cantidad>0)
    {
     
        productosDisponibles.push(productos[i]);
       
    }
    else
    {
        alert("Se acabo el stock")
    }
  
}

let compra =prompt(`\n 1 - ${productosDisponibles[0].descripcion} $ ${productosDisponibles[0].valor} \n 2 - ${productosDisponibles[1].descripcion}  $ ${productosDisponibles[1].valor}  \n 3 - ${productosDisponibles[2].descripcion}  $ ${productosDisponibles[2].valor}\n 4 - ${productosDisponibles[3].descripcion}  $ ${productosDisponibles[3].valor}`);
let productoSeleccionado=productosDisponibles[compra-1];
let indice =productos.findIndex(producto => producto.id===productoSeleccionado.id); 
//alert(productos[indice].cantidad);


carrito.push(productoSeleccionado);
productos[indice].cantidad--;
//alert(productos[indice].cantidad); //resto stock
alert ("Producto agregado correctamente");
MenuUsuario ();

}


function verCarrito ()
{
    if(carrito.length>0)
    {
        let lineaCarrito="";
        for(let i =0;i<carrito.length;i++)
        {
            
          lineaCarrito= lineaCarrito+ " \n " +carrito[i].descripcion+"                               $" +carrito[i].valor;
        }
      
          return lineaCarrito;
    }
    else{
        lineaCarrito=("Su carrito está vacio");
    }


    return lineaCarrito;
}





function vaciarCarrito ()
{
    for(let i=carrito.length;i>0;i--)
        {
          // let indice=productos.findIndex(producto => producto.id===carrito[i].id); 
          
         // productos[indice].cantidad--;
           // alert("1");
            carrito.pop();
          
          
        }
        alert("Su carrito se vacio correctamente");
        MenuUsuario();

}


function agregarDineroACuentaUsuario (usuarioLogueado)
{
 
    for (let i = 0; i<usuarios.length; i++) 
    {
        if(usuarios[i].nombreUsuario===usuarioLogueado.nombreUsuario)
        {
            alert(`Su saldo actual es ${usuarios[i].cuenta}`);
            let deposito=parseFloat(prompt("Ingrese el dinero a depositar")); 
            let saldo=  usuarios[i].cuenta;   
            usuarios[i].cuenta =  saldo+ deposito;
            usuarioLogueado=usuarios[i];
            alert(`Se ha agregado dinero a su cuenta, su saldo es ${usuarios[i].cuenta}`);
            break;
        }
   
        MenuUsuario()

    }
    MenuUsuario ();
}




function generarFactura(total)
{


    
        for(let i=0;i<carrito.length;i++)
        {

            let nroFactura=Math.ceil(Math.random()*1000000).toString();
  

            const factura = new Factura (usuarioLogueado.id,nroFactura,carrito[i].descripcion,"1",total);

            facturas.push(factura);
     
        }2

     
}

function verFactura(idusuario)
{

let misfacturas="";

if (facturas.length>0)
    {

        for (let i =0;i<facturas.length;i++)
        {   

                if(facturas[i].idUsuario===usuarioLogueado.id)
                        {
                        misfacturas=misfacturas + facturas[i].nroFactura + " - " +facturas[i].producto+"\n";
                       }
         }
     }
     else
     {

        misfacturas="Usted no ha hecho ninguna compra";
     }


    
     return misfacturas
}

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
   



function MenuUsuario()
{
  let entrada= Number(prompt("\n 1 - Comprar Producto \n 2 - Mostrar Carrito\n 3 - Vaciar Carrito\n 4 - Pagar \n 5 - Mi Cuenta\n 6 - Salir"));
 

  switch(entrada)
{
      case 1:
           agregarProducto ();
           agregarAlCarrito(); //borrar si tengo una db
      break;
      case 2:
           alert(verCarrito());
           MenuUsuario ();
      break;
      case 3:
           if(carrito.length>0)
            {
            vaciarCarrito ();
            alert("Carrito vaciado correctamente");
            MenuUsuario ();
           }
           else
           {
            alert("Su carrito esta vacío"); 
            MenuUsuario ();
           }
       break;
        case 4:
            comprar(totalCarrito());
        break;
         case 5:
            miCuenta (usuarioLogueado);
      
        break;
        case 6:
            usuarioLogueado=null;
            mostrarMenuGeneral();
      
         break;
    default:   2
    MenuUsuario ();
  } 

}


function totalCarrito()
{


    if (carrito.length>0)
    {

        for(let i=0;i<carrito.length;i++)
        { 

           totalDineroCompra= totalDineroCompra+carrito[i].valor;
          
        }

    } 
   return totalDineroCompra;
}


function comprar (totalDineroCompra)
{
        if(carrito.length>0)
        {

                    let i =usuarios.findIndex(usuario => usuario.nombreUsuario===usuarioLogueado.nombreUsuario); 


                     if(parseFloat(usuarios[i].cuenta)>=parseFloat(totalDineroCompra))
                          {

                    //actualizo el saldo en el array de usuarios
                    usuarios[i].cuenta=usuarios[i].cuenta-totalDineroCompra;
                    generarFactura(totalDineroCompra); //Genero factura
                    debitarStock(); // debito stock
                    vaciarCarrito (); //vaci ocarrito
                    alert("Compra Realizada con éxito, recibirá un correo con los detalles");
         
                 

                          }
                         else
                            {
                    alert(`Saldo Insuficiente, su saldo es de $ ${usuarios[i].cuenta} , recargue dinero para continuar con la compra`);
          
                             }

         }
      else
         {
         alert("Su carrito esta vacío");
         }
    MenuUsuario()  
}
   




function debitarStock(idusuario)
{
    for(let i=0;i<carrito.length;i++)
    {
  
        let index = productos.findIndex(producto => producto.id===carrito[i].id); 
       ///resto stock
        productos[index].cantidad--;
 
    }
 
}


mostrarMenuGeneral();

