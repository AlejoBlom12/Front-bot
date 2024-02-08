import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.scss']
})
export class ListaCategoriaComponent implements OnInit{
  
  
  
  constructor (private CaService: CategoriaService,
    private toastr: ToastrService,
    ){
      
    }
    
  public searchTerm: string = '';
  public listaCategoria: any [] = []
  public filteredCategoria: any[] = [];


  ngOnInit() {
    this.CaService.getCategoria().subscribe(lista => {
      this.listaCategoria = lista;
      this.filteredCategoria = lista;
      this.ordenarLista();
    });
  }
  

  eliminarCategoria(id:any){
    this.CaService.eliminarCategoria(id).subscribe(data =>{
      this.toastr.error('La categoria fue eliminada con exito.', 'Categoria eliminada: ')
      
    }, error => {
      console.log(error);
    })
  }

  ordenarLista() {
    this.listaCategoria.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarCategoria() {
    this.filteredCategoria = this.listaCategoria.filter(
      (categoria: any) =>
        categoria.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
