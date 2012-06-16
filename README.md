# SecureJS

An extension of the JavaScript Object such that getting and setting data in the object is only possible when 
providing a predetermined access key.

This key is first used to instantiate the SecureObject and subsequently used when storing and retrieving data 
from the SecureObject.

### SecureJS satisfies the following requirements

1. An object constructor with one parameter that defines the access key should be used to instantiate the SecureObject.

2. The object should allow storing and retrieving data only if the supplied access key matches the original access key used to instantiate the SecureObject, otherwise an exception should be thrown.

3. It should *NOT* be possible to inspect the object and sniff out the contents, i.e. inspecting in Firebug or iterating over properties with a for/in loop would yield no valuable information whatsoever.

4. It should *NOT* be possible to peel into the object to obtain the access key used to instantiate the SecureObject

5. We are not looking for functionality that encrypts/decrypts the stored data. -- We only want to store data in such a way that you can only gain read / write privileges by supplying the access key.

### How does SecureJS work?

SecureJS creates private instance members of the class it defines by forming a closure when objects are instanitiated. 
This is accomplished by wrapping the function in an anonymous self executing function that returns the constructor making 
it possible to form a closure that includes both the class constructor and local variables. 

Thus you can encapsulate and hide 
the attributes of the object and use a privileged method to interact with a private method that checks the validity of the 
supplied access key, making it possible to avoid ever returning the actual access key. 

Additionally you can use the same set of functions to perform an access key check whenever you want to get or set any of the 
objects other attributes.

All the while the exact details surrounding your implementation of SecureJS and a given instance of the secure object class 
remain hidden from the end user.

### Notes on Encapsulation and Information Hiding in JavaScript

I have included the notes I took on the topic of encapsulation and information hiding in JavaScript that I took while
writing SecureJS.js.
