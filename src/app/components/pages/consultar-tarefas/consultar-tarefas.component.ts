import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../config/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MensagemAlertaComponent } from "../../../shared/mensagem-alerta/mensagem-alerta.component";
import { tipoMensagem } from '../../../shared/mensagem-alerta/mensagens-tipo';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [
    CommonModule,
    RouterLink,
    MensagemAlertaComponent,
    NgxPaginationModule
],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css'
})
export class ConsultarTarefasComponent {

  statusTarefa: any[] = [];

  alertMessage: string = "";
  styleMessage: string = "";

  tarefas: any[] = [];
  tarefasFiltradas: any[] = [];

  tarefaExclusao: any = "";

  p: number = 1;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get(`${environment.apiControllerTarefas}/listar-tarefas`)
      .subscribe({
        next: (data) => {
          this.tarefas = data as any[];
          this.tarefasFiltradas = data as any[];
          console.log(this.tarefasFiltradas);
        },  
        error: (err) => {
          console.error(err);
        }
       });

    this.httpClient.get(`${environment.apiControllerTarefas}/listar-status-tarefas`)
      .subscribe({
        next: (data) => {
          this.statusTarefa = data as any[];
        },  
        error: (err) => {
          console.error(err);
        }
       })
  }

  prepareDelete(tarefa: any) {
    this.tarefaExclusao = tarefa;
  }
  
  cancelarExclusao() {
    this.tarefaExclusao = "";
  }

  onDelete() {
      
    var tarefa = this.tarefaExclusao;

    this.httpClient.delete(`${environment.apiControllerTarefas}/excluir-tarefa/${tarefa.id}`)
    .subscribe({
      next: (data: any) => {
        this.alertMessage = `A tarefa ${data.titulo} foi excluída com sucesso!`;
        this.styleMessage = tipoMensagem.sucesso;

        this.ngOnInit();
      },
      error: (err: any) => {
        console.error(err);

        this.alertMessage = err.error.message;
        this.styleMessage = tipoMensagem.erro;
      }
    });
  }

  onStatusChange(event: any) {
    const codigo = event.target.value;
    this.p = 1;
  
    if (codigo === '') {
      this.tarefasFiltradas = this.tarefas;
    } else {
      // Note a diferença: a sua propriedade na tarefa é `status.codigo` (aninhada),
      // então a verificação deve ser ajustada.
      this.tarefasFiltradas = this.tarefas.filter(tarefa => tarefa.status.codigo == codigo);
    }
  }
}
