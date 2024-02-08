import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subclase } from 'src/app/models/subclase';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubclaseService } from 'src/app/services/subclase.service';

@Component({
  selector: 'app-crear-subclase',
  templateUrl: './crear-subclase.component.html',
  styleUrls: ['./crear-subclase.component.scss']
})
export class CrearSubclaseComponent implements OnInit{

  subclaseForm: FormGroup
  titulo = "CREAR SUBCLASE";
  id: string | null
  categorias: any[] = [];

  constructor (private buil : FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private SService: SubclaseService,
              private categoriaService : CategoriaService,
              private aRouter: ActivatedRoute,
              ){

    this.subclaseForm = this.buil.group({
      referencia: ['', Validators.required],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    
      this.XEditar()
      this.categoriaService.todasCategorias().subscribe(
        (data: any[]) => {
          this.categorias = data;
        },
        error => {
          console.log(error);
        }
      );
    }

  agregarSubclase(){
    const SUBCLASE: Subclase = {
      referencia: this.subclaseForm.get('referencia')?.value,
      nombre: this.subclaseForm.get('nombre')?.value,
      categoria: this.subclaseForm.get('categoria')?.value
    }

    if (this.id !== null) {
      
      this.SService.editarSubclase(this.id, SUBCLASE).subscribe(data => {
        this.toastr.info('La subclase se ha actualizado con exito.', 'Se ha actualizado con exito:')
        this.router.navigate(['/lista-subclase'])

      }, error =>{
        console.log(error)
        this.subclaseForm.reset()
      })

    }else{

      this.SService.guardarSubclase(SUBCLASE).subscribe(data =>{
        this.toastr.success('La subclase fue registrada con exito.', 'Subclase resgitrada:')
        this.router.navigate(['/lista-subclase'])
      }, error =>{
        console.log(error)
        this.subclaseForm.reset()
      })
    }
    }

  XEditar (){
    if (this.id !== null) {

      this.titulo = 'Editar subclase'
      this.SService.obtenerSubclase(this.id).subscribe(data=>{
        this.subclaseForm.setValue({
          referencia: data.referencia,
          nombre: data.nombre,
          categoria: data.categoria
        })
      })
    }
  }

}
