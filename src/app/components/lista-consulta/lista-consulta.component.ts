
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-consulta',
  templateUrl: './lista-consulta.component.html',
  styleUrls: ['./lista-consulta.component.scss']
})
export class ListaConsultaComponent implements OnInit {

  public listaConsulta: any[] = [];
  public filteredConsulta: any[] = [];
  public searchTermReferencia: string = '';

  constructor(private CService: ConsultaService, 
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.CService.getConsultas().subscribe((lista) => {
        this.listaConsulta = lista;
        this.ordenarLista();
        this.filtrarConsulta();
      });
}

  eliminarConsulta(id: any) {
    this.CService.eliminarConsulta(id).subscribe(
      (data) => {
        this.toastr.error('La consulta fue eliminada con éxito.', 'Consulta eliminada: ');
        this.filtrarConsulta(); 
        this.router.navigate(['/'])
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ordenarLista() {
    this.listaConsulta.sort((a, b) => a.referencia - b.referencia);
  }

  filtrarConsulta() {
    if (this.searchTermReferencia) {
      this.filteredConsulta = this.listaConsulta.filter(consulta =>
        consulta.referencia.toString().includes(this.searchTermReferencia)
      );
    } else {
      this.filteredConsulta = [...this.listaConsulta]; 
    }
  }
}