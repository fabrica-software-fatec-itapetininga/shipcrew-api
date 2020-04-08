# Ship Crew (back-end)

## Sumário

- [Configurações](#configurações)

  - [Banco de Dados](#banco-de-dados)
  - [Padronizações](#padronizações)
  - [Bibliotecas utilizadas](#bibliotecas-utilizadas)
  - [Uso em desenvolvimento](#uso-em-desenvolvimento)

- [Endpoints](#endpoints)
  - [Auth](docs/auth.md)
  - [Users](docs/users.md)
  - [Pupils](docs/pupils.md)

# Configurações

## Banco de Dados

O SGBD escolhido é o [PostgreSQL](https://www.postgresql.org/) por sua capacidade de gerenciamento ser bastante perfomática e por ser open-source

## Padronizações

- [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/): padronizações do código.
- [Commitizen](https://github.com/commitizen/cz-cli): padronização de commits
- [Gitflow](https://github.com/nvie/gitflow): padronização das branchs

## Bibliotecas utilizadas

- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md): encriptação de senhas
- [Express](https://expressjs.com/): desenvolvimento de APIs com Node.js
- [JWT](https://jwt.io/): JSON Web Token - gerador de token
- [Sequelize](https://sequelize.org/): ORM para comunicação entre banco de dados e aplicação
- [Yup](https://github.com/jquense/yup): validações de requisições

## Uso em desenvolvimento

- Copiar tudo do arquivo `env_file.txt`, criar e colar tudo no arquivo arquivo .env;
- Configurar container no Docker: `docker run --name shipcrew-postgre -e POSTGRES_USER=fabrica -e POSTGRES_PASSWORD=1234 -p 3003:5432 -d postgres`;
- Executar `yarn` ou `yarn install` para instalar todas as dependências;
- Executar `yarn sequelize db:create` para criar banco de dados com sequelize;
- Executar `yarn sequelize db:migrate` para criar as tabelas do banco de dados com sequelize;
- Executar `yarn start`. O servidor de desenvolvimento deverá iniciar na porta 3001;

# Endpoints

\* Para fazer todas as requisições será necessário autenticação com JWT e com o header assim: \* A duração do token é válida por 3 dias

- **Header:** `authorization`
- **Value:** `bearer <token>`

#### Exemplo:

- **Header:** `authorization`
- **Value:** `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg0NTcwMTIwLCJleHAiOjE1ODQ1NzM3MjB9.XQVUZFg2EkzVgZGmRx-twnmRB7l4fhqXeIjJNrT2IGE`
