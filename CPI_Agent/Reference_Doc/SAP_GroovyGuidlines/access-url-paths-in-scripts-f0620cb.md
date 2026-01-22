<!-- loiof0620cbc2cb94971a39135f0acb70013 -->

# Access URL Paths in Scripts

The integration flow *Scripting – Read Url Path* reads the individual elements of an incoming request \(e.g. https://<host\>:<port\>/<service\>/<resource\>/<id\>\) and uses them to call an external OData service.



First, the Script step *readUrlPath* is responsible for reading the path of the incoming URL and for saving the elements in properties. The URL can be found in the standard header `CamelHttpUrl`. Then, the retrieved string can be split in the elements service, resource, and id. This logic can be modified to apply to other path syntaxes as well.

> ### Sample Code:  
> ```
> import com.sap.gateway.ip.core.customdev.util.Message;
> import java.util.HashMap;
> 
> def Message extractUrlPath(Message message) {
> 
>        //get url 
>        def map = message.getHeaders();
>        def url = map.get("CamelHttpUrl");
> 
>        //split url
>        String[] vUrl;
>        vUrl = url.split('/');
>        int size = vUrl.length;
> 
>        message.setProperty("service", vUrl[size-3]);
>        message.setProperty("resource", vUrl[size-2]);
>        message.setProperty("id", vUrl[size-1]);
>        return message;
> }
> ```



