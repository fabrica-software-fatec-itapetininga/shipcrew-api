## Auth

- ### `/admin/signin`

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
