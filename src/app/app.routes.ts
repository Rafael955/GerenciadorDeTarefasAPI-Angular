import { Routes } from '@angular/router';
import { ConsultarTarefasComponent } from './components/pages/consultar-tarefas/consultar-tarefas.component';
import { CadastrarTarefaComponent } from './components/pages/cadastrar-tarefa/cadastrar-tarefa.component';
import { DetalhesTarefaComponent } from './components/pages/detalhes-tarefa/detalhes-tarefa.component';
import { EditarTarefaComponent } from './components/pages/editar-tarefa/editar-tarefa.component';

export const routes: Routes = [
    {
        path: 'pages/consultar-tarefas',
        component: ConsultarTarefasComponent
    },
    {
        path: 'pages/cadastrar-tarefa',
        component: CadastrarTarefaComponent
    },
    {
        path: 'pages/editar-tarefa/:id',
        component: EditarTarefaComponent
    },
    {
        path: 'pages/detalhes-tarefa/:id',
        component: DetalhesTarefaComponent
    },
    { 
        path: '',   
        pathMatch: 'full',
        redirectTo: 'pages/consultar-tarefas' 
    }, // r
];
