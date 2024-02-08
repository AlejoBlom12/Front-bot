
export class Subclase {

    _id?: number;
    referencia: string;
    nombre: string;
    categoria: {
        _id: string;
        nombre: string;
      };



    constructor(referencia: string, nombre: string, categoria: any){
        this.referencia = referencia
        this.nombre = nombre
        this.categoria = categoria
    }
}
