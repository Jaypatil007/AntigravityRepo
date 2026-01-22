# OpenAPISpecAgent Evaluation Plan

This document outlines 11 test cases to evaluate the `OpenAPISpecAgent`'s capability to generate SAP APIM-compliant OpenAPI 3.0 specifications. The tests cover a range of complexities, from simple defaults to complex OData structures and SAP-specific constraints.

## 1. Simple: Basic Information Retrieval
**Prompt:**
"Create a simple API to get the current server time. It should just have one GET endpoint."

**Complexity:** Low
**Expected Output Criteria:**
*   **Format:** Valid YAML OpenAPI 3.0.1.
*   **Structure:** Includes `info` (title, version), `servers` (placeholder), and one `path` (`/time` or similar).
*   **SAP Compliance:** Includes `x-sap-shortText`.
*   **Security:** Adds a default security requirement (likely OAuth2 or Basic) or explicitly notes it's public if inferred.
*   **Defaults:** Infers a JSON response schema (e.g., `timestamp` field).

## 2. Simple: CRUD with Missing Details
**Prompt:**
"I need an API to manage 'Products'. It should allow creating and listing products."

**Complexity:** Low
**Expected Output Criteria:**
*   **Inference:** Infers standard fields for 'Product' (id, name, price) in `components/schemas`.
*   **Operations:** Generates `GET /products` and `POST /products`.
*   **Response Codes:** Uses 200 for GET and 201 for POST.
*   **Security:** Defaults to OAuth2 (Client Credentials) per instructions.

## 3. Medium: Basic Authentication & Headers
**Prompt:**
"Create a 'User Profile' API. It must use Basic Authentication. The 'GET /profile' endpoint requires a custom header called 'Transaction-ID'."

**Complexity:** Medium
**Expected Output Criteria:**
*   **Security:** Defines `securitySchemes` with `type: http` and `scheme: basic`. Applies it globally or to the operation.
*   **Parameters:** Defines `Transaction-ID` with `in: header` and `required: true`.
*   **Components:** Reuses the header definition if possible, or defines it inline correctly.

## 4. Medium: OData Query Parameters ($top, $skip)
**Prompt:**
"I need an API to list 'Invoices'. It must support pagination using standard OData parameters like $top and $skip."

**Complexity:** Medium
**Expected Output Criteria:**
*   **Knowledge Application:** Uses the exact parameter definitions from `input-parameters.md` (e.g., `name: $top`, `in: query`).
*   **Structure:** Defines these parameters in `components/parameters` and references them in the `GET /invoices` path.

## 5. Medium: Error Handling
**Prompt:**
"Create an API for 'Shipments'. If a shipment isn't found, it should return a standardized error format with a code and message."

**Complexity:** Medium
**Expected Output Criteria:**
*   **Schema:** Defines a reusable `Error` or `ODataError` schema in `components`.
*   **Responses:** specific `404` response referencing the error schema.
*   **Best Practice:** Reuses the same error schema for `400` or `500` if included.

## 6. High: OAuth2 with Scopes & SAP Metadata
**Prompt:**
"Generate an 'Enterprise Employee Service'. It needs OAuth2 with 'clientCredentials' flow. Define two scopes: 'Employee.Read' and 'Employee.Write'. Also, ensure it has the SAP short text for the API Hub."

**Complexity:** High
**Expected Output Criteria:**
*   **Security Scheme:** Correctly defines `flows` -> `clientCredentials` -> `tokenUrl` and `scopes`.
*   **Usage:** Applies `Employee.Read` to GET operations and `Employee.Write` to POST/PUT operations.
*   **Metadata:** Explicitly includes `x-sap-shortText: Enterprise Employee Service`.
*   **Structure:** No external references allowed.

## 7. High: Complex Schema Inheritance (allOf)
**Prompt:**
"I need an API for a vehicle system. Define a base 'Vehicle' (id, brand) and a 'Car' that inherits from Vehicle and adds 'doors'. The API should list Cars."

**Complexity:** High
**Expected Output Criteria:**
*   **Schema Design:** Uses `allOf` in `components/schemas/Car` to reference `Vehicle`.
*   **Validity:** Ensures the generated YAML for `allOf` is syntactically correct.
*   **Endpoint:** `GET /cars` returns an array of `Car` objects.

## 8. High: Restriction Enforcement (External Refs)
**Prompt:**
"Create an API definition that references a user schema from 'https://example.com/schemas/user.json'. I want to keep this external link."

**Complexity:** High (Constraint Checking)
**Expected Output Criteria:**
*   **Behavior:** The Agent must **REFUSE** or **CORRECT** this request based on `oas3-support.md` (External references aren't supported).
*   **Correction:** It should inline the schema or create a local definition and explain *why* (SAP APIM restriction).

## 9. High: OData Filtering & Custom Headers
**Prompt:**
"Create a 'SalesOrder' API. It supports filtering via `$filter` and sorting via `$orderby`. The response must include a 'DataServiceVersion' header."

**Complexity:** High
**Expected Output Criteria:**
*   **Parameters:** Correctly defines `$filter` and `$orderby` in `components/parameters`.
*   **Response Headers:** Defines `DataServiceVersion` in the `headers` section of the 200 response (per `responses.md`).
*   **Context:** `x-sap-shortText` included.

## 10. High: Full "Import-Ready" Production Spec
**Prompt:**
"Generate a complete, production-ready specification for a 'Warehouse Management' system. It needs inventory items (CRUD), OAuth2 security, standard error handling, and valid contacts/license info."

**Complexity:** High
**Expected Output Criteria:**
*   **Completeness:** Includes `info` (contact, license), `servers`, `tags`, `x-sap-shortText`.
*   **Security:** Fully defined OAuth2.
*   **Operations:** Grouped by `tags`.
*   **Schemas:** Robust data models (e.g., `InventoryItem` with data types/enums).
*   **Ready-to-Use:** The YAML must be directly importable into SAP APIM without manual edits.

## 11. Edge Case: Ambiguous Request
**Prompt:**
"Fix this." (With no context) OR "Make an API." (With zero details).

**Complexity:** Edge Case
**Expected Output Criteria:**
*   **Interaction:** The agent should ask clarifying questions (What resource? What auth? What fields?) *OR* if forced to act, generate a generic placeholder API (like "Hello World") while stating its assumptions clearly.
