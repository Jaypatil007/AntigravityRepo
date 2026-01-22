# External Calls and Value Mapping

## Purpose
Instructions for accessing standard Value Mappings defined in SAP Cloud Integration via Groovy scripts.

## Value Mapping

### Usage
Use `ValueMappingApi` to translate values between different agencies/schemes (e.g., mapping a Sender ID to a Receiver ID) dynamically within a script.

### Code Snippet
```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import com.sap.it.api.ITApiFactory
import com.sap.it.api.mapping.ValueMappingApi

def Message processData(Message message) {
    // 1. Get Source Value
    def properties = message.getProperties()
    def sourceId = properties.get("sourceId") // e.g., "123"
    
    // 2. Get Value Mapping API
    def valueMapApi = ITApiFactory.getService(ValueMappingApi.class, null)
    
    // 3. Execute Mapping
    // Signature: getMappedValue(SrcAgency, SrcScheme, SrcValue, TgtAgency, TgtScheme)
    def targetCode = valueMapApi.getMappedValue('CompanyA', 'ID', sourceId, 'CompanyB', 'ProductCode')
    
    // 4. Handle Result
    // If no mapping exists, it may return null or default depending on config.
    if (targetCode) {
        message.setProperty("targetCode", targetCode)
    }
    
    return message
}
```
