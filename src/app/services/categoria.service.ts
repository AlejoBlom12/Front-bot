import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  
  constructor(private http: HttpClient) { }

  getCategoria (): Observable<any>{
    return this.http.get("http://localhost:3500/listaCategoria")
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete("http://localhost:3500/eliminarCategoria/" + id)
            .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  guardarCategoria (categoria: Categoria): Observable <any>{
    return this.http.post("http://localhost:3500/guardandoCategoria", categoria)
            .pipe(
            catchError(er =>{
              console.log(er)
            return er
            })
       )
    }

  obtenerCategoria(id: string): Observable <any>{
    return this.http.get("http://localhost:3500/categoria/" + id)
    .pipe(
      catchError(er => {
        console.log(er)
      return er
      })
    )
  }


  editarCategoria(id:string, categoria:Categoria): Observable <any>{
    return this.http.put("http://localhost:3500/editarCategoria/" + id, categoria)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  obtenerCategoriaPorReferencia(referencia: number): Observable<any> {
    return this.http.get(`http://localhost:3500/categoriaPorReferencia/${referencia}`)
    .pipe(
      catchError(er =>{
        console.log(er)
      return er
      })
    )
  }

  todasCategorias(): Observable<any> {
    return this.http.get('http://localhost:3500/obtenerTodasCategorias')
      .pipe(
        catchError(error => {
          console.log(error);
          return error;
        })
      );
  }

  verificarCategoriaPorReferencia(referencia: string): Observable<any> {
    return this.http.get(`http://localhost:3500/verificarCategoriaPorReferencia/${referencia}`)
    .pipe(
      catchError(error => {
        console.log(error);
        return error;
      })
    );
  }
}


