# Documentação da aplicação

A aplicação foi desenvolvida com framework express e a linguagem typescript usando jest para a criação dos testes unitários e de integração, prisma e mongodb para acessar o banco salvar os dados, foi usado também eslint, prettier com husky e lint-staged para padronizar o código e controlar os commits para que não sejam feitos commits fora das regras definidas para padronização, foi usado o design pattern DDD com os princípios SOLID para arquiteturar a aplicação, também sendo utilizado os principios do InMemoryTestDatabase do martinfowler para executar os testes unitarios sem ficar gerando mocks de funções para os testes, falando nos testes a api foi desenvolvida seguindo o TDD.

## Acessar API

https://nodedeploy-wq65.onrender.com

## Índice

1. [Introdução](#introdução)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Mongodb](#mongodb)
5. [Uso](#uso)
6. [Testes](#testes)
7. [Docs](#docs)
8. [Deploy](#deploy)
9. [CI/CD](#cicd)

## Introdução

A aplicação é uma API Rest com node e express sendo um simples CRUD para gerenciamento de tarefas.

## Instalação

Siga estas etapas para configurar a aplicação em sua máquina local:

1. Clone o repositório: `git clone https://github.com/Guilherme-px/notes-api`
2. Navegue para o diretório da aplicação.
3. Instale as dependências: `npm install`

## Configuração

Antes de iniciar a aplicação, certifique-se de configurar as seguintes variáveis de ambiente conforme exemplificado no arquivo .env.example:

-   `DATABASE_URL`: URL da API que a aplicação utilizará.

Crie um banco de dados em https://www.mongodb.com/atlas/database ou use seu banco local, e passe a uri do mongodb para o .env

obs: se o fim da uri do mongodb vier **mongodb.net/?retryWrites=true&w=majority** substitua o **?** na uri por **%3F** ficando: **mongodb.net/%3FretryWrites=true&w=majority**, pois, o prisma pode não reconhecer a uri na maneira padrão que ela vem.

## Mongodb

Após ter criado o .env com a uri de conexão do mongodb use o comando: 'npm run generate' para gerar o banco com prisma.

Caso queira rodar os testes crie um .env.test e um banco de dados para teste e passe a uri da mesma forma que passou no arquivo .env e depois use o comando: 'npm run generate:dev' para gerar o banco de testes. Ao rodar o script de teste o cli do dotenv irá automaticamente carregar as variáveis de ambiente do .env.test ao invés do .env

## Uso

Para iniciar a aplicação, execute o seguinte comando: `npm run dev`

## Testes

Após já ter configurado o env e o banco de testes você poderá rodar os testes com o comando 'npm run test'

## Docs

O projeto esta divido em:

**shared:**

Onde esta a parte mais relacionando a infraestrutura da aplicação

-   errors:

Aqui é configurado um error handler que recebe uma mensagem e um status code no service da aplicação e manda esse erro para o controller.

-   infra/database:

Aqui estão configuradas as instancias do prisma tanto para o ambiente de desenvolvimento quando para o de teste.

-   http/app:

No arquivo app é feita a configuração do express e do cors e informado as rotas da aplicação.

-   http/server:

No arquivo server é feita a configuração do servidor express para rodar a aplicação na porta definida que você pode definir no seu .env na variavel **PORT** mas caso não seja definido ele irá rodar na porta **3000**.

**module:**

Modulos da aplicação.

-   notes/controllers:

Nesta pasta estão definidos todos os controller para notes e também os testes de integração para cada controller, todos divididos seguindo o principio de responsabilidade única.

O controller recebe uma solicitação, instancia o repositório que sera usado, e chama o service passando os parâmetros necessários, caso de tudo certo ele envia uma resposta e status de sucesso, se não ele envia o erro tratado pelo error handler.

-   notes/services:

Nesta pasta estão definidos todos os services para notes e também os testes de unidade para cada service, todos divididos seguindo o princípio de responsabilidade única.

O service recebe os dados por parâmetro do controller, faz o tratamento dos dados e faz uma chamada para o repositório..

-   notes/repositories/INotesRepository.ts:

Neste arquivo é definido os contratos para o repositório de notes.

-   notes/repositories/notesRepository.ts:

Este é o arquivo onde é configurado as queries para o banco com as funções definidas no contrato que ele implementa, caso ocorra tudo certo ele envia uma resposta que será passada para o service devolver ao controller, caso contrario ele devolve um erro tratado pelo error handler.

-   notes/dtos:

Definições das interfaces para os data transfers objects.

-   notes/dtos:

Definições das interfaces para os modelos de dados do dominio.

## Deploy

Para fazer deploy da aplicação no render siga os seguintes passos:

-   Crie uma conta no https://render.com/
-   Suba o projeto para o github
-   Clicando no botão **New** e escolhendo a opção **Web service**
-   Esolha a opção Build and deploy from a Git repository
-   Conecte sua conta do render com o seu github
-   Selecione o repositório
-   Configure os comandos de instalação, build e para rodar a aplicação que estão no script do package.json
-   Faça o deploy do projeto
-   Em variáveis de ambiente configure o acesso ao banco de dados

## CI/CD

A aplicação esta usando CI/CD com github actions configurado em `.github/workflows/main.yml`

para fazer deploy com github actions configure as chaves de acesso: DATABASE_URL, DATABASE_URL_TEST, RENDER_API_KEY, SERVICE_ID.

Você tera chaves acesso a chave SERVICE_ID acessando o projeto que você fez o deploy inicial no render, clique em settings e procure por **Deploy Hook** essa chave será um link como: https://api.render.com/deploy/**COPIE_ESTA_PARTE**?key=----, copie apenas a parte que estará entra deploy/ e ?key

Após ter todos as keys em mãos, acesse seu repositório do projeto no github, entre em 'settings', 'secrets and variables', 'actions' e configure lá as suas keys DATABASE_URL, DATABASE_URL_TEST, RENDER_API_KEY, SERVICE_ID, com os respectivos valores.

Tendo configurado suas chaves basta fazer um push do projeto ou acessar a aba actions no seu repositório para ver o workflow rodando e ter o deploy automático da api.
