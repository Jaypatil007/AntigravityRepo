# Accessing Message Data (Headers, Properties, URL)

## Purpose
Standard patterns for interacting with the `Message` object to read/write headers, properties, and parse incoming URL paths.

## 1. Headers and Properties

### Guidelines
- Use the `Message` object methods to interact with the context.
- Ensure type safety where possible (though Groovy is dynamic, knowing the type helps).

### Code Snippet: Get/Set Patterns
```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    // Reading Headers
    def headers = message.getHeaders()
    def myHeader = headers.get("myHeaderName") // Returns Object

    // Reading Properties
    def properties = message.getProperties()
    def myProp = properties.get("myPropertyName")

    // Setting Headers (Output to next step/receiver)
    message.setHeader("newHeader", "value")

    // Setting Properties (Internal processing context)
    message.setProperty("newProp", "value")

    return message
}
```

## 2. Parsing URL Paths

### Guidelines
- To extract parameters from a REST-style URL (e.g., `.../service/resource/id`), access the standard `CamelHttpUrl` header.
- Use String manipulation to extract segments.

### Code Snippet: URL Parsing
```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message extractUrlPath(Message message) {
    def map = message.getHeaders()
    def url = map.get("CamelHttpUrl") // e.g., http://host:port/service/resource/123

    if (url) {
        // Split by '/'
        String[] parts = url.split('/')
        int size = parts.length

        // Extract last 3 segments as example
        if(size >= 3) {
            message.setProperty("service", parts[size-3])
            message.setProperty("resource", parts[size-2])
            message.setProperty("id", parts[size-1])
        }
    }
    return message
}
```
