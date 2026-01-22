## Script Collection

A script collection is a bundle of scripts which can be used by all the integration artifacts belonging to the same integration package. See Developing Script and Script Collection for information on how to create and use a script collection.

The advantages of using script collections instead of local scripts are:

-   Reuse

-   Reduced Maintenance Efforts

-   Reduce File Size and Memory Usage

-   Avoid Duplicates


The script collection *Scripting – Script Collection* contains the scripts needed by the integration flows in the integration package *Integration Flow Design Guidelines – Scripting Guidelines*. The integration flows explained in the next chapters use references to the corresponding scripts of the collection instead of local scripts. Only the integration flow *Scripting – Mapping Functions* uses a local script, as UDFs in Mappings are not supported yet in script collections.

