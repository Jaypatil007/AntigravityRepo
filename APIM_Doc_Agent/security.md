# Security Specification for API Artifact

The API artifact supports three types of authentication mechanisms:

1.  **OAuth:** The tenant authenticates itself using a client ID and client secret.
2.  **Client Certificate:** The tenant authenticates itself using a client certificate.
3.  **Basic:** The tenant authenticates itself using user credentials (username and password).

By default, **OAuth** and **Client Certificate** are selected.

## Important Considerations for OAuth 2.0

*   **Description Preservation:** Changes made to the `description` field in the `securitySchemes` (OAS 3.0) or `securityDefinitions` (OAS 2.0) are preserved during deployment.
*   **Overwrite Behavior:** If you modify the defined grant types—such as `authorizationCode`, `clientCredentials`, `password`, `x-refresh_token`, `x-saml2-bearer`, `x-jwt-bearer`—these **will be overwritten and reset to the default configuration** upon deployment. Do not manually customize these flow definitions.
*   **Scopes:** Scopes defined in the authorization policy are **not** automatically appended to the security definitions in the OpenAPI specification.

## OpenAPI 3.0 Example

```yaml
openapi: 3.0.1
components:
  securitySchemes:
    OAuth2:
      type: oauth2
      description: Testing OAUTH2
      flows:
        password:
          tokenUrl: 'https://local_tenant.example.com/oauth/token'
          scopes: {}
        clientCredentials:
          tokenUrl: 'https://local_tenant.example.com/oauth/token'
          scopes: {}
        authorizationCode:
          authorizationUrl: 'https://local_tenant.example.com/oauth/authorize'
          tokenUrl: 'https://local_tenant.example.com/oauth/token'
          scopes: {}
        x-refresh_token:                           # Extension flows
          tokenUrl: 'https://local_tenant.example.com/oauth/token'
          refreshUrl: 'https://local_tenant.example.com/oauth/token'
          scopes: {}
        x-saml2-bearer:
          tokenUrl: 'https://local_tenant.example.com/oauth/token'
          scopes: {}
        x-jwt-bearer:
          tokenUrl: 'https://local_tenant.example.com/oauth/token'
          scopes: {}
    clientCertAuth:
      type: http
      description: Client certificate support via mutualTLS.
      scheme: mutualTLS
security:
  - clientCertAuth: []
  - OAuth2: []
```

## OpenAPI 2.0 Example

```yaml
swagger: '2.0'
securityDefinitions:
  authorizationCode:
    type: oauth2
    flow: accessCode
    authorizationUrl: https://local_tenant.test.com/oauth/authorize
    tokenUrl: https://local_tenant.test.com/oauth/token
  clientCredentials:
    type: oauth2
    flow: application
    tokenUrl: https://local_tenant.test.com/oauth/token
  password:
    type: oauth2
    flow: password
    tokenUrl: https://local_tenant.test.com/oauth/token
  x-refresh-token:
    type: oauth2
    flow: application
    tokenUrl: https://local_tenant.test.com/oauth/token
    description: Extension flow
  x-saml2-bearer:
    type: oauth2
    flow: application
    tokenUrl: https://local_tenant.test.com/oauth/token
    description: Extension flow
  x-jwt-bearer:
    type: oauth2
    flow: application
    tokenUrl: https://local_tenant.test.com/oauth/token
    description: Extension flow
  clientCertAuth:
    type: apiKey
    in: header
    name: mutualTLS
    description: >
      Simulates client certificate (mutual TLS) authentication.
      Swagger 2.0 doesn't support mutual TLS directly.
  basicAuth:
    type: basic
    description: >
      Basic Authentication using username and password via Authorization header.
security:
  - clientCertAuth: []
  - basicAuth: []
  - authorizationCode: []
  - clientCredentials: []
  - password: []
  - x-refresh-token: []
  - x-saml2-bearer: []
  - x-jwt-bearer: []
```
