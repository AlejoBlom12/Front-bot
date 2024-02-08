import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  
  constructor(private http: HttpClient) { }

  getConsultas(): Observable<any> {
    return this.http.get("http://localhost:3500/listaConsultas")
      .pipe(
        catchError(err => {
          console.log(err)
          return err
        })
      )
  }

  eliminarConsulta(id: string): Observable<any> {
    return this.http.delete("http://localhost:3500/eliminarConsulta/" + id)
            .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  guardarConsulta (consulta: Consulta): Observable <any>{
    return this.http.post("http://localhost:3500/guardandoConsulta", consulta)
            .pipe(
            catchError(er =>{
              console.log(er)
            return er
            })
       )
    }

  obtenerConsulta(id: string): Observable <any>{
    return this.http.get("http://localhost:3500/consulta/" + id)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }


  editarConsulta(id:string, consulta:Consulta): Observable <any>{
    return this.http.put("http://localhost:3500/editarConsulta/" + id, consulta)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  obtenerConsultaPorReferencia(referencia: string): Observable<any> {
    return this.http.get(`http://localhost:3500/consultaPorReferencia/${referencia}`)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  validarReferenciaExistente(referencia: number): Observable<any> {
    return this.http.get(`http://localhost:3500/validar-referencia/${referencia}`)
      .pipe(
        catchError(er => {
          console.log(er);
          return er;
        })
      );
  }

  enviarConsultaAsociada(idConsultaAsociada: string, otrosDatos: any): Observable<any> {
    const body = { idConsultaAsociada, otrosDatos };
    return this.http.post('http://localhost:3500/enviarConsultaAsociada', body)
      .pipe(
        catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

  obtenerCategorias(): Observable<any> {
    return this.http.get("http://localhost:3500/listaCategoria")
      .pipe(
        catchError(err => {
          console.log(err);
          return err;
        })
      );
  }

  obtenerSubclases(idCategoria: string): Observable<any> {
    return this.http.get(`http://localhost:3500/obtenerSubclases/${idCategoria}`)
      .pipe(
        catchError(err => {
          console.log(err);
          return err;
        })
      );
  }

  obtenerConsultasPorSubclase(subclaseId: string): Observable<any> {
    return this.http.get(`http://localhost:3500/obtenerConsultasPorSubclase/${subclaseId}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

}


