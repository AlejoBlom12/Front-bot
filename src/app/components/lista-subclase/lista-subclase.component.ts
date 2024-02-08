import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubclaseService } from 'src/app/services/subclase.service';


@Component({
  selector: 'app-lista-subclase',
  templateUrl: './lista-subclase.component.html',
  styleUrls: ['./lista-subclase.component.scss']
})
export class ListaSubclaseComponent {
  

  public listaSubclase: any[] = [];
  public filteredSubclase: any[] = [];
  public searchTermReferencia: string = '';

  constructor(private SService: SubclaseService, 
              private toastr: ToastrService) { }

  ngOnInit() {
    this.SService.getSubclase().subscribe((lista) => {
      this.listaSubclase = lista;
      this.filtrarSubclase(); 
      this.ordenarLista();
    });
  }

  eliminarSubclase(id: any) {
    this.SService.eliminarSubclase(id).subscribe(
      (data) => {
        this.toastr.error('La subclase fue eliminada con exito.', 'Subclase eliminada: ');
        this.filtrarSubclase(); // Actualiza la lista después de eliminar
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ordenarLista() {
    this.listaSubclase.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarSubclase() {
   
    if (this.searchTermReferencia) {
      this.filteredSubclase = this.listaSubclase.filter(subclase =>
        subclase.referencia.toString().includes(this.searchTermReferencia)
      );
    } else {
      this.filteredSubclase = [...this.listaSubclase]; 
    }
  }

}
