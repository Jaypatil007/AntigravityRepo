# Add Input Parameters - Headers and Queries

Define all input parameters for your API operation, irrespective of whether they are mandatory or optional. The parameters information can be modeled under `parameters` definitions object in the OpenAPI specification.

In a RESTFul API, the input parameters can be any of the following types:

-   **Query Parameters**

    When submitting a request, these parameters form the query string part at the end of the request URL. A question mark (?) character delimits the URL from the query string. For example, `Products?$top=2`. Multiple parameters can be supplied as name/value pairs in the format name="value". Each name/value pair is separated by the ampersand (&) character. For example, `Products?$skip=10&$top=2&someName="someValue"`.

    **YAML Example:**
    ```yaml
    parameters:
            - in: query
              name: pageNumber
              type: integer
              description: The page number from which the items must be listed.
            - in: query
              name: limit
              type: pageSize
              description: The number of items to be returned on the specified page.
    ```

    **JSON Example:**
    ```json
    {
       "parameters": [
          {
             "in": "query",
             "name": "pageNumber",
             "type": "integer",
             "description": "The page number from which the items must be listed."
          },
          {
             "in": "query",
             "name": "limit",
             "type": "pageSize",
             "description": "The number of items to be returned on the specified page."
          }
       ]
    }
    ```

-   **Header Parameters**

    Header parameters are components of the header section of an HTTP request or response. The name of a header field must be immediately followed by a colon : character.

    **YAML Example:**
    ```yaml
    /check:
        get:
          summary: Checks if the server is up.
          parameters:
            - in: header
              name: Request-ID
              type: string
              required: true  
          responses:
              200:
                description: OK
    ```

    **JSON Example:**
    ```json
    {
       "/check": {
          "get": {
             "summary": "Checks if the server is up.",
             "parameters": [
                {
                   "in": "header",
                   "name": "Request-ID",
                   "type": "string",
                   "required": true
                }
             ],
             "responses": {
                "200": {
                   "description": "OK"
                }
             }
          }
       }
    }
    ```

-   **Path Parameters**

    Path parameters are a flexible way of parameterizing the actual values used when creating the path to a resource. For example: `/Products/{ProductId}`.

    > **Note:** The parameter name must be the same as specified in the path. Path parameters must always have `required: true`.

    **YAML Example:**
    ```yaml
    paths:
      /products{productId}:
        get:
          parameters:
            - in: path
              name: ProductId   # Note the name is the same as in the path
              required: true 
              type: integer
              minimum: 1
              description: The product ID.
          responses:
              200:
               description: OK
    ```

    **JSON Example:**
    ```json
    {
       "paths": {
          "/products{productId}": {
             "get": {
                "parameters": [
                   {
                      "in": "path",
                      "name": "ProductId",
                      "required": true,
                      "type": "integer",
                      "minimum": 1,
                      "description": "The product ID."
                   }
                ],
                "responses": {
                   "200": {
                      "description": "OK"
                   }
                }
             }
          }
       }
    }
    ```

## OData System Query Options

The following examples define commonly used OData system query parameters like `$top`, `$skip`, and `$count`.

**YAML Example:**
```yaml
parameters:
  top:
    name: $top
    in: query
    description: Show only the first N elements, where N is a positive integer.
    type: integer
    minimum: 0
  skip:
    name: $skip
    in: query
    description: Skip the first N elements, where N is a positive integer as specified by this query option.
    type: integer
    minimum: 0
  count:
    name: $count
    in: query
    description: Include count of elements.
    type: boolean
```

**JSON Example:**
```json
{
   "parameters": {
      "top": {
         "name": "$top",
         "in": "query",
         "description": "Show only the first N elements, where N is a positive integer.",
         "type": "integer",
         "minimum": 0
      },
      "skip": {
         "name": "$skip",
         "in": "query",
         "description": "Skip the first N elements, where N is a positive integer as specified by this query option.",
         "type": "integer",
         "minimum": 0
      },
      "count": {
         "name": "$count",
         "in": "query",
         "description": "Include count of elements.",
         "type": "boolean"
      }
   }
}
```

These parameters can then be referenced in operations:

**YAML Example:**
```yaml
paths:
  /Products:
    get:
      tags:
        - Products
      parameters:
        - $ref: '#/parameters/top'
        - $ref: '#/parameters/skip'
        - $ref: '#/parameters/count'
```
