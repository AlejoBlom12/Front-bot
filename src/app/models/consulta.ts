export class Consulta {
    _id?: number;
    referencia: number;
    pregunta: string;
    respuesta: string;
    subclase: {
        _id: string;
        nombre: string;
      };


    constructor(referencia: number, pregunta: string, respuesta: string, subclase: any){
        this.referencia = referencia
        this.pregunta = pregunta
        this.respuesta = respuesta
        this.subclase = subclase
    }
}

