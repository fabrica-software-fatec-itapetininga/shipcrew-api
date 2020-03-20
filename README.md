# Ship Crew (back-end)

## Sumário

- [Configurações](#configurações)

  - [Banco de Dados](#banco-de-dados)
  - [Padronizações](#padronizações)
  - [Bibliotecas utilizadas](#bibliotecas-utilizadas)
  - [Uso em desenvolvimento](#uso-em-desenvolvimento)

- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Users](#users)

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

### Auth

- #### `/admin/signin`

  - **Função:** realizar autenticação
  - **Método:** `POST`
  - **Requisição:** body
  - **Corpo da requisição:**

    ```
    {
      "email": "user@mail.com",
      "password": "userpassword"
    }
    ```

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```
      {
        "success": true,
        "user": { "id": 1, "name": "user" },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg0NTcwMTIwLCJleHAiOjE1ODQ1NzM3MjB9.XQVUZFg2EkzVgZGmRx-twnmRB7l4fhqXeIjJNrT2IGE"
      }
      ```

  - **Respostas de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "User not found" }`

      OU

    - **Status**: 401
    - **Corpo da resposta**: `{ "success": false, "message": "Password does not match" }`

      OU

    - **Status**: 401
    - **Corpo da resposta**: `{ "success": false, "message": "Validation fails" }`

### Users

- #### `/admin/users`

  - **Função:** listar todos os usuários
  - **Método:** `GET`

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```
      {
        "success": true,
        "users": [
          {
            "id": 1,
            "name": "admin",
            "email": "admin@admin.com"
          },
          {
            "id": 3,
            "name": "user",
            "email": "user@mail.com"
          }
        ]
      }
      ```

  - **Resposta de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "Not found" }`

- #### `/admin/users/:id`

  - **Função:** listar um usuário pelo ID
  - **Método:** `GET`

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```
      {
        "id": 1,
        "name": "admin",
        "email": "admin@admin.com",
        "password": "$2a$08$KXzhTGxIdt2N.UbZ6ILzxORXcHcHf.rpfHNkZIyATtexNT8195CPe",
        "isActive": true,
        "createdAt": "2020-03-18T22:10:14.605Z",
        "updatedAt": "2020-03-18T22:10:14.605Z"
      }
      ```

  - **Resposta de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "User not found" }`

- #### `/admin/users/`

  - **Função:** inserir um novo usuário
  - **Método:** `POST`
  - **Restrição:** a senha deve ter no mínimo 4 caracteres
  - **Requisição:** body
  - **Corpo da requisição:**

    ```
    {
      "name": "user",
      "email": "user@mail.com",
      "password": "1234",
      "confirmPassword": "1234",
    }
    ```

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```
      {
        "success": true,
        "user": {
          "name": "test",
          "email": "test@mail.com"
        }
      }
      ```

  - **Resposta de erro:**

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "Validation fails" }`

      OU

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "User already exists" }`

- #### `/admin/users/:id`

  - **Função:** atualizar dados do usuário
  - **Método:** `PATCH`
  - **Restrição:** a senha deve ter no mínimo 4 caracteres
  - **Requisição:** body
  - **Corpo da requisição:**

    ```
    {
      "name": "user",
      "email": "user@mail.com",
      "oldPassword": "1234",
      "password": "4321",
      "confirmPassword": "4321"
    }
    ```

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```
      {
        "success": true,
        "user": {
          "id": 6,
          "name": "user"
        }
      }
      ```

  - **Resposta de erro:**

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "Validation fails" }`

      OU

    - **Status**: 401
    - **Corpo da resposta**: `{ "success": false, "message": "Password does not match" }`

      OU

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "User already exists!" }`

- #### `/admin/users/:id`

  - **Função:** deletar dados do usuário
  - **Método:** `DELETE`
  - **Restrição:** por questões de segurança, o usuário não será deletado definitivamente do banco de dados. Apenas será alterado seu estado de ativo para inativo.

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```
      {
        "success": true,
        "message": "User deleted"
      }
      ```

  - **Resposta de erro:**

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "User not found" }`
