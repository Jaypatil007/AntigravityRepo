# OpenAPI Specification Structure and Metadata

This document outlines the standard fields and platform-specific attributes supported in the OpenAPI Specification (OAS).

## 1. Metadata (Info Object)

The `info` object provides metadata about the API.

*   **swagger / openapi:** The version of the OpenAPI Specification (e.g., `'2.0'` or `'3.0.1'`).
*   **title:** A short summary of the API.
*   **version:** The version of the API documentation itself.
*   **description:** An expanded description of the API.

### Supported HTML Tags in Description
Descriptions can contain basic HTML. Only the following tags are supported; all others are auto-removed. Images are **only** supported if Base64 encoded (no external links).

*   `<a>`, `<b>`, `<blockquote>`, `<br>`, `<cite>`, `<code>`, `<dd>`, `<dl>`, `<dt>`, `<em>`, `<i>`, `<li>`, `<ol>`, `<p>`, `<pre>`, `<q>`, `<small>`, `<span>`, `<strike>`, `<strong>`, `<sub>`, `<sup>`, `<u>`, `<ul>`, `<img>`

**Example:**
```yaml
info:
  title: SAP Workflow API
  description: |
         This API provides functionality to work with SAP Workflow Service.
         You can, for example, start new workflow instances and work with tasks.
  version: 1.0
  license:
    name: Apache-2.0
    url: "https://github.com/SAP/master/LICENSE"
  contact:
    name: SAP API Business Hub team
    email: SAPAPIHubInfo@sap.com
    url: https://api.sap.com/#/community
```

## 2. Root URL

The root URL is defined by `host`, `schemes`, and `basePath`.

*   **host:** The host (name or IP) serving the API.
*   **schemes:** `http` or `https`.
*   **basePath:** The base path relative to the host (must start with `/`).

**Example:**
```yaml
host: localhost
schemes:
  - https
basePath: /espm-cloud-web/espm.svc/secure
```

## 3. Platform Attributes (x-sap-shortText)

To enhance usability on the SAP API Business Hub, use the `x-sap-shortText` attribute.

**Example:**
```yaml
x-sap-shortText: A short description of your API
```

## 4. Operations (Paths)

Define the available paths and HTTP methods (`get`, `put`, `post`, `delete`, etc.).

**Example:**
```yaml
paths:
  /products:
    get:
       summary: Retrieves all products
       description: Retrieves the list of all available products in the inventory.
```

## 5. Responses

Define HTTP response status codes and descriptions.

**Example:**
```yaml
responses:
   '204':
     description: The task was successfully completed and the context was updated.
   '400':
     description: Wrong format or structure of the provided request body.
   '404':
     description: Not found.
```

## 6. Tags

Group related operations using tags.

**Example:**
```yaml
tags:
- name: Task Instances
  description: Operations related to task instances
- name: Workflow Definitions
  description: Operations related to workflow definitions

# Usage in operation
paths:
  /tasks:
    get:
      tags:
      - Task Instances
```

## 7. External Documentation

Add links to external user assistance.

**Example:**
```yaml
externalDocs:
  description: SAP Workflow Documentation
  url: https://help.sap.com/viewer/p/WORKFLOW_SERVICE
```
