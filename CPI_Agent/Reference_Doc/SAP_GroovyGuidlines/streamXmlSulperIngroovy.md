In addition to modeling the desired features in integration scenarios, it is important to also consider non-functional aspects like resource consumption, performance, and reliability, just to name a few.

This blog is part of a series that shall assist Integration Developers to properly address these qualities when modeling Integration Flows.

This contribution focuses on Groovy scripts for XML processing, as they are often used in the Script step.

Integration Developers often use XmlSlurper in Groovy scripts to process XML messages. There are aspects that need to be considered regarding memory consumption. Consider the following code snippet:
def body = message.getBody(java.lang.String)
def xml = new XmlSlurper().parseText(body)

In the code above the body variable is just used to provide input to the XmlSlurper. This is fine as long as the body is of type java.lang.String. In all other cases conversion to java.lang.String will be applied, which requires allocation of additional memory for the String object. Note that when the message body is large, or when many messages are processed in parallel, the additional memory footprint might even cause a java.lang.OutOfMemoryError. Ultimately the OutOfMemoryError would interrupt the message processing.

The additional memory allocation can be avoided if the XmlSlurper would accept the body as it is, or if the body could be streamed. Then, a better approach is to stream the message body to the XmlSlurper by using message.getBody(java.io.Reader), as shown in the following snippet:
def body = message.getBody(java.io.Reader)
def xml = new XmlSlurper().parse(body)

This will do the magic of streaming the message body - the body variable is now a java.io.Reader that is just a reference to the message payload object, thus reducing memory consumption and contributing to reliability of your integration scenario.