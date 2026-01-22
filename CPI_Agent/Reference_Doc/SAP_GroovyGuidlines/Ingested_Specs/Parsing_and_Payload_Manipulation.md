# Parsing and Payload Manipulation

## Purpose
Guidelines and patterns for parsing JSON and XML payloads to extract data or manipulate message structure.

## 1. JSON Parsing

### Guidelines
- Use `JsonSlurper` for parsing JSON payloads.
- Stream the body using `Reader` to save memory.

### Code Snippet: Parse JSON and Set Properties
```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import groovy.json.JsonSlurper

def Message parseJsonMessage(Message message) {
    // 1. Get Reader for streaming
    def reader = message.getBody(java.io.Reader)
    
    // 2. Parse JSON
    def data = new JsonSlurper().parse(reader)

    // 3. Access elements (e.g., data.query.service)
    if (data.query) {
        message.setProperty("service", data.query.service)
        message.setProperty("resource", data.query.entity?.name)
        
        // Handling Lists/Arrays
        def fields = data.query.entity?.fields?.collect { it.name }?.join(",")
        message.setProperty("fields", fields)
    }

    return message
}
```

## 2. XML Parsing (XmlSlurper vs XmlParser)

### Guidelines
- **XmlSlurper:** Best for **read-only** parsing. It is memory-efficient as it processes the tree lazily.
- **XmlParser:** Use only if you need to **modify** the XML in-place and write it back.

### Code Snippet: XML Slurper (Streaming)
```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processXml(Message message) {
    def reader = message.getBody(java.io.Reader)
    def root = new XmlSlurper().parse(reader)
    
    // Simple navigation: root.Node.SubNode.text()
    def orderId = root.Header.OrderID.text()
    message.setProperty("OrderID", orderId)
    
    return message
}
```
