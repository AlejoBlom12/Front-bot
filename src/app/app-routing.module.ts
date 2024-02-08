import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaConsultaComponent } from './components/lista-consulta/lista-consulta.component';
import { CrearConsultaComponent } from './components/crear-consulta/crear-consulta.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { ListaCategoriaComponent } from './components/lista-categoria/lista-categoria.component';
import { ListaSubclaseComponent } from './components/lista-subclase/lista-subclase.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { CrearSubclaseComponent } from './components/crear-subclase/crear-subclase.component';
import { MenuConfiComponent } from './components/menu-confi/menu-confi.component';



const routes: Routes = [


  //confi:
  { path: 'menu', component: MenuConfiComponent},

  //Listas:
  { path: 'lista-consulta', component: ListaConsultaComponent},
  { path: 'lista-categoria', component: ListaCategoriaComponent},
  { path: 'lista-subclase', component: ListaSubclaseComponent},

  //Crear
  { path: 'crear-consulta', component: CrearConsultaComponent},
  { path: 'crear-categoria', component: CrearCategoriaComponent},
  { path: 'crear-subclase', component: CrearSubclaseComponent},

  //Editar
  { path: 'editar-consulta/:id', component: CrearConsultaComponent},
  { path: 'editar-categoria/:id', component: CrearCategoriaComponent},
  { path: 'editar-subclase/:id', component: CrearSubclaseComponent},

  //Chatbot
  { path: '', component: ChatBotComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
