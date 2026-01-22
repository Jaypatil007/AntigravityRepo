# OpenAPI Specification 3.0 Support and Restrictions

SAP Integration Suite supports OpenAPI Specification (OAS) 3.0. When generating or modifying specifications, adhere to the following strict restrictions required by the platform.

## Restrictions

*   **No External References:** External references (e.g., `$ref: 'https://example.com/schema.yaml#/definitions/User'`) are **not supported** in OAS 3.0 or OAS 2.0. All definitions must be self-contained within the specification file.
*   **No Images:** Images are not supported within the OAS 3.0 description or other fields.
*   **No Local/Remote Links:** Local and remote hyperlinks are not supported.
