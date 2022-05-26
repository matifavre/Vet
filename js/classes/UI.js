// Importar de Funciones
import {eliminarCita,cargarEdicion} from '../funciones.js';
import {contenedorCitas, heading} from '../selectores.js'

class UI{
    
    constructor({citas}){
        this.textoHeading(citas);
    }
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
        this.textoHeading(citas);

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
    textoHeading(citas) {
        if(citas.length > 0) {
            heading.textContent = 'Administra tus Citas'
        } else{
            heading.textContent = 'No hay citas disponibles, por favor cargar una nueva cita :)'
        }
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}
export default UI;