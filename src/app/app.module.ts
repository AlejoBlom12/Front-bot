import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Componentes:
import { AppComponent } from './app.component';
import { CrearConsultaComponent } from './components/crear-consulta/crear-consulta.component';
import { ListaConsultaComponent } from './components/lista-consulta/lista-consulta.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { ListaCategoriaComponent } from './components/lista-categoria/lista-categoria.component';
import { ListaSubclaseComponent } from './components/lista-subclase/lista-subclase.component';
import { CrearSubclaseComponent } from './components/crear-subclase/crear-subclase.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { MenuConfiComponent } from './components/menu-confi/menu-confi.component';




@NgModule({
  declarations: [
    AppComponent,
    CrearConsultaComponent,
    ListaConsultaComponent,
    ChatBotComponent,
    ListaCategoriaComponent,
    ListaSubclaseComponent,
    CrearSubclaseComponent,
    CrearCategoriaComponent,
    MenuConfiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
