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
            "id": 8,
            "name": "Ozzy Osbourne",
            "integrationDate": "2020-03-03T12:00:00.000Z",
            "numPresences": null,
            "numAbsences": null,
            "isActive": true,
            "avatar": "https://api.adorable.io/avatars/285/ozzy.png",
            "createdAt": "2020-04-07T23:23:25.782Z",
            "updatedAt": "2020-04-07T23:23:25.782Z"
          },
          {
            "id": 10,
            "name": "Ada Lovelace",
            "integrationDate": "2019-03-03T12:00:00.000Z",
            "numPresences": null,
            "numAbsences": null,
            "isActive": true,
            "avatar": "https://api.adorable.io/avatars/285/ada.png",
            "createdAt": "2020-04-07T23:35:27.276Z",
            "updatedAt": "2020-04-07T23:38:03.467Z"
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
          "id": 10,
          "name": "Ada Lovelace",
          "integrationDate": "2019-03-03T12:00:00.000Z",
          "numPresences": null,
          "numAbsences": null,
          "isActive": true,
          "avatar": "https://api.adorable.io/avatars/285/ada.png",
          "createdAt": "2020-04-07T23:35:27.276Z",
          "updatedAt": "2020-04-07T23:38:03.467Z"
        }
      }
      ```

  - **Resposta de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "Pupil not found" }`

- ### `/admin/pupils/`

  - **Função:** inserir um novo aluno
  - **Método:** `POST`
  - **Restrição:** o campo `integrationDate` deverá ser no formato date/timestampz
  - **Requisição:** body
  - **Corpo da requisição:**

    ```json
    {
      "name": "Ada Lovelace",
      "integrationDate": "03-03-20 9:00:00"
    }
    ```

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
      {
        "id": 10,
        "name": "Ada Lovelace",
        "integrationDate": "2020-03-03T12:00:00.000Z",
        "isActive": true,
        "avatar": "https://api.adorable.io/avatars/285/ada.png",
        "updatedAt": "2020-04-07T23:35:27.276Z",
        "createdAt": "2020-04-07T23:35:27.276Z",
        "numPresences": null,
        "numAbsences": null
      }
      ```

  - **Resposta de erro:**

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "Validation fails" }`

- ### `/admin/pupils/:id`

  - **Função:** atualizar dados do aluno
  - **Método:** `PATCH`
  - **Restrições:**
    - O campo `integrationDate` deverá ser no formato date/timestampz;
    - Não é obrigatório preencher todos os campos.
  - **Requisição:** body
  - **Corpo da requisição:**

    ```json
    {
      "name": "Ada Lovelace",
      "integrationDate": "03-03-19 9:00:00",
      "isActive": false,
      "numPresences": 0,
      "numAbsences": 4
    }
    ```

  - **Resposta de sucesso:**

    - **Status**: 200
    - **Corpo da resposta**:
      ```json
      {
        "success": true,
        "user": {
          "id": 10,
          "name": "Ada Lovelace",
          "integrationDate": "2019-03-03T12:00:00.000Z",
          "numPresences": 0,
          "numAbsences": 4,
          "isActive": false,
          "avatar": "https://api.adorable.io/avatars/285/ada.png",
          "createdAt": "2020-04-07T23:35:27.276Z",
          "updatedAt": "2020-04-07T23:48:07.709Z"
        }
      }
      ```

  - **Respostas de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "Pupil not found" }`

      OU

    - **Status**: 400
    - **Corpo da resposta**: `{ "success": false, "message": "Validation fails" }`

- ### `/admin/pupils/:id`

  - **Função:** deletar dados do aluno
  - **Restrição:** só poderá ser deletado o aluno que estiver marcado como inativo
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

  - **Respostas de erro:**

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "Pupil cannot be deleted" }`

      OU

    - **Status**: 404
    - **Corpo da resposta**: `{ "success": false, "message": "Pupil not found" }`
