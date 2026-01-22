# Scripting Structure and Reuse

## Purpose
This document outlines the architectural guidelines for using Groovy scripts within SAP Cloud Integration (CPI). The primary goal is to ensure maintainability, reusability, and memory efficiency.

## Key Guidelines

### 1. Prefer Script Collections
- **Definition:** A Script Collection is a bundle of scripts reusable across all integration artifacts in the same package.
- **Rule:** Always check if logic can be centralized in a Script Collection before creating a local script.
- **Benefits:**
    - **Reuse:** Write once, use everywhere.
    - **Maintenance:** Update logic in one place.
    - **Performance:** Reduces overall file size and memory usage.
    - **Cleanliness:** Avoids duplicate code.

### 2. Local Scripts
- **Usage:** Use local scripts *only* when the functionality is strictly bound to a single artifact or not supported in Script Collections.
- **Exception:** User Defined Functions (UDFs) in Message Mappings currently require local scripts.

### 3. Avoid Unnecessary Scripting
- **Rule:** Do not use scripts for tasks that standard Integration Flow steps can handle.
- **Examples:**
    - Use **Splitter** steps instead of splitting logic in Groovy.
    - Use **Encoder/Decoder** steps instead of custom Base64 logic.
    - Use **Content Modifier** (XPath/JSONPath) for simple field extraction.
