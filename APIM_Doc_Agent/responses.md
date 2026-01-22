# Defining API Responses

Define all expected responses, including status codes, response headers, and bodies (schemas).

## 1. Responses without a Body (204)

Operations like `PUT` (Update) often return a 204 No Content status code.

**YAML Example:**
```yaml
paths:
  '/Products(''{ProductId}'')':
    put:
      summary: Update a product entity
      tags:
        - Products
      responses:
        '204':
          description: Empty response
```

## 2. Responses with a Body (201)

Operations like `POST` (Create) typically return the created resource in the body with a 201 Created status.

**YAML Example:**
```yaml
paths:
  '/Products':
    post:
      summary: Create a product
      tags:
        - Products
      responses:
        '201':
          description: Created product
          schema:
            $ref: '#/definitions/Product'
```

## 3. Response Headers

You can define custom headers returned by the server, such as `DataServiceVersion`.

**YAML Example:**
```yaml
responses:
  '201':
    description: Created Product
    headers:
      DataServiceVersion:
        type: string
        description: OData version used by the server.
    schema:
      $ref: '#/definitions/Product'
```

## 4. Error Responses

It is best practice to define a common error schema (e.g., `odata.error`) and reuse it across multiple status codes (400, 401, 404, 500).

**Definition (YAML):**
```yaml
definitions:
  odata.error:
    type: object
    properties:
      code:
        type: string
        description: Error code
      message:
        type: object
        properties:
          lang:
            type: string
          value:
            type: string
```

**Global Response Definitions (YAML):**
```yaml
responses:
  400:
    description: Bad Request
    schema:
      $ref: '#/definitions/odata.error'
  401:
    description: Unauthorized
  404:
    description: Not Found
    schema:
      $ref: '#/definitions/odata.error'
  500:
    description: Internal server error
    schema:
      $ref: '#/definitions/odata.error'
```

**Usage in Operation (YAML):**
```yaml
paths:
  '/Products(''{ProductId}'')':
    put:
      summary: Update entity
      responses:
        '204':
          description: Empty response
        400:
           $ref: '#/responses/400'
        401:
           $ref: '#/responses/401'
        404:
           $ref: '#/responses/404'
        500:
          $ref: '#/responses/500'
```
