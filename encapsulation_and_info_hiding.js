nd implement a method for displaying the book's data in HTML.
	 You will only be creating the class; other programmers will be
	 instantiating it. The following is an example of how it will be used:
	
	 // Book(isbn, title, author)
	var theHobbit = new Book('0-395-07122-4', 'The Hobbit', 'J. R. r. Tolkien');
	theHobbit.display(); // Outputs the data by creating and populating an HTML element.
*/


/* Three main ways of using encapsulation to perform information hiding. */

// Fully Exposed Object

/* The easiest of the 3...create a class in the conventional way, using a function as a constructor. 
   Called the "fully exposed object" because all of the class's attributes and methods are
   public and accessible. The public attributes are created using the 'this' keyword.

var Book = function(isbn, title, author)	{
	if(isbn == undefined) throw new Error('Book constructor requires an isbn,');
	this.isbn = isbnl
	this.title = title || 'No title specified';
	this.author = author || 'No author specified';
}

Book.prototype.display = function()	{
	...
}

Problems with the above way....
* You cannot verify the integrity of the ISBN data, which may cause your display method to fail.
Fix = implementing stronger checks on the isbn:

var Book = function(isbn, title, author)	{
	if(!this.checkIsbn(isbn) throw new Error('Book: Invalid ISBN.');
	this.isbn = isbn;
	this.title = title || 'No title specified';
	this.author = author || 'No author specified';
}

*/

Book.prototype = {
	checkIsbn: function(isbn)	{
		if(isbn == undefined || typeof isbn != 'string')	{
			return false;
		}
		
		isbn = isbn.replace(/-/. ''); // Remove dashes.
		if(isbn.length != 10 && isbn.length != 13)	{
			return false;
		}
		
		var sum = 0;
		if(isbn.length == 10)	{	// 10 digit ISBN
			if(!isbn.match(\^\d{9}\))	{ // Ensure characters 1 through 9 are digits.
				return false;				
			}
			
			for(var i = 0; i < 9; i++)	{
				sum += isbn.charAt(i) * (10 - i);
			}
			var checksum = sum % 11;
			if(checksum === 10) checksum = 'X';
			if(isbn.charAt(9) != checksum)	{
				return false;
			}
		}
		else { // 13 digit ISBN
			if(!isbn.match(\^\d{12}\))	{ // Ensure characters 1 through 12 are digits
				return false;
			}
			
			for(var i = 0; i < 12; i++)	{
				sum += isbn.charAt(i) * ((i % 2 === 0) ? 1 : 3);
			}
			var checksum = sum % 10;
			if(isbn.charAt(12) != checksum)	{
				return false;
			}
		}
		
		return true; // All tests passed
	},
	
	display: function()	{
		...	
	}
};

/* We added a checkIsbn method that ensures the ISBN is a string with the correct number of digits
   and the correct checksum. Since there are now two methods for for this class, Book.prototype is
	 set to an object literal, for defining multiple methods without having to start each one with
	 Book.prototype.
	
	 Improvement: You are now able to verify that the ISBN is valid when the object is created,
	 	ensuring that the display method will succeed. 
	
	 Security Hole Remaining: Another programmer notices that a book may have multiple editions,
		each with its own ISBN. He creates an algorithm for selecting among these different editions,
		and is using it to change the isbn attribute directly after instantiating the objectL
		
		theHobbit.isbn = '978-0261103283';
		theHobbit.display();
		
 	 Despite the ability to verify the integrity of the data in the data in the constructor, you don't
	 have any control over what another programmer will assign to the attribute directly. In order to
	 protect the internal data, you create accessor and mutator methods for each attribute. An accessor
	 method (usually named in the form getAttributeName) will set the value of the attribute. Using
	 mutators, you can implement any kind of verification you like before you actually assign a new
	 value to any of your attributes.
	
	 The following is a new version of the Book object with accessors and mutators added:
	
*/
	var Publication = new Interface('Publication', ['getIsbn', 'setIsbn', 'getTitle', 'setTitle',
	 	'getAuthor', 'setAuthor', 'display' ]);
	
	var Book = function(isbn, title, author)	{ // implements Publication
		this.setIsbn(isbn);
		this.setTitle(title);
		this.setAuthor(author);
	}
	
	Book.prototype = {
		checkIsbn: function(isbn)	{
			...
		},
		getIsbn: function()	{
			return this.isbn;
		},
		setIsbn: function(isbn)	{
			if(!this.checkIsbn(isbn)) throw new Error('Book: Invalid ISBN.');
			this.isbn = isbn;
		},
		
		getTitle: function()	{
			return this.title;
		},
		setTitle: function(title)	{
			this.title = title || 'No title specified';
		},
		
		getAuthor: function()	{
			return this.author;
		},
		setAuthor: function(author)	{
			this.author = author || 'No author specified'
		},
		
		display: function()	{
			...
		}
	};
	
/*	Observations
	
		1. We have defined an interface. Thus from now on other programmers should only interact
			 with the object using those methods defined in the interface.

		2. The mutator methods are used in the constructor; there is no point implementing the same
			 verifications twuce, so you rely on those methods internally.
			
		This is the extent of security you can provide if using the "fully exposed object pattern".
		
		Features:
		1. well-defined interface
		2. accessor and mutator methods protecting the data
		3. validation methods
		
		Yet a security hole still remains in the design: even though we provide mutator methods for 
		setting attributes, the attributes are still public, and can still be set directly. With this
		pattern, there is no way of preventing that.
		
		You cannot eliminate the possbility of setting an invalid ISBN, either accidentally or intentionally	
*/		
		

/* Pattern 2: Private Methods Using a Naming Convention

 	This pattern emulates private members by using a naming convention. This pattern addresses the aforementioned
	inability to prevent another programmer from accidentally bypassing all of your validations.
	
	It is essentially the same as the "fully exposed object" but with underscores in front of methods and
	attributes you want to keep private:

*/

var Book = function(isbn, title, author)	{ // implements Publication
	this.setIsbn(isbn);
	this.setTitle(title);
	this.setAuthor(author);
}

Book.prototype = {
	 checkIsbn: function(isbn)	{
		...
	},
	getIsbn: function()	{
		return this._isbn;
	},
	setIsbn: function(isbn)	{
		if(!this.checkIsbn(isbn)) throw new Error('Bookl: Invalid ISBN.');
		this._isbn = isbn;
	},
	
	getTitle: function()	{
		return this._title;
	},
	setTitle: function(title)	{
		this._title = title || 'No title specified';
	},
	
	getAuthor: function()	{
		return this._author;
	},
	setAuthor: function(author)	{
		this._author = author || 'No author specified';
	},
	
	display: function()	{
		...
	}
};

/*

All of the attributes have been renamed. An underscore is added to the beginning of each, signifying
that it is intended to be private. This is still a valid variable name in JavaScript, since the underscore
is a legal first character in an identifier.

Can apply aforementioned naming convention to methods as well. I.E. if a programmer using your class
is having difficulty creating an instance because he keeps geting "Invalid ISBN" errors he could use the
public method "checkIsbn" to run through each possible character for the checksum digit (there are
only ten) until he finds one that passes, and use that to create an instance of Book. ( Although
that will likely create an invalid ISBN ). 

To implement this naming convention for methods you can change the method declaration from this.

*/

checkIsbn: function(isbn)	{
	...
},

// to this

_checkIsbn: function(isbn)	{
	...
},

/* 

The above has only made it less likely that somone will try and game the system "unintentionally"

Since the underscore is a well-known naming convention, that says the attribute (or method) is used
internally, and that accessing it or setting it directly may have unintended consequences. This should
prevent programmers from setting it in ignorance, but it still won't prevent those that use it it
knowingly. For that, you need real private methods.

As this pattern has the same benfits as a "fully exposed object" and only 1 less drawback it is not a
real practical solution for hiding the internal data of an object.

It is instead used mostly for methods and attributes that are internal but not sensitive - methods
and attributes that most programmers using the class won't care about since they aren't in the public
interface.

*/

/* Pattern 3: Scope, Nested Functions, and Closures

In JavaScript only functions have 'scope', that is to say, a variable declared within a function is
not accessible outside of that function.

Private attributes are essentially variables that you would like to be inaccessible from outside of the
object, so it makes sense to loook to the concept of scope to acieve this inaccessibility.

A variable defined within a function is accessible to its nested functions. The following demonstrates
scope in JavaScript

*/

function foo()	{
	var a = 10;
	
	function bar()	{
		a *= 2;
	}
	
	bar();
	return a;
}

// a is defined in foo() but bar() can access a because it also is defined in foo().
// when bar is executed it sets a to a times 2.
// It makes sense that bar can access a when it is executed within foo(), but what if you could execute
// bar() outside of foo()?

var baz = foo(); // baz is now a reference to function bar
baz(); // returns 20
baz(); // returns 40
baz(); // returns 80

var blat = foo(); // blat is another reference
blat(); // returns 20, because a new copy of a is being used.

/*

Here a reference to the function bar is returned and assigned to the variable baz. This function is
now executed outside of foo(), and it still has access to a. This is possible because JavaScript is 
lexically scoped. Functions run in the scope they are defined in (in this case, the scope within foo() ),
rather than the scope they are executed in. As long as bar is defined within foo, it has access to all of
foo's variables, even if foo is finished executing.

This is an example of a closure. After foo returns, its scope is saved, and only the function that it
returns has access to it. In the previous example, baz and blat each have a copy of this scope and a copy
of a that only they can modify. The most common way of creating a closure is by returning a nested function.

---- Private Members Through Closures ----

You need to create a variable that can only be accessed internally. A closure seems to be a perfect
fit because it allows you to create variables that are accessible only to certain functions and are
preserved in between those function calls. To create private attributes, you define variables in 
the scope of your constructor function. These attributes will be accessible to all functions defined
within this scope, including privileged methods:

*/

var Book = function(newIsbn, newTitle, newAuthor)	{	// implements Publication
		
		// Private attributes.
		var isbn, title, author;
		
		// Private method.
		function checkIsbn(isbn)	{
			...
		}
		
		// Privileged methods.
		this.getIsbn = function()	{
			return isbn;
		};
		this.setIsbn = function(newIsbn)	{
			if(!checkIsbn(newIsbn)) throw new Error('BookL Invalid ISBN.');
			isbn = newIsbn;
		};
		
		this.getTitle = function()	{
			return title;
		};
		this.setTitle = function(newTitle)	{
			title = newTitle || 'No title specified'
		};
		
		this.getAuthor = function()	{
			return author;
		};
		this.setAuthor = function(newAuthor)	{
			author = newAuthor || 'No author specified';
		};
		
		// Constructor code
		this.setIsbn(newIsbn);
		this.setTitle(newTitle);
		this.setAuthor(newAuthor);
	};
	
	// Public, non-privileged methods.
	Book.prototype = {
		display: function()	{
			....
		}
	};
	
	
	
}

/*
By declaring all the attributes with 'var' and not 'this' they will only exist within the Book constructor.
In the same fashion the checkIsbn method is made private.

Any method that needs to access these variables and functions need only to be declared within Book.

These are called "privileged" methods because they are public but have access to private attributes and
methods.

The "this" keyword is used in front of these privileged functions to make them publicly accessible.
They are not referred to using "this" because they aren't public. All of the accessor and mutator methods have
been changed to refer to the attributes directly, without "this".

Any public methid that does not need direct access to private attributes can be declared normally function in
the Book.prototype. ( i.e. display in this case )

It's a good idea to make a method privileged only if it needs direct access to the private members. 
Having too many privileged methods can cause memory problems becuase new copies of all privileged methods are
created for each instance.

Solves all previous problems but has the following...

Drawbacks: 

1. In the fully exposed object pattern, all methods are created off of the prototype, which
means there is only one copy of each in memory, no matter how many instances you create.

In this pattern, you create a new copy of every private and privileged method each time a new object
is instantiated. This has the potential to use more memory than the other patterns, so it should only
be used when you require true private members.

2. This pattern is hard to subclass. The new inherited class will not have access to any of the superclass's private attributes or methods. It is said that "inheritance breaks encapsulation" because in most languages, the subclass has access to all of the private attrivutes and methods of the superclass. In JavaScript, this is noti the case. If you are creating a class that might be subclassed later, it is best to stick to one of the fully exposed patterns.

// MORE ADVANCED PATTERNS

/*	STATIC METHODS AND ATTRIBUTES
	
Static members can be both private and publically accessible. Most methids and attributes interact with an stance of a class; static members interact with the class itself.

Static members operate on the class-level instead of the instance-level; there is only one copy of each static member. They are called directly off of the class object.

Here is the book class with static attricutes and methods:

*/

var Book = (function()	{

	// Private static attributes
	var numOfBooks = 0;
	
	// Private static method
	function checkIsbn(isbn)	{
		
	}
	
	// Return the constructor.
	return function(newIsbn, newTitle, newAuthor) { // implements Publication
		
		// Private attrivutes
		var isbn, tutke, authorl
		
		// Privileged methods
		this.getIsbn = function()	{
			return isbn;
		};
		this.setIsbn = function(newIsbn)	{
			if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
			isbn = newIsbn;
		};
		
		this.getTitle = function()	{
			return title;
		};
		this.setTitle = function(newTitle)	{
			title = newTitle || 'No title specified.'
		};
		
		this.getAuthor = function()	{
			return author;
		};
		this.setAuthor = function(newAuthor)	{
			author = newAuthor || 'No author specified';
		};
		
		// Constructor code.
		numOfBooks++;		// Keep track of how many Books have been instantiated
										// with the private static attribute
		if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be created.');
		
		this.setIsbn(newIsbn);
		this.setTitle(newTitle);
		this.setAuthor(newAuthor);		
	}
})();

// Public static method.
Book.convertToTitleCase = function(inputString)	{
	...
};

// Public, non-privileged methods.
Book.prototype = {
	display: function()	{
		...
	}
};

/*

This is similar to the class created with "Private Members Through Closures" with a few key differences.

1. Private and privileged members are still declared within the constructor, using var and this respectively, but the constructor is changed from a normal function to a nested function that gets returned to the variable Book.

This makes it possible to create a closure where you can declare private static members. The empty paranthesis after the function declaration are extremely important. They serve to execute that function immediately, as soon as the code is loaded (not when the Book constructor is called). The result of that execution is another function, which is returned and set to be the Book constructor. When Book is instantiated, this inner function is what gets called; the outer function is used only to create a closure, within which you can put private static members.

In this example, the checkIsbn method is static because there is no point in creating a new copy of it for each instance of Book. There is also a static attribute called numOfBooks, which allows you to keep track of how many times the Book constructor has been called.

These private static members can be accessed from wtihin the constructor, which means that any private or privilged function has access to them.

They have a distinct advantage over these other methods in that they are only stored in memory space. Since they are declared outside of the constructor, they do not have access to any of the private attributes, and as such, are not privileged; private methods can call private static methods, but not the other way around.

A rule of thumb for deciding whether a private method should be static is to see whether it needs to access any of the instance data. If it does not need access, making the method static is more efficient (in terms of memory use) because only a copy is ever created.

Public static members are much easier to create. They are simply created directly off of the constructor, as with the previous method "convertToTitleCase". This means you are essentially using the constructor as a naemspace.

*** Note ***

In JavaScript, everything except for variables of the three primitive types is an object (and even those three primitives are automatically wrapped by objects when needed ). This means that functions are also objects. Since objects are essentially hash tables, you can add members at any time. The end result of this is what functions can have attributes and methods just like any other object, and they can be added whenever you want.

***********

All public static methods could just as easily be declared as separate functions, but ut us useful to bndle related behaviors together in one place. They are useful for tasks that are related to the class as whole and not to any particular instance of it. They don't directly depend on any of the data contained within the instances.

*** CONSTANTS ****

Constants are nothing more than variables that can't changed. In JavaScript, you can emulate constants by creating a private variable with an accessor but no mutator. Since constants are usually set at development time and don't change with each instance that is created, it makes sense to create them as private static attributes.

Here is how a call to get the constant UPPER_BOUND from CLASS would look;

*/

Class.getUPPER_BOUND();

// To implement this accessor, you would need a privileged static method. It is created just like a privileged instance method, with the 'this' keyword:

var Class = (function()	{
	
	// Constants (created as private static attributes).
	var UPPER_BOUND = 100;
	
	// Privileged static method.
	this.getUPPER_BOUND()	{
		return UPPER_BOUND;
	}
	
	...
	
	// Return the constructor.
	return function(constructorArgument)	{
		...
	}	
})();

// If you have a lot of constants and don't want to create an accessor methods for each, you can create a single generic accessor method:

var Class = (function()	{
	
	// Private static attributes
	var constants = {
		UPPER_BOUND = 100,
		LOWER_BOUND: -100
	}
	
	// Privileged static method.
	this.getConstant(name)	{
		return constants[name];
	}
	
	...
	
	// Return the constructor.
	return function(constructorArgument)	{
		...
	}
})();

// Then you would get a constant by calling the single accessor:

Class.getConstant('UPPER_BOUND');

/* SINGLETONS and OBJECTS FACTORIES

There are other patterns that utilize closures to create a protected variavle space. The two that rely on it the most are the singleton and the factory pattern.

The singleton pattern uses a returned object literal to expose privileged members, while keeping private members protected in the enclosing function's scope. It uses the same technique that we covered earlier, where an outer function is executed immedaitely and the result is assigned to a variable.

In all of the above examples, a function has always been returned; a singleton returns an object literal instead. It is a very easy and straightforward way to create a sheltered namespace.

Object favtories can also use closures to create obects with private members. In its simplest form, an object factory is the same as a class constructor.


**** BENEFITS OF USING ENCAPSULATION ****

1. Encapsulation protects the integrity of the internal data - by allowing access to the data only through accessor and mutator methods, you have complete control over what gets saved and returned. This allows you to reduce the amount of error-checking code you need in your other functions, and ensures that the data can never be in a bad state.

2. Added benefit of allowing easier refactoring of your objects. Since the internal details are sheilded from the users of the object, you are free to change data structures and algorithms in midstream without anyone knowing or caring.

3. Promoting loosely coupled modules by making only the methods specified in the interface public. This is one of the most important principles of object oriented design.

	Keeping your objects as independent as possible has many benefits...
	
	a) Improves reusability and allows objects to be swapped out if needed.
	
	b) Using private variables also protects you from having to worry about namespace collisions. ( by making a variable inaccessible to the rest of the code, you don't have to constantly ask yourself if the variable name you are using might interfere with other objects or functions elsewhere in the program.)
	
	c) It allows internal object details to change dramatically without affecting other peices of code; in general, you can make changes more easily because you already know exactly what it will affect. ( if you expose interanl data directly, it would be impossible to know what consequences code changes could have. )
	
	
**** DRAWBACKS OF USING ENCAPSULATION ****

1. Hard to unit test private methods because they are hidden and internal variables are shielded it is impossible to access them outside of the object.

Workarounds for this problem are not very friendly being...

You must either provide access through public methods, removing most of the benefit of using private methods in the first place, or somehow define and execute all unit tests within the object.

The best solution is just to unit test the public methods.

2. Having to deal with complicated scope chains can make debugging errors more difficult. It can be hard to distinguish between many identically named variables in different scopes. This problem is not unique to encapsiulated objects, but it can be made more complicated by the closures needed to produce private methods and attributes.
	

