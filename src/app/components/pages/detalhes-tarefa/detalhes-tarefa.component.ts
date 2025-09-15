import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../config/environment';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detalhes-tarefa',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './detalhes-tarefa.component.html',
  styleUrl: './detalhes-tarefa.component.css'
})
export class DetalhesTarefaComponent {

  tarefaId: string = "";
  tarefa: any = "";

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.tarefaId = this.route.snapshot.paramMap.get('id') as string;

    this.httpClient.get(`${environment.apiControllerTarefas}/obter-tarefa/${this.tarefaId}`)
          .subscribe({
            next: (data: any) => {
    
              this.tarefa = data;
    
              console.log(this.tarefa);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
  }

}
