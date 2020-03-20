## Users

- ### `/admin/users`

  - **Função:** listar todos os usuários
  - **Método:** `GET`

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
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

- ### `/admin/users/:id`

  - **Função:** listar um usuário pelo ID
  - **Método:** `GET`

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
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

- ### `/admin/users/`

  - **Função:** inserir um novo usuário
  - **Método:** `POST`
  - **Restrição:** a senha deve ter no mínimo 4 caracteres
  - **Requisição:** body
  - **Corpo da requisição:**

    ```json
    {
      "name": "user",
      "email": "user@mail.com",
      "password": "1234",
      "confirmPassword": "1234"
    }
    ```

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
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

- ### `/admin/users/:id`

  - **Função:** atualizar dados do usuário
  - **Método:** `PATCH`
  - **Restrição:** a senha deve ter no mínimo 4 caracteres
  - **Requisição:** body
  - **Corpo da requisição:**

    ```json
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
      ```json
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

- ### `/admin/users/:id`

  - **Função:** deletar dados do usuário
  - **Método:** `DELETE`
  - **Restrição:** por questões de segurança, o usuário não será deletado definitivamente do banco de dados. Apenas será alterado seu estado de ativo para inativo.

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
      {
        "success": true,
        "message": "User deleted"
      }
      ```

  - **Resposta de erro:**

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "User not found" }`
