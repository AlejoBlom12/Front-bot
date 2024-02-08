import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consulta } from 'src/app/models/consulta';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ConsultaService } from 'src/app/services/consulta.service';
import { SubclaseService } from 'src/app/services/subclase.service';

@Component({
  selector: 'app-crear-consulta',
  templateUrl: './crear-consulta.component.html',
  styleUrls: ['./crear-consulta.component.scss']
})
export class CrearConsultaComponent implements OnInit {
  consultaForm: FormGroup;
  titulo = "CREAR CONSULTA";
  id: string | null;
  errorReferenciaEnUso: string = '';
  subclases: any[] = [];

  constructor(
    private buil: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private CService: ConsultaService,
    private aRouter: ActivatedRoute,
    private subclaseService: SubclaseService,
  ) {
    this.consultaForm = this.buil.group({
      referencia: ['', Validators.required],
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
      subclase: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  
  ngOnInit(): void {
    this.XEditar()
    this.subclaseService.todasSubclases().subscribe(
      (data: any[]) => {
        this.subclases = data;
      },
      error => {
        console.log(error);
      }
    );
  }
    
  soloNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    if (event.key.length === 1 && !pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  
  esTeclaBorrado(event: any): boolean {
    return event.key === 'Backspace' || event.key === 'Delete';
  }

  validarYAgregarConsulta() {
    const referencia = this.consultaForm.get('referencia')?.value;
    this.CService.validarReferenciaExistente(referencia).subscribe(
      data => {
        this.agregarConsulta();
      },
      error => {
        if (error.status === 400 && error.error && error.error.message) {
          this.toastr.error("No se pudo encontrar la referencia.", 'Error de Referencia:');
        } else {
          this.toastr.info("La referencia ya esta en uso.", 'Algo sucedio: ');
          console.log(error);
        }
      }
    );
  }

  agregarConsulta() {
    const CONSULTA: Consulta = {
      referencia: this.consultaForm.get('referencia')?.value,
      pregunta: this.consultaForm.get('pregunta')?.value,
      respuesta: this.consultaForm.get('respuesta')?.value,
      subclase: this.consultaForm.get('subclase')?.value,
    };

    if (this.id !== null) {
      this.CService.editarConsulta(this.id, CONSULTA).subscribe(data => {
        this.toastr.info('La consulta se ha actualizado con éxito.', 'Se ha actualizado con éxito:');
        this.router.navigate(['/lista-consulta']);
      }, error => {
        console.log(error);
        this.consultaForm.reset();
      });

    } else {
      this.CService.guardarConsulta(CONSULTA).subscribe(data => {
        this.toastr.success('La consulta fue registrada con éxito.', 'Consulta registrada:');
        this.router.navigate(['/lista-consulta']);
      }, error => {
        console.log(error);
        this.consultaForm.reset();
      });
    }
  }

  XEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar consulta';
      this.CService.obtenerConsulta(this.id).subscribe(data => {
        this.consultaForm.setValue({
          referencia: data.referencia,
          pregunta: data.pregunta,
          respuesta: data.respuesta,
          subclase: data.subclase,
        });
      });
    }
  }

}
