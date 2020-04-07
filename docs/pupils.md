## Pupils

- ### `/admin/pupils`

  - **Função:** listar todos os alunos
  - **Método:** `GET`

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
      {
        "success": true,
        "pupils": [
          {
            "id": 1,
            "name": "Raul Seixas",
            "numPresences": null,
            "numAbsences": null,
            "isActive": true,
            "avatar": "https://api.adorable.io/avatars/285/raul.png",
            "createdAt": "2020-03-22T14:55:42.957Z",
            "updatedAt": "2020-03-22T14:55:42.957Z"
          },
          {
            "id": 2,
            "name": "Ozzy Osbourne",
            "numPresences": 0,
            "numAbsences": 4,
            "isActive": false,
            "avatar": "https://api.adorable.io/avatars/285/ozzy.png",
            "createdAt": "2020-03-22T14:57:55.714Z",
            "updatedAt": "2020-03-22T15:00:08.058Z"
          }
        ]
      }
      ```

  - **Resposta de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "Not found" }`

- ### `/admin/pupils/:id`

  - **Função:** listar um aluno pelo ID
  - **Método:** `GET`

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
      {
        "success": true,
        "pupil": {
          "id": 1,
          "name": "Raul Seixas",
          "numPresences": null,
          "numAbsences": null,
          "isActive": true,
          "avatar": "https://api.adorable.io/avatars/285/raul.png",
          "createdAt": "2020-03-22T14:55:42.957Z",
          "updatedAt": "2020-03-22T14:55:42.957Z"
        }
      }
      ```

  - **Resposta de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "Pupil not found" }`

- ### `/admin/pupils/`

  - **Função:** inserir um novo aluno
  - **Método:** `POST`
  - **Requisição:** body
  - **Corpo da requisição:**

    ```json
    {
      "name": "Ozzy Osbourne"
    }
    ```

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
      {
        "id": 2,
        "name": "Ozzy Osbourne",
        "isActive": true,
        "avatar": "https://api.adorable.io/avatars/285/ozzy.png",
        "updatedAt": "2020-03-22T14:57:55.714Z",
        "createdAt": "2020-03-22T14:57:55.714Z",
        "numPresences": null,
        "numAbsences": null
      }
      ```

  - **Resposta de erro:**

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "Validation fails" }`

- ### `/admin/pupils/:id`

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

- ### `/admin/pupils/:id`

  - **Função:** deletar dados do aluno
  - **Método:** `DELETE`

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
      {
        "success": true,
        "message": "Pupil deleted"
      }
      ```

  - **Resposta de erro:**

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "User not found" }`
