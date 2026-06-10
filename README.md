# API de Catálogo de Filmes — ETEC 🎬️
 
API REST desenvolvida em Node.js para gerenciar um catálogo de filmes, permitindo o cadastro de usuários, atores, diretores, gêneros e premiações.
 
---
 
## Tecnologias utilizadas 
 
- **Node.js** com ES Modules (`type: "module"`)
- **Express 5** — framework web
- **TypeORM** — ORM e gerenciamento de migrations
- **PostgreSQL** — banco de dados relacional
- **Nodemailer** — envio de e-mail para recuperação de senha
- **dotenv** — carregamento de variáveis de ambiente
- **nodemon** — reinicialização automática em desenvolvimento
---
 
## Pré-requisitos
 
- Node.js 18 ou superior
- PostgreSQL instalado e rodando localmente
- Banco de dados PostgreSQL criado com o nome `api`
---
 
## Instalação 
 
```bash
git clone <URL_DO_REPOSITÓRIO>
cd aula-api-etec
npm install
```
 
---
 
## Configuração do arquivo `.env`
 
Crie um arquivo `.env` na raiz do projeto:
 
```env
# E-mail (recuperação de senha)
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail
 
# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api
DB_USER=postgres
DB_PASS=sua_senha_do_postgres
```
 
> **`EMAIL_PASS` — senha de aplicativo do Google:**
> - **Passo 1:** ative a verificação em duas etapas em [myaccount.google.com](https://myaccount.google.com) → Segurança.
> - **Passo 2:** gere a senha em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) e use no lugar da senha normal.
 
O `.env` já está no `.gitignore` e não deve ser versionado.
 
---
 
## Configuração do banco de dados
 
O arquivo `src/database/config.js` deve ler as credenciais do `.env`:
 
```js
import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";
 
dotenv.config();
 
const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    entities: ["src/model/*.js"],
    migrations: [path.join(process.cwd(), "src/database/migrations/*.cjs")],
});
 
export { appDataSource };
```
 
> O `Number()` no `port` é necessário porque variáveis de ambiente são sempre strings.
 
---
 
## Executando
 
```bash
# Criar as tabelas no banco (primeira vez)
npm run execute_migration
 
# Iniciar o servidor
npm run dev
```
 
O servidor sobe na porta **3333**.
 
---
 
## Rotas disponíveis
 
| Prefixo      | Recurso                              |
|--------------|--------------------------------------|
| `/user`      | Cadastro e gerenciamento de usuários |
| `/login`     | Autenticação e recuperação de senha  |
| `/actor`     | Cadastro de atores                   |
| `/director`  | Cadastro de diretores                |
| `/genero`    | Cadastro de gêneros de filmes        |
| `/premiacao` | Cadastro de premiações               |
 
Todos os recursos suportam: listar, buscar por nome, cadastrar, editar e excluir (soft delete).
 
---
 
## Estrutura do projeto
 
```
src/
├── controllers/       # Lógica de cada rota (Express Router)
├── database/
│   ├── config.js      # Configuração do DataSource (TypeORM)
│   └── migrations/    # Migrations do banco de dados
├── helpers/
│   └── nodemailer.js  # Envio de e-mail
├── model/             # Entidades do TypeORM (tabelas)
├── templates/
│   └── changePassword.html
├── utils/
│   └── login.js       # Geração de nova senha
└── index.js           # Ponto de entrada da aplicação
```
 
---
