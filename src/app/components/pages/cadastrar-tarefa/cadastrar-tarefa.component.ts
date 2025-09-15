import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../config/environment';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensagemAlertaComponent } from "../../../shared/mensagem-alerta/mensagem-alerta.component";
import { tipoMensagem } from '../../../shared/mensagem-alerta/mensagens-tipo';

@Component({
  selector: 'app-cadastrar-tarefa',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemAlertaComponent
],
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrl: './cadastrar-tarefa.component.css'
})
export class CadastrarTarefaComponent {

  statusTarefa: any[] = [];

  alertMessage: string = "";
  styleMessage: string = "";

 constructor(private httpClient: HttpClient) {}

 form = new FormGroup({
    titulo: new FormControl('',
      [
        Validators.required,
        Validators.minLength(10), 
        Validators.maxLength(100)
      ]),
    descricao: new FormControl('',
      [
        Validators.required,
        Validators.minLength(15), 
        Validators.maxLength(200)
      ]),
    dataCriacao: new FormControl(new Date().toISOString()),
    dataConclusao: new FormControl(null),
    status: new FormControl('',
      [
        Validators.required
      ]),
 })

 ngOnInit() {
  console.log(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString());
    this.httpClient.get(`${environment.apiControllerTarefas}/listar-status-tarefas`)
      .subscribe({
        next: (data: any) => {
          this.statusTarefa = (data as any[]).sort((a, b) => a.codigo - b.codigo);
          console.log(this.statusTarefa);
        },
        error: (err: any) => {
          console.error(err);

          this.alertMessage = err.message;
          this.styleMessage = tipoMensagem.erro;
        }
      });
 }

 onSubmit() {

  this.alertMessage = "";
  this.styleMessage = "";

   this.httpClient.post(`${environment.apiControllerTarefas}/criar-tarefa`, this.form.value)
    .subscribe({
      next: (data) => {
        console.log(data);

        this.alertMessage = "Tarefa cadastrada com sucesso!";
        this.styleMessage = tipoMensagem.sucesso;

        this.form.reset();
        this.form.patchValue({
          dataCriacao: new Date().toLocaleDateString()
        });
      },
      error:(err) => {
        console.log(err.message);
        console.log(err.error.message);

        this.alertMessage = err.error.message;
        this.styleMessage = tipoMensagem.erro;
      }
    })
 }

}
