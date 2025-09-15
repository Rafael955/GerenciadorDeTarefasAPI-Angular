import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensagemAlertaComponent } from "../../../shared/mensagem-alerta/mensagem-alerta.component";
import { HttpClient } from '@angular/common/http';
import { tipoMensagem } from '../../../shared/mensagem-alerta/mensagens-tipo';
import { environment } from '../../../config/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-tarefa',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MensagemAlertaComponent
],
  templateUrl: './editar-tarefa.component.html',
  styleUrl: './editar-tarefa.component.css'
})
export class EditarTarefaComponent {
  
    statusTarefa: any[] = [];
    
    idTarefa: string = "";
    tarefa: any = "";
  
    alertMessage: string = "";
    styleMessage: string = "";
  
   constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

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
    dataCriacao: new FormControl(''),
    dataConclusao: new FormControl(null),
    status: new FormControl('',
      [
        Validators.required
      ]),
 })

 ngOnInit() {
    
    this.idTarefa = this.route.snapshot.paramMap.get('id') as string;

    this.httpClient.get(`${environment.apiControllerTarefas}/obter-tarefa/${this.idTarefa}`)
      .subscribe({
        next: (data: any) => {

          this.tarefa = data;

           this.form.patchValue({
            ...data,
            dataCriacao: data.dataCriacao,
            dataConclusao: data.dataConclusao ? data.dataConclusao.split('T')[0] : null,
            status: data.status.codigo
          });

          console.log(this.tarefa);
        },
        error: (err: any) => {
          console.error(err);

          this.alertMessage = err.message;
          this.styleMessage = tipoMensagem.erro;
        }
      });
     
    this.httpClient.get(`${environment.apiControllerTarefas}/listar-status-tarefas`)
      .subscribe({
        next: (data: any) => {
          this.statusTarefa = (data as any[]).sort((a, b) => a.codigo - b.codigo);
          console.log(this.statusTarefa);
        },
        error: (err: any) => {
          console.error(err.error.message);

          this.alertMessage = err.message;
          this.styleMessage = tipoMensagem.erro;
        }
      });
 }

 onSubmit() {
   this.httpClient.put(`${environment.apiControllerTarefas}/alterar-tarefa/${this.idTarefa}`, this.form.value)
    .subscribe({
      next: (data: any) => {
        console.log(data);

        this.alertMessage = "Tarefa editada com sucesso!";
        this.styleMessage = tipoMensagem.sucesso;
      },
      error: (err: any) => {
        console.log(err.message);
        console.log(err.error.message);

        this.alertMessage = err.error.message;
        this.styleMessage = tipoMensagem.erro;
      }
    })
 }
}
