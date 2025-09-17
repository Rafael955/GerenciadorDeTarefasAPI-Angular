# Gerenciador de Tarefas Web ✅

Aplicação web desenvolvida em **Angular 19** para gerenciar tarefas do dia a dia.  
Permite cadastrar, listar, editar e excluir tarefas de forma simples e organizada.

---

## 🚀 Tecnologias Utilizadas

- [Angular 19](https://angular.dev/) - Framework principal
- [Bootstrap 5.3.8](https://getbootstrap.com/) - Estilização e componentes responsivos
- [Bootstrap Icons 1.13.1](https://icons.getbootstrap.com/) - Ícones
- [RxJS 7.8](https://rxjs.dev/) - Programação reativa
- [ngx-pagination 6.0.3](https://www.npmjs.com/package/ngx-pagination) - Paginação de listas
- [TypeScript 5.7](https://www.typescriptlang.org/) - Linguagem principal

---

## 📂 Estrutura do Projeto

GerenciadorDeTarefasWeb/
├── src/ # Código-fonte principal
│ ├── app/ # Módulos, componentes e serviços
│ ├── assets/ # Arquivos estáticos (imagens, ícones, etc.)
│ └── environments/ # Configurações de ambiente
├── angular.json # Configurações do Angular CLI
├── package.json # Dependências e scripts
├── tsconfig.json # Configurações do TypeScript
└── README.md # Documentação do projeto


---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, instale:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)

---

## ▶️ Como Executar

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/gerenciador-de-tarefas-web.git
cd gerenciador-de-tarefas-web
npm install

Inicie o servidor de desenvolvimento:

npm start

Acesse em: http://localhost:4200

🛠️ Scripts Disponíveis

| Comando         | Descrição                                  |
| --------------- | ------------------------------------------ |
| `npm start`     | Inicia a aplicação em modo desenvolvimento |
| `npm run build` | Compila a aplicação para produção          |
| `npm test`      | Executa os testes unitários                |
| `npm run watch` | Recompila automaticamente no modo dev      |

📌 Funcionalidades

 - Cadastro de novas tarefas

 - Listagem de tarefas com paginação

 - Edição de tarefas existentes

 - Exclusão de tarefas

 - Autenticação de usuários (futuro)