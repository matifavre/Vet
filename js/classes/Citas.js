class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas);
    }
      // Itera en cada una de las citas, verifica (mismo id) se reescribe, caso contrario se mantiene cita actual
    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita) 
    }    
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id); // eliminar citas que son distintas
    }
    
}

export default Citas;