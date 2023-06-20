# KeebCraft

## App Link
LINK HERE

## API Documentation
***

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/session
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

***
## Keeb Builds

### View all Keebs

- Request
  - Method: GET
  - url: /api/keebs
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "Keebs": [
        {
          "id": 1,
          "userId": 1,
          "name": "",
          "case": "",
          "size": "",
          "keycaps": "",
          "switches": "",
          "plate": "",
          "stabilizers": "",
          "pcb": "",
          "keeb_info": "",
          "KeebImage": {
            "id": 1,
            "img_url": ""
          },
          "keeb_comments": 2,
        },
      ]
    }
    ```

### View all Keebs created by the Current User

- Request
  - Method: GET
  - url: /api/keebs/current
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "Keebs": [
        {
          "id": 1,
          "userId": 1,
          "name": "",
          "case": "",
          "size": "",
          "keycaps": "",
          "switches": "",
          "plate": "",
          "stabilizers": "",
          "pcb": "",
          "keeb_info": "",
          "KeebImage": {
            "id": 1,
            "img_url": ""
          },
          "keeb_comments": 2,
        },
      ]
    }
    ```

### View Keebs by specified User ID

- Request
  - Method: GET
  - url: /api/users/:userId/keebs
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "Keebs": [
        {
          "id": 1,
          "userId": 1,
          "name": "",
          "case": "",
          "size": "",
          "keycaps": "",
          "switches": "",
          "plate": "",
          "stabilizers": "",
          "pcb": "",
          "keeb_info": "",
          "KeebImage": {
            "id": 1,
            "img_url": ""
          },
          "keeb_comments": 2,
        },
             {
          "id": 2,
          "userId": 1,
          "name": "",
          "case": "",
          "size": "",
          "keycaps": "",
          "switches": "",
          "plate": "",
          "stabilizers": "",
          "pcb": "",
          "keeb_info": "",
          "KeebImage": {
            "id": 2,
            "img_url": ""
          },
          "keeb_comments": 5,
        },
      ]
    }
    ```
- Error response: Couldn't find a User with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "User couldn't be found",
      "statusCode": 404
    }
    ```

### View a Keeb by its Keeb ID

- Request
  - Method: GET
  - url: /api/keebs/:buildId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        {
          "id": 1,
          "userId": 1,
          "name": "",
          "case": "",
          "size": "",
          "keycaps": "",
          "switches": "",
          "plate": "",
          "stabilizers": "",
          "pcb": "",
          "keeb_info": "",
          "KeebImage": {
            "id": 1,
            "img_url": ""
          },
          "keeb_comments": {[
            {
                "id":1,
                "userId": 3,
                "buildId": 1,
                "comment":"",
                "createdAt":,
                "updatedAt":
            },
                  {
                "id":1,
                "userId": 4,
                "buildId": 1,
                "comment":"",
                "createdAt":,
                "updatedAt":
            }
          ]},
        }
    }
    ```

- Error response: Couldn't find a Keeb with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Keeb does not exist",
      "statusCode": 404
    }
    ```

### Create new Keeb

Creates and returns a new Keeb Build

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/keebs/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "userId": 1,
        "name": "",
        "case": "",
        "size": "",
        "keycaps": "",
        "switches": "",
        "plate": "",
        "stabilizers": "",
        "pcb": "",
        "keeb_info": "",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "userId": 1,
        "name": "",
        "case": "",
        "size": "",
        "keycaps": "",
        "switches": "",
        "plate": "",
        "stabilizers": "",
        "pcb": "",
        "keeb_info": "",
        "createdAt": "",
        "updatedAt": ""
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {}
    }
    ```

### Update a Keeb

Updates a keeb build specified by its build ID.

- Require Authentication: true
- Require proper authorization: Song must belong to the current user
- Request

  - Method: PUT
  - URL: /api/keebs/:buildId/edit
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "userId": 1,
        "name": "",
        "case": "",
        "size": "",
        "keycaps": "",
        "switches": "",
        "plate": "",
        "stabilizers": "",
        "pcb": "",
        "keeb_info": "",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "userId": 1,
        "name": "",
        "case": "",
        "size": "",
        "keycaps": "",
        "switches": "",
        "plate": "",
        "stabilizers": "",
        "pcb": "",
        "keeb_info": "",
        "createdAt": "",
        "updatedAt": ""
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {}
    }
    ```

- Error response: Couldn't find a Keeb with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Keeb does not exist",
      "statusCode": 404
    }
    ```

### Delete a Keeb

Deletes an existing Keeb Build

- Require Authentication: true
- Require proper authorization: Keeb must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/keebs/:buildId/delete
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Keeb with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Keeb does not exist",
      "statusCode": 404
    }
    ```

---

## Parts

### View all Parts

- Request
  - Method: GET
  - url: /api/parts
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "Parts": [
        {
            "id": 1,
            "userId": 1,
            "typeId": 1,
            "name": "",
            "description": "",
        },
            {
          "id": 2,
          "userId": 2,
          "typeId": 2,
          "name": "",
          "description": "",
        },
      ]
    }
    ```

### View Part Details by Part ID

- Request
  - Method: GET
  - url: /api/parts/:partId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        {
            "id": 1,
            "userId": 1,
            "name": "",
            "description": "",
            "PartImage": {
                "id": 1,
                "img_url": ""
            },
                "PartType": {
                "id": 1,
                "type": ""
            },
        },
    }
    ```

- Error response: Couldn't find a Part with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Part does not exist",
      "statusCode": 404
    }
    ```

### View all Parts by Type ID

- Request
  - Method: GET
  - url: /api/parts/:partId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "PartsByType": [
        {
            "id": 1,
            "userId": 1,
            "typeId": 1,
            "name": "",
            "description": "",
        },
            {
          "id": 2,
          "userId": 2,
          "typeId": 1,
          "name": "",
          "description": "",
        },
      ]
    }
    ```

- Error response: Couldn't find a Type with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Type is not valid",
      "statusCode": 404
    }
    ```

### View all Parts by Current User

- Request
  - Method: GET
  - url: /api/parts/current
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "CurrParts": [
        {
            "id": 1,
            "userId": 1,
            "typeId": 1,
            "name": "",
            "description": "",
        },
                {
            "id": 2,
            "userId": 1,
            "typeId": 2,
            "name": "",
            "description": "",
        },
                {
            "id": 3,
            "userId": 1,
            "typeId": 3,
            "name": "",
            "description": "",
        },
      ]
    }
    ```

### View all Parts by User ID

- Request
  - Method: GET
  - url: /api/user/:userId/parts
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "UserParts": [
        {
            "id": 1,
            "userId": 1,
            "typeId": 1,
            "name": "",
            "description": "",
        },
                {
            "id": 2,
            "userId": 1,
            "typeId": 2,
            "name": "",
            "description": "",
        },
                {
            "id": 3,
            "userId": 1,
            "typeId": 3,
            "name": "",
            "description": "",
        },
      ]
    }
    ```

- Error response: Couldn't find a User with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "User couldn't be found",
      "statusCode": 404
    }
    ```

### Create a new Part

Creates and returns a new Keeb Part

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/parts/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "userId": 1,
        "typeId": 1,
        "name": "",
        "description": "",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "userId": 1,
        "typeId": 1,
        "name": "",
        "description": "",
        "createdAt": "",
        "updatedAt": ""
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {}
    }
    ```

### Update a Part

Updates song specified by ID.

- Require Authentication: true
- Require proper authorization: Part must belong to the current user
- Request

  - Method: PUT
  - URL: /api/parts/:partId/edit
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "userId": 1,
        "typeId": 1,
        "name": "",
        "description": "",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "userId": 1,
        "typeId": 1,
        "name": "",
        "description": "",
        "createdAt": "",
        "updatedAt": ""
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {}
    }
    ```

- Error response: Couldn't find a Part with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Part does not exist",
      "statusCode": 404
    }
    ```

### Delete a Part

Deletes an existing Part

- Require Authentication: true
- Require proper authorization: Part must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/parts/:partId/delete
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Part with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Part does not exist",
      "statusCode": 404
    }
    ```

---

## Comments

### View all Comments by Current User

- Request
  - Method: GET
  - url: /api/favorites/current
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "CurrentUserComments": [
        {
            "id": 1,
            "buildId": 1,
            "userId": 1,
            "comment": "",
            "createdAt": "",
            "updatedAt": ""
        },
        {
            "id": 2,
            "buildId": 2,
            "userId": 1,
            "comment": "",
            "createdAt": "",
            "updatedAt": ""
        },
        {
            "id": 3,
            "buildId": 3,
            "userId": 1,
            "comment": "",
            "createdAt": "",
            "updatedAt": ""
        },
      ]
    }
    ```

### View all Comments by Build ID

Returns all comments with a specified Build id

- Request
  - Method: GET
  - url: /api/keebs/:buildId/comments
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        "KeebComments":{[
            {
                "id":1,
                "userId": 3,
                "buildId": 1,
                "comment":"",
                "createdAt":,
                "updatedAt":
            },
            {
                "id":2,
                "userId": 3,
                "buildId": 1,
                "comment":"",
                "createdAt":,
                "updatedAt":
            }
        ]}
    }
    ```

### Create a new Comment

Creates and returns a new comment for a keeb build

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/keebs/:buildId/comment/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "userId": 3,
      "buildId": 1,
      "comment": ""
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 3,
      "buildId": 1,
      "comment": "",
      "createdAt": "",
      "updatedAt": ""
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {}
    }
    ```

### Delete a Comment

Deletes an existing Comment

- Require Authentication: true
- Require proper authorization: Comment must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/keebs/:buildId/comments/:commentId/delete
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Keeb with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Keeb does not exist",
      "statusCode": 404
    }
    ```

- Error response: Couldn't find a comment with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Comment does not exist",
      "statusCode": 404
    }
    ```

---

## Favorites

### View all Favorites List by Current User

- Request
  - Method: GET
  - url: /api/user/current/favorite
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        "CurrentUserFavorites": {
            "FavoriteList1": {
            "id": 1,
            "name": "",
            "createdAt": "",
            "updatedAt": "",
            "builds": [
                {
                "id": 1,
                "buildId": 1,
                "userId": 1,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                },
                {
                "id": 2,
                "buildId": 2,
                "userId": 1,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                }
            ]
            },
            "FavoriteList2": {
            "id": 2,
            "name": "",
            "createdAt": "",
            "updatedAt": "",
            "builds": [
                {
                "id": 1, //favorite Id
                "buildId": 2, //the actual build Id
                "userId": 2,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                },
                {
                "id": 2,
                "buildId": 2,
                "userId": 1,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                }
            ]
            }
        }
    }
    ```

### View all Favorites List by User Id

- Request
  - Method: GET
  - url: /api/user/:userId/favorites
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        "UserFavorites": {
            "FavoriteList1": {
            "id": 1,
            "name": "",
            "createdAt": "",
            "updatedAt": "",
            "builds": [
                {
                "id": 1,
                "buildId": 1,
                "userId": 1,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                },
                {
                "id": 2,
                "buildId": 2,
                "userId": 1,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                }
            ]
            },
            "FavoriteList2": {
            "id": 2,
            "name": "",
            "createdAt": "",
            "updatedAt": "",
            "builds": [
                {
                "id": 1, //favorite Id
                "buildId": 2, //the actual build Id
                "userId": 2,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                },
                {
                "id": 2,
                "buildId": 2,
                "userId": 1,
                "name": "",
                "createdAt": "",
                "updatedAt": ""
                }
            ]
            }
        }
    }
    ```

- Error response: Couldn't find a user with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "User couldn't be found",
      "statusCode": 404
    }
    ```

### View a Favorites List by its Favorites ID

- Request
  - Method: GET
  - url: /api/favorites/:favoriteId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
        "name": "",
        "id": 1,
        "createdAt": "",
        "updatedAt": "",
        "builds": [
            {
            "id": 1,
            "buildId": 1,
            "userId": 1,
            "name": "",
            "updatedAt": "",
            "createdAt": "",
            },
            {
            "id": 2,
            "buildId": 2,
            "userId": 1,
            "name": "",
            "createdAt": "",
            "updatedAt": ""
            }
        ]
    }
    ```

- Error response: Couldn't find a Favorites List with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Favorites List couldn't be found",
      "statusCode": 404
    }
    ```

### Create a new Favorites List

Creates and returns a new Favorites List

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/favorites/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "name": "",
        "builds": [
            {
            "id": 1,
            "buildId": 1,
            "userId": 1,
            "name": "",
            "updatedAt": "",
            "createdAt": "",
            },
        ]
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
        "id": 1,
        "name": "",
        "updatedAt": "",
        "createdAt": "",
        "builds": [
            {
            "id": 1,
            "buildId": 1,
            "userId": 1,
            "name": "",
            "updatedAt": "",
            "createdAt": "",
            },
        ]
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {}
    }
    ```

### Delete a Favorites List

Deletes an existing Favorites List

- Require Authentication: true
- Require proper authorization: Favorites List must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/favorites/:favoritesId/delete
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Favorites List with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Favorites List couldn't be found",
      "statusCode": 404
    }
    ```
