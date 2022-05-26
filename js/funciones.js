import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando = false;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
// Antes de linea 14, no hay que exportar nada, ya que todo es local


export function datosCita(e){
    citaObj[e.target.name] = e.target.value; //acceder a las propiedades
}
//Valida y Agrega Nueva Citas 
export function nuevaCita(e){
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
export function reiniciarObjeto(){
    citaObj.mascota= '',
    citaObj.propietario= '',
    citaObj.telefono= '',
    citaObj.fecha= '',
    citaObj.hora= '',
    citaObj.sintomas= ''
}
export function eliminarCita(id){
    // Eliminar
    administrarCitas.eliminarCita(id);
    //Mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');
    // Refrescar
    ui.imprimirCitas(administrarCitas);
}

// Carga datos y edicion
export function cargarEdicion(cita){
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
