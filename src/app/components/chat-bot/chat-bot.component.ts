import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta.service';
import { SubclaseService } from 'src/app/services/subclase.service';

interface Mensaje {
  pregunta: string;
  respuesta: string;
  fotoPerfil?: string;
  origen: 'usuario' | 'bot';
}

interface Categoria {
  referencia: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  userInput: string = '';
  chatHistory: Mensaje[] = [];
  categorias: Categoria[] = [];

  constructor(private consultaService: ConsultaService, private subclaseService: SubclaseService) {}

  ngOnInit(): void {
    this.mostrarMensajeBienvenida();
  }

  mostrarMensajeBienvenida() {
    this.chatHistory.push({
      pregunta: '¡Bienvenido! ¿En qué puedo ayudarte? Escribe "Help" para ver las categorías.',
      respuesta: '',
      fotoPerfil: 'assets/bot.png',
      origen: 'bot'
    });
  }

  enviarMensaje() {
    const userInputLower = this.userInput.toLowerCase();

    if (userInputLower === 'help') {
      this.mostrarCategorias();
    } else if (userInputLower.match(/^[a-zA-Z]+$/)) {
      this.mostrarSubclasesPorCategoria(userInputLower);
    } else if (userInputLower.match(/^\d+$/)) {
      this.consultarPorReferencia(userInputLower);
    } else {
      this.mostrarMensajeNoEntendido();
    }

    this.userInput = '';
  }

  mostrarCategorias() {
    this.consultaService.obtenerCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
        const categoriasMsg = categorias.map(
          (categoria: Categoria) => `Referencia: ${categoria.referencia}, Nombre: ${categoria.nombre}`
        );

        this.chatHistory.push({
          pregunta: 'Categorías disponibles:\n' + categoriasMsg.join('\n'),
          respuesta: '',
          fotoPerfil: 'assets/bot.png',
          origen: 'bot'
        });
      },
      (error) => {
        console.error(error);
        this.chatHistory.push({
          pregunta: 'Ocurrió un error al obtener las categorías. Por favor, inténtalo de nuevo.',
          respuesta: '',
          fotoPerfil: 'assets/bot.png',
          origen: 'bot'
        });
      }
    );
  }

  mostrarSubclasesPorCategoria(referenciaCategoria: string) {
    const categoriaSeleccionada = this.categorias.find(c => c.referencia === referenciaCategoria);

    if (categoriaSeleccionada) {
      this.subclaseService.obtenerSubclasesPorCategoria(referenciaCategoria).subscribe(
        (subclases) => {
          if (subclases && subclases.length > 0) {
            const subclasesMsg = subclases
              .map((subclase: any) => `Subclase: Referencia: ${subclase.referencia}, Nombre: ${subclase.nombre}`)
              .join('\n');
            this.chatHistory.push({
              pregunta: `Subclases asociadas a la categoría ${referenciaCategoria} (${categoriaSeleccionada.nombre}):\n` + subclasesMsg,
              respuesta: '',
              fotoPerfil: 'assets/bot.png',
              origen: 'bot'
            });
          } else {
            this.chatHistory.push({
              pregunta: `No se encontraron subclases para la categoría ${referenciaCategoria}.`,
              respuesta: '',
              fotoPerfil: 'assets/bot.png',
              origen: 'bot'
            });
          }
        },
        (error) => {
          console.error(error);
          this.chatHistory.push({
            pregunta: `Ocurrió un error al obtener subclases para la categoría ${referenciaCategoria}. Por favor, inténtalo de nuevo.`,
            respuesta: '',
            fotoPerfil: 'assets/bot.png',
            origen: 'bot'
          });
        }
      );
    } else {
      this.mostrarMensajeNoEntendido(); 
    }
  }

  consultarPorReferencia(referencia: string) {
    const referenciaConsulta = referencia;
    this.consultaService.obtenerConsultaPorReferencia(referenciaConsulta).subscribe(
      (consulta) => {
        if (consulta) {
          this.chatHistory.push({
            pregunta: consulta.pregunta,
            respuesta: consulta.respuesta,
            fotoPerfil: 'assets/bot.png',
            origen: 'bot'
          });
        } else {
          this.chatHistory.push({
            pregunta: 'No se encontró ninguna consulta con esa referencia.',
            respuesta: '',
            fotoPerfil: 'assets/bot.png',
            origen: 'bot'
          });
        }
      },
      (error) => {
        console.error(error);
        this.chatHistory.push({
          pregunta: 'Ocurrió un error al obtener la consulta. Por favor, inténtalo de nuevo.',
          respuesta: '',
          fotoPerfil: 'assets/bot.png',
          origen: 'bot'
        });
      }
    );
  }

  mostrarMensajeNoEntendido() {
    this.chatHistory.push({
      pregunta: this.userInput,
      respuesta: 'No entiendo. Escribe "Help" para obtener ayuda.',
      fotoPerfil: 'assets/bot.png',
      origen: 'bot'
    });
  }
}