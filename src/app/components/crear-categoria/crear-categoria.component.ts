import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.scss']
})
export class CrearCategoriaComponent implements OnInit{
  categoriaForm: FormGroup
  titulo = "CREAR CATEGORIA";
  id: string | null

  constructor (private buil : FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private CaService: CategoriaService,
              private aRouter: ActivatedRoute){

    this.categoriaForm = this.buil.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
      this.XEditar()
  }

  agregarCategoria(){
    const CATEGORIA: Categoria = {
      nombre: this.categoriaForm.get('nombre')?.value,
      descripcion: this.categoriaForm.get('descripcion')?.value
    }

    if (this.id !== null) {
      
      this.CaService.editarCategoria(this.id, CATEGORIA).subscribe(data => {
        this.toastr.info('La categoria se ha actualizado con exito.', 'Se ha actualizado con exito:')
        this.router.navigate(['/lista-categoria'])

      }, error =>{
        console.log(error)
        this.categoriaForm.reset()
      })

    }else{

      this.CaService.guardarCategoria(CATEGORIA).subscribe(data =>{
        this.toastr.success('La categoria fue registrada con exito.', 'Categoria registrada:')
        this.router.navigate(['/lista-categoria'])
      }, error =>{
        console.log(error)
        this.categoriaForm.reset()
      })
    }
    }

  XEditar (){
    if (this.id !== null) {

      this.titulo = 'Editar categoria'
      this.CaService.obtenerCategoria(this.id).subscribe(data=>{
        this.categoriaForm.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
        })
      })
    }
  }
}