# **Api Webschool**

Essa api tem como função trazer todas as funcionalidades de uma escola com gerenciamento online

#

## **Login**

#### **POST: /login**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "email": "salesiano@email.com",
  "password": "123456"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoic2Nob29sIiwiaWF0IjoxNjYyODY3MjE0LCJleHAiOjE2NjI5NTM2MTQsInN1YiI6ImViMzllMGY3LTJlODItNGE3Mi05ZDc4LWQxZDE3ZmNiMzVlMyJ9.1_-fmXrXfq3P1NcGtpmswbO20LhmwM2r1Z7YxSuKROo"
}
```

<hr>

## **Escola**

#### **POST: /schools**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "Centro Educacional Salesiano",
  "email": "salesiano@email.com",
  "password": "123456",
  "director": "Gabriel Salesiano",
  "address": {
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  }
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "d2cbeeb9-defe-4d8c-b6a2-fd86667ddbff",
  "name": "Centro Educacional Salesiano",
  "email": "escolaa@mail.com",
  "type": "school",
  "director": "Gabriel Salesiano",
  "address": {
    "id": "117d843a-f2cb-46b5-b288-f0cec3c7ad85",
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "1666",
    "zipCode": "48700000"
  },
  "teams": []
}
```

<hr>

#### **GET: /schools**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "id": "d2cbeeb9-defe-4d8c-b6a2-fd86667ddbff",
    "name": "Centro Educacional Salesiano",
    "email": "escolaa@mail.com",
    "type": "school",
    "director": "Gabriel Salesiano",
    "address": {
      "id": "117d843a-f2cb-46b5-b288-f0cec3c7ad85",
      "state": "BA",
      "city": "Serrinha",
      "district": "Primeira Travessa Antonio Pinheiro da Mota",
      "number": "1666",
      "zipCode": "48700000"
    },
    "teams": []
  }
]
```

<hr>

#### **GET: /schools/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "d2cbeeb9-defe-4d8c-b6a2-fd86667ddbff",
  "name": "Centro Educacional Salesiano",
  "email": "escolaa@mail.com",
  "type": "school",
  "director": "Gabriel Salesiano",
  "address": {
    "id": "117d843a-f2cb-46b5-b288-f0cec3c7ad85",
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "1666",
    "zipCode": "48700000"
  },
  "teams": []
}
```

<hr>

#### **PATCH: /schools/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "Centro Educacional Salesiana",
  "email": "salesiano@email.com",
  "password": "123456",
  "director": "Gabriel Salesiano",
  "address": {
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  }
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "17856356-0b28-4fd7-ba8d-19c94f1e8e84",
  "name": "Centro Educacional Salesiano2",
  "email": "escola@mail.com",
  "type": "school",
  "director": "Dérick Salesiano",
  "address": {
    "id": "3e5e8de6-9fcc-49cc-8145-361d3236d0d7",
    "state": "BA",
    "city": "Serrinha",
    "district": "Primeira Travessa Antonio Pinheiro da Mota",
    "number": "166",
    "zipCode": "48700000"
  },
  "teams": []
}
```

<hr>

#### **DELETE: /schools/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Professor**

#### **POST: /teachers**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "Fábio Junior",
  "email": "fabio@mail.com.br",
  "password": "123456",
  "shift": "Matutino",
  "matter": "Back-End"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "9499944e-3c49-4597-97e8-286fde6e6ae7",
  "name": "Fábio Junior",
  "email": "professor@mail.com",
  "type": "teacher",
  "shift": "Matutino",
  "matter": "Back-End",
  "createdAt": "2022-09-12",
  "updatedAt": "2022-09-12",
  "feedbacks": []
}
```

<hr>

#### **GET: /teachers**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "id": "ececd226-3f68-4dec-93b0-7bda2ee38c15",
    "name": "Fábio Junior",
    "email": "professor@mail.com",
    "type": "teacher",
    "shift": "Matutino",
    "matter": "Back-End",
    "createdAt": "2022-09-09",
    "updatedAt": "2022-09-09"
  },
  {
    "id": "9499944e-3c49-4597-97e8-286fde6e6ae7",
    "name": "Fábio Junior",
    "email": "professorr@mail.com",
    "type": "teacher",
    "shift": "Matutino",
    "matter": "Back-End",
    "createdAt": "2022-09-12",
    "updatedAt": "2022-09-12"
  }
]
```

<hr>

#### **GET: /teachers/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "ececd226-3f68-4dec-93b0-7bda2ee38c15",
  "name": "Fábio Junior",
  "email": "professor@mail.com",
  "type": "teacher",
  "shift": "Matutino",
  "matter": "Back-End",
  "createdAt": "2022-09-09",
  "updatedAt": "2022-09-09"
}
```

<hr>

#### **PATCH: /teachers/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "Fábio Junior",
  "email": "fabio@mail.com.br",
  "password": "123456",
  "shift": "Matutino",
  "matter": "Back-End"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "9499944e-3c49-4597-97e8-286fde6e6ae7",
  "name": "Fábio Junior",
  "email": "professorrr@mail.com",
  "type": "teacher",
  "shift": "Vespertino",
  "matter": "Front-End",
  "createdAt": "2022-09-12",
  "updatedAt": "2022-09-12",
  "feedbacks": []
}
```

<hr>

#### **DELETE: /teachers/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Salas**

#### **POST: /teams**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "m4"
}
```

<br>

Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "e0b1a69d-f063-47eb-9c4e-dc34f0979838",
  "name": "m4",
  "students": [],
  "teachers": []
}
```

<hr>

#### **GET: /teams**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "id": "e0b1a69d-f063-47eb-9c4e-dc34f0979838",
    "name": "m5",
    "students": [],
    "teachers": []
  },
  {
    "id": "807f1088-f0d1-44cb-ab57-53a7a74114ab",
    "name": "m4",
    "students": [],
    "teachers": []
  }
]
```

<hr>

#### **GET: /teams/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "e0b1a69d-f063-47eb-9c4e-dc34f0979838",
  "name": "m4",
  "students": [],
  "teachers": []
}
```

<hr>

#### **PATCH: /teams/:id**

<hr>

Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "307"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "e0b1a69d-f063-47eb-9c4e-dc34f0979838",
  "name": "307",
  "students": [],
  "teachers": []
}
```

<hr>

#### **DELETE: /teams/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Estudantes**

#### **POST: /estudents**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "Janaína",
  "email": "Janaína@mail.com",
  "shift": "matutino",
  "registration": "468416811118",
  "team": "m4",
  "password": "123456"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "dbeb26c9-1c2e-4826-bb08-8c4ee6e65a25",
  "name": "Janaína",
  "email": "Janaína@mail.com",
  "type": "student",
  "registration": "468416811118",
  "shift": "matutino",
  "createdAt": "2022-09-12",
  "updatedAt": "2022-09-12",
  "feedbacks": []
}
```

<hr>

#### **GET: /estudents**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "id": "dbeb26c9-1c2e-4826-bb08-8c4ee6e65a25",
    "name": "Janaína",
    "email": "Janaína@mail.com",
    "type": "student",
    "registration": "468416811118",
    "shift": "matutino",
    "createdAt": "2022-09-12",
    "updatedAt": "2022-09-12",
    "feedbacks": []
  },
  {
    "id": "c3c0843d-3655-47aa-b261-96ec25d04fa0",
    "name": "Joana",
    "email": "aluno@mail.com",
    "type": "student",
    "registration": "4684168111184",
    "shift": "matutino",
    "createdAt": "2022-09-09",
    "updatedAt": "2022-09-09",
    "feedbacks": []
  }
]
```

<hr>

#### **GET: /estudents/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "dbeb26c9-1c2e-4826-bb08-8c4ee6e65a25",
  "name": "Janaína",
  "email": "Janaína@mail.com",
  "type": "student",
  "registration": "468416811118",
  "shift": "matutino",
  "createdAt": "2022-09-12",
  "updatedAt": "2022-09-12",
  "team": null,
  "feedbacks": []
}
```

<hr>

#### **PATCH: /estudents/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "Paula",
  "email": "Paula@mail.com",
  "shift": "Vespertino",
  "registration": "468416811118",
  "team": "m4",
  "password": "123456"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "dbeb26c9-1c2e-4826-bb08-8c4ee6e65a25",
  "name": "Paula",
  "email": "Paula@mail.com",
  "type": "student",
  "registration": "468416811118",
  "shift": "Vespertino",
  "createdAt": "2022-09-12",
  "updatedAt": "2022-09-12",
  "feedbacks": []
}
```

<hr>

#### **DELETE: /estudents/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Feedback**

#### **POST: /feedback**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "fabio",
  "feedback": "você não fez a atividade",
  "email": "Paula@mail.com"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "student": {
    "id": "dbeb26c9-1c2e-4826-bb08-8c4ee6e65a25",
    "name": "Paula",
    "email": "Paula@mail.com",
    "type": "student",
    "registration": "468416811118",
    "shift": "Vespertino",
    "createdAt": "2022-09-12",
    "updatedAt": "2022-09-12",
    "feedbacks": []
  },
  "teacher": {
    "id": "ececd226-3f68-4dec-93b0-7bda2ee38c15",
    "name": "Fábio Junior",
    "email": "professor@mail.com",
    "type": "teacher",
    "shift": "Matutino",
    "matter": "Back-End",
    "createdAt": "2022-09-09",
    "updatedAt": "2022-09-09"
  },
  "feedback": "você não fez a atividade",
  "name": "fabio",
  "id": "04cc809f-d714-48ac-ace5-1df4a660e458",
  "createdAt": "2022-09-12",
  "updatedAt": "2022-09-12"
}
```

<hr>

#### **GET: /feedback**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "id": "04cc809f-d714-48ac-ace5-1df4a660e458",
    "name": "fabio",
    "feedback": "você não fez a atividade",
    "createdAt": "2022-09-12",
    "updatedAt": "2022-09-12",
    "teacher": {
      "id": "ececd226-3f68-4dec-93b0-7bda2ee38c15",
      "name": "Fábio Junior",
      "email": "professor@mail.com",
      "type": "teacher",
      "shift": "Matutino",
      "matter": "Back-End",
      "createdAt": "2022-09-09",
      "updatedAt": "2022-09-09"
    }
  }
]
```

<hr>

#### **PATCH: /feedback/:id**

<hr>
Deve enviar um objeto com a escola expecífica:

```json
{
  "feedback": "você fez a atividade?"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "message": "User updated"
}
```

<hr>

#### **DELETE: /feedback/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Responsáveis**

#### **POST: /responsibles**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "name": "Pai da Joana",
  "email": "responsaveljoana@mail.com",
  "password": "123",
  "studentEmail": "Joana@mail.com"
}
```

<br>

Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "9b0e81be-66d1-4311-9a85-c797eb1f0dbb",
  "name": "Pai da Joana",
  "email": "responsaveljoana@mail.com",
  "type": "responsible",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": []
}
```

<hr>

#### **GET: /responsibles**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "id": "1d64e833-7469-42e0-b16a-9e114ad354a8",
    "name": "Pai do Jano",
    "email": "responsaveljano@mail.com",
    "type": "responsible",
    "createdAt": "2022-09-14",
    "updatedAt": "2022-09-14",
    "student": [
      {
        "id": "e723b07e-84a1-4b00-b6a0-8aa07c625b03",
        "name": "Jano",
        "email": "Jano@mail.com",
        "type": "student",
        "registration": "468416811117",
        "shift": "matutino",
        "createdAt": "2022-09-14",
        "updatedAt": "2022-09-14",
        "feedbacks": []
      }
    ]
  }
]
```

<hr>

#### **GET: /responsibles/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "1d64e833-7469-42e0-b16a-9e114ad354a8",
  "name": "Pai do Jano",
  "email": "responsaveljano@mail.com",
  "type": "responsible",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": [
    {
      "id": "e723b07e-84a1-4b00-b6a0-8aa07c625b03",
      "name": "Jano",
      "email": "Jano@mail.com",
      "type": "student",
      "registration": "468416811117",
      "shift": "matutino",
      "createdAt": "2022-09-14",
      "updatedAt": "2022-09-14",
      "grades": [],
      "activities": [],
      "feedbacks": []
    }
  ]
}
```

<hr>

#### **PATCH: /responsibles/:id**

<hr>

Deve enviar um objeto com a escola expecífica:

```json
{
  "name": "Pai da Jano",
  "email": "responsaveljano@mail.com",
  "password": "1234"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "1d64e833-7469-42e0-b16a-9e114ad354a8",
  "name": "Pai da Jano",
  "email": "responsaveljano@mail.com",
  "type": "responsible",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": [
    {
      "id": "e723b07e-84a1-4b00-b6a0-8aa07c625b03",
      "name": "Jano",
      "email": "Jano@mail.com",
      "type": "student",
      "registration": "468416811117",
      "shift": "matutino",
      "createdAt": "2022-09-14",
      "updatedAt": "2022-09-14",
      "feedbacks": []
    }
  ]
}
```

<hr>

#### **DELETE: /responsibles/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Grades**

#### **POST: /grades**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "matter": "Ciencias",
  "grade": 10,
  "student": "Jorje@mail.com"
}
```

<br>

Como retorno obteremos a seguinte json:

<br>

```json
{
  "matter": "Ciencias",
  "grade": 10,
  "student": [
    {
      "id": "f9c88d0c-4335-4c35-ae09-b7af9d02a925",
      "name": "Jorje",
      "email": "Jorje@mail.com",
      "type": "student",
      "registration": "468416811118",
      "shift": "matutino",
      "createdAt": "2022-09-12",
      "updatedAt": "2022-09-12",
      "feedbacks": [
        {
          "id": "87038e1d-f560-435d-af60-bfcb0f943785",
          "name": "fabio",
          "feedback": "você não fez a atividade",
          "createdAt": "2022-09-13",
          "updatedAt": "2022-09-13",
          "teacher": {
            "id": "74f01a3c-c3b0-4e08-8849-cb1ff38bf2a7",
            "name": "Fábio Junior",
            "email": "professor@mail.com",
            "type": "teacher",
            "shift": "Matutino",
            "matter": "Back-End",
            "createdAt": "2022-09-12",
            "updatedAt": "2022-09-12"
          }
        }
      ]
    }
  ],
  "id": "aa1ebe2d-3e4d-4c9f-94d2-dc2e5ea8d712",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14"
}
```

<hr>

#### **GET: /grades/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "5a902555-0792-45be-9e19-10d5b8f36cfc",
  "matter": "Ciencias",
  "grade": "10.00",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": [
    {
      "id": "f9c88d0c-4335-4c35-ae09-b7af9d02a925",
      "name": "Jorje",
      "email": "Jorje@mail.com",
      "type": "student",
      "registration": "468416811118",
      "shift": "matutino",
      "createdAt": "2022-09-12",
      "updatedAt": "2022-09-12",
      "feedbacks": [
        {
          "id": "87038e1d-f560-435d-af60-bfcb0f943785",
          "name": "fabio",
          "feedback": "você não fez a atividade",
          "createdAt": "2022-09-13",
          "updatedAt": "2022-09-13",
          "teacher": {
            "id": "74f01a3c-c3b0-4e08-8849-cb1ff38bf2a7",
            "name": "Fábio Junior",
            "email": "professor@mail.com",
            "type": "teacher",
            "shift": "Matutino",
            "matter": "Back-End",
            "createdAt": "2022-09-12",
            "updatedAt": "2022-09-12"
          }
        }
      ]
    }
  ]
}
```

<hr>

#### **PATCH: /grades/:id**

<hr>

Deve enviar um objeto com a escola expecífica:

```json
{
  "matter": "Ciencias",
  "grade": 8,
  "student": "Jorje@mail.com"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "5a902555-0792-45be-9e19-10d5b8f36cfc",
  "matter": "Ciencias",
  "grade": "8.00",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": [
    {
      "id": "f9c88d0c-4335-4c35-ae09-b7af9d02a925",
      "name": "Jorje",
      "email": "Jorje@mail.com",
      "type": "student",
      "registration": "468416811118",
      "shift": "matutino",
      "createdAt": "2022-09-12",
      "updatedAt": "2022-09-12",
      "feedbacks": [
        {
          "id": "87038e1d-f560-435d-af60-bfcb0f943785",
          "name": "fabio",
          "feedback": "você não fez a atividade",
          "createdAt": "2022-09-13",
          "updatedAt": "2022-09-13",
          "teacher": {
            "id": "74f01a3c-c3b0-4e08-8849-cb1ff38bf2a7",
            "name": "Fábio Junior",
            "email": "professor@mail.com",
            "type": "teacher",
            "shift": "Matutino",
            "matter": "Back-End",
            "createdAt": "2022-09-12",
            "updatedAt": "2022-09-12"
          }
        }
      ]
    }
  ]
}
```

<hr>

#### **DELETE: /grades/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Activities**

#### **POST: /activities**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "title": "Criando banco de dados",
  "url": "https://canvas.kenzie.com.br/courses/15/pages/s2-01-%7C-aula-bancos-de-dados-introducao?module_item_id=1751",
  "student": "Jorje@mail.com"
}
```

<br>

Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "a0a44c45-9165-4a62-aef0-e69f4c0c9f42",
  "title": "Criando banco de dados",
  "url": "https://canvas.kenzie.com.br/courses/15/pages/s2-01-%7C-aula-bancos-de-dados-introducao?module_item_id=1751",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": [
    {
      "id": "f9c88d0c-4335-4c35-ae09-b7af9d02a925",
      "name": "Jorje",
      "email": "Jorje@mail.com",
      "type": "student",
      "registration": "468416811118",
      "shift": "matutino",
      "createdAt": "2022-09-12",
      "updatedAt": "2022-09-12",
      "feedbacks": [
        {
          "id": "87038e1d-f560-435d-af60-bfcb0f943785",
          "name": "fabio",
          "feedback": "você não fez a atividade",
          "createdAt": "2022-09-13",
          "updatedAt": "2022-09-13",
          "teacher": {
            "id": "74f01a3c-c3b0-4e08-8849-cb1ff38bf2a7",
            "name": "Fábio Junior",
            "email": "professor@mail.com",
            "type": "teacher",
            "shift": "Matutino",
            "matter": "Back-End",
            "createdAt": "2022-09-12",
            "updatedAt": "2022-09-12"
          }
        }
      ]
    }
  ]
}
```

<hr>

<hr>

#### **GET: /activities/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "a0a44c45-9165-4a62-aef0-e69f4c0c9f42",
  "title": "Criando banco de dados",
  "url": "https://canvas.kenzie.com.br/courses/15/pages/s2-01-%7C-aula-bancos-de-dados-introducao?module_item_id=1751",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": [
    {
      "id": "f9c88d0c-4335-4c35-ae09-b7af9d02a925",
      "name": "Jorje",
      "email": "Jorje@mail.com",
      "type": "student",
      "registration": "468416811118",
      "shift": "matutino",
      "createdAt": "2022-09-12",
      "updatedAt": "2022-09-12",
      "feedbacks": [
        {
          "id": "87038e1d-f560-435d-af60-bfcb0f943785",
          "name": "fabio",
          "feedback": "você não fez a atividade",
          "createdAt": "2022-09-13",
          "updatedAt": "2022-09-13",
          "teacher": {
            "id": "74f01a3c-c3b0-4e08-8849-cb1ff38bf2a7",
            "name": "Fábio Junior",
            "email": "professor@mail.com",
            "type": "teacher",
            "shift": "Matutino",
            "matter": "Back-End",
            "createdAt": "2022-09-12",
            "updatedAt": "2022-09-12"
          }
        }
      ]
    }
  ]
}
```

<hr>

#### **PATCH: /activities/:id**

<hr>

Deve enviar um objeto com a escola expecífica:

```json
{
  "title": "Criando banco de dados",
  "url": "https://canvas.kenzie.com.br/courses/15/pages/s2-01-%7C-aula-bancos-de-dados-introducao?module_item_id=1751",
  "student": "Jorje@mail.com"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "a0a44c45-9165-4a62-aef0-e69f4c0c9f42",
  "title": "Criando banco de dados",
  "url": "https://canvas.kenzie.com.br/courses/15/pages/s2-01-%7C-aula-bancos-de-dados-introducao?module_item_id=1751",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14",
  "student": [
    {
      "id": "f9c88d0c-4335-4c35-ae09-b7af9d02a925",
      "name": "Jorje",
      "email": "Jorje@mail.com",
      "type": "student",
      "registration": "468416811118",
      "shift": "matutino",
      "createdAt": "2022-09-12",
      "updatedAt": "2022-09-12",
      "feedbacks": [
        {
          "id": "87038e1d-f560-435d-af60-bfcb0f943785",
          "name": "fabio",
          "feedback": "você não fez a atividade",
          "createdAt": "2022-09-13",
          "updatedAt": "2022-09-13",
          "teacher": {
            "id": "74f01a3c-c3b0-4e08-8849-cb1ff38bf2a7",
            "name": "Fábio Junior",
            "email": "professor@mail.com",
            "type": "teacher",
            "shift": "Matutino",
            "matter": "Back-End",
            "createdAt": "2022-09-12",
            "updatedAt": "2022-09-12"
          }
        }
      ]
    }
  ]
}
```

<hr>

#### **DELETE: /activities/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>

## **Salas**

#### **POST: /teams**

<br>

<hr>

O Corpo da requisição deve ser enviado da seguinte forma:

```json
{
  "message": "Hello, World"
}
```

<br>

Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "97e1bfd2-ef29-48ba-839a-9b1dae98755a",
  "message": "Hello, World",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14"
}
```

<hr>

#### **GET: /teams**

<hr>

Deve retornar um array com todas as escolas:

```json
[
  {
    "id": "97e1bfd2-ef29-48ba-839a-9b1dae98755a",
    "message": "Hello, World",
    "createdAt": "2022-09-14",
    "updatedAt": "2022-09-14"
  }
]
```

<hr>

#### **GET: /teams/:id**

<hr>
Deve retornar um objeto com a escola expecífica:

```json
{
  "id": "97e1bfd2-ef29-48ba-839a-9b1dae98755a",
  "message": "Hello, World",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14"
}
```

<hr>

#### **PATCH: /teams/:id**

<hr>

Deve enviar um objeto com a escola expecífica:

```json
{
  "message": "olá, mundo"
}
```

<br>
Como retorno obteremos a seguinte json:

<br>

```json
{
  "id": "97e1bfd2-ef29-48ba-839a-9b1dae98755a",
  "message": "olá, mundo",
  "createdAt": "2022-09-14",
  "updatedAt": "2022-09-14"
}
```

<hr>

#### **DELETE: /teams/:id**

<hr>
Deve enviar um id, não deve retonar nada

<br>
<hr>
<br>
