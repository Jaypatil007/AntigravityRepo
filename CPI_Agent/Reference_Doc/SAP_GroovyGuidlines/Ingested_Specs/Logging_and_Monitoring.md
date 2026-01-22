# Logging and Monitoring

## Purpose
Guidelines for enhancing message traceability and searchability in the SAP CPI Message Monitor using custom logging.

## 1. Custom MPL Header Properties

### Usage
- Use custom headers to store business-related information (like Order Numbers or Customer IDs) in the Message Processing Log (MPL).
- This allows users to search for specific messages in the Monitor using these business identifiers.

### Code Snippet: Adding Custom Headers
```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    // 1. Obtain the MessageLog object
    def messageLog = messageLogFactory.getMessageLog(message)

    if (messageLog != null) {
        // 2. Retrieve the value to be logged (e.g., from an existing header)
        def poNumber = message.getHeaders().get("po_number")
        
        if (poNumber) {
            // 3. Add to Custom Header Property
            // Format: addCustomHeaderProperty(String name, String value)
            messageLog.addCustomHeaderProperty("PurchaseOrder", poNumber)
        }
        
        // Example: Log another identifier
        def customerId = message.getProperty("CustomerId")
        if (customerId) {
            messageLog.addCustomHeaderProperty("Customer", customerId)
        }
    }
    
    return message
}
```

## 2. General Logging Guidelines
- **SLF4J:** Use the SLF4J API for standard logging if needed.
- **Toggle Logging:** Always include a mechanism (like an externalized parameter or checking the IFlow log level) to enable/disable verbose logging to avoid performance overhead in production.
- **Traceability:** Prioritize `addCustomHeaderProperty` for business tracking over simple attachments for better search performance.
