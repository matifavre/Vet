const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput= document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
let editando;

class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas);
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id); // eliminar citas que son distintas
    }
    // Itera en cada una de las citas, verifica (mismo id) se reescribe, caso contrario se mantiene cita actual
    editarCita(citaActualizada){
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita) 
    
    }
}

class UI{
    imprimirAlerta(mensaje, tipo) {
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert','d-block','col-12');
        
        // Agregar en base de tipo error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        // Mensaje de Error
        divMensaje.textContent = mensaje;
        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('agregar-cita'));
        setTimeout(() =>{
            divMensaje.remove();
        },5000);
    }
    imprimirCitas({citas}){ // < Destructuring desde el parentesis
        this.limpiarHTML();

        citas.forEach(cita =>{
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
            
            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: ${propietario} </span>
            `;
            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: ${telefono} </span>
            `;
            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: ${fecha} </span>
            `;
            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: ${hora} </span>
            `;
            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: ${sintomas} </span>
            `;
            // Boton para eliminar Citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-1');
            btnEliminar.innerHTML = 'Eliminar Cita';
            btnEliminar.onclick = () => eliminarCita(id);

            // Button para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML = 'Editar Cita';
            btnEditar.onclick = () => cargarEdicion(cita);
            //Agregar Parrafo al DivCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        })
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}
const ui = new UI();
const administrarCitas = new Citas();

// Registrar Eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

function datosCita(e){
    citaObj[e.target.name] = e.target.value; //acceder a las propiedades
}
//Valida y Agrega Nueva Citas 
function nuevaCita(e){
    e.preventDefault();
    //extraer informacion de Obj Cita
    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;

    // Validar 
    if(mascota === '' || propietario === '' || telefono === ''|| fecha === ''|| hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos Los Campos Son Obligatorios', 'error');
        return;
    }
    if (editando){
    ui.imprimirAlerta('Editado correctamente');
    
    //Pasar objeto de cita a edicion
    administrarCitas.editarCita({...citaObj});
    // regresar el texto del boton a estado original
    formulario.querySelector('btton [type="submit"]').textContent = 'Crear Cita';
    // quitar modo edicion
    editando = false;
    }else{
    //Generar un ID unico
    citaObj.id = Date.now();

    //Crear una cita 
    administrarCitas.agregarCita({...citaObj}); // Se toma una copia de citaObj para que no se repita el valor
    ui.imprimirAlerta('Se agrego correctamente');
    }



    // Reiniciar Objeto para validacion
    reiniciarObjeto();
    
    //Reinicia el formulario
    formulario.reset(); 
    
    //Mostrar HTML de las citas
    ui.imprimirCitas(administrarCitas);
}
function reiniciarObjeto(){
    citaObj.mascota= '',
    citaObj.propietario= '',
    citaObj.telefono= '',
    citaObj.fecha= '',
    citaObj.hora= '',
    citaObj.sintomas= ''
}
function eliminarCita(id){
    // Eliminar
    administrarCitas.eliminarCita(id);
    //Mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');
    // Refrescar
    ui.imprimirCitas(administrarCitas);
}

// Carga datos y edicion
function cargarEdicion(cita){
    const{mascota,propietario,telefono,fecha,hora,sintomas,id} = cita; //destructuring

    // Llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    // Llenar el Objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;;
    citaObj.hora = hora;
    citaObj.fecha = fecha;
    citaObj.sintomas = sintomas;
    formulario.querySelector('btton [type="submit"]').textContent = 'Guardar Cambios';
    editando = true;

}

