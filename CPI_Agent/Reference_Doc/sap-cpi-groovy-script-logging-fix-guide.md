# SAP CPI Groovy Script Logging Fix Guide

## Purpose
This document provides clear guidance to an LLM agent to **analyze, validate, and fix incorrect logging implementations** in SAP Cloud Integration (CPI) Groovy script steps.

The specific issue addressed here is the **incorrect usage of `logInfo(...)` and `logError(...)` methods**, which are **not natively supported in SAP CPI**.

---

## Problem Statement

The following Groovy script pattern is **invalid in SAP CPI**:

```groovy
logInfo(messageLog, "START", "Script execution started")
logError(messageLog, "ERROR", "Script execution failed")
```
### Why this is a problem
- SAP CPI does not provide built-in `logInfo()` or `logError()` helper functions.
- There is no default logger (e.g., Log4J) available in Groovy script steps.
- Such methods will cause runtime errors unless explicitly implemented (which is not recommended).

### Supported Logging Mechanism in SAP CPI
SAP CPI supports logging only through the Message Processing Log (MPL) using the `MessageLog` API.

### Correct Way to Access Message Log
```groovy
def messageLog = messageLogFactory.getMessageLog(message)
```
⚠️ `messageLog` can be null if MPL log level is set to NONE.

### Supported Logging Methods
| Method | Usage |
| :--- | :--- |
| `setStringProperty(key, value)` | Log small informational text |
| `addCustomHeaderProperty(key, value)` | Add headers visible in MPL |
| `addAttachmentAsString(name, content, mimeType)` | Attach payload or large logs |

### Corrected Logging Pattern (Reference Implementation)
```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {

    def messageLog = messageLogFactory.getMessageLog(message)

    try {
        if (messageLog != null) {
            messageLog.setStringProperty("START", "Script execution started")
        }

        def body = message.getBody(String.class)

        if (messageLog != null) {
            messageLog.setStringProperty(
                "INPUT",
                "Received payload size: " + (body?.length() ?: 0) + " bytes"
            )
        }

        // ===== Main Processing Logic =====
        // {processing_logic}
        // =================================

        if (messageLog != null) {
            messageLog.setStringProperty("END", "Script execution completed successfully")
        }

        return message

    } catch (Exception e) {

        if (messageLog != null) {
            messageLog.setStringProperty(
                "ERROR",
                "Script execution failed: " + e.message
            )
        }
        throw e
    }
}
```
### Rules for LLM Agent (Mandatory)
The LLM must follow these rules when generating or fixing CPI Groovy scripts:

- ❌ Never use `logInfo()`, `logError()`, `println`, or external logging libraries.
- ✅ Always use `messageLogFactory.getMessageLog(message)`.
- ✅ Always null-check `messageLog` before logging.
- ✅ Log only essential information to avoid MPL overflow.
- ❌ Do not log sensitive data unless explicitly requested.
- ✅ Prefer `setStringProperty` for status messages and `addAttachmentAsString` for payloads.
