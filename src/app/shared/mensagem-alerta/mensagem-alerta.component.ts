import { Component, Input } from '@angular/core';
import { tipoMensagem } from './mensagens-tipo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensagem-alerta',
  imports: [
    CommonModule
  ],
  templateUrl: './mensagem-alerta.component.html',
  styleUrl: './mensagem-alerta.component.css'
})
export class MensagemAlertaComponent {

  @Input()
  message: string = '';

  @Input()
  styleMessage: string = tipoMensagem.alerta;
}
