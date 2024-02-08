import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Subclase } from '../models/subclase';


@Injectable({
  providedIn: 'root'
})
export class SubclaseService {

  
  constructor(private http: HttpClient) { }

  getSubclase (): Observable<any>{
    return this.http.get("http://localhost:3500/listaSubclases")
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  eliminarSubclase(id: string): Observable<any> {
    return this.http.delete("http://localhost:3500/eliminarSubclase/" + id)
            .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  guardarSubclase (subclase: Subclase): Observable <any>{
    return this.http.post("http://localhost:3500/guardandoSubclases", subclase)
            .pipe(
            catchError(er =>{
              console.log(er)
            return er
            })
       )
    }

  obtenerSubclase(id: string): Observable <any>{
    return this.http.get("http://localhost:3500/subclase/" + id)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }


  editarSubclase(id:string, subclase: Subclase): Observable <any>{
    return this.http.put("http://localhost:3500/editarSubclase/" + id, subclase)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  obtenerConsultaPorReferencia(referencia: string): Observable<any> {
    return this.http.get(`http://localhost:3500/subclasePorReferencia/${referencia}`)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  todasSubclases(): Observable<any> {
    return this.http.get('http://localhost:3500/obtenerTodasSubclases')
      .pipe(
        catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

  obtenerSubclasesPorCategoria(referenciaCategoria: string): Observable<any> {
    return this.http.get(`http://localhost:3500/subclasesPorCategoria/${referenciaCategoria}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

}
