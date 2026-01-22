# Security and Credentials

## Purpose
Guidelines for securely accessing credentials and secure parameters within Groovy scripts using the SAP CPI API.

## Critical Security Rules
1.  **Do Not Expose Secrets:** Never log passwords, API keys, or secrets.
2.  **Avoid Headers/Properties:** Do not store sensitive data in Message Headers or Exchange Properties if avoidable, as they may be visible in the Message Monitor (Trace mode).
3.  **Error Handling:** Always wrap secure operations in `try-catch` blocks to handle `SecureStoreException`.

## Accessing Secure Parameters (User Credentials)

### API Usage
Use `SecureStoreService` via `ITApiFactory` to retrieve credentials deployed in the tenant's *Manage Security Material*.

### Code Snippet
```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import com.sap.it.api.ITApiFactory
import com.sap.it.api.securestore.SecureStoreService
import com.sap.it.api.securestore.UserCredential
import com.sap.it.api.securestore.exception.SecureStoreException

def Message processData(Message message) {
    // 1. Get the alias (preferably from an externalized property)
    def alias = message.getProperty("SecureParamAlias")
    
    // 2. Get the Service
    def service = ITApiFactory.getService(SecureStoreService.class, null)
    
    try {
        // 3. Retrieve Credential
        def credential = service.getUserCredential(alias)
        
        if (credential == null) {
            throw new IllegalStateException("No credential found for alias: " + alias)
        }

        // 4. Access Password/Key
        // Note: Minimize scope of this variable.
        String apiKey = new String(credential.getPassword()) 
        
        // Example usage: Setting Authorization header (Be careful with Trace visibility!)
        message.setHeader("Authorization", "Bearer " + apiKey)
        
    } catch (SecureStoreException e) {
        throw new IllegalStateException("Error retrieving secure parameter", e)
    }
    
    return message
}
```
