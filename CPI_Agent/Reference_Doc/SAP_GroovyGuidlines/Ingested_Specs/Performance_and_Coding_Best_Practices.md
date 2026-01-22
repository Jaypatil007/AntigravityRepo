# Performance and Coding Best Practices

## Purpose
Critical guidelines for writing high-performance, memory-efficient Groovy scripts in SAP CPI.

## 1. Memory Management & Performance

### Streaming (Crucial for Large Payloads)
- **Problem:** Using `message.getBody(String)` loads the entire payload into memory. This causes `OutOfMemoryError` for large files.
- **Solution:** Always use `Reader` or `InputStream` to stream the body.
- **Example (XML):**
  ```groovy
  // AVOID: new XmlSlurper().parseText(message.getBody(String))
  // USE:
  def reader = message.getBody(java.io.Reader)
  def xml = new XmlSlurper().parse(reader)
  ```

### String Manipulation
- **Rule:** Never use `+=` or String concatenation in loops. Strings are immutable; this creates many intermediate objects.
- **Solution:** Use `StringBuilder`.
  ```groovy
  StringBuilder sb = new StringBuilder()
  items.each { item -> sb.append(item.name).append(",") }
  String result = sb.toString()
  ```

### Variable Definitions
- **Rule:** Avoid **Binding Variables** (e.g., `body = '123'`). They persist in memory until undeploy and are not thread-safe.
- **Solution:** Always use `def` or explicit types (e.g., `def body = '123'` or `String body = '123'`).

### XML/JSON Generation
- **Rule:** Avoid "Pretty Printing" (indentation/newlines) for production.
- **Benefit:** Compacted versions are smaller and faster to transmit.

## 2. Coding Standards

### Simplifications
- **Groovy Truth:** Use `if (text)` instead of `if (text != null && text.length() > 0)`.
- **Coercion:** Avoid redundant coercion like `message.getBody(String) as String`. Use `message.getBody(String)`.

### Logic Restrictions
- **Standard Steps First:** Use standard CPI steps (Splitter, Content Modifier, Filter) instead of scripts whenever possible.
- **No `TimeZone.setDefault`:** This affects the entire JVM and causes technical issues.
- **No `Eval()`:** Generated classes are never unloaded, leading to memory leaks.
- **Official APIs Only:** Use SAP-supported Script APIs to ensure compatibility with future upgrades.
