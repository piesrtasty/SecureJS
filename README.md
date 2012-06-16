
# SecureJS

An extension of the JavaScript Object such that getting and setting data in the object is only possible when 
providing a predetermined access key.

This key is first used to instantiate the SecureObject and subsequently used when storing and retrieving data 
from the SecureObject.

### SecureJS attempts to satisfy the following requirements

1. An object constructor with one parameter that defines the access key should be used to instantiate the SecureObject.

2. The object should allow storing and retrieving data only if the supplied access key matches the original access key used to instantiate the SecureObject, otherwise an exception should be thrown.

3. It should *NOT* be possible to inspect the object and sniff out the contents, i.e. inspecting in Firebug or iterating over properties with a for/in loop would yield no valuable information whatsoever.

4. It should *NOT* be possible to peel into the object to obtain the access key used to instantiate the SecureObject

5. We are not looking for functionality that encrypts/decrypts the stored data. -- We only want to store data in such a way that you can only gain read / write privileges by supplying the access key.


