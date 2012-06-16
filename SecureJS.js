/* \

Suppose you wanted to extend the JavaScript Object such that getting and setting data in the object is only possible when providing a predetermined access key. 


The key is first used to instantiate the SecureObject and subsequently used when storing and retrieving data from the SecureObject.

Provide the implementation for a JavaScript function that satisfies the following ...

1. An object constructor with one parameter that defines the access key should be used to instantiate the SecureObject.

2. The object should allow storing and retrieving data only if the supplied access key matches the original access key used to instantiate the SecureObject, otherwise an exception should be thrown.

3. It should *NOT* be possible to inspect the object and sniff out the contents, i.e. inspecting in Firebug or iterating over properties with a for/in loop would yield no valuable information whatsoever.

4. It should *NOT* be possible to peel into the object to obtain the access key used to instantiate the SecureObject

5. We are not looking for functionality that encrypts/decrypts the stored data. -- We only want to store data in such a way that you can only gain read / write privileges by supplying the access key.

Comment on the implementation and considerations that would make writing such a function possible.

*/

var SecureObject = (function()	{
	// Private static (class) variable
	var counter = 0;
	
	function incrementCounter()	{
		return counter++;
	}
	
	// Private static method
	function checkAcessKeyMatch(userInputKey)	{
		if( userInputKey == undefined || typeof userInputKey != 'string')	{
			return false;
		}
		
		if(userInputKey.length != accessKey.length)	{
			return false;
		}
		
		var sum = 0;
		
		if (!userInputKey.match(\^\d{userInputKey.length - 1}))	{
			return false;
		}
		
		for(var i = 0; i < userInputKey.length - 1; i++)	{
			sum += userInputKey.charAt(i) * ((i % 2 === 0) ? 1 : 3);
		}
		var checksum = sum % 10;
		if(userInputKey.charAt(userInputKey.length - 1) != checksum)	{
			return false;
		}
		
		return true; // All tests passed	
		
	}
		
	function constructorFn(newAccessKey)	{
		var accessKey = newAccessKey
		var attributes = {}
		/* call private static (class) method and assign the 
		returned index to a private instance member */
		var index = incrementCounter();
		
		this.getIndex = function()	{
			return index;
		};	
	};	
	
	/* privileged statc (class) method */
	constructorFn.setAttribute = function(accessKey, attrKey, attrValue)	{
		if(!checkAccessKey(accessKey)) throw new Error('Secure Object: Invalid Acess Key.');
		attributes[attrkey] = attrValue;
	};
	
	/* privileged statc (class) method */
	constructorFn.getAttribute = function(accessKey, attrKey)	{
		if(!checkAccessKey(accessKey)) throw new Error('Secure Object: Invalid Acess Key.');
		attributes[attrkey] = attrValue;
	};
	return constructorFn;
})(); // simultanesously define and call

// Comment on the implementation and considerations that would make writing such a function possible.


/* The above solution creates private instance members of the class it defines by forming a closure when objects are instanitiated. This is accomplished by wrapping the function in an anonymous self executing function that returns the constructor making it possible to form a closure that includes both the class constructor and local variables.

Thus you can encapsulate and hide the attributes of the object and use a privileged method to interact with a private method that checks the validity of the supplied access key, making it possible to avoid ever returning the actual access key. Additionally you can use the same set of functions to perform an access key check whenever you want to get or set any of the objects other attributes.

All the while the exact details surrounding your implementation and a given instance of the secure object class remain hidden from the end user.
*/
